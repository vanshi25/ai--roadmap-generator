const express = require("express");
const { OpenAI } = require("openai"); // 🌟 Changed from groq-sdk to openai
const authMiddleware = require("../middleware/authMiddleware");
const Roadmap = require("../models/Roadmap");

const router = express.Router();

// 🌟 OpenRouter Perfect Configuration using OpenAI SDK
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1", // No path crashing now!
});

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

    // 🌟 OpenRouter Llama 3.1 Call
    const response = await openai.chat.completions.create({
      model: "meta-llama/llama-3.1-8b-instruct:free", 
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }, 
      temperature: 0.2,
    });

    let roadmapText = response.choices[0].message.content.trim();

    let parsedRoadmapData;
    try {
      parsedRoadmapData = JSON.parse(roadmapText);
    } catch (parseError) {
      console.error("JSON Parsing Error from OpenRouter Response:", roadmapText);
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