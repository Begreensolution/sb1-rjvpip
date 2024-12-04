import React from 'react';
import { Users, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { StatsCard } from './StatsCard';

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Dipendenti Attivi"
        value={42}
        icon={Users}
        trend={{ value: 12, label: 'vs mese scorso' }}
      />
      <StatsCard
        title="Pratiche in Corso"
        value={156}
        icon={FileText}
        trend={{ value: 8, label: 'vs mese scorso' }}
      />
      <StatsCard
        title="Pratiche Completate"
        value={892}
        icon={CheckCircle}
        trend={{ value: 24, label: 'vs mese scorso' }}
      />
      <StatsCard
        title="Pratiche in Ritardo"
        value={8}
        icon={AlertCircle}
        trend={{ value: -5, label: 'vs mese scorso' }}
      />
    </div>
  );
}