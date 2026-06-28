import React, { useState, useEffect } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import { supabase } from '../../lib/supabase';

const CATEGORIES: { id: string; name: string; color: string }[] = [
  { id: 'work',     name: '업무',   color: '#6366f1' },
  { id: 'study',    name: '학습',   color: '#22d3ee' },
  { id: 'exercise', name: '운동',   color: '#4ade80' },
  { id: 'create',   name: '창작',   color: '#f59e0b' },
  { id: 'rest',     name: '휴식',   color: '#94a3b8' },
];

interface Activity {
  id: number;
  category: string;
  title: string;
  start_min: number;
  end_min: number;
  date: string;
}

const colorOf = (id: string) => CATEGORIES.find(c => c.id === id)?.color ?? '#666';
const nameOf  = (id: string) => CATEGORIES.find(c => c.id === id)?.name ?? id;
const DAY_START = 420; const DAY_END = 1380; const DAY_SPAN = DAY_END - DAY_START;
const toHHMM = (m: number) => `${Math.floor(m/60).toString().padStart(2,'0')}:${(m%60).toString().padStart(2,'0')}`;
const toHourLabel = (m: number) => `${Math.floor(m/60)}시`;
const nowInMin = () => { const d = new Date(); return d.getHours()*60+d.getMinutes(); };
const todayStr = () => new Date().toISOString().slice(0, 10);

const weeklyData = [
  { day: '월', work: 180, study: 90,  exercise: 60,  create: 120, rest: 60  },
  { day: '화', work: 240, study: 120, exercise: 0,   create: 60,  rest: 90  },
  { day: '수', work: 120, study: 180, exercise: 60,  create: 180, rest: 60  },
  { day: '목', work: 300, study: 60,  exercise: 60,  create: 0,   rest: 60  },
  { day: '금', work: 200, study: 90,  exercise: 60,  create: 90,  rest: 60  },
  { day: '토', work: 60,  study: 120, exercise: 90,  create: 210, rest: 120 },
  { day: '일', work: 0,   study: 90,  exercise: 60,  create: 90,  rest: 180 },
];

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-lg font-semibold text-gray-200 mb-4">{children}</h2>
);
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-gray-800 bg-opacity-80 rounded-2xl p-5 ${className}`}>{children}</div>
);
const StatCard: React.FC<{ label: string; value: string; sub?: string; color: string }> = ({ label, value, sub, color }) => (
  <div className="bg-gray-700 bg-opacity-60 rounded-xl p-4 flex flex-col gap-1">
    <span className="text-xs text-gray-400">{label}</span>
    <span className="text-2xl font-bold" style={{ color }}>{value}</span>
    {sub && <span className="text-xs text-gray-500">{sub}</span>}
  </div>
);

const TimerInput: React.FC<{
  activities: Activity[];
  onAdd: (a: Omit<Activity, 'id' | 'date'>) => Promise<void>;
}> = ({ activities, onAdd }) => {
  const [selectedCategory, setSelectedCategory] = useState('work');
  const [title, setTitle] = useState('');
  const [timerStart, setTimerStart] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (timerStart === null) return;
    const id = setInterval(() => setElapsed(Math.floor((Date.now()-timerStart)/1000)), 1000);
    return () => clearInterval(id);
  }, [timerStart]);

  const handleStart = () => { setTimerStart(Date.now()); setElapsed(0); };
  const handleStop = async () => {
    if (timerStart === null) return;
    const startMin = nowInMin() - Math.floor(elapsed/60);
    const endMin = nowInMin();
    if (endMin > startMin) {
      setSaving(true);
      await onAdd({ category: selectedCategory, title: title || nameOf(selectedCategory), start_min: startMin, end_min: endMin });
      setSaving(false);
    }
    setTimerStart(null); setElapsed(0); setTitle('');
  };
  const fmtElapsed = () => {
    const h = Math.floor(elapsed/3600), m = Math.floor((elapsed%3600)/60), s = elapsed%60;
    return h > 0 ? `${h}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}` : `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  };
  const isRunning = timerStart !== null;

  return (
    <Card>
      <SectionTitle>활동 기록</SectionTitle>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => !isRunning && setSelectedCategory(c.id)} disabled={isRunning}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${selectedCategory===c.id ? 'text-white ring-2 ring-white ring-offset-1 ring-offset-gray-800' : 'text-gray-300 opacity-60'} ${isRunning ? 'cursor-not-allowed' : 'hover:opacity-100'}`}
              style={{ backgroundColor: c.color }}>{c.name}</button>
          ))}
        </div>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} disabled={isRunning}
          placeholder="활동명 (선택사항)"
          className="w-full bg-gray-700 text-gray-200 rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50" />
        <div className="flex items-center gap-4">
          {isRunning && <span className="text-2xl font-mono font-bold text-white tabular-nums">{fmtElapsed()}</span>}
          <button onClick={isRunning ? handleStop : handleStart} disabled={saving}
            className={`px-6 py-2 rounded-full font-semibold text-white transition-colors disabled:opacity-50 ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
            {saving ? '저장 중...' : isRunning ? '■ 정지' : '▶ 시작'}
          </button>
          {isRunning && <span className="text-sm text-gray-400">{nameOf(selectedCategory)} 기록 중...</span>}
        </div>
      </div>
      {activities.length > 0 && <p className="mt-4 text-xs text-gray-500">오늘 {activities.length}개 활동 기록됨</p>}
    </Card>
  );
};

const TimelineBar: React.FC<{ activities: Activity[] }> = ({ activities }) => {
  const hourTicks: number[] = [];
  for (let m = DAY_START; m <= DAY_END; m += 120) hourTicks.push(m);
  return (
    <div className="relative">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        {hourTicks.map(m => <span key={m} style={{ width: `${(120/DAY_SPAN)*100}%`, textAlign: 'center' }}>{toHourLabel(m)}</span>)}
      </div>
      <div className="relative h-10 bg-gray-700 rounded-lg overflow-hidden">
        {activities.map(a => {
          const left = Math.max(0, ((a.start_min-DAY_START)/DAY_SPAN)*100);
          const width = ((a.end_min-a.start_min)/DAY_SPAN)*100;
          return (
            <div key={a.id} className="absolute top-1 bottom-1 rounded flex items-center px-1 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
              style={{ left: `${left}%`, width: `${width}%`, backgroundColor: colorOf(a.category) }}
              title={`${a.title}\n${toHHMM(a.start_min)} – ${toHHMM(a.end_min)}`}>
              <span className="text-xs text-white font-medium truncate">{a.title}</span>
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-3 mt-3">
        {CATEGORIES.map(c => (
          <div key={c.id} className="flex items-center gap-1.5 text-xs text-gray-400">
            <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: c.color }} />{c.name}
          </div>
        ))}
      </div>
    </div>
  );
};

const CategoryPie: React.FC<{ activities: Activity[] }> = ({ activities }) => {
  const totals: Record<string, number> = {};
  for (const a of activities) {
    if (a.category === 'rest') continue;
    totals[a.category] = (totals[a.category]??0)+(a.end_min-a.start_min);
  }
  const data = Object.entries(totals).map(([id, min]) => ({ name: nameOf(id), value: min, color: colorOf(id) }));
  if (data.length === 0) return <div className="flex items-center justify-center h-48 text-gray-500 text-sm">아직 기록 없음</div>;
  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    const { name, value } = payload[0].payload;
    return <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200">{name}: {Math.floor(value/60)}h {value%60}m</div>;
  };
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart><Pie data={data} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name }) => name}>
        {data.map((e, i) => <Cell key={i} fill={e.color} />)}
      </Pie><Tooltip content={<CustomTooltip />} /></PieChart>
    </ResponsiveContainer>
  );
};

const ActivityList: React.FC<{ activities: Activity[]; onDelete: (id: number) => Promise<void> }> = ({ activities, onDelete }) => {
  if (activities.length === 0) return <div className="text-gray-500 text-sm py-4 text-center">타이머로 활동을 기록해보세요</div>;
  return (
    <div className="space-y-2">
      {activities.map(a => {
        const dur = a.end_min-a.start_min;
        return (
          <div key={a.id} className="flex items-center gap-3 py-2 border-b border-gray-700 last:border-0">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: colorOf(a.category) }} />
            <span className="flex-1 text-sm text-gray-200">{a.title}</span>
            <span className="text-xs text-gray-500">{toHHMM(a.start_min)} – {toHHMM(a.end_min)}</span>
            <span className="text-xs font-medium text-gray-300 w-14 text-right">{Math.floor(dur/60)}h {dur%60>0?`${dur%60}m`:''}</span>
            <button onClick={() => onDelete(a.id)} className="text-gray-600 hover:text-red-400 transition-colors text-xs ml-1" title="삭제">✕</button>
          </div>
        );
      })}
    </div>
  );
};

const WeeklyBar: React.FC = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 space-y-1">
        <p className="font-semibold mb-1">{label}요일</p>
        {payload.map((p: any) => <p key={p.dataKey} style={{ color: p.fill }}>{nameOf(p.dataKey)}: {Math.floor(p.value/60)}h {p.value%60>0?`${p.value%60}m`:''}</p>)}
      </div>
    );
  };
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={weeklyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="day" tick={{ fill: '#9ca3af', fontSize: 12 }} />
        <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} tickFormatter={v => `${Math.floor(v/60)}h`} />
        <Tooltip content={<CustomTooltip />} />
        {CATEGORIES.map(c => <Bar key={c.id} dataKey={c.id} stackId="a" fill={c.color} />)}
      </BarChart>
    </ResponsiveContainer>
  );
};

const TimeDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'today'|'week'>('today');
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  const today = new Date();
  const dateStr = `${today.getFullYear()}년 ${today.getMonth()+1}월 ${today.getDate()}일`;
  const dayStr = ['일','월','화','수','목','금','토'][today.getDay()]+'요일';

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('date', todayStr())
        .order('start_min', { ascending: true });
      if (!error && data) setActivities(data);
      setLoading(false);
    };
    fetchActivities();
  }, []);

  const handleAdd = async (a: Omit<Activity, 'id' | 'date'>) => {
    const { data, error } = await supabase
      .from('activities')
      .insert({ ...a, date: todayStr() })
      .select()
      .single();
    if (!error && data) setActivities(prev => [...prev, data]);
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from('activities').delete().eq('id', id);
    if (!error) setActivities(prev => prev.filter(a => a.id !== id));
  };

  const totalActiveMin = activities.filter(a => a.category !== 'rest').reduce((s,a) => s+a.end_min-a.start_min, 0);
  const topCategory = (() => {
    const best = CATEGORIES.filter(c => c.id !== 'rest').reduce((b,c) => {
      const t = activities.filter(a => a.category===c.id).reduce((s,a) => s+a.end_min-a.start_min,0);
      const bt = activities.filter(a => a.category===b.id).reduce((s,a) => s+a.end_min-a.start_min,0);
      return t > bt ? c : b;
    }, CATEGORIES[0]);
    return totalActiveMin > 0 ? best : null;
  })();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">시간 대시보드</h1>
          <p className="text-sm text-gray-400 mt-0.5">{dateStr} {dayStr}</p>
        </div>
        <div className="flex gap-2">
          {(['today','week'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeTab===tab ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-400 hover:text-white'}`}>
              {tab==='today' ? '오늘' : '이번 주'}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'today' ? (
        <>
          <TimerInput activities={activities} onAdd={handleAdd} />

          {loading ? (
            <div className="text-center text-gray-500 py-8">불러오는 중...</div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-3">
                <StatCard label="총 활동 시간" value={totalActiveMin>0?`${Math.floor(totalActiveMin/60)}h ${totalActiveMin%60}m`:'-'} sub="휴식 제외" color="#6366f1" />
                <StatCard label="최다 카테고리" value={topCategory?topCategory.name:'-'} sub="오늘의 주요 활동" color={topCategory?topCategory.color:'#666'} />
                <StatCard label="기록 수" value={`${activities.length}개`} sub="오늘 활동" color="#22d3ee" />
              </div>
              <Card><SectionTitle>타임라인</SectionTitle><TimelineBar activities={activities} /></Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card><SectionTitle>카테고리별 비중</SectionTitle><CategoryPie activities={activities} /></Card>
                <Card><SectionTitle>활동 목록</SectionTitle><ActivityList activities={activities} onDelete={handleDelete} /></Card>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <Card><SectionTitle>주간 카테고리별 시간</SectionTitle><WeeklyBar /></Card>
          <Card>
            <SectionTitle>이번 주 카테고리 합계</SectionTitle>
            <div className="space-y-3">
              {CATEGORIES.map(c => {
                const total = weeklyData.reduce((sum,d) => sum+(d as any)[c.id], 0);
                return (
                  <div key={c.id} className="flex items-center gap-3">
                    <span className="text-sm text-gray-300 w-12">{c.name}</span>
                    <div className="flex-1 bg-gray-700 rounded-full h-2.5 overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${(total/(7*300))*100}%`, backgroundColor: c.color }} />
                    </div>
                    <span className="text-sm text-gray-400 w-16 text-right">{Math.floor(total/60)}h {total%60>0?`${total%60}m`:''}</span>
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
