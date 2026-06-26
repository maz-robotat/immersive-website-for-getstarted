import { useState } from 'react';

type Project = {
  id: number;
  name: string;
  type: string;
  status: 'Planning' | 'In Progress' | 'Testing' | 'Deployed';
  progress: number;
  lead: string;
};

type Service = {
  title: string;
  description: string;
  icon: string;
};

const SERVICES: Service[] = [
  { title: 'Industrial Automation', description: 'Custom robotic arms and assembly-line automation for manufacturing efficiency.', icon: '\u2699\ufe0f' },
  { title: 'Autonomous Navigation', description: 'SLAM, path planning and obstacle avoidance for mobile robots and drones.', icon: '\ud83e\udded' },
  { title: 'Computer Vision', description: 'Object detection, pose estimation and quality inspection using deep learning.', icon: '\ud83d\udc41\ufe0f' },
  { title: 'ROS / ROS2 Integration', description: 'Full middleware stack design, node architecture and real-time control.', icon: '\ud83e\udd16' },
  { title: 'Embedded Firmware', description: 'Low-level motor control, sensor fusion and RTOS-based firmware development.', icon: '\ud83d\udcdf' },
  { title: 'Human-Robot Interaction', description: 'Voice, gesture and touch interfaces for collaborative robotics (cobots).', icon: '\ud83e\udd1d' },
];

const initialProjects: Project[] = [
  { id: 1, name: 'Warehouse AMR Fleet', type: 'Autonomous Navigation', status: 'In Progress', progress: 65, lead: 'A. Patel' },
  { id: 2, name: 'Pick & Place Cobot', type: 'Industrial Automation', status: 'Testing', progress: 82, lead: 'M. Chen' },
  { id: 3, name: 'Vineyard Inspection Drone', type: 'Computer Vision', status: 'Planning', progress: 20, lead: 'L. Rossi' },
  { id: 4, name: 'Surgical Assist Arm', type: 'ROS2 Integration', status: 'Deployed', progress: 100, lead: 'S. Kim' },
];

const STATUS_STYLES: Record<Project['status'], string> = {
  Planning: 'bg-gray-100 text-gray-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  Testing: 'bg-amber-100 text-amber-700',
  Deployed: 'bg-green-100 text-green-700',
};

export default function RoboticsDevelopment() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [name, setName] = useState('');
  const [type, setType] = useState(SERVICES[0].title);
  const [status, setStatus] = useState<Project['status']>('Planning');
  const [progress, setProgress] = useState(0);
  const [lead, setLead] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  function resetForm() {
    setName('');
    setType(SERVICES[0].title);
    setStatus('Planning');
    setProgress(0);
    setLead('');
    setEditingId(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !lead.trim()) return;
    if (editingId !== null) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editingId ? { ...p, name, type, status, progress, lead } : p
        )
      );
    } else {
      setProjects((prev) => [
        ...prev,
        { id: Date.now(), name, type, status, progress, lead },
      ]);
    }
    resetForm();
  }

  function handleEdit(p: Project) {
    setEditingId(p.id);
    setName(p.name);
    setType(p.type);
    setStatus(p.status);
    setProgress(p.progress);
    setLead(p.lead);
  }

  function handleDelete(id: number) {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    if (editingId === id) resetForm();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
      {/* Hero */}
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">Robotics Development</h1>
        <p className="max-w-2xl mx-auto text-slate-600">
          From concept to deployment, we design, build and integrate intelligent
          robotic systems. Our team delivers end-to-end automation, autonomous
          navigation and AI-driven perception for real-world environments.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium">ROS / ROS2</span>
          <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium">Computer Vision</span>
          <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium">Embedded Systems</span>
          <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium">AI &amp; ML</span>
        </div>
      </header>

      {/* Services grid */}
      <section>
        <h2 className="text-2xl font-semibold text-slate-900 mb-6">What We Build</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-3">{s.icon}</div>
              <h3 className="font-semibold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-600">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Project tracker */}
      <section className="grid gap-8 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              {editingId !== null ? 'Edit Project' : 'New Project Request'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Project Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Inspection Rover"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Service Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {SERVICES.map((s) => (
                    <option key={s.title} value={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Project['status'])}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option>Planning</option>
                  <option>In Progress</option>
                  <option>Testing</option>
                  <option>Deployed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Progress: {progress}%</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={progress}
                  onChange={(e) => setProgress(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Project Lead</label>
                <input
                  type="text"
                  value={lead}
                  onChange={(e) => setLead(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. J. Doe"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  {editingId !== null ? 'Update' : 'Add Project'}
                </button>
                {editingId !== null && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Table */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Active Projects ({projects.length})</h2>
            </div>
            {projects.length === 0 ? (
              <div className="p-10 text-center text-slate-500">No projects yet. Add one to get started.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-600 text-left">
                    <tr>
                      <th className="px-4 py-3 font-medium">Project</th>
                      <th className="px-4 py-3 font-medium">Type</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Progress</th>
                      <th className="px-4 py-3 font-medium">Lead</th>
                      <th className="px-4 py-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {projects.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-900">{p.name}</td>
                        <td className="px-4 py-3 text-slate-600">{p.type}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[p.status]}`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-20 rounded-full bg-slate-200 overflow-hidden">
                              <div className="h-full bg-indigo-600" style={{ width: `${p.progress}%` }} />
                            </div>
                            <span className="text-xs text-slate-500">{p.progress}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-600">{p.lead}</td>
                        <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => handleEdit(p)}
                            className="text-indigo-600 hover:text-indigo-800 font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="text-red-600 hover:text-red-800 font-medium"
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
