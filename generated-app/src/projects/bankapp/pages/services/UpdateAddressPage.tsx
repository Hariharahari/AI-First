import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardHeader, Button, Input, Textarea } from '@heroui/react';

const UpdateAddressPage: React.FC = () => {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Address updated:', address);
      navigate('/services');
    } catch (error) {
      console.error('Failed to update address:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader title="Update Address" />
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Street"
              name="street"
              value={address.street}
              onChange={handleChange}
              required
            />
            <Input
              label="City"
              name="city"
              value={address.city}
              onChange={handleChange}
              required
            />
            <Input
              label="State"
              name="state"
              value={address.state}
              onChange={handleChange}
              required
            />
            <Input
              label="Zip Code"
              name="zipCode"
              value={address.zipCode}
              onChange={handleChange}
              required
            />
            <Input
              label="Country"
              name="country"
              value={address.country}
              onChange={handleChange}
              required
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Updating...' : 'Update Address'}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default UpdateAddressPage;