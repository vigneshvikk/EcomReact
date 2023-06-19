import { Route, Routes } from 'react-router-dom';
import './App.css';
import Headers from './Component/Headers';
import Home from './page/Home';
import About from './page/About';
import Menu from './page/Menu';
import Contact from './page/Contact';
import Login from './page/Login';
import Newproduct from './page/Newproduct';
import Signup from './page/Signup';
import toast, { Toaster } from 'react-hot-toast';
import Admin from './page/Admin';
import Cart from './page/Cart';




function App() {
  return (
<>
  


        <div>
        <Toaster />
      <Headers/>
    
    
    
      <Routes>
      <Route path="" element={<Home/>}/>
      <Route path="about" element={<About/>}/>
      <Route path='menu/:filterby' element={<Menu/>}/>
      <Route path='contact' element={<Contact/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='signup' element={<Signup/>}/>
      <Route path='newproduct' element={<Newproduct/>}/>
      <Route path='admin' element={<Admin/>}/>
      <Route path='cart' element={<Cart/>}/>
    </Routes>
      
    
      
        </div>
</>

  );
}

export default App;
