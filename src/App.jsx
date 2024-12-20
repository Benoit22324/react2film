import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { Movie } from "./pages/Movie";
import { Houses } from "./pages/Houses";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";

function App() {

	return (
		<>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/houses" element={<Houses />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
		</>
	);
}

export default App;
