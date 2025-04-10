import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import TurbineList from './turbines/TurbineList';
import TurbineDetail from './turbines/TurbineDetail';
import TurbineForm from './turbines/TurbineForm';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<TurbineList />} />
        <Route path="turbines" element={<TurbineList />} />
        <Route path="turbines/:id" element={<TurbineDetail />} />
        <Route path="new" element={<TurbineForm />} />
        <Route path="turbines/edit/:id" element={<TurbineForm />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
