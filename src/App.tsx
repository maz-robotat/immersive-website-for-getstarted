import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AIConsulting from "./pages/AIConsulting";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import DataAnalytics from "./pages/DataAnalytics";
import IoTIntegration from "./pages/IoTIntegration";
import MachineLearning from "./pages/MachineLearning";
import Projects from "./pages/Projects";
import RoboticsDevelopment from "./pages/RoboticsDevelopment";
import Settings from "./pages/Settings";
import SmartAutomation from "./pages/SmartAutomation";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/aiconsulting", label: "AIConsulting" },
  { to: "/contact", label: "Contact" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/data-analytics", label: "Data Analytics" },
  { to: "/io-tintegration", label: "Io TIntegration" },
  { to: "/machine-learning", label: "Machine Learning" },
  { to: "/projects", label: "Projects" },
  { to: "/robotics-development", label: "Robotics Development" },
  { to: "/settings", label: "Settings" },
  { to: "/smart-automation", label: "Smart Automation" }
];

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex bg-slate-50 text-slate-900">
        <aside className="w-60 shrink-0 bg-slate-900 text-slate-100 p-4 space-y-1">
          <h1 className="text-lg font-bold mb-4">App</h1>
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="block px-3 py-2 rounded hover:bg-slate-800">{n.label}</Link>
          ))}
        </aside>
        <main className="flex-1 p-8 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aiconsulting" element={<AIConsulting />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/data-analytics" element={<DataAnalytics />} />
            <Route path="/io-tintegration" element={<IoTIntegration />} />
            <Route path="/machine-learning" element={<MachineLearning />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/robotics-development" element={<RoboticsDevelopment />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/smart-automation" element={<SmartAutomation />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
