import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE_URL;

export const createCampaignSegment = async (rules) => {
  const res = await axios.post(`${API_BASE}/api/campaigns/create`, { rules });
  return res.data;
};

export const fetchCampaignHistory = async () => {
  const response = await axios.get(`${API_BASE}/api/campaigns/history`);
  return response.data;
};

export const parsePromptToRules = async (prompt) => {
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/openai/parse-prompt`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });

  return await res.json();
};

export const generateCampaignMessages = async (objective) => {
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/openai/generate-messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ objective })
  });

  return await res.json();
};
