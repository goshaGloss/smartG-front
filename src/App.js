import {BrowserRouter as Router,Route , Routes } from 'react-router-dom';

import MainPage from './pages/MainPage/MainPage';
import Catalog from './pages/Catalog/Catalog';
import About from './pages/About/About';
import Header from './components/Header';
import Footer from './components/Footer';
import CardDetail from './pages/CardDetail/CardDetail';
import Basket from './pages/Basket/Basket';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Reset from './pages/Auth/Reset';
import Confirm from './pages/Auth/Confirm'
import PasswordUpdate from './pages/Auth/PasswordUpdate';
import Cabinet from "./pages/Cabinet/Cabinet";
import {Favorite} from './pages/Cabinet/Components/Favorite';
import {Profile} from './pages/Cabinet/Components/Profile';
import {History} from './pages/Cabinet/Components/History';
import {Logout} from "./pages/Cabinet/Components/Logout";
import Order from "./pages/Order/Order";
import BrandInfo from "./pages/BrandInfo/BrandInfo";
import Delivery from "./pages/Delivery/Delivery";
import WholeSale from "./pages/WholeSale/WholeSale";
import Service from "./pages/Service/Service";
import Partners from "./pages/Partners/Partners";
import './App.css';

const routes = [
      {
        path: "/cabinet/favorite",
        component: <Favorite/>
      },
      {
        path: "/cabinet/profile",
        component: <Profile/>
      },
      {
        path: "/cabinet/history",
        component: <History/>
      },
      {
        path: "/cabinet/logout",
        component: <Logout/>
      }
];

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
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/reset" element={<Reset/>}/>
        <Route path="/confirm" element={<Confirm/>}/>
        <Route path="/update" element={<PasswordUpdate/>}/>
        <Route path="/cabinet" element={<Cabinet routes={routes}/>}>
          {
            routes.map((route,i) => 
            <Route 
              key={i} 
              path={route.path} 
              element={route.component} 
              {...route}/>)
          }
        </Route>
        <Route path="/brand" element={<BrandInfo/>}/>
        <Route path="/order" element={<Order/>}/>
        <Route path="/delivery" element={<Delivery/>}/>
        <Route path="/wholesale" element={<WholeSale/>}/>
        <Route path="/service" element={<Service/>}/>
        <Route path="/partners" element={<Partners/>}/>
        </Routes>
      {/* "start": "react-scripts start", */}

      <Footer/>
    </Router>
  );
}

// export function RouteWithSubRoutes(route) {
//   return (
//     <Route
//       path={route.path}
//       // render={props => (
//       //   // pass the sub-routes down to keep nesting
//       //   <route.component {...props} routes={route.routes} />
//       // )}
//     />
//   );
// }

export default App;
