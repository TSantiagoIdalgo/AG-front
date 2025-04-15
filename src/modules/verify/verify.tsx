import {User} from '#src/common/interfaces/review.interface.ts';
import {USER_ENDPOINT} from '#src/config/endpoints.ts';
import React from 'react';
import * as libs from './libs/verify-libs';
import Style from './verify.module.css';

export default function Verify(): React.JSX.Element {
  const [searchParams, setSearchParams] = libs.useSearchParams();
  const navigate = libs.useNavigate();
  const {data, loading} = libs.useFetchData<User>(USER_ENDPOINT.GET.verifyUser(), {
    query: {token: searchParams.get('access_token')}
  });

  libs.useEffect(() => {
    if (!searchParams.has('access_token')) navigate('/');
    if (!loading && data?.body.error) navigate('/');
    if (!loading && data?.body.data) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('access_token');
      setSearchParams(newParams);
      navigate('/');
    }


  }, [loading, data]);

  return (
    <main className={Style.main}>

    </main>
  );
}