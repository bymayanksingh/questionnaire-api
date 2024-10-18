import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Questions from './components/Questions';
import Categories from './components/Categories';
import Answers from './components/Answers';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <nav className="w-64 bg-gray-800 text-white p-6">
          <ul className="space-y-4">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? "font-bold text-blue-400" : "hover:text-blue-400"}>Questions</NavLink>
            </li>
            <li>
              <NavLink to="/categories" className={({ isActive }) => isActive ? "font-bold text-blue-400" : "hover:text-blue-400"}>Categories</NavLink>
            </li>
            <li>
              <NavLink to="/answers" className={({ isActive }) => isActive ? "font-bold text-blue-400" : "hover:text-blue-400"}>Answers</NavLink>
            </li>
          </ul>
        </nav>

        <div className="flex-grow p-6 bg-gray-100">
          <Routes>
            <Route path="/" element={<Questions />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/answers" element={<Answers />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;