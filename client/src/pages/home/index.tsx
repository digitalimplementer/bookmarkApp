import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from 'store/hooks';
import { routes } from 'routes/routes';
import { authState } from 'store/auth/auth.slice';
import { PageWrapper } from 'wrappers/page-wrapper';

export function HomePage() {
   const { authMethod } = useAppSelector(authState);
   const navigate = useNavigate();

   window.onpopstate = () => {
      navigate(routes().home);
   };

   return (
      <PageWrapper>
         <div>Home Page</div>
      </PageWrapper>
   );
}
