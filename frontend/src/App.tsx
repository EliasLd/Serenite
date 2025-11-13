import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Authentication from "./pages/Authentication";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Authentication />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
