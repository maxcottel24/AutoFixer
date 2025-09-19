import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './hooks/useCart';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { CarPage } from './pages/CarPage';
import { GaragePage } from './pages/GaragePage';
import { DesignPage } from './pages/Design';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen bg-gray-800">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/car/:carName" element={<CarPage />} />
            <Route path="/garage" element={<GaragePage />} />
            <Route path="/design" element={<DesignPage />} />
          </Routes>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;