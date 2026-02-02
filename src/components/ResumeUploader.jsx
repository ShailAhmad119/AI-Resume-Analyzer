import React, { useState } from "react";
import { Upload, FileText } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

// Configure PDF.js worker correctly for Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const ResumeUploader = ({ onResumeText }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState("");

  // ----------- PDF TEXT EXTRACTION -----------
  const extractTextFromPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map(item => item.str).join(" ");
      fullText += pageText + "\n";
    }

    // Return whatever text exists (no length limit)
    return fullText.trim();
  };

  // ----------- DOCX TEXT EXTRACTION -----------
  const extractTextFromDOCX = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });

    return result.value?.trim() || "";
  };

  // ----------- FILE UPLOAD HANDLER -----------
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setFileName(file.name);

    try {
      let text = "";

      if (file.type === "application/pdf") {
        text = await extractTextFromPDF(file);
      } 
      else if (
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        text = await extractTextFromDOCX(file);
      } 
      else {
        alert("Please upload only PDF or DOCX files.");
        setIsUploading(false);
        return;
      }

      if (!text) {
        alert("This file does not contain readable text. If it's scanned, please upload a digital resume.");
        return;
      }

      // Send text to parent component
      onResumeText(text);

    } catch (error) {
      console.error("Resume parsing failed:", error);
      alert("Failed to read this resume file. Please try another one.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="glassmorphism glow-border p-6">
      <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
        <Upload className="h-6 w-6 mr-2" />
        Upload Resume
      </h2>

      <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center hover:border-cyan-400 transition">
        <FileText className="h-12 w-12 mx-auto mb-4 text-white/50" />

        <input
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileUpload}
          className="hidden"
          id="resume-upload"
          disabled={isUploading}
        />

        <label
          htmlFor="resume-upload"
          className="cursor-pointer text-cyan-300 hover:text-cyan-400 font-medium"
        >
          {isUploading ? "Processing..." : "Choose PDF or DOCX file"}
        </label>

        <p className="text-xs text-white/60 mt-2">
          Supported formats: PDF, DOCX
        </p>

        {fileName && (
          <p className="text-sm text-green-400 mt-2">
            Uploaded: {fileName}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResumeUploader;
