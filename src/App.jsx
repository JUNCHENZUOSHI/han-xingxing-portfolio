import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';
import Home from './pages/Home/Home';
import CaseDetail from './pages/CaseDetail/CaseDetail';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';

function PageLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
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
    </Routes>
  );
}
