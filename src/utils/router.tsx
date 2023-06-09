import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom';

import { MainLayout } from '../components/MainLayout/MainLayout';
import { HomePage } from '../pages/HomePage/HomePage';
import { AddPage } from '../pages/AddPage/AddPage';
import { SuperheroPage } from '../pages/SuperheroPage/SuperheroPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path="add" element={<AddPage />} /> 
      <Route path=":nickname" element={<SuperheroPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Route>,
  ),
);