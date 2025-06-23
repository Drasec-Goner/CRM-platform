import React, { useEffect, useState } from 'react';
import { fetchCampaignHistory } from '../api/api';

const CampaignHistory = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchCampaignHistory();
        setCampaigns(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch campaign history');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">
      <div className="bg-white bg-opacity-10 rounded-xl shadow-2xl p-10 w-full max-w-xl backdrop-blur-md border border-white/20">
        <h2 className="text-3xl font-bold mb-4 text-indigo-200 drop-shadow-lg">Campaign History</h2>
        {loading && <p className="text-indigo-100">Loading...</p>}
        {error && <p className="text-red-400">{error}</p>}
        {!loading && !error && campaigns.length === 0 && (
          <p className="text-lg text-indigo-100">No campaigns found.</p>
        )}
        {!loading && !error && campaigns.length > 0 && (
          <ul className="space-y-4">
            {campaigns.map((c) => (
              <li key={c.id} className="bg-white/20 rounded-lg px-4 py-3 text-white/90">
                <div className="font-semibold text-yellow-300">{c.name}</div>
                <div className="text-sm text-indigo-100">Created: {new Date(c.createdAt).toLocaleString()}</div>
                <div className="text-sm">Audience: {c.audienceSize}</div>
                <div className="text-sm">Sent: <span className="text-green-300">{c.sent}</span> | Failed: <span className="text-red-300">{c.failed}</span></div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CampaignHistory;
