import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
