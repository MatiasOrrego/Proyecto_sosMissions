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
import Button from './components/ui/button';

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
          </Routes>
          <div className="p-4">
            <RCPCounter />
            <Button onClick={() => alert('Button clicked!')}>Click Me</Button>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;