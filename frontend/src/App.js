import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Login from "./Login";
import Signup from "./Signup";
import Student from "./Student";
import Mentor from "./Mentor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/student" element={<Student />} />
        <Route path="/mentor" element={<Mentor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
