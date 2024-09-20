import { currentUser } from '@/lib/auth';

const ServerPage = async () => {
  const user = await currentUser();

  return (
    <div className='text-white'>
        {JSON.stringify(user)}
    </div>
  )
};

export default ServerPage;
