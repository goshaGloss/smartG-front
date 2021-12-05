import {BrowserRouter as Router,Route , Routes } from 'react-router-dom';

import MainPage from './pages/MainPage/MainPage';
import Catalog from './pages/Catalog/Catalog';
import About from './pages/About/About';
import Header from './components/Header';
import Footer from './components/Footer';
import CardDetail from './pages/CardDetail/CardDetail';
import Basket from './pages/Basket/Basket';
import './App.css';

// const routes = [
//   {
//     path: "/cabinet",
//     component: Cabinet,
//     routes: [
//       {
//         path: "/cabinet/favorite",
//         component: Favorite
//       },
//       {
//         path: "/cabinet/profile",
//         component: Profile
//       },
//       {
//         path: "/cabinet/history",
//         component: History
//       },
//       {
//         path: "/cabinet/logout",
//         component: Logout
//       }
//     ]
//   }
// ];

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/catalog" element={<Catalog/>}/>
        <Route path="/catalog/:id" element={<Catalog/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/product/:id" element={<CardDetail/>}/>
        <Route path="/basket" element={<Basket/>}/>
        {/* {
          routes.map((route,i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))
        } */}
      </Routes>
      {/* "start": "react-scripts start", */}

      <Footer/>
    </Router>
  );
}

export default App;
