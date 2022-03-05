import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from 'react-router';

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms/new" element={<NewRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
