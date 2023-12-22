import logo from './logo.svg';
import './App.css';
import Layout from './app-layout';
import Home from './home';
import Elections from './elections';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {

  const [states, setStates] = useState([]);

  useEffect(() => {
    var url = "http://localhost:8080/states";
    fetchData(url, getStates);
  }, []);

  function fetchData(url, callback) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("fetchData: ", data);
        callback(data);
      })
      .catch((error) => {
        console.error("Error fetching photos:", error);
        callback([]);
      });
  }

  function getStates(states) {
    setStates(states);
  }
  return (
    <BrowserRouter>
    {/* <Layout/> */}
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/election" element={<Elections states = {states} />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
