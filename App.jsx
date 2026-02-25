import React, { useState } from 'react';

/**
 * Nota para el despliegue en Vercel:
 * Para evitar errores de resolución, utilizamos importaciones directas desde esm.sh.
 * Se ha corregido el formato de la URL para asegurar la compatibilidad.
 */
import { 
  Calendar, 
  Dumbbell, 
  Activity, 
  ChevronRight, 
  ChevronLeft, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  MapPin 
} from 'https://esm.sh/lucide-react@0.344.0';

const App = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [completedWorkouts, setCompletedWorkouts] = useState({});

  const athleteData = {
    name: "Corredor",
    age: 45,
    target: "Nono Ultra Trail 60k",
    date: "11 de Julio, 2026",
    stats: { weight: 75, recentPeak: "2 Refugios (31.7km)" }
  };

  const trainingPlan = [
    {
      weekTitle: "Semana 1: Transición y Recuperación Activa",
      range: "23 Feb - 1 Mar",
      days: [
        { day: "Lunes 23", type: "Descanso", desc: "Post 2 Refugios. Recuperación total.", focus: "Recuperación" },
        { day: "Martes 24", type: "Movilidad", desc: "Sesión suave de estiramientos y foam roller.", focus: "Flexibilidad" },
        { day: "Miércoles 25", type: "Habilidades (Grupo)", desc: "Técnica de carrera en senderos y uso de bastones.", focus: "Técnica" },
        { day: "Jueves 26", type: "Descanso Activo", desc: "Caminata 30 min o elíptica muy suave.", focus: "Flujo sanguíneo" },
        { day: "Viernes 27", type: "Fuerza (Sarcopenia)", desc: "Tren superior y Sentadillas. Carga moderada.", focus: "Fuerza" },
        { day: "Sábado 28", type: "Fondo Suave (Grupo)", desc: "12-14km terreno llano/ondulado. Sin presión.", focus: "Base" },
        { day: "Domingo 1", type: "Descanso", desc: "Total.", focus: "Reset" }
      ]
    },
    {
      weekTitle: "Semana 2: Inicio de Ciclo Base I",
      range: "2 Mar - 8 Mar",
      days: [
        { day: "Lunes 2", type: "Pista (Grupo)", desc: "Series de 400m o 800m. Ritmo controlado.", focus: "Umbral" },
        { day: "Martes 3", type: "Fuerza + Tobillo", desc: "Propiocepción (equilibrio) + Pantorrillas + Core.", focus: "Estabilidad" },
        { day: "Miércoles 4", type: "Habilidades (Grupo)", desc: "Drilles de coordinación y cuestas cortas.", focus: "Potencia" },
        { day: "Jueves 5", type: "Rodaje Z2", desc: "8km llanos a ritmo de charla.", focus: "Aeróbico" },
        { day: "Viernes 6", type: "Fuerza Pesada", desc: "Peso Muerto y Sentadilla Goblet. 3x8 reps.", focus: "Músculo" },
        { day: "Sábado 7", type: "Fondo Largo (Grupo)", desc: "18km con +400m. Terreno de trail.", focus: "Resistencia" },
        { day: "Domingo 8", type: "Descanso", desc: "Total.", focus: "Recuperación" }
      ]
    }
  ];

  const toggleWorkout = (weekIdx, dayIdx) => {
    const key = `${weekIdx}-${dayIdx}`;
    setCompletedWorkouts(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto">
        <header className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-2 text-blue-400 mb-2 text-xs font-bold uppercase tracking-widest">
                <MapPin size={16} /> Nono, Córdoba
              </div>
              <h1 className="text-3xl font-black italic mb-1 uppercase tracking-tighter">Nono Ultra 60k</h1>
              <p className="text-slate-400 text-sm italic">Comienzo: 23 de Febrero • Meta: 11 de Julio</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl text-center min-w-[100px]">
              <div className="text-2xl font-bold text-blue-400">19</div>
              <div className="text-[10px] uppercase font-bold text-slate-300">Semanas</div>
            </div>
          </div>
        </header>

        <div className="flex items-center justify-between mb-4 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
          <button onClick={() => setCurrentWeek(Math.max(0, currentWeek - 1))} className="p-2 hover:bg-slate-100 rounded-lg">
            <ChevronLeft size={20} />
          </button>
          <div className="text-center">
            <h2 className="font-bold text-sm text-slate-800 uppercase">{trainingPlan[currentWeek].weekTitle}</h2>
            <p className="text-[10px] text-slate-500 font-medium">{trainingPlan[currentWeek].range}</p>
          </div>
          <button onClick={() => setCurrentWeek(Math.min(trainingPlan.length - 1, currentWeek + 1))} className="p-2 hover:bg-slate-100 rounded-lg">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="space-y-3">
          {trainingPlan[currentWeek].days.map((item, idx) => {
            const isCompleted = completedWorkouts[`${currentWeek}-${idx}`];
            return (
              <div 
                key={idx}
                onClick={() => toggleWorkout(currentWeek, idx)}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                  isCompleted ? 'bg-emerald-50 border-emerald-200 opacity-60' : 'bg-white border-slate-200 hover:border-blue-300'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  item.type.includes("Fuerza") ? 'bg-purple-600' : 
                  item.type.includes("Descanso") ? 'bg-slate-200 text-slate-500' : 'bg-blue-600'
                } text-white`}>
                  {item.type.includes("Fuerza") ? <Dumbbell size={20} /> : <Activity size={20} />}
                </div>
                <div className="grow">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase">{item.day}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100">{item.focus}</span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm leading-tight">{item.type}</h3>
                  <p className="text-[11px] text-slate-500 italic mt-0.5">{item.desc}</p>
                </div>
                <div className={isCompleted ? 'text-emerald-500' : 'text-slate-100'}>
                  <CheckCircle2 size={24} fill={isCompleted ? "currentColor" : "none"} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
