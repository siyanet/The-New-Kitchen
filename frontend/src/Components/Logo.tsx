import { useEffect } from 'react';
// adjust path as needed
import { fetchTenantInfo } from '../Redux/TenantSlice';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';


const Logo = () => {
  const dispatch = useAppDispatch();
  const { tenant, status } = useAppSelector((state) => state.tenant);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTenantInfo());
    }
  }, [dispatch, status]);

  if (status === 'loading' || !tenant) {
    return <h1 className="text-3xl font-bold text-red font-fredoka">Loading...</h1>;
  }

  // Split the name into two parts if desired, e.g., "Pizza Hut"
  const [firstWord, ...rest] = tenant.name.split(' ');
  const secondWord = rest.join(' ');

  return (
    <>
      <h1 className="inline pr-1 text-3xl font-bold text-red font-fredoka">{firstWord}</h1>
      <h1 className="inline text-3xl font-bold text-yellow font-fredoka">{secondWord}</h1>
    </>
  );
};

export default Logo;
