
import React, { useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
} from 'recharts';

// ── Mock Data ──────────────────────────────────────────────────────────────

const CATEGORIES: { id: string; name: string; color: string }[] = [
  { id: 'work',     name: '업무',   color: '#6366f1' },
  { id: 'study',    name: '학습',   color: '#22d3ee' },
  { id: 'exercise', name: '운동',   color: '#4ade80' },
  { id: 'create',   name: '창작',   color: '#f59e0b' },
  { id: 'rest',     name: '휴식',   color: '#94a3b8' },
];

const colorOf = (id: string) => CATEGORIES.find(c => c.id === id)?.color ?? '#666';
const nameOf  = (id: string) => CATEGORIES.find(c => c.id === id)?.name ?? id;

// Today's activity log (start/end in minutes from 00:00)
const todayActivities = [
  { id: 1, category: 'study',    title: '논문 읽기',        start: 480,  end: 570  }, // 08:00–09:30
  { id: 2, category: 'work',     title: '팀 미팅',          start: 600,  end: 660  }, // 10:00–11:00
  { id: 3, category: 'work',     title: '기획서 작성',      start: 660,  end: 780  }, // 11:00–13:00
  { id: 4, category: 'rest',     title: '점심 휴식',        start: 780,  end: 840  }, // 13:00–14:00
  { id: 5, category: 'create',   title: '영상 편집',        start: 840,  end: 990  }, // 14:00–16:30
  { id: 6, category: 'exercise', title: '러닝',             start: 1020, end: 1080 }, // 17:00–18:00
  { id: 7, category: 'study',    title: 'Swift 강의',       start: 1140, end: 1260 }, // 19:00–21:00
];

const todayBreaks = [
  { start: 570, end: 600 },  // 09:30–10:00
  { start: 990, end: 1020 }, // 16:30–17:00
];

// Weekly summary (minutes per category per day)
const weeklyData = [
  { day: '월', work: 180, study: 90,  exercise: 60,  create: 120, rest: 60  },
  { day: '화', work: 240, study: 120, exercise: 0,   create: 60,  rest: 90  },
  { day: '수', work: 120, study: 180, exercise: 60,  create: 180, rest: 60  },
  { day: '목', work: 300, study: 60,  exercise: 60,  create: 0,   rest: 60  },
  { day: '금', work: 200, study: 90,  exercise: 60,  create: 90,  rest: 60  },
  { day: '토', work: 60,  study: 120, exercise: 90,  create: 210, rest: 120 },
  { day: '일', work: 0,   study: 90,  exercise: 60,  create: 90,  rest: 180 },
];

// ── Helpers ────────────────────────────────────────────────────────────────

const toHHMM = (minutes: number) => {
  const h = Math.floor(minutes / 60).toString().padStart(2, '0');
  const m = (minutes % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
};

const toHourLabel = (min: number) => `${Math.floor(min / 60)}시`;

const DAY_START = 420;  // 07:00
const DAY_END   = 1380; // 23:00
const DAY_SPAN  = DAY_END - DAY_START;

// ── Sub-components ─────────────────────────────────────────────────────────

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-lg font-semibold text-gray-200 mb-4">{children}</h2>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-gray-800 bg-opacity-80 rounded-2xl p-5 ${className}`}>
    {children}
  </div>
);

// Timeline bar for today
const TimelineBar: React.FC = () => {
  const hourTicks = [];
  for (let m = DAY_START; m <= DAY_END; m += 120) {
    hourTicks.push(m);
  }

  return (
    <div className="relative">
      {/* hour ticks */}
      <div className="flex justify-between text-xs text-gray-500 mb-1 px-0">
        {hourTicks.map(m => (
          <span key={m} style={{ width: `${(120 / DAY_SPAN) * 100}%`, textAlign: 'center' }}>
            {toHourLabel(m)}
          </span>
        ))}
      </div>

      {/* track */}
      <div className="relative h-10 bg-gray-700 rounded-lg overflow-hidden">
        {/* breaks */}
        {todayBreaks.map((b, i) => {
          const left  = ((b.start - DAY_START) / DAY_SPAN) * 100;
          const width = ((b.end - b.start) / DAY_SPAN) * 100;
          return (
            <div
              key={i}
              className="absolute top-0 h-full bg-gray-600 opacity-60"
              style={{ left: `${left}%`, width: `${width}%` }}
            />
          );
        })}

        {/* activities */}
        {todayActivities.map(a => {
          const left  = ((a.start - DAY_START) / DAY_SPAN) * 100;
          const width = ((a.end - a.start) / DAY_SPAN) * 100;
          return (
            <div
              key={a.id}
              className="absolute top-1 bottom-1 rounded flex items-center px-1 overflow-hidden group cursor-pointer transition-opacity hover:opacity-80"
              style={{ left: `${left}%`, width: `${width}%`, backgroundColor: colorOf(a.category) }}
              title={`${a.title}\n${toHHMM(a.start)} – ${toHHMM(a.end)}`}
            >
              <span className="text-xs text-white font-medium truncate">{a.title}</span>
            </div>
          );
        })}
      </div>

      {/* legend */}
      <div className="flex flex-wrap gap-3 mt-3">
        {CATEGORIES.map(c => (
          <div key={c.id} className="flex items-center gap-1.5 text-xs text-gray-400">
            <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: c.color }} />
            {c.name}
          </div>
        ))}
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <span className="inline-block w-3 h-3 rounded-sm bg-gray-600 opacity-60" />
          휴식
        </div>
      </div>
    </div>
  );
};

// Pie chart for today's category breakdown
const CategoryPie: React.FC = () => {
  const totals: Record<string, number> = {};
  for (const a of todayActivities) {
    if (a.category === 'rest') continue;
    totals[a.category] = (totals[a.category] ?? 0) + (a.end - a.start);
  }
  const data = Object.entries(totals).map(([id, min]) => ({
    name: nameOf(id), value: min, color: colorOf(id),
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    const { name, value } = payload[0].payload;
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200">
        {name}: {Math.floor(value / 60)}h {value % 60}m
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name }) => name}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

// Activity list for today
const ActivityList: React.FC = () => (
  <div className="space-y-2">
    {todayActivities.map(a => {
      const dur = a.end - a.start;
      return (
        <div key={a.id} className="flex items-center gap-3 py-2 border-b border-gray-700 last:border-0">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: colorOf(a.category) }} />
          <span className="flex-1 text-sm text-gray-200">{a.title}</span>
          <span className="text-xs text-gray-500">{toHHMM(a.start)} – {toHHMM(a.end)}</span>
          <span className="text-xs font-medium text-gray-300 w-14 text-right">
            {Math.floor(dur / 60)}h {dur % 60 > 0 ? `${dur % 60}m` : ''}
          </span>
        </div>
      );
    })}
  </div>
);

// Weekly stacked bar chart
const WeeklyBar: React.FC = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 space-y-1">
        <p className="font-semibold mb-1">{label}요일</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} style={{ color: p.fill }}>
            {nameOf(p.dataKey)}: {Math.floor(p.value / 60)}h {p.value % 60 > 0 ? `${p.value % 60}m` : ''}
          </p>
        ))}
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={weeklyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="day" tick={{ fill: '#9ca3af', fontSize: 12 }} />
        <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} tickFormatter={v => `${Math.floor(v / 60)}h`} />
        <Tooltip content={<CustomTooltip />} />
        {CATEGORIES.map(c => (
          <Bar key={c.id} dataKey={c.id} stackId="a" fill={c.color} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

// ── Summary Stats ──────────────────────────────────────────────────────────

const StatCard: React.FC<{ label: string; value: string; sub?: string; color: string }> = ({ label, value, sub, color }) => (
  <div className="bg-gray-700 bg-opacity-60 rounded-xl p-4 flex flex-col gap-1">
    <span className="text-xs text-gray-400">{label}</span>
    <span className="text-2xl font-bold" style={{ color }}>{value}</span>
    {sub && <span className="text-xs text-gray-500">{sub}</span>}
  </div>
);

// ── Main Page ──────────────────────────────────────────────────────────────

const TimeDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'today' | 'week'>('today');

  const totalActiveMin = todayActivities
    .filter(a => a.category !== 'rest')
    .reduce((sum, a) => sum + (a.end - a.start), 0);
  const totalBreakMin = todayBreaks.reduce((sum, b) => sum + (b.end - b.start), 0);
  const topCategory = CATEGORIES.filter(c => c.id !== 'rest').reduce((best, c) => {
    const t = todayActivities.filter(a => a.category === c.id).reduce((s, a) => s + a.end - a.start, 0);
    const bt = todayActivities.filter(a => a.category === best.id).reduce((s, a) => s + a.end - a.start, 0);
    return t > bt ? c : best;
  }, CATEGORIES[0]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">시간 대시보드</h1>
          <p className="text-sm text-gray-400 mt-0.5">2026년 6월 2일 월요일</p>
        </div>
        <div className="flex gap-2">
          {(['today', 'week'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-700 text-gray-400 hover:text-white'
              }`}
            >
              {tab === 'today' ? '오늘' : '이번 주'}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'today' ? (
        <>
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            <StatCard
              label="총 활동 시간"
              value={`${Math.floor(totalActiveMin / 60)}h ${totalActiveMin % 60}m`}
              sub="휴식 제외"
              color="#6366f1"
            />
            <StatCard
              label="최다 카테고리"
              value={topCategory.name}
              sub="오늘의 주요 활동"
              color={topCategory.color}
            />
            <StatCard
              label="휴식 시간"
              value={`${Math.floor(totalBreakMin / 60)}h ${totalBreakMin % 60}m`}
              sub="총 공백 포함"
              color="#94a3b8"
            />
          </div>

          {/* Timeline */}
          <Card>
            <SectionTitle>타임라인</SectionTitle>
            <TimelineBar />
          </Card>

          {/* Pie + List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <SectionTitle>카테고리별 비중</SectionTitle>
              <CategoryPie />
            </Card>
            <Card>
              <SectionTitle>활동 목록</SectionTitle>
              <ActivityList />
            </Card>
          </div>
        </>
      ) : (
        <>
          {/* Weekly bar */}
          <Card>
            <SectionTitle>주간 카테고리별 시간</SectionTitle>
            <WeeklyBar />
          </Card>

          {/* Weekly category totals */}
          <Card>
            <SectionTitle>이번 주 카테고리 합계</SectionTitle>
            <div className="space-y-3">
              {CATEGORIES.map(c => {
                const total = weeklyData.reduce((sum, d) => sum + (d as any)[c.id], 0);
                const max = 7 * 300;
                return (
                  <div key={c.id} className="flex items-center gap-3">
                    <span className="text-sm text-gray-300 w-12">{c.name}</span>
                    <div className="flex-1 bg-gray-700 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${(total / max) * 100}%`, backgroundColor: c.color }}
                      />
                    </div>
                    <span className="text-sm text-gray-400 w-16 text-right">
                      {Math.floor(total / 60)}h {total % 60 > 0 ? `${total % 60}m` : ''}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default TimeDashboardPage;