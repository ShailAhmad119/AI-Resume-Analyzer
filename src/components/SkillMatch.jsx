import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const SkillMatch = ({ result }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 backdrop-blur-sm bg-opacity-80">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Resume Analysis</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-3 text-green-600 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            Skills Identified
          </h3>
          <ul className="space-y-2">
            {result.skills && result.skills.map((skill, index) => (
              <li key={index} className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
                <span className="text-sm font-medium">{skill}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-3 text-red-600 flex items-center">
            <XCircle className="h-5 w-5 mr-2" />
            Formatting Issues
          </h3>
          <ul className="space-y-2">
            {result.formattingIssues && result.formattingIssues.map((issue, index) => (
              <li key={index} className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <span className="text-sm font-medium">{issue}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SkillMatch;
