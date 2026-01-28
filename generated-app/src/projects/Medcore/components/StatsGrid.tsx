import { StatsCard } from './StatsCard';
import { Users, AlertTriangle, Calendar, Clock } from 'lucide-react';

export const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatsCard
        title="Total Patients"
        value={245}
        icon={<Users className="w-6 h-6" />}
        color="blue"
      />
      <StatsCard
        title="Critical Cases"
        value={12}
        icon={<AlertTriangle className="w-6 h-6" />}
        color="red"
      />
      <StatsCard
        title="Appointments Today"
        value={18}
        icon={<Calendar className="w-6 h-6" />}
        color="green"
      />
      <StatsCard
        title="Avg Wait Time"
        value="22 min"
        icon={<Clock className="w-6 h-6" />}
        color="yellow"
      />
    </div>
  );
};