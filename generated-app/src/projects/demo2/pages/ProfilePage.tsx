import { Card, CardHeader, CardBody } from '@heroui/react';
import { useBankingStore } from '../store/useBankingStore';
import { Avatar } from '@heroui/react';
import { User, Mail, Phone } from 'lucide-react';

export default function ProfilePage() {
  const profile = useBankingStore((state) => state.profile);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-xl font-bold text-gray-800 text-center">Your Profile</h1>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-20 w-20 bg-orange-500 text-white">
              <span className="text-2xl font-medium">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </span>
            </Avatar>
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800">{profile.name}</h2>
              <p className="text-sm text-gray-500">Customer ID: {profile.id}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-orange-500" />
              <div>
                <div className="text-sm text-gray-500">Email</div>
                <div className="text-gray-800">{profile.email}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-orange-500" />
              <div>
                <div className="text-sm text-gray-500">Phone</div>
                <div className="text-gray-800">{profile.phone}</div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}