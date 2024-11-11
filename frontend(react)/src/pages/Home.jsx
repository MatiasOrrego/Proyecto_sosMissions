import { useState, useEffect } from 'react';
import { Activity, Video, Plus, ClipboardList } from 'lucide-react';
import FloatingButton from '../components/FloatingButton';
import BackgroundCanvas from '../components/BackgroundCanvas';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CategoryCard from '../components/CategoryCard';
import FeatureCard from '../components/FeatureCard';

export default function Home () {
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      title: 'Videos e Imágenes',
      description: 'Mira demostraciones en videos o imágenes para conocer mejor las técnicas.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80'
    },
    {
      title: 'Aprende técnicas de emergencia',
      description: 'Descubre todo tipo de técnicas para situaciones de emergencia.',
      image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80'
    },
    {
      title: 'Comparte tu opinión',
      description: 'Comenta y participa en las discusiones de técnicas y situaciones de emergencia.',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80'
    }
  ];

  const categories = [
    { title: 'Maniobras de Heimlich', image: 'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?auto=format&fit=crop&q=80' },
    { title: 'Maniobras de RCP', image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80' },
    { title: 'Tratamiento de Quemaduras', image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80' },
    { title: 'Control de Hemorragias', image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80' },
    { title: 'Tratamiento de Heridas', image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80' },
    { title: 'Respiración de Rescate', image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80' }
  ];

  return (
    <div className="min-h-screen">
      <BackgroundCanvas />
      <Navbar isSticky={isHeaderSticky} />
      
      <div className="relative pt-16">
        <div className="flex items-center justify-center text-center text-white min-h-[calc(100vh-4rem)]">
          <div className="max-w-4xl px-4">
            <h1 className="text-5xl font-bold mb-6 flex items-center justify-center">
              <Activity className="w-12 h-12 mr-4" />
              Saber actuar es salvar vidas
              <Activity className="w-12 h-12 ml-4" />
            </h1>
            <p className="text-2xl text-gray-200">
              Conoce los pasos clave para manejar emergencias de manera efectiva
            </p>
            <div className="mt-12">
              <div className="flex justify-center space-y-2">
                <div className="animate-bounce">
                  <div className="w-6 h-6 border-2 border-white transform rotate-45 mb-2"></div>
                  <div className="w-6 h-6 border-2 border-white transform rotate-45"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="relative z-20">
          <section className="py-20 px-4 bg-white">
            <div className="text-center mb-16">
              <h3 className="text-gray-600 text-xl mb-2">COMO FUNCIONA SOSDoc</h3>
              <h2 className="text-4xl font-bold">Avalado por médicos, para los usuarios</h2>
            </div>
            
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </section>

          <section className="py-20 bg-gradient-to-br from-[#c4032d] via-[#740620] to-[#030c15]">
            <h2 className="text-center text-4xl font-bold mb-16 text-white">
              Algunas de nuestras categorías
            </h2>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
              {categories.map((category, index) => (
                <CategoryCard key={index} {...category} />
              ))}
            </div>
          </section>
        </main>

        <div className="fixed bottom-4 right-4 flex flex-col gap-4 z-50">
          <FloatingButton href="/quiz" icon={ClipboardList} />
          <FloatingButton href="/video" icon={Video} />
          <FloatingButton href="/post" icon={Plus} />
        </div>
      </div>

      <Footer />
    </div>
  );
}