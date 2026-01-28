import React from 'react';
import { Avatar } from '@heroui/react';

export default function User({
  name,
  src,
}: {
  name: string;
  src: string;
}) {
  return (
    <Avatar name={name} src={src} size="md" variant="subtle" className="border border-white" />
  );
}