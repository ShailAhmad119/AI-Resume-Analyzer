import React from 'react';
import { Lightbulb } from 'lucide-react';

const Suggestions = ({ result }) => {
  return (
    <div className="glassmorphism p-6">
      <h2 className="text-2xl font-semibold mb-4 text-white">Suggestions for Improvement</h2>
      <ul className="space-y-3">
        {result.suggestions.map((suggestion, index) => (
          <li key={index} className="flex items-start">
            <Lightbulb className="h-5 w-5 mr-3 text-yellow-400 flex-shrink-0 mt-0.5" />
            <span className="text-gray-200">{suggestion}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Suggestions;
