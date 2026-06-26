import { useState } from 'react';

type Workflow = {
  id: number;
  name: string;
  trigger: string;
  action: string;
  status: 'Active' | 'Paused';
  runs: number;
};

const initialWorkflows: Workflow[] = [
  { id: 1, name: 'Welcome Email Sequence', trigger: 'New signup', action: 'Send email series', status: 'Active', runs: 1284 },
  { id: 2, name: 'Lead Scoring', trigger: 'Form submitted', action: 'Update CRM score', status: 'Active', runs: 932 },
  { id: 3, name: 'Abandoned Cart', trigger: 'Cart inactive 1h', action: 'Send reminder SMS', status: 'Paused', runs: 451 },
  { id: 4, name: 'Support Triage', trigger: 'Ticket created', action: 'Auto-assign agent', status: 'Active', runs: 2087 },
];

const features = [
  { title: 'No-Code Builder', desc: 'Drag-and-drop visual editor to design workflows in minutes.', icon: '⚡' },
  { title: 'Smart Triggers', desc: 'Event, schedule, and condition-based triggers fire automatically.', icon: '🔔' },
  { title: 'AI Suggestions', desc: 'Machine learning recommends optimizations for each workflow.', icon: '🤖' },
  { title: '200+ Integrations', desc: 'Connect your favorite apps with native connectors.', icon: '🔗' },
];

export default function SmartAutomation() {
  const [workflows, setWorkflows] = useState<Workflow[]>(initialWorkflows);
  const [name, setName] = useState('');
  const [trigger, setTrigger] = useState('');
  const [action, setAction] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const resetForm = () => {
    setName('');
    setTrigger('');
    setAction('');
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !trigger.trim() || !action.trim()) return;
    if (editingId !== null) {
      setWorkflows((prev) =>
        prev.map((w) => (w.id === editingId ? { ...w, name, trigger, action } : w))
      );
    } else {
      setWorkflows((prev) => [
        ...prev,
        { id: Date.now(), name, trigger, action, status: 'Active', runs: 0 },
      ]);
    }
    resetForm();
  };

  const handleEdit = (w: Workflow) => {
    setEditingId(w.id);
    setName(w.name);
    setTrigger(w.trigger);
    setAction(w.action);
  };

  const handleDelete = (id: number) => {
    setWorkflows((prev) => prev.filter((w) => w.id !== id));
    if (editingId === id) resetForm();
  };

  const toggleStatus = (id: number) => {
    setWorkflows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, status: w.status === 'Active' ? 'Paused' : 'Active' } : w
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Smart Automation</h1>
        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
          Build intelligent workflows that run on autopilot. Connect triggers to actions and let
          AI handle the busywork so your team can focus on what matters.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {features.map((f) => (
          <div key={f.title} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="text-3xl mb-2">{f.icon}</div>
            <h3 className="font-semibold text-gray-900">{f.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{f.desc}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {editingId !== null ? 'Edit Workflow' : 'Create Workflow'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Workflow name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Onboarding Flow"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trigger</label>
                <input
                  type="text"
                  value={trigger}
                  onChange={(e) => setTrigger(e.target.value)}
                  placeholder="e.g. New signup"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Action</label>
                <input
                  type="text"
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                  placeholder="e.g. Send welcome email"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-indigo-700 transition"
                >
                  {editingId !== null ? 'Save Changes' : 'Add Workflow'}
                </button>
                {editingId !== null && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 rounded-lg border border-gray-300 text-sm text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Active Workflows</h2>
              <span className="text-sm text-gray-500">{workflows.length} total</span>
            </div>
            {workflows.length === 0 ? (
              <div className="p-10 text-center text-gray-500">
                No workflows yet. Create your first automation on the left.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-600 text-left">
                    <tr>
                      <th className="px-4 py-3 font-medium">Name</th>
                      <th className="px-4 py-3 font-medium">Trigger</th>
                      <th className="px-4 py-3 font-medium">Action</th>
                      <th className="px-4 py-3 font-medium">Runs</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium text-right">Manage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {workflows.map((w) => (
                      <tr key={w.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">{w.name}</td>
                        <td className="px-4 py-3 text-gray-600">{w.trigger}</td>
                        <td className="px-4 py-3 text-gray-600">{w.action}</td>
                        <td className="px-4 py-3 text-gray-600">{w.runs.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => toggleStatus(w.id)}
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              w.status === 'Active'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {w.status}
                          </button>
                        </td>
                        <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => handleEdit(w)}
                            className="text-indigo-600 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(w.id)}
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
