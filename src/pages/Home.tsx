export default function Home() {
  const features = [
    { title: 'Fast', desc: 'Built with Vite for instant HMR and lightning builds.' },
    { title: 'Typed', desc: 'End-to-end TypeScript for safer, smarter code.' },
    { title: 'Realtime', desc: 'Supabase-powered data with live subscriptions.' },
  ];
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to the Platform</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A modern web application scaffolded with Vite, React, Tailwind, and Supabase.
          Explore the pages to manage your data.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a href="/dashboard" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">Get Started</a>
          <a href="/about" className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition">Learn More</a>
        </div>
      </section>
      <section className="grid md:grid-cols-3 gap-6">
        {features.map((f) => (
          <div key={f.title} className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
