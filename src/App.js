import "./App.css";
import Layout from "./app-layout";
import Home from "./home";
import Elections from "./elections";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Candidate from "./candidates";
import LoginPage from "./login-page";
import AuthState, { useAuth } from "./AuthState";

function App() {
  return (
    <BrowserRouter>
      {/* <Layout/> */}
      <AuthState>
        <Routes>
          {/* <Route index element={<LoginPage />} /> */}
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/election" element={<Elections />} />
            <Route path="/candidate" element={<Candidate />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </AuthState>
    </BrowserRouter>
  );
}

export default App;
