import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LoginButton } from '@/components/auth/login-button';

import { Poppins } from 'next/font/google';

const font = Poppins({ subsets: ['latin'], weight: ['600'] });

export default function Home() {
  return (
    <main className='flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 to-zinc-950'>
      <div className='space-y-6 text-center'>
        <h1 className={cn('text-5xl font-semibold text-white drop-shadow-md', font.className)}>♙Auth</h1>
        <p className='text-white text-lg'>A simple authentication service</p>
        <div>
          <LoginButton>
            <Button variant={'secondary'} size={'lg'}>
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
