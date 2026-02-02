# Resume Analyzer AI

A modern, AI-powered resume analyzer web application built with React, Tailwind CSS, and Google Gemini API.

## Features

- Upload PDF or DOCX resumes
- Paste job descriptions for analysis
- AI-powered resume-job matching
- Skill gap analysis
- Resume improvement suggestions
- ATS-friendly resume optimization

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Get a Google Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
4. Create a `.env` file in the root directory and add your API key:
   ```
   VITE_GOOGLE_API_KEY=your_api_key_here
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:5173](http://localhost:5173) in your browser

## Build for Production

```bash
npm run build
```

## Technologies Used

- React 18
- Tailwind CSS
- Google Gemini API
- PDF.js for PDF parsing
- Mammoth.js for DOCX parsing
- Lucide React for icons

## Project Structure

```
src/
├── components/
│   ├── ResumeUploader.jsx
│   ├── JobDescription.jsx
│   ├── ScoreCard.jsx
│   ├── SkillMatch.jsx
│   ├── Suggestions.jsx
│   └── ImprovedResume.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Usage

1. Upload your resume (PDF or DOCX)
2. Paste the job description
3. Click "Analyze Resume" to get AI-powered feedback
4. Optionally, click "Improve My Resume" for an optimized version

## License

MIT License
