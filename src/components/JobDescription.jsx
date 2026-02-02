import React from 'react';
import { Briefcase } from 'lucide-react';

const JobDescription = ({ onJobDescription }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 backdrop-blur-sm bg-opacity-80">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
        <Briefcase className="h-6 w-6 mr-2" />
        Job Description
      </h2>
      <textarea
        className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        placeholder="Paste the job description here..."
        onChange={(e) => onJobDescription(e.target.value)}
      />
      <p className="text-xs text-gray-500 mt-2">
        Paste the full job description to get accurate analysis.
      </p>
    </div>
  );
};

export default JobDescription;
