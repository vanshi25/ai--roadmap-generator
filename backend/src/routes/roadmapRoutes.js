const express = require("express");
const Groq = require("groq-sdk");
const authMiddleware = require("../middleware/authMiddleware");
const Roadmap = require("../models/Roadmap");

const router = express.Router();

// Groq SDK Initialize
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ==========================================
// 1. GENERATE ROADMAP ROUTE
// ==========================================
router.post("/generate", authMiddleware, async (req, res) => {
  try {
    const { goal, level, duration } = req.body;

    const prompt = `
You are an expert career mentor and roadmap planner.
Create a highly professional roadmap in VALID JSON ONLY.
Goal: ${goal}
Level: ${level}
Duration: ${duration}

Return ONLY this JSON structure:
{
  "roadmapTitle": "",
  "duration": "",
  "difficulty": "",
  "overview": "",
  "totalTopics": 0,
  "estimatedHours": 0,
  "skillsToLearnFirst": [],
  "phases": [
    {
      "month": 1,
      "title": "",
      "topics": [],
      "project": "",
      "progress": 0
    }
  ],
  "youtubeResources": [
    {
      "channel": "",
      "url": ""
    }
  ],
  "projects": [],
  "interviewPrep": [],
  "jobReadyChecklist": []
}

Rules:
Return ONLY valid raw JSON text. No markdown wraps, no backticks.
Progress must increase month by month and last phase must be 100.
Keep explanations very brief.
`;

    // Groq API Call - Super fast & structural JSON mode
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama3-8b-8192", 
      response_format: { type: "json_object" }, 
      temperature: 0.2,
    });

    let roadmapText = chatCompletion.choices[0].message.content.trim();

    let parsedRoadmapData;
    try {
      parsedRoadmapData = JSON.parse(roadmapText);
    } catch (parseError) {
      console.error("JSON Parsing Error from Groq Response:", roadmapText);
      return res.status(500).json({
        success: false,
        message: "Failed to parse AI response into structural layout.",
      });
    }

    // Save to Database
    const savedRoadmap = await Roadmap.create({
      user: req.user.id,
      goal,
      level,
      duration,
      roadmapText: JSON.stringify(parsedRoadmapData)
    });

    res.status(201).json({
      success: true,
      roadmap: parsedRoadmapData,
    });

  } catch (error) {
    console.error("GENERATION HANDLER CRASH:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ==========================================
// 2. GET USER ROADMAPS ROUTE
// ==========================================
router.get("/my-roadmaps", authMiddleware, async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({ success: true, roadmaps });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;