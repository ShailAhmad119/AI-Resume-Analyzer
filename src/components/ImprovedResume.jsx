import React from 'react';
import { FileText } from 'lucide-react';

const ImprovedResume = ({ result }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 backdrop-blur-sm bg-opacity-80">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
        <FileText className="h-6 w-6 mr-2" />
        Improved Resume
      </h2>
      <div className="bg-gray-50 p-4 rounded-lg">
        <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
          {result.improvedResume}
        </pre>
      </div>
      <div className="mt-4 text-center">
        <button
          onClick={() => navigator.clipboard.writeText(result.improvedResume)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
};

export default ImprovedResume;
