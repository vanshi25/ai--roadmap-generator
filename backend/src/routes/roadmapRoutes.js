const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const authMiddleware = require("../middleware/authMiddleware");
const Roadmap = require("../models/Roadmap");

const router = express.Router();
console.log("GEMINI KEY EXISTS:", !!process.env.GEMINI_API_KEY);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate Roadmap
router.post("/generate", authMiddleware, async (req, res) => {
  try {
    const { goal, level, duration } = req.body;

    const model = genAI.getGenerativeModel({
      model: "Gemini 3.1 Flash Lite"
    });

    const prompt = `
You are an expert career mentor and roadmap planner.
Create a professional roadmap in VALID JSON ONLY.
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
Return ONLY valid JSON.
No markdown.
No code blocks.
No explanation text.

IMPORTANT:
If Duration = "1 Month"
→ Return EXACTLY 1 phase.
If Duration = "3 Months"
→ Return EXACTLY 3 phases.
→ month values must be 1,2,3
If Duration = "6 Months"
→ Return EXACTLY 6 phases.
→ month values must be 1,2,3,4,5,6
If Duration = "12 Months"
→ Return EXACTLY 12 phases.
→ month values must be 1 to 12
Never repeat month numbers.
Every phase title must be unique.
Every phase must contain 6-8 topics.
Every phase must contain a project.
Progress must increase month by month.
Last phase progress must be 100.
Add 5 YouTube channels with valid URLs.
Add 5 portfolio projects.
Add 10 interview preparation points.
Add 10 job-ready checklist points.
Keep topic names short.
Make roadmap suitable for timeline cards UI.
`;

    const result = await model.generateContent(prompt);
    let roadmapText = result.response.text();

    // Cleaning formatting backticks blocks if Gemini mistakenly adds them
    roadmapText = roadmapText
      .replace(/^```json\s*/i, "")
      .replace(/```\s*$/, "")
      .trim();

    // 🌟 FIX 1: Convert raw text string into a clean Javascript/JSON Object
    let parsedRoadmapData;
    try {
      parsedRoadmapData = JSON.parse(roadmapText);
    } catch (parseError) {
      console.error("JSON Parsing Error from Gemini Response:", roadmapText);
      return res.status(500).json({
        success: false,
        message: "Failed to parse AI response into structural layout. Please try again.",
      });
    }

    // 🌟 FIX 2: Save the structural JSON data directly to the database
    // Make sure in your Roadmap Mongoose Schema, the field type is Object/Mixed (or you can pass stringified if needed, but structured object is best)
   const roadmap = await Roadmap.create({
  user: req.user.id,
  goal,
  level,
  duration,
  roadmapText: JSON.stringify(parsedRoadmapData),
});

res.status(201).json({
  success: true,
  roadmap: parsedRoadmapData,
});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get User Roadmaps
router.get("/my-roadmaps", authMiddleware, async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      roadmaps,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;