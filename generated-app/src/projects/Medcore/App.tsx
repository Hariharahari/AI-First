import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { PatientTable } from './components/PatientTable';
import { StatsGrid } from './components/StatsGrid';

const Dashboard = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Clinical Dashboard</h2>
      <StatsGrid />
      <PatientTable />
    </div>
  );
};

const Patients = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Patient Management</h2>
      <PatientTable />
    </div>
  );
};

const Schedule = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Appointment Schedule</h2>
      <p className="text-gray-500">Schedule content goes here.</p>
    </div>
  );
};

const Settings = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">System Settings</h2>
      <p className="text-gray-500">Settings content goes here.</p>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 overflow-auto ml-64 bg-gray-50">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}