import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { Appbar } from 'components/appbar';
import { NotFoundPage } from 'pages/not-found';
import { ProtectedRoute } from 'components/protected-route';

import { routes } from 'routes/routes';
import { routesData } from './routes/routes-data';

function App() {
   const { pathname } = useLocation();

   const appbarDisabled = () => {
      const isBookmarksRoute = pathname.startsWith(routes().bookmarks);

      return pathname === routes().welcome || (isBookmarksRoute && !pathname.startsWith(routes().bookmarks));
   };

   return (
      <main>
         <Appbar disabled={appbarDisabled()} />
         <Routes>
            {routesData.map(({ Component, id, isAuth, path }) => (
               <Route
                  key={id}
                  path={path}
                  element={
                     isAuth ? (
                        <ProtectedRoute>
                           <Component />
                        </ProtectedRoute>
                     ) : (
                        <Component />
                     )
                  }
               />
            ))}
            <Route path='*' element={<NotFoundPage />} />
         </Routes>
      </main>
   );
}

export default App;
