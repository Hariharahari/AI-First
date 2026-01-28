import { usePatientStore } from '../store/usePatientStore';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Avatar, Badge } from '@heroui/react';
import { Edit, Eye } from 'lucide-react';

export const PatientTable = () => {
  const { patients } = usePatientStore();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical':
        return 'danger';
      case 'Observation':
        return 'warning';
      case 'Stable':
        return 'success';
      default:
        return 'default';
    }
  };

  const getVitalsBadgeColor = (bp: string) => {
    const systolic = parseInt(bp.split('/')[0]);
    return systolic > 140 ? 'danger' : 'default';
  };

  return (
    <Table className="mt-4">
      <TableHeader>
        <TableColumn>Patient Info</TableColumn>
        <TableColumn>Diagnosis</TableColumn>
        <TableColumn>Vitals</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      <TableBody>
        {patients.map((patient) => (
          <TableRow key={patient.id}>
            <TableCell>
              <div className="flex items-center">
                <Avatar src={patient.avatar} alt={patient.name} className="w-8 h-8 mr-3" />
                <div>
                  <p className="font-medium">{patient.name}</p>
                  <p className="text-xs text-gray-500">MRN: {patient.mrn}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <p className="text-sm">{patient.diagnosis}</p>
            </TableCell>
            <TableCell>
              <div className="flex flex-col space-y-1">
                <Badge color={getVitalsBadgeColor(patient.vitals.bp)} className="w-fit">
                  BP: {patient.vitals.bp}
                </Badge>
                <span className="text-xs text-gray-500">HR: {patient.vitals.heartRate} bpm</span>
                <span className="text-xs text-gray-500">Temp: {patient.vitals.temp}</span>
              </div>
            </TableCell>
            <TableCell>
              <Chip color={getStatusColor(patient.status)}>{patient.status}</Chip>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <button className="text-blue-500 hover:text-blue-700">
                  <Eye className="w-5 h-5" />
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <Edit className="w-5 h-5" />
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};