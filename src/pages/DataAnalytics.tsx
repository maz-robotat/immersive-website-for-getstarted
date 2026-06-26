import { useState } from 'react';

interface Report {
  id: number;
  name: string;
  dataset: string;
  metric: string;
  value: number;
  trend: 'up' | 'down' | 'flat';
  updated: string;
}

const INITIAL_REPORTS: Report[] = [
  { id: 1, name: 'Monthly Revenue', dataset: 'Sales', metric: 'Total Revenue', value: 128450, trend: 'up', updated: '2024-06-01' },
  { id: 2, name: 'Active Users', dataset: 'Product', metric: 'DAU', value: 8432, trend: 'up', updated: '2024-06-02' },
  { id: 3, name: 'Churn Rate', dataset: 'Retention', metric: 'Churn %', value: 3.2, trend: 'down', updated: '2024-06-02' },
  { id: 4, name: 'Avg Session', dataset: 'Product', metric: 'Minutes', value: 14.6, trend: 'flat', updated: '2024-06-03' },
  { id: 5, name: 'Conversion', dataset: 'Marketing', metric: 'Conv %', value: 2.8, trend: 'up', updated: '2024-06-03' },
];

const DATASETS = ['Sales', 'Product', 'Retention', 'Marketing', 'Support'];

export default function DataAnalytics() {
  const [reports, setReports] = useState<Report[]>(INITIAL_REPORTS);
  const [filter, setFilter] = useState<string>('All');
  const [form, setForm] = useState({ name: '', dataset: 'Sales', metric: '', value: '' });
  const [editId, setEditId] = useState<number | null>(null);

  const filtered = filter === 'All' ? reports : reports.filter((r) => r.dataset === filter);

  const totalValue = reports.reduce((s, r) => s + r.value, 0);
  const upCount = reports.filter((r) => r.trend === 'up').length;

  function resetForm() {
    setForm({ name: '', dataset: 'Sales', metric: '', value: '' });
    setEditId(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.metric.trim()) return;
    const numValue = parseFloat(form.value) || 0;
    if (editId !== null) {
      setReports((prev) =>
        prev.map((r) =>
          r.id === editId
            ? { ...r, name: form.name, dataset: form.dataset, metric: form.metric, value: numValue }
            : r
        )
      );
    } else {
      setReports((prev) => [
        ...prev,
        {
          id: Math.max(0, ...prev.map((p) => p.id)) + 1,
          name: form.name,
          dataset: form.dataset,
          metric: form.metric,
          value: numValue,
          trend: 'flat',
          updated: new Date().toISOString().slice(0, 10),
        },
      ]);
    }
    resetForm();
  }

  function handleEdit(r: Report) {
    setEditId(r.id);
    setForm({ name: r.name, dataset: r.dataset, metric: r.metric, value: String(r.value) });
  }

  function handleDelete(id: number) {
    setReports((prev) => prev.filter((r) => r.id !== id));
    if (editId === id) resetForm();
  }

  const trendBadge = (t: Report['trend']) => {
    const map = {
      up: 'bg-green-100 text-green-700',
      down: 'bg-red-100 text-red-700',
      flat: 'bg-gray-100 text-gray-600',
    } as const;
    const icon = { up: '\u2191', down: '\u2193', flat: '\u2192' };
    return (
      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${map[t]}`}>
        {icon[t]} {t}
      </span>
    );
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Data Analytics</h1>
        <p className="mt-2 text-gray-600">
          Track key metrics across datasets, build custom reports, and monitor trends in real time.
        </p>
      </header>

      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Reports</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{reports.length}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Trending Up</p>
          <p className="mt-1 text-2xl font-semibold text-green-600">{upCount}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Aggregate Value</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{totalValue.toLocaleString()}</p>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Filter:</span>
            {['All', ...DATASETS].map((d) => (
              <button
                key={d}
                onClick={() => setFilter(d)}
                className={`rounded-full px-3 py-1 text-sm transition ${
                  filter === d
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Report</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Dataset</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Metric</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-600">Value</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Trend</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-gray-400">
                      No reports for this filter.
                    </td>
                  </tr>
                ) : (
                  filtered.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{r.name}</td>
                      <td className="px-4 py-3 text-gray-600">{r.dataset}</td>
                      <td className="px-4 py-3 text-gray-600">{r.metric}</td>
                      <td className="px-4 py-3 text-right text-gray-900">{r.value.toLocaleString()}</td>
                      <td className="px-4 py-3">{trendBadge(r.trend)}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleEdit(r)}
                          className="mr-3 text-indigo-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(r.id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              {editId !== null ? 'Edit Report' : 'New Report'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Report Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="e.g. Weekly Signups"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Dataset</label>
                <select
                  value={form.dataset}
                  onChange={(e) => setForm({ ...form, dataset: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  {DATASETS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Metric</label>
                <input
                  type="text"
                  value={form.metric}
                  onChange={(e) => setForm({ ...form, metric: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="e.g. Count"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Value</label>
                <input
                  type="number"
                  value={form.value}
                  onChange={(e) => setForm({ ...form, value: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="0"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  {editId !== null ? 'Update' : 'Add Report'}
                </button>
                {editId !== null && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
