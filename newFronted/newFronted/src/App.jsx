import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layouts/navbar';
import Footer from './components/layouts/footer';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Login from './pages/login';
import Register from './pages/register';
import RCPCounter from './components/ui/rcpCounter';
import MedicalSurveys from './pages/Encuesta'; // Importa el componente MedicalSurveys

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/encuesta" element={<MedicalSurveys />} /> {/* Añade la ruta para MedicalSurveys */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;