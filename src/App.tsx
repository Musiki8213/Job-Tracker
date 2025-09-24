import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landingpage/Landing";
import Login from "./pages/Loginpage/Login";
import Register from "./pages/Registerpage/Register";
import Home from "./pages/Homepage/Home";
import JobDetails from "./pages/Jobpage/JobDetails";
import NotFound from "./pages/Notfoundpage/NotFound";
import { AuthContext } from "./Context/AuthContext";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
