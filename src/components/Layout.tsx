import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MobileNav from './MobileNav';

export default function Layout() {
  const loc = useLocation();
  const path = loc.pathname;
  const isChat = path === '/chat';
  const isAdmin = path.startsWith('/admin');

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors pb-16 md:pb-0">
        {!isChat && <Header />}
        <div className="flex-1">
          <Outlet />
        </div>
        {!isChat && !isAdmin && <Footer />}
      </div>
      {!isChat && <MobileNav />}
    </>
  );
}
