import { create } from 'zustand';

interface Vitals {
  bp: string;
  heartRate: number;
  temp: string;
}

interface Patient {
  id: string;
  name: string;
  mrn: string;
  age: number;
  diagnosis: string;
  vitals: Vitals;
  status: 'Critical' | 'Observation' | 'Stable';
  nextAppt: string;
  avatar: string;
}

interface PatientStore {
  patients: Patient[];
  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, updatedPatient: Partial<Patient>) => void;
  deletePatient: (id: string) => void;
}

const preSeededPatients: Patient[] = [
  {
    id: '1',
    name: 'Sarah Connor',
    mrn: '9942',
    age: 45,
    diagnosis: 'Hypertension with complications',
    vitals: { bp: '145/90', heartRate: 88, temp: '98.6°F' },
    status: 'Critical',
    nextAppt: '2023-11-01',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
  },
  {
    id: '2',
    name: 'John McClane',
    mrn: '8824',
    age: 52,
    diagnosis: 'Post-operative recovery from knee surgery',
    vitals: { bp: '120/80', heartRate: 72, temp: '98.4°F' },
    status: 'Stable',
    nextAppt: '2023-10-25',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
  },
  {
    id: '3',
    name: 'Ellie Williams',
    mrn: '7419',
    age: 28,
    diagnosis: 'Type 1 Diabetes with routine monitoring',
    vitals: { bp: '110/70', heartRate: 68, temp: '98.2°F' },
    status: 'Stable',
    nextAppt: '2023-10-18',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
  },
  {
    id: '4',
    name: 'Marcus Wright',
    mrn: '5536',
    age: 68,
    diagnosis: 'Chronic Obstructive Pulmonary Disease (COPD)',
    vitals: { bp: '130/85', heartRate: 78, temp: '98.7°F' },
    status: 'Observation',
    nextAppt: '2023-10-20',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
  },
  {
    id: '5',
    name: 'Ava Chen',
    mrn: '6321',
    age: 34,
    diagnosis: 'Migraine management with preventive medication',
    vitals: { bp: '115/75', heartRate: 70, temp: '98.3°F' },
    status: 'Stable',
    nextAppt: '2023-11-05',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
  },
  {
    id: '6',
    name: 'James Carter',
    mrn: '4789',
    age: 58,
    diagnosis: 'Coronary Artery Disease with stent placement',
    vitals: { bp: '135/88', heartRate: 75, temp: '98.5°F' },
    status: 'Observation',
    nextAppt: '2023-10-22',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
  },
];

export const usePatientStore = create<PatientStore>((set) => ({
  patients: preSeededPatients,
  addPatient: (patient) => set((state) => ({
    patients: [...state.patients, patient],
  })),
  updatePatient: (id, updatedPatient) => set((state) => ({
    patients: state.patients.map(p => p.id === id ? { ...p, ...updatedPatient } : p),
  })),
  deletePatient: (id) => set((state) => ({
    patients: state.patients.filter(p => p.id !== id),
  })),
}));