import React, { useState } from "react";
import ResumeUploader from "./components/ResumeUploader";
import { analyzeResume } from "./gemini";

function App() {
  const [resumeText, setResumeText] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!resumeText) {
      alert("Please upload a resume first.");
      return;
    }

    setIsAnalyzing(true);

    try {
      const resultText = await analyzeResume(resumeText);

      // Show raw Gemini output for now
      setAnalysisResult(resultText);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      alert("Failed to analyze resume.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 glow-border rounded-2xl p-4">
            Resume Analyzer AI
          </h1>
          <p className="text-lg text-gray-300">
            Upload your resume for instant ATS analysis
          </p>
        </header>

        <div className="mb-8">
          <ResumeUploader onResumeText={setResumeText} />
        </div>

        <div className="text-center mb-8">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition disabled:opacity-50"
          >
            {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>

        {analysisResult && (
          <div className="p-6 text-white whitespace-pre-wrap bg-black/40 rounded-xl">
            {analysisResult}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
