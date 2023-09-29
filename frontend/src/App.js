import logo from './logo.svg';
import './App.css';
import Company from './components/administrator/Company';
import DispalyAllCompanies from './components/administrator/DisplayAllCompanies';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './components/userInterface/screens/Home';
import ProductDetails from './components/userInterface/screens/ProductDetails';
import HomePageDrawer from './components/userInterface/usercomponents/HomePageDrawer';
import AdminLogin from './components/administrator2/AdminLogin'
import DisplayAllProducts from './components/administrator2/DisplayAllProducts';
import CategoryDetails from './components/userInterface/screens/CategoryDetails';
import Dashboard from './components/administrator2/Dashboard';
import Cart from './components/userInterface/screens/Cart';
function App() {
 
  return (
    <Router>
      <Routes>
        <Route element={<Company/>} path={'/company'} />
        <Route element={<DispalyAllCompanies/>} path={'/displayallcompanies'} />
      
        
        <Route element={<CategoryDetails/>} path={'/categorydetails'}/>
        <Route element={<HomePageDrawer/>} path={'/homepagedrawer'}/>
        <Route element={<AdminLogin/>} path={'/adminlogin'}/>
        <Route element={<Home/>} path={'/home'}/>
        <Route element={<Cart/>} path={'/cart'}/>
        <Route element={<ProductDetails/>} path={'/productdetails'}/>
        <Route element={<Dashboard/>} path={'/dashboard/*'}/>
      </Routes>
    </Router>
  
  )
}

export default App;
