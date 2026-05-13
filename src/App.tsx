import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BlogProvider } from './context/BlogContext';
import BlogResearch from './pages/BlogResearch';
import Admin from './pages/Admin';
import ResearchDetail from './pages/ResearchDetail';
import ResearchResults from './pages/ResearchResults';
import About from './pages/About';
import Contact from './pages/Contact';
import ContentList from './pages/ContentList';
import ArticleDetail from './pages/ArticleDetail';

function App() {
  return (
    <BlogProvider>
      <Router>
        <Routes>
          <Route path="/" element={<BlogResearch />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/conteudo" element={<ContentList />} />
          <Route path="/artigo/:id" element={<ArticleDetail />} />
          <Route path="/pesquisa/:id" element={<ResearchDetail />} />
          <Route path="/resultado/:id" element={<ResearchResults />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/contato" element={<Contact />} />
        </Routes>
      </Router>
    </BlogProvider>
  );
}

export default App;
