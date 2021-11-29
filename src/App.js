import {BrowserRouter as Router,Route , Routes } from 'react-router-dom';

import MainPage from './pages/MainPage/MainPage';
import Header from './components/Header';
import Footer from './components/Footer'
import './App.css';

function App() {
  console.log(MainPage)
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
      </Routes>
      {/* "start": "react-scripts start", */}

      <Footer/>
    </Router>
  );
}

export default App;
