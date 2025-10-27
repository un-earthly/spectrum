import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@spectrum/web';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ButtonPage } from './pages/ButtonPage';
import { CardPage } from './pages/CardPage';
import { InputPage } from './pages/InputPage';
import { BadgePage } from './pages/BadgePage';
import { AvatarPage } from './pages/AvatarPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { ThemeCustomizerPage } from './pages/ThemeCustomizerPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/button" element={<ButtonPage />} />
            <Route path="/card" element={<CardPage />} />
            <Route path="/input" element={<InputPage />} />
            <Route path="/badge" element={<BadgePage />} />
            <Route path="/avatar" element={<AvatarPage />} />
            <Route path="/playground" element={<PlaygroundPage />} />
            <Route path="/theme-customizer" element={<ThemeCustomizerPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
