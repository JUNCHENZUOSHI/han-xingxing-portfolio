import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';
import Home from './pages/Home/Home';
import CaseDetail from './pages/CaseDetail/CaseDetail';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Resume from './pages/Resume/Resume';

function PageLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    const isHome = location.pathname === '/';
    document.body.classList.toggle('theme-dark', isHome);
    document.documentElement.classList.toggle('home-page', isHome);
  }, [location.pathname]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PageLayout>
            <Home />
          </PageLayout>
        }
      />
      <Route
        path="/case/:slug"
        element={
          <PageLayout>
            <CaseDetail />
          </PageLayout>
        }
      />
      <Route
        path="/about"
        element={
          <PageLayout>
            <About />
          </PageLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <PageLayout>
            <Contact />
          </PageLayout>
        }
      />
      <Route
        path="/resume"
        element={
          <PageLayout>
            <Resume />
          </PageLayout>
        }
      />
    </Routes>
  );
}
