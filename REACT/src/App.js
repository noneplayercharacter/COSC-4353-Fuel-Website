import './App.css';
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Quote from "./pages/Quote/Quote";
import QuoteHistory from "./pages/QuoteHistory/QuoteHistory";
import ModifyAccount from "./pages/ModifyAccount/ModifyAccount";
import CreateAccount from './pages/CreateAccount/CreateAccount';
import Navbar from "./components/Navbar";
import { Route, Routes } from 'react-router';

function App() {
  return (
    <div className="App">
      <Navbar />
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/Quote" element={<Quote/>} />
            <Route path="/QuoteHistory" element={<QuoteHistory/>} />
            <Route path="/ModifyAccount" element={<ModifyAccount/>} />
            <Route path="/CreateAccount" element={<CreateAccount/>} />
            <Route path="/login" element={<Login/>} />
        </Routes>
    </div>
  );
}

export default App;
