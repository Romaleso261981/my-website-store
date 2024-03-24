import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Spiner } from '@/features/Loader/Loader';
import { RoutersPaths } from '@/shared/types/enums';

import { Layout } from './layout';

const MainPage = lazy(() => import('../pages/MainPage/MainPage'));
const NotFound = lazy(() => import('../pages/Error-404/Error-404'));

export default function RootRouter() {
  return (
    <Suspense fallback={<Spiner />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={RoutersPaths.MAIN} element={<MainPage />} />
          <Route path={RoutersPaths.NOFOUND} element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
