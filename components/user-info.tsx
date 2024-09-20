// export const UserInfo = ({ user, label }: UserInfoProps) => {
//   return (
//     <Card className='w-[600px] shadown-md'>
//       <CardHeader>
//         <p className='text-2xl font-semibold text-center'>{label}</p>
//       </CardHeader>
//       <CardContent className='space-y-4'>
//         <pre className='flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm'>{JSON.stringify(user, null, 2)}</pre>
//         {/* <div className='flex flex-row items-center justify-between rounded-lg border p3 shadow-sm'>
//           <p className='text-sm font-medium'>ID</p>
//           <p className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-m'>{user?.id}</p>
//         </div>

//         <div className='flex flex-row items-center justify-between rounded-lg border p3 shadow-sm'>
//           <p className='text-sm font-medium'>Name</p>
//           <p className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-m'>{user?.name}</p>
//         </div>

//         <div className='flex flex-row items-center justify-between rounded-lg border p3 shadow-sm'>
//           <p className='text-sm font-medium'>Email</p>
//           <p className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-m'>{user?.email}</p>
//         </div>

//         <div className='flex flex-row items-center justify-between rounded-lg border p3 shadow-sm'>
//           <p className='text-sm font-medium'>Role</p>
//           <p className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-m'>{user?.role}</p>
//         </div>

//         <div className='flex flex-row items-center justify-between rounded-lg border p3 shadow-sm'>
//           <p className='text-sm font-medium'>Two Factor Authentication</p>
//           <Badge variant={user?.isTwoFactorEnabled ? 'sucess' : 'destructive'}>{user?.isTwoFactorEnabled ? 'ON' : 'OFF'}</Badge>
//         </div> */}
//       </CardContent>
//     </Card>
//   );
// };

import React from 'react';
import { ExtendedUser } from '@/next-auth';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

const JsonLikeValue = ({ value, isAuth = false }: { value: any; isAuth?: boolean }) => {
  if (isAuth) {
    return (
      <Badge variant={value === 'ON' ? 'sucess' : 'destructive'} className='ml-2 align-middle'>
        {value}
      </Badge>
    );
  }
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return (
      <span className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md inline-block align-middle'>
        {typeof value === 'string' ? `"${value}"` : String(value)}
      </span>
    );
  }
  if (value === null) {
    return <span className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md inline-block align-middle'>null</span>;
  }
  if (Array.isArray(value)) {
    return (
      <span className='align-middle'>
        [
        {value.map((item, index) => (
          <React.Fragment key={index}>
            <JsonLikeValue value={item} />
            {index < value.length - 1 && ', '}
          </React.Fragment>
        ))}
        ]
      </span>
    );
  }
  if (typeof value === 'object') {
    return <JsonLikeObject obj={value} />;
  }
  return null;
};

const JsonLikeObject = ({ obj }: { obj: Record<string, any> }) => {
  return (
    <div className='pl-4'>
      {'{'}
      {Object.entries(obj).map(([key, value], index, array) => (
        <div key={key} className='pl-4 flex items-center'>
          <span className='mr-2 align-middle'>{`"${key}":`}</span>
          <JsonLikeValue value={value} isAuth={key === 'twoFactorAuthentication'} />
          {index < array.length - 1 && ','}
        </div>
      ))}
      {'}'}
    </div>
  );
};

export const UserInfo = ({ user, label }: UserInfoProps) => {
  const { isTwoFactorEnabled, ...restUser } = user || {};
  
  const extendedUser = {
    ...restUser,
    twoFactorAuthentication: user?.isTwoFactorEnabled ? 'ON' : 'OFF',
  };
  // const extendedUser = user
  //   ? {
  //       ...user,
  //       twoFactorAuthentication: user.isTwoFactorEnabled ? 'ON' : 'OFF',
  //     }
  //   : {};

  return (
    <Card className='w-[600px] shadow-md'>
      <CardHeader>
        <p className='text-2xl font-semibold text-center'>{label}</p>
      </CardHeader>
      <CardContent>
        <div className='font-mono text-sm overflow-x-auto flex flex-row items-start justify-between rounded-lg border p-4 shadow-sm'>
          <JsonLikeObject obj={extendedUser} />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
