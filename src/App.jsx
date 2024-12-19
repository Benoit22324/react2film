import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { Movie } from "./pages/Movie";
import { Houses } from "./pages/Houses";

function App() {

	return (
		<>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/houses" element={<Houses />} />
        </Routes>
      </BrowserRouter>
		</>
	);
}

export default App;
