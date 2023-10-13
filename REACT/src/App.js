import './App.css';
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Quote from "./pages/Quote/Quote";
import QuoteHistory from "./pages/QuoteHistory/QuoteHistory";
import ModifyAccount from "./pages/ModifyAccount/ModifyAccount";
import CreateAccount from './pages/CreateAccount/CreateAccount';
import Navbar from "./components/Navbar";
import { Route, Routes } from 'react-router';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const Qclient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <div className="App">
      <QueryClientProvider client={Qclient}>
      <Navbar />
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/Quote" element={<Quote/>} />
            <Route path="/QuoteHistory" element={<QuoteHistory/>} />
            <Route path="/ModifyAccount" element={<ModifyAccount/>} />
            <Route path="/CreateAccount" element={<CreateAccount/>} />
            <Route path="/login" element={<Login/>} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
