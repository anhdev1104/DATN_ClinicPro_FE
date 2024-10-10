import Http from '@/helpers/http';
import React, { useEffect } from 'react';

const NotFoundPage = () => {
  const http = new Http();

  useEffect(() => {
    (async () => {
      const data = await http.get('/auth/profile');
      console.log(data);
    })();
  }, []);
  return <div>Not Found Page</div>;
};

export default NotFoundPage;
