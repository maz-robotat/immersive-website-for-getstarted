import { useState } from 'react';

interface Stat {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

interface Activity {
  id: number;
  user: string;
  action: string;
  time: string;
}

const initialStats: Stat[] = [
  { label: 'Total Users', value: '12,480', change: '+8.2%', positive: true },
  { label: 'Revenue', value: '$84,210', change: '+12.5%', positive: true },
  { label: 'Active Sessions', value: '1,043', change: '-3.1%', positive: false },
  { label: 'Conversion', value: '4.7%', change: '+0.6%', positive: true },
];

const initialActivity: Activity[] = [
  { id: 1, user: 'Alice Johnson', action: 'Created a new project', time: '2 min ago' },
  { id: 2, user: 'Bob Smith', action: 'Updated billing info', time: '15 min ago' },
  { id: 3, user: 'Carla Reyes', action: 'Invited 3 team members', time: '1 hr ago' },
  { id: 4, user: 'David Kim', action: 'Deleted a workspace', time: '3 hrs ago' },
  { id: 5, user: 'Emma Brown', action: 'Upgraded to Pro plan', time: 'Yesterday' },
];

export default function Dashboard() {
  const [stats] = useState<Stat[]>(initialStats);
  const [activity, setActivity] = useState<Activity[]>(initialActivity);

  const removeActivity = (id: number) => {
    setActivity((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-lg shadow p-5">
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className="text-2xl font-semibold text-gray-800 mt-1">{s.value}</p>
            <p className={`text-sm mt-2 ${s.positive ? 'text-green-600' : 'text-red-600'}`}>
              {s.change}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
        </div>
        {activity.length === 0 ? (
          <p className="px-5 py-8 text-center text-gray-400">No recent activity.</p>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="px-5 py-3">User</th>
                <th className="px-5 py-3">Action</th>
                <th className="px-5 py-3">Time</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {activity.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-800">{a.user}</td>
                  <td className="px-5 py-3 text-gray-600">{a.action}</td>
                  <td className="px-5 py-3 text-gray-400 text-sm">{a.time}</td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => removeActivity(a.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Dismiss
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
