import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import { NavigateChatBot, ScrollToTopButton } from '@/components/button';
import { useLocation } from 'react-router-dom';

const MainLayout = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname != '/chat-ai' && <NavigateChatBot />}
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
