import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTypingResultSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Typing Results API
  app.post("/api/typing-results", async (req, res) => {
    try {
      const validatedData = insertTypingResultSchema.parse(req.body);
      const result = await storage.createTypingResult(validatedData);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/typing-results", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const results = await storage.getTypingResults(limit);
      res.json(results);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/typing-results/:language", async (req, res) => {
    try {
      const { language } = req.params;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const results = await storage.getTypingResultsByLanguage(language, limit);
      res.json(results);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // AI Endpoints (Stubs)
  app.post("/api/ai/predict-ligatures", async (req, res) => {
    try {
      const { text, language } = req.body;
      
      // Placeholder AI logic - returns sample ligature predictions
      const predictions = [
        { sequence: "क्ष", position: 5, confidence: 0.95 },
        { sequence: "त्र", position: 12, confidence: 0.89 },
        { sequence: "ज्ञ", position: 20, confidence: 0.92 },
      ];

      res.json({
        text,
        language,
        predictions,
        model: "ligature-predictor-v1",
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/ai/analyze-mistakes", async (req, res) => {
    try {
      const { errors, language, typingSpeed } = req.body;

      // Placeholder AI analysis
      const analysis = {
        commonPatterns: [
          {
            pattern: "Adjacent key errors",
            frequency: 45,
            suggestion: "Slow down on the home row keys",
          },
          {
            pattern: "Ligature formation errors",
            frequency: 30,
            suggestion: "Practice compound characters separately",
          },
          {
            pattern: "Timing errors",
            frequency: 25,
            suggestion: "Maintain consistent rhythm between keystrokes",
          },
        ],
        weakKeys: ["k", "l", "प", "ष"],
        recommendations: [
          "Focus on accuracy before speed",
          "Practice ligature combinations: क्ष, त्र, ज्ञ",
          "Use the typing drills for problematic key sequences",
        ],
        improvementScore: 7.5,
      };

      res.json({
        analysis,
        totalErrors: errors?.length || 0,
        language,
        model: "mistake-analyzer-v1",
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Language Configuration API
  app.get("/api/languages", async (req, res) => {
    try {
      const languages = [
        { code: "hi", name: "Hindi", native: "हिन्दी", script: "Devanagari" },
        { code: "mr", name: "Marathi", native: "मराठी", script: "Devanagari" },
        { code: "sa", name: "Sanskrit", native: "संस्कृत", script: "Devanagari" },
        { code: "bn", name: "Bengali", native: "বাংলা", script: "Bengali" },
        { code: "ta", name: "Tamil", native: "தமிழ்", script: "Tamil" },
        { code: "te", name: "Telugu", native: "తెలుగు", script: "Telugu" },
        { code: "kn", name: "Kannada", native: "ಕನ್ನಡ", script: "Kannada" },
        { code: "ml", name: "Malayalam", native: "മലയാളം", script: "Malayalam" },
        { code: "gu", name: "Gujarati", native: "ગુજરાતી", script: "Gujarati" },
        { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ", script: "Gurmukhi" },
        { code: "ur", name: "Urdu", native: "اردو", script: "Arabic" },
        { code: "ar", name: "Arabic", native: "العربية", script: "Arabic" },
        { code: "en", name: "English", native: "English", script: "Latin" },
        { code: "fr", name: "French", native: "Français", script: "Latin" },
        { code: "ru", name: "Russian", native: "Русский", script: "Cyrillic" },
        { code: "el", name: "Greek", native: "Ελληνικά", script: "Greek" },
        { code: "th", name: "Thai", native: "ไทย", script: "Thai" },
        { code: "ko", name: "Korean", native: "한국어", script: "Hangul" },
        { code: "zh", name: "Chinese", native: "中文", script: "Han" },
        { code: "ja", name: "Japanese", native: "日本語", script: "Mixed" },
      ];
      res.json(languages);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
