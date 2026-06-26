import { useState } from 'react';

interface Device {
  id: number;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'warning';
  lastSeen: string;
  protocol: string;
}

const INITIAL_DEVICES: Device[] = [
  { id: 1, name: 'Factory Floor Sensor A1', type: 'Temperature', status: 'online', lastSeen: '2 min ago', protocol: 'MQTT' },
  { id: 2, name: 'Warehouse Gateway', type: 'Gateway', status: 'online', lastSeen: '1 min ago', protocol: 'CoAP' },
  { id: 3, name: 'HVAC Controller 03', type: 'Actuator', status: 'warning', lastSeen: '14 min ago', protocol: 'MQTT' },
  { id: 4, name: 'Parking Lot Camera', type: 'Camera', status: 'offline', lastSeen: '3 hrs ago', protocol: 'HTTP' },
  { id: 5, name: 'Energy Meter B7', type: 'Meter', status: 'online', lastSeen: '5 min ago', protocol: 'Modbus' },
];

const FEATURES = [
  { title: 'Device Provisioning', desc: 'Zero-touch onboarding for thousands of devices with secure certificate-based identity.' },
  { title: 'Real-time Telemetry', desc: 'Stream sensor data with sub-second latency over MQTT, CoAP, and WebSockets.' },
  { title: 'Edge Processing', desc: 'Run rules and ML inference at the edge to reduce bandwidth and improve response.' },
  { title: 'OTA Updates', desc: 'Push firmware and configuration updates safely with rollback support.' },
];

const PROTOCOLS = ['MQTT', 'CoAP', 'HTTP', 'Modbus', 'WebSocket'];
const TYPES = ['Temperature', 'Gateway', 'Actuator', 'Camera', 'Meter', 'Humidity'];

export default function IoTIntegration() {
  const [devices, setDevices] = useState<Device[]>(INITIAL_DEVICES);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', type: TYPES[0], protocol: PROTOCOLS[0], status: 'online' as Device['status'] });

  const resetForm = () => {
    setForm({ name: '', type: TYPES[0], protocol: PROTOCOLS[0], status: 'online' });
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    if (editingId !== null) {
      setDevices((prev) => prev.map((d) => (d.id === editingId ? { ...d, ...form } : d)));
    } else {
      setDevices((prev) => [
        ...prev,
        { id: Date.now(), name: form.name, type: form.type, protocol: form.protocol, status: form.status, lastSeen: 'just now' },
      ]);
    }
    resetForm();
  };

  const handleEdit = (d: Device) => {
    setEditingId(d.id);
    setForm({ name: d.name, type: d.type, protocol: d.protocol, status: d.status });
  };

  const handleDelete = (id: number) => {
    setDevices((prev) => prev.filter((d) => d.id !== id));
    if (editingId === id) resetForm();
  };

  const statusColor = (s: Device['status']) =>
    s === 'online' ? 'bg-green-100 text-green-700' : s === 'warning' ? 'bg-amber-100 text-amber-700' : 'bg-gray-200 text-gray-600';

  const counts = {
    total: devices.length,
    online: devices.filter((d) => d.status === 'online').length,
    warning: devices.filter((d) => d.status === 'warning').length,
    offline: devices.filter((d) => d.status === 'offline').length,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">IoT Integration</h1>
        <p className="mt-3 text-lg text-gray-600 max-w-2xl">
          Connect, monitor, and manage your entire fleet of IoT devices from a single, secure
          platform. Stream telemetry, automate workflows, and scale to millions of endpoints.
        </p>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
          <div className="text-3xl font-bold text-gray-900">{counts.total}</div>
          <div className="text-sm text-gray-500">Total Devices</div>
        </div>
        <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
          <div className="text-3xl font-bold text-green-600">{counts.online}</div>
          <div className="text-sm text-gray-500">Online</div>
        </div>
        <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
          <div className="text-3xl font-bold text-amber-500">{counts.warning}</div>
          <div className="text-sm text-gray-500">Warnings</div>
        </div>
        <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
          <div className="text-3xl font-bold text-gray-400">{counts.offline}</div>
          <div className="text-sm text-gray-500">Offline</div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Platform Capabilities</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900">{f.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {editingId !== null ? 'Edit Device' : 'Register Device'}
          </h2>
          <form onSubmit={handleSubmit} className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Device Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Boiler Sensor 02"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Protocol</label>
              <select
                value={form.protocol}
                onChange={(e) => setForm({ ...form, protocol: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {PROTOCOLS.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as Device['status'] })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="online">Online</option>
                <option value="warning">Warning</option>
                <option value="offline">Offline</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="flex-1 rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700">
                {editingId !== null ? 'Save Changes' : 'Add Device'}
              </button>
              {editingId !== null && (
                <button type="button" onClick={resetForm} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Connected Devices</h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Name</th>
                  <th className="px-4 py-3 text-left font-medium">Type</th>
                  <th className="px-4 py-3 text-left font-medium">Protocol</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Last Seen</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {devices.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-gray-400">
                      No devices registered yet. Add one using the form.
                    </td>
                  </tr>
                ) : (
                  devices.map((d) => (
                    <tr key={d.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{d.name}</td>
                      <td className="px-4 py-3 text-gray-600">{d.type}</td>
                      <td className="px-4 py-3 text-gray-600">{d.protocol}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor(d.status)}`}>
                          {d.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{d.lastSeen}</td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <button onClick={() => handleEdit(d)} className="text-blue-600 hover:underline">Edit</button>
                        <button onClick={() => handleDelete(d.id)} className="text-red-600 hover:underline">Delete</button>
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
