import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
// import Files from "../filecode/src/http/html/indexing";

function App() {
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#222225]">
      <div className="max-w-md w-full space-y-8">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/registration" element={<SignupPage />} />
            {/* <Route path="/files" element={<Files />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
