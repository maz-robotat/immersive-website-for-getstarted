import { useState } from 'react';

interface Project {
  id: number;
  name: string;
  client: string;
  status: 'Active' | 'Completed' | 'On Hold';
  budget: number;
}

const initialProjects: Project[] = [
  { id: 1, name: 'Website Redesign', client: 'Acme Corp', status: 'Active', budget: 12000 },
  { id: 2, name: 'Mobile App', client: 'Globex', status: 'On Hold', budget: 45000 },
  { id: 3, name: 'Brand Identity', client: 'Initech', status: 'Completed', budget: 8000 },
  { id: 4, name: 'API Integration', client: 'Umbrella', status: 'Active', budget: 22000 },
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [name, setName] = useState('');
  const [client, setClient] = useState('');
  const [budget, setBudget] = useState('');

  const addProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !client.trim()) return;
    setProjects((p) => [
      ...p,
      { id: Date.now(), name, client, status: 'Active', budget: Number(budget) || 0 },
    ]);
    setName('');
    setClient('');
    setBudget('');
  };

  const removeProject = (id: number) =>
    setProjects((p) => p.filter((x) => x.id !== id));

  const statusColor = (s: Project['status']) =>
    s === 'Active'
      ? 'bg-green-100 text-green-700'
      : s === 'Completed'
      ? 'bg-gray-100 text-gray-700'
      : 'bg-yellow-100 text-yellow-700';

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>

      <form onSubmit={addProject} className="bg-white shadow rounded-lg p-4 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Project name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Client</label>
          <input value={client} onChange={(e) => setClient(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Client name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Budget</label>
          <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="0" />
        </div>
        <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700">Add Project</button>
      </form>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="px-4 py-3">Project</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Budget</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-400">No projects yet.</td>
              </tr>
            ) : (
              projects.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3">{p.client}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${statusColor(p.status)}`}>{p.status}</span>
                  </td>
                  <td className="px-4 py-3">${p.budget.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => removeProject(p.id)} className="text-red-600 hover:underline text-sm">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
