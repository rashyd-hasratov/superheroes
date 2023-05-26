import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom';

import { HomePage } from '../pages/HomePage/HomePage';
import { AddPage } from '../pages/AddPage/AddPage';
import { SuperheroPage } from '../pages/SuperheroPage/SuperheroPage';
import { EditPage } from '../pages/EditPage/EditPage';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path="add" element={<AddPage />} /> 
      <Route path=":nickname/edit" element={<EditPage />} />
      <Route path=":nickname" element={<SuperheroPage />} />
    </Route>,
  ),
);