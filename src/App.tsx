import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BlogProvider } from './context/BlogContext';
import BlogResearch from './pages/BlogResearch';
import Admin from './pages/Admin';
import ResearchDetail from './pages/ResearchDetail';
import ResearchResults from './pages/ResearchResults';

function App() {
  return (
    <BlogProvider>
      <Router>
        <Routes>
          <Route path="/" element={<BlogResearch />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/pesquisa/:id" element={<ResearchDetail />} />
          <Route path="/resultado/:id" element={<ResearchResults />} />
        </Routes>
      </Router>
    </BlogProvider>
  );
}

export default App;
