import React, { useState } from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, subtitle }) => (
  <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
    <p style={{ fontSize: '14px', color: '#6B7280', margin: 0, fontWeight: 500 }}>{title}</p>
    <h3 style={{ fontSize: '28px', color: '#111827', margin: '8px 0', fontWeight: 'bold' }}>{value}</h3>
    <p style={{ fontSize: '12px', color: '#059669', margin: 0 }}>{subtitle}</p>
  </div>
);

export default function App() {
  const [role, setRole] = useState<'admin' | 'facilitator' | 'reviewer'>('facilitator');

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh', background: '#F9FAFB' }}>
      {/* Top Navbar */}
      <header style={{ background: '#1B5E20', color: '#fff', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>تعلیم سے ترقی — Taleem Se Taraqqi</h1>
          <p style={{ margin: '4px 0 0', fontSize: '12px', opacity: 0.9 }}>Management & Facilitator Operations Portal</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', opacity: 0.9 }}>Active Role:</span>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value as any)}
            style={{ background: '#2E7D32', color: '#fff', border: '1px solid #4CAF50', padding: '6px 12px', borderRadius: '6px', fontSize: '13px' }}
          >
            <option value="facilitator">Community Facilitator</option>
            <option value="reviewer">Curriculum Reviewer</option>
            <option value="admin">System Administrator</option>
          </select>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1200px', margin: '32px auto', padding: '0 24px' }}>
        {/* Pilot Overview Banner */}
        <section style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '16px 20px', borderRadius: '12px', marginBottom: '24px' }}>
          <h2 style={{ margin: '0 0 6px', color: '#065F46', fontSize: '16px' }}>🚀 Pilot Phase 1 Active — Karachi & Rural Sindh</h2>
          <p style={{ margin: 0, color: '#047857', fontSize: '14px' }}>
            Tracking 100 Karachi community schools and rural Sindh agricultural/livestock cohorts. Offline pack synchronization operational.
          </p>
        </section>

        {/* Key Metrics Grid */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <MetricCard title="Active Learners" value="5,120" subtitle="↑ 12% this week (Karachi + Sindh)" />
          <MetricCard title="Lessons Completed" value="48,390" subtitle="84% completed in offline mode" />
          <MetricCard title="Primary Language" value="Urdu 58% / Sindhi 42%" subtitle="Full RTL native audio enabled" />
          <MetricCard title="Safety Escalations" value="14" subtitle="All referred immediately to helplines" />
        </section>

        {/* Content & Cohort Heatmap Section */}
        <section style={{ background: '#fff', borderRadius: '12px', padding: '24px', border: '1px solid #E5E7EB' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '18px', color: '#1F2937' }}>
            {role === 'facilitator' && 'Karachi Community Schools — Cohort Group Mastery'}
            {role === 'reviewer' && 'Curriculum & Safety Review Queue'}
            {role === 'admin' && 'District Aggregation & Tutor Content Gaps'}
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E5E7EB', color: '#4B5563' }}>
                  <th style={{ padding: '12px 8px' }}>Cohort / Item ID</th>
                  <th style={{ padding: '12px 8px' }}>Language</th>
                  <th style={{ padding: '12px 8px' }}>Domain / Stage</th>
                  <th style={{ padding: '12px 8px' }}>Status</th>
                  <th style={{ padding: '12px 8px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '12px 8px', fontWeight: 600 }}>KHI-Orangi-Class-A</td>
                  <td style={{ padding: '12px 8px' }}>Urdu (اُردُو)</td>
                  <td style={{ padding: '12px 8px' }}>Week 2: First Letter Group</td>
                  <td style={{ padding: '12px 8px' }}><span style={{ background: '#DEF7EC', color: '#03543F', padding: '4px 8px', borderRadius: '6px', fontSize: '12px' }}>92% Mastery</span></td>
                  <td style={{ padding: '12px 8px' }}><button style={{ background: '#1B5E20', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>View Heatmap</button></td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '12px 8px', fontWeight: 600 }}>SND-Larkana-Rice-1</td>
                  <td style={{ padding: '12px 8px' }}>Sindhi (سنڌي)</td>
                  <td style={{ padding: '12px 8px' }}>Agriculture: Land Prep & Water</td>
                  <td style={{ padding: '12px 8px' }}><span style={{ background: '#DEF7EC', color: '#03543F', padding: '4px 8px', borderRadius: '6px', fontSize: '12px' }}>88% Mastery</span></td>
                  <td style={{ padding: '12px 8px' }}><button style={{ background: '#1B5E20', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>View Heatmap</button></td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '12px 8px', fontWeight: 600 }}>ur.w01.d1.l1</td>
                  <td style={{ padding: '12px 8px' }}>Urdu</td>
                  <td style={{ padding: '12px 8px' }}>Sounds & Everyday Objects</td>
                  <td style={{ padding: '12px 8px' }}><span style={{ background: '#E1EFFE', color: '#1E429F', padding: '4px 8px', borderRadius: '6px', fontSize: '12px' }}>APPROVED</span></td>
                  <td style={{ padding: '12px 8px' }}><button style={{ background: '#4B5563', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>Inspect JSON</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
