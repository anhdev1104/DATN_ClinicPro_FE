import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import { ScrollToTopButton } from '@/components/button';

const MainLayout = () => {
  return (
    <>
      <ScrollToTopButton />
      <main className="overflow-x-hidden min-h-dvh">
        <Header />
        <div className="mt-28 md:mt-24">
          <Outlet />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default MainLayout;
