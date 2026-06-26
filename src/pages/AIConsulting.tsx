import { useState } from 'react';

type Service = {
  id: number;
  title: string;
  description: string;
  duration: string;
  price: string;
};

type Inquiry = {
  id: number;
  name: string;
  email: string;
  service: string;
  message: string;
};

const SERVICES: Service[] = [
  { id: 1, title: 'AI Strategy Workshop', description: 'Define a roadmap to integrate AI into your business operations.', duration: '2 weeks', price: '$5,000' },
  { id: 2, title: 'LLM Integration', description: 'Embed large language models into your products and workflows.', duration: '4 weeks', price: '$12,000' },
  { id: 3, title: 'Data Pipeline Audit', description: 'Assess and optimize your data infrastructure for ML readiness.', duration: '3 weeks', price: '$8,000' },
  { id: 4, title: 'Custom Model Training', description: 'Train and deploy bespoke models tailored to your domain.', duration: '6 weeks', price: '$20,000' },
];

export default function AIConsulting() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([
    { id: 1, name: 'Acme Corp', email: 'cto@acme.com', service: 'AI Strategy Workshop', message: 'Looking to modernize our support stack.' },
  ]);
  const [form, setForm] = useState({ name: '', email: '', service: SERVICES[0].title, message: '' });
  const [editId, setEditId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    if (editId !== null) {
      setInquiries((prev) => prev.map((i) => (i.id === editId ? { ...i, ...form } : i)));
      setEditId(null);
    } else {
      setInquiries((prev) => [...prev, { id: Date.now(), ...form }]);
    }
    setForm({ name: '', email: '', service: SERVICES[0].title, message: '' });
  };

  const handleEdit = (inq: Inquiry) => {
    setEditId(inq.id);
    setForm({ name: inq.name, email: inq.email, service: inq.service, message: inq.message });
  };

  const handleDelete = (id: number) => {
    setInquiries((prev) => prev.filter((i) => i.id !== id));
    if (editId === id) {
      setEditId(null);
      setForm({ name: '', email: '', service: SERVICES[0].title, message: '' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">AI Consulting</h1>
        <p className="mt-3 text-lg text-gray-600 max-w-2xl">
          We help organizations adopt artificial intelligence responsibly and effectively —
          from strategy through deployment. Explore our offerings and request a consultation below.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Services</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setSelectedService(s);
                setForm((f) => ({ ...f, service: s.title }));
              }}
              className={`text-left rounded-xl border p-5 transition shadow-sm hover:shadow-md ${
                selectedService?.id === s.id ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200 bg-white'
              }`}
            >
              <h3 className="font-semibold text-gray-900">{s.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{s.description}</p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-gray-500">{s.duration}</span>
                <span className="font-semibold text-indigo-600">{s.price}</span>
              </div>
            </button>
          ))}
        </div>
        {selectedService && (
          <div className="mt-5 rounded-lg bg-indigo-50 border border-indigo-100 p-4 text-sm text-indigo-800">
            Selected: <strong>{selectedService.title}</strong> — {selectedService.duration} · {selectedService.price}
          </div>
        )}
      </section>

      <section className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {editId !== null ? 'Edit Inquiry' : 'Request a Consultation'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company / Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-300 outline-none"
                placeholder="Acme Corp"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-300 outline-none"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-300 outline-none"
              >
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.title}>{s.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={3}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-300 outline-none"
                placeholder="Tell us about your project..."
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="rounded-md bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700">
                {editId !== null ? 'Update' : 'Submit Inquiry'}
              </button>
              {editId !== null && (
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null);
                    setForm({ name: '', email: '', service: SERVICES[0].title, message: '' });
                  }}
                  className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Submitted Inquiries</h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Name</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Service</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Email</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inquiries.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-gray-400">No inquiries yet.</td>
                  </tr>
                ) : (
                  inquiries.map((inq) => (
                    <tr key={inq.id}>
                      <td className="px-4 py-3 text-gray-900">{inq.name}</td>
                      <td className="px-4 py-3 text-gray-600">{inq.service}</td>
                      <td className="px-4 py-3 text-gray-600">{inq.email}</td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <button onClick={() => handleEdit(inq)} className="text-indigo-600 hover:underline">Edit</button>
                        <button onClick={() => handleDelete(inq.id)} className="text-red-600 hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
