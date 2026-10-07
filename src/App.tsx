/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import ContactPage from "./pages/ContactPage";
import BlogPage from "./pages/BlogPage";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AdminApp } from "./admin/AdminApp";

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route path="/admin/*" element={<AdminApp />} />
            <Route
              path="/*"
              element={
                <div className="flex min-h-screen flex-col">
                  <Navbar />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/projects" element={<Home section="projects" />} />
                      <Route path="/project/:id" element={<ProjectDetail />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/blog" element={<BlogPage />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}
