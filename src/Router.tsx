import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CarPage } from './pages/CarPage';
import { GaragePage } from './pages/GaragePage';
import { Navbar } from './components/Navbar';

export const Router = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/car/:carName" element={<CarPage />} />
        <Route path="/garage" element={<GaragePage />} />
      </Routes>
    </>
  );
}; 