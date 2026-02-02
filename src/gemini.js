import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
});

export async function analyzeResume(resumeText) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `
You are an ATS (Applicant Tracking System).
Analyze this resume and provide:

- ATS Score (0–100)
- Key skills
- Weak points
- Missing sections
- Improvement suggestions

Resume:
${resumeText}
`,
  });

  return response.text;
}
