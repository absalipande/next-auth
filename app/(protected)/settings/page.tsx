'use client';

import { useTransition } from 'react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { settings } from '@/actions/settings';
import { useSession } from 'next-auth/react';

const SettingsPage = () => {
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      settings({
        name: 'Something different',
      }).then(() => {
        update();
      });
    });
  };

  return (
    <Card className='w-[600px]'>
      <CardHeader>
        <p className='text-xl font-semibold text-center'>Settings</p>
      </CardHeader>
      <CardContent>
        <Button disabled={isPending} onClick={onClick}>
          Update name
        </Button>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
