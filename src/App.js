import logo from './logo.svg';
import './App.css';
import Layout from './app-layout';
import Home from './home';
import Elections from './elections';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    {/* <Layout/> */}
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/election" element={<Elections />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
