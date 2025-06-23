import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createCampaignSegment,
  parsePromptToRules,
  generateCampaignMessages
} from '../api/api';

const fields = [
  { label: 'Total Spend', value: 'spend' },
  { label: 'Visits', value: 'visits' },
  { label: 'Inactive Days', value: 'inactiveDays' }
];

const operators = [
  { label: '>', value: '>' },
  { label: '<', value: '<' },
  { label: '=', value: '=' }
];

const logicalOperators = ['AND', 'OR'];

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [rules, setRules] = useState([
    { field: '', operator: '', value: '', logic: 'AND' }
  ]);

  const [messages, setMessages] = useState([]);
  const [previewCount, setPreviewCount] = useState(null);
  const [matchedCustomers, setMatchedCustomers] = useState([]);
  const [campaignId, setCampaignId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [objective, setObjective] = useState('');

  const handleRuleChange = (index, field, value) => {
    const updated = [...rules];
    updated[index][field] = value;
    setRules(updated);
  };

  const addRule = () => {
    setRules([...rules, { field: '', operator: '', value: '', logic: 'AND' }]);
  };

  const removeRule = (index) => {
    const updated = [...rules];
    updated.splice(index, 1);
    setRules(updated);
  };

  const previewAudience = async () => {
    try {
      setLoading(true);
      const response = await createCampaignSegment(rules);
      setPreviewCount(response.count);
      setMatchedCustomers(response.customers);
      setCampaignId(response.campaignId);
      setLoading(false);
    } catch (err) {
      console.error('Preview error:', err);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!campaignId) {
      alert('Please preview the audience first.');
      return;
    }
    alert('🎉 Campaign saved and messages are being delivered!');
    navigate('/history');
  };

  const handlePromptToRule = async (e) => {
    if (e) e.preventDefault();
    const trimmed = prompt.trim();
    if (!trimmed) return;
    try {
      // Use REST API for deployed backend
      const response = await fetch('https://xeno-crm-backend-production.up.railway.app/api/openai/parse-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: trimmed })
      });
      const result = await response.json();
      if (result.rules) {
        setRules(result.rules);
        setPrompt('');
      } else {
        alert('Failed to parse prompt.');
      }
    } catch (err) {
      alert('Failed to connect to backend.');
    }
  };

  const handleObjectiveEnter = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = objective.trim();
      if (!trimmed) return;
      const res = await generateCampaignMessages(trimmed);
      if (res.messages) setMessages(res.messages);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">
      <div className="bg-white bg-opacity-10 rounded-xl shadow-2xl p-10 w-full max-w-2xl backdrop-blur-md border border-white/20">
        <h2 className="text-3xl font-bold mb-4 text-yellow-400 drop-shadow-lg">
          Create Audience Segment
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-yellow-300">
              🎙 Prompt to Rule
            </h3>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. Customers inactive for 3 months and spent over 5k"
                className="w-full p-3 rounded-lg bg-white/20 text-gray-900 placeholder-gray-700 border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="button"
                onClick={handlePromptToRule}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Fill Rule
              </button>
            </div>
            {rules.map((rule, index) => (
              <div key={index} className="flex gap-2 items-center mb-3">
                {index !== 0 && (
                  <select
                    value={rule.logic}
                    onChange={(e) =>
                      handleRuleChange(index, 'logic', e.target.value)
                    }
                    className="rounded-lg bg-white/20 text-black border border-indigo-400 px-2 py-1"
                  >
                    {logicalOperators.map((op) => (
                      <option key={op} value={op}>
                        {op}
                      </option>
                    ))}
                  </select>
                )}
                <select
                  value={rule.field}
                  onChange={(e) =>
                    handleRuleChange(index, 'field', e.target.value)
                  }
                  className="rounded-lg bg-white/20 text-gray-900 border border-indigo-700 px-2 py-1"
                >
                  <option value="">Select Field</option>
                  {fields.map((f) => (
                    <option key={f.value} value={f.value}>
                      {f.label}
                    </option>
                  ))}
                </select>
                <select
                  value={rule.operator}
                  onChange={(e) => handleRuleChange(index, 'operator', e.target.value)}
                  className="rounded-lg bg-white/20 text-gray-900 border border-indigo-700 px-2 py-1"
                >
                  <option value="">Op</option>
                  {operators.map((op) => (
                    <option key={op.value} value={op.value}>
                      {op.label}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={rule.value}
                  onChange={(e) =>
                    handleRuleChange(index, 'value', e.target.value)
                  }
                  placeholder="Value"
                  className="rounded-lg bg-white/20 text-gray-900 placeholder-gray-700 border border-indigo-700 px-2 py-1"
                />
                <button
                  type="button"
                  onClick={() => removeRule(index)}
                  className="ml-2 text-red-400 hover:text-red-600"
                >
                  ❌
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addRule}
              className="bg-indigo-600 hover:bg-indigo-700 text-blue px-4 py-2 rounded-lg mt-2"
            >
              + Add Rule
            </button>
          </div>
          <button
            type="button"
            onClick={previewAudience}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold"
          >
            {loading ? 'Previewing...' : 'Preview Audience'}
          </button>
          {previewCount !== null && matchedCustomers.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-blue-700 mb-2">
                🎯 Matched Customers: <span className="text-blue-900">{previewCount}</span>
              </h4>
              <ul className="divide-y divide-blue-200 bg-white rounded-lg shadow max-w-lg mx-auto overflow-hidden">
                {matchedCustomers.slice(0, 10).map((cust, idx) => (
                  <li
                    key={idx}
                    className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center px-4 py-2 text-black hover:bg-blue-50 transition-colors"
                  >
                    <span className="font-medium text-blue-900">{cust.name}</span>
                    <span className="text-blue-700 text-sm">{cust.email}</span>
                  </li>
                ))}
                {matchedCustomers.length > 10 && (
                  <li className="text-center text-xs text-blue-400 py-1">...and {matchedCustomers.length - 10} more</li>
                )}
              </ul>
            </div>
          )}
          <hr className="border-indigo-400/30 my-8" />
          <div>
            <h3 className="text-xl font-semibold mb-2 text-yellow-300">
              🧠 AI Campaign Message Suggestions
            </h3>
            <input
              type="text"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              onKeyDown={handleObjectiveEnter}
              placeholder="e.g. Re-engage inactive users"
              className="w-full p-3 rounded-lg bg-white/20 text-gray-900 placeholder-gray-700 border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-4"
            />
            <ul className="space-y-2">
              {messages.map((msg, idx) => (
                <li
                  key={idx}
                  className="bg-white/20 rounded-lg px-4 py-2 text-white/90"
                >
                  📢 {msg}
                </li>
              ))}
            </ul>
          </div>
          <button
            type="submit"
            disabled={previewCount === null}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save & Send Campaign
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaign;
