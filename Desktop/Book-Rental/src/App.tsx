import React from 'react';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Router from './routes';

function App() {
  return (
    <div className="App">
      <Router/>
      <ToastContainer
      position="bottom-right"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover/>
    </div>
  );
}

export default App;
