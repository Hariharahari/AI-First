import { Card, CardHeader, CardBody } from '@heroui/react';
import { useBankingStore } from '../store/useBankingStore';
import { Button } from '@heroui/react';
import {
  CreditCard,
  Home,
  Mail,
  MapPin,
  FileText,
  UserPlus,
  BookOpen,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

const serviceIcons = {
  'Cheque Book Request': BookOpen,
  'Update Address': MapPin,
  'Generate PIN': CreditCard,
  'Update Email': Mail,
  'Request Statement': FileText,
  'Add Beneficiary': UserPlus
};

const serviceDescriptions = {
  'Cheque Book Request': 'Request a new cheque book for your account',
  'Update Address': 'Update your registered address with the bank',
  'Generate PIN': 'Generate or reset your ATM/Debit Card PIN',
  'Update Email': 'Update your registered email address',
  'Request Statement': 'Request account statement for a specific period',
  'Add Beneficiary': 'Add a new beneficiary for fund transfers'
};

export default function ServicesPage() {
  const services = useBankingStore((state) => state.services);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Banking Services</h1>
      <p className="text-gray-600">Manage your banking needs conveniently</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const Icon = serviceIcons[service as keyof typeof serviceIcons] || ShieldCheck;
          const routePath = `/services/${service.toLowerCase().replace(/\s+/g, '-')}`;
          return (
            <Card key={service} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-orange-100">
                    <Icon className="h-6 w-6 text-orange-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{service}</h3>
                </div>
              </CardHeader>
              <CardBody className="space-y-3">
                <p className="text-sm text-gray-600">
                  {serviceDescriptions[service as keyof typeof serviceDescriptions]}
                </p>
                <Link to={routePath} className="block">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    Request Service
                  </Button>
                </Link>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
}