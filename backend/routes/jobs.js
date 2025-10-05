const express = require('express');
const Job = require('../models/Job');
const Resume = require('../models/Resume');
const { splitSentences } = require('../utils/parser');

const router = express.Router();

/** Create job */
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) 
      return res.status(400).json({ error: 'Missing fields' });

    const sents = splitSentences(description);
    let requirements = sents
      .filter(s => /\b(require|must|experience|proficien|skill|knowledge|responsibil)/i.test(s))
      .slice(0, 20);

    // Fallback to full description if no requirements found
    if (requirements.length === 0) requirements.push(description);

    const job = await Job.create({ title, description, requirements });

    res.json({
      _id: job._id,
      title: job.title,
      description: job.description,
      requirements: job.requirements
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/** Match candidates for a job */
router.post('/:id/match', async (req, res) => {
  try {
    const top_n = Math.min(50, parseInt(req.body.top_n || '5'));
    const job = await Job.findById(req.params.id).lean();
    if (!job) return res.status(404).json({ error: 'Job not found' });

    const resumes = await Resume.find().lean();
    if (!resumes.length) return res.json({ jobId: job._id, matches: [] });

    const matches = resumes.map(r => {
      const evidence = [];
      const missing = [];

      // Combine resume text and snippets
      const resumeText = ((r.text || '') + ' ' + ((r.snippets || []).join(' '))).toLowerCase();

      job.requirements.forEach(req => {
        const keywords = req.split(/\W+/).map(w => w.toLowerCase()).filter(Boolean);
        const matched = keywords.some(kw => resumeText.includes(kw));

        if (!matched) missing.push(req);
        else {
          const sents = (r.snippets || []).filter(s =>
            keywords.some(kw => s.toLowerCase().includes(kw))
          );
          evidence.push(...sents.slice(0, 2));
        }
      });

      const score = job.requirements.length
        ? (job.requirements.length - missing.length) / job.requirements.length
        : 0;

      return {
        resumeId: r._id,
        originalName: r.originalName,
        score,
        evidence: [...new Set(evidence)].slice(0, 5),
        missingRequirements: missing
      };
    });

    const sorted = matches.sort((a, b) => b.score - a.score).slice(0, top_n);
    res.json({ jobId: job._id, matches: sorted });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
