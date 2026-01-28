import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@heroui/react";

const Dashboard: React.FC = () => {
  return (
    <main className="flex-1 p-6 overflow-y-auto">
      {/* Grid of 3 stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">$124,560</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">New Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">3,215</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Bounce Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">42%</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Dashboard;