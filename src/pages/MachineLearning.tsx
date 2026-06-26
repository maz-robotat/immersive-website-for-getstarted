import { useState } from 'react';

type Solution = {
  id: number;
  name: string;
  category: string;
  description: string;
  status: 'Available' | 'Beta' | 'Coming Soon';
};

const initialSolutions: Solution[] = [
  { id: 1, name: 'Predictive Analytics', category: 'Forecasting', description: 'Forecast demand, churn, and revenue using historical data.', status: 'Available' },
  { id: 2, name: 'Computer Vision', category: 'Imaging', description: 'Object detection, OCR, and image classification at scale.', status: 'Available' },
  { id: 3, name: 'NLP Engine', category: 'Language', description: 'Sentiment analysis, summarization, and entity extraction.', status: 'Beta' },
  { id: 4, name: 'Recommendation System', category: 'Personalization', description: 'Drive engagement with tailored product recommendations.', status: 'Available' },
  { id: 5, name: 'Anomaly Detection', category: 'Security', description: 'Detect fraud and outliers in real-time data streams.', status: 'Coming Soon' },
];

const emptyForm = { name: '', category: 'Forecasting', description: '', status: 'Available' as Solution['status'] };

export default function MachineLearning() {
  const [solutions, setSolutions] = useState<Solution[]>(initialSolutions);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [estimate, setEstimate] = useState<number | null>(null);
  const [dataVolume, setDataVolume] = useState(100);
  const [complexity, setComplexity] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    if (editingId !== null) {
      setSolutions((prev) => prev.map((s) => (s.id === editingId ? { ...s, ...form } : s)));
      setEditingId(null);
    } else {
      setSolutions((prev) => [...prev, { id: Date.now(), ...form }]);
    }
    setForm(emptyForm);
  };

  const handleEdit = (s: Solution) => {
    setEditingId(s.id);
    setForm({ name: s.name, category: s.category, description: s.description, status: s.status });
  };

  const handleDelete = (id: number) => {
    setSolutions((prev) => prev.filter((s) => s.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setForm(emptyForm);
    }
  };

  const statusColor = (status: Solution['status']) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-700';
      case 'Beta':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const calculateEstimate = () => {
    const base = 5000;
    const cost = base + dataVolume * 12 + complexity * 3500;
    setEstimate(cost);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Machine Learning Solutions</h1>
        <p className="mt-2 text-gray-600 max-w-2xl">
          Production-ready machine learning capabilities to transform your data into intelligent,
          automated decisions. Explore our catalog, manage your solution roadmap, and estimate project costs.
        </p>
      </header>

      <section className="grid gap-6 sm:grid-cols-3 mb-12">
        {[
          { label: 'Models Deployed', value: '120+' },
          { label: 'Avg. Accuracy', value: '94.6%' },
          { label: 'Inference Latency', value: '< 40ms' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-2xl font-bold text-indigo-600">{stat.value}</div>
            <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Solution Catalog</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Name</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Category</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Description</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Status</th>
                <th className="px-4 py-3 text-right font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {solutions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                    No solutions yet. Add one below.
                  </td>
                </tr>
              ) : (
                solutions.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{s.name}</td>
                    <td className="px-4 py-3 text-gray-600">{s.category}</td>
                    <td className="px-4 py-3 text-gray-600 max-w-xs">{s.description}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${statusColor(s.status)}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button onClick={() => handleEdit(s)} className="text-indigo-600 hover:underline">Edit</button>
                      <button onClick={() => handleDelete(s.id)} className="text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {editingId !== null ? 'Edit Solution' : 'Add Solution'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                placeholder="e.g. Time Series Forecasting"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
              >
                {['Forecasting', 'Imaging', 'Language', 'Personalization', 'Security'].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                rows={3}
                placeholder="Brief description of the solution"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as Solution['status'] })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
              >
                {['Available', 'Beta', 'Coming Soon'].map((st) => (
                  <option key={st}>{st}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700">
                {editingId !== null ? 'Update' : 'Add'} Solution
              </button>
              {editingId !== null && (
                <button
                  type="button"
                  onClick={() => { setEditingId(null); setForm(emptyForm); }}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Cost Estimator</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data Volume (GB): <span className="font-bold text-indigo-600">{dataVolume}</span>
              </label>
              <input
                type="range"
                min={10}
                max={1000}
                step={10}
                value={dataVolume}
                onChange={(e) => setDataVolume(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Model Complexity</label>
              <select
                value={complexity}
                onChange={(e) => setComplexity(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
              >
                <option value={1}>Basic (linear / tree models)</option>
                <option value={2}>Standard (ensemble / NLP)</option>
                <option value={3}>Advanced (deep learning)</option>
              </select>
            </div>
            <button onClick={calculateEstimate} className="rounded-lg bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700">
              Calculate Estimate
            </button>
            {estimate !== null && (
              <div className="rounded-lg bg-indigo-50 p-4">
                <div className="text-sm text-gray-600">Estimated Project Cost</div>
                <div className="text-3xl font-bold text-indigo-700">${estimate.toLocaleString()}</div>
                <p className="mt-1 text-xs text-gray-500">Indicative estimate. Contact us for a detailed quote.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
