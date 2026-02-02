import React, { useState } from 'react';
import { Link } from 'lucide-react';

const JobUrl = ({ onJobDescription }) => {
  const [jobUrl, setJobUrl] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState('');

  const extractJobDescription = async (html) => {
    // Create a temporary DOM element to parse HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Remove script and style elements
    doc.querySelectorAll('script, style').forEach(el => el.remove());

    // Try common selectors for job descriptions
    const selectors = [
      '[data-testid="job-description"]',
      '.job-description',
      '.jobsearch-jobDescriptionText',
      '.description',
      '.job-detail-description',
      '.posting-description',
      '#job-description',
      '.job-description-content',
      '.job-details',
      'article',
      'main'
    ];

    let jobText = '';

    for (const selector of selectors) {
      const element = doc.querySelector(selector);
      if (element) {
        jobText = element.textContent.trim();
        if (jobText.length > 200) { // Ensure we have substantial content
          break;
        }
      }
    }

    // Fallback: get all text content if no specific selector works
    if (!jobText || jobText.length < 200) {
      jobText = doc.body.textContent.trim();
    }

    // Clean up the text
    jobText = jobText
      .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
      .replace(/\n+/g, '\n') // Clean up line breaks
      .trim();

    if (jobText.length < 100) {
      throw new Error('Could not extract sufficient job description from the URL. Please try a different job posting URL.');
    }

    return jobText;
  };

  const handleFetchJob = async () => {
    if (!jobUrl.trim()) {
      setError('Please enter a job URL');
      return;
    }

    setIsFetching(true);
    setError('');

    try {
      // Use a CORS proxy for fetching job URLs
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(jobUrl)}`;

      const response = await fetch(proxyUrl);

      if (!response.ok) {
        throw new Error('Failed to fetch job posting. Please check the URL and try again.');
      }

      const data = await response.json();
      const html = data.contents;

      const jobDescription = await extractJobDescription(html);

      onJobDescription(jobDescription);
      setError('');
    } catch (err) {
      console.error('Error fetching job description:', err);
      setError(err.message || 'Failed to extract job description. Please try a different URL or paste the description manually.');
    } finally {
      setIsFetching(false);
    }
  };

  const handleUrlChange = (e) => {
    setJobUrl(e.target.value);
    setError('');
  };

  return (
    <div className="glassmorphism p-6">
      <h2 className="text-2xl font-semibold mb-4 text-white flex items-center">
        <Link className="h-6 w-6 mr-2" />
        Job Posting URL
      </h2>

      <div className="space-y-4">
        <div>
          <input
            type="url"
            value={jobUrl}
            onChange={handleUrlChange}
            placeholder="https://www.linkedin.com/jobs/... or https://www.indeed.com/..."
            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            disabled={isFetching}
          />
          <p className="text-xs text-white/60 mt-2">
            Paste the URL of the job posting (LinkedIn, Indeed, company careers page, etc.)
          </p>
        </div>

        <button
          onClick={handleFetchJob}
          disabled={isFetching || !jobUrl.trim()}
          className="glow-border w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isFetching ? 'Fetching Job Description...' : 'Fetch Job Description'}
        </button>

        {error && (
          <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobUrl;
