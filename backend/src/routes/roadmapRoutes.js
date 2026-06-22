const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const authMiddleware = require("../middleware/authMiddleware");
const Roadmap = require("../models/Roadmap");

const router = express.Router();

console.log("GEMINI KEY EXISTS:", !!process.env.GEMINI_API_KEY);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ==========================================
// 1. GENERATE ROADMAP ROUTE
// ==========================================
router.post("/generate", authMiddleware, async (req, res) => {
  try {
    const { goal, level, duration } = req.body;

    // 🌟 FLASH MODEL WAPAS: Isme quota error nahi aayega, limit bohot high hai
   // 🌟 Stable SDK production name mapping
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", 
  generationConfig: {
    responseMimeType: "application/json",
    maxOutputTokens: 8192 
  }
});

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
If Duration = "1 Month" -> 1 phase.
If Duration = "3 Months" -> 3 phases (months: 1,2,3).
If Duration = "6 Months" -> 6 phases (months: 1,2,3,4,5,6).
If Duration = "12 Months" -> 12 phases (months: 1 to 12).
Progress must increase month by month and last phase must be 100.

CRITICAL OPTIMIZATION FOR SIZE:
Keep explanations and overview very brief. Keep topic names extremely short and punchy (max 3-5 words per topic). This ensures the full JSON fits perfectly within token limits without breaking or getting cut off.
Add 3-5 high-quality entries for youtube, projects, interview prep, and checklist.
`;

    const result = await model.generateContent(prompt);
    let roadmapText = result.response.text().trim();

    // Cleaning fallbacks if any markdown formatting leaks in
    roadmapText = roadmapText
      .replace(/^```json\s*/i, "")
      .replace(/```\s*$/, "")
      .trim();

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

    // Convert the parsed object back into a string to satisfy Mongoose Schema requirement
    const stringifiedData = JSON.stringify(parsedRoadmapData);

    const savedRoadmap = await Roadmap.create({
      user: req.user.id,
      goal,
      level,
      duration,
      roadmapText: stringifiedData
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