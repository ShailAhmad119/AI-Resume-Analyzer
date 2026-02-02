




































import React, { useEffect, useRef } from 'react';
import { Target, TrendingUp } from 'lucide-react';

const ScoreCard = ({ result }) => {
  const circleRef = useRef(null);

  useEffect(() => {
    if (circleRef.current) {
      const percentage = result.matchPercentage;
      const circumference = 2 * Math.PI * 45; // radius is 45
      const strokeDasharray = circumference;
      const strokeDashoffset = circumference - (percentage / 100) * circumference;

      circleRef.current.style.strokeDasharray = strokeDasharray;
      circleRef.current.style.strokeDashoffset = strokeDashoffset;
    }
  }, [result.matchPercentage]);

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="glassmorphism p-6">
      <h2 className="text-2xl font-semibold mb-6 text-white flex items-center">
        <Target className="h-6 w-6 mr-2" />
        Resume Score
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
        <div className="relative glow-border rounded-full p-4">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              ref={circleRef}
              cx="50"
              cy="50"
              r="45"
              stroke="#3b82f6"
              strokeWidth="8"
              fill="transparent"
              strokeLinecap="round"
              className={`transition-all duration-1000 ease-out ${getScoreBgColor(result.atsScore)}`}
              style={{ strokeDasharray: 0, strokeDashoffset: 283 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-3xl font-bold ${getScoreColor(result.atsScore)}`}>
                {result.atsScore}%
              </div>
              <div className="text-sm text-gray-300">ATS Score</div>
            </div>
          </div>
        </div>
        <div className="text-center md:text-left">
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-400" />
              <span className="text-lg font-semibold text-white">ATS Compatibility</span>
            </div>
            <div className="progress-container">
              <div
                className="progress-bar"
                style={{ width: `${result.atsScore}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-300 mt-1">
              {result.atsScore >= 80 ? 'Excellent' : result.atsScore >= 60 ? 'Good' : 'Needs Improvement'}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium text-green-400">Skills Identified</div>
              <div className="text-2xl font-bold text-green-400">{result.skills ? result.skills.length : 0}</div>
            </div>
            <div>
              <div className="font-medium text-red-400">Formatting Issues</div>
              <div className="text-2xl font-bold text-red-400">{result.formattingIssues ? result.formattingIssues.length : 0}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
