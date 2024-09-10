import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './components/Login'
import Home from './components/Home';
import Product from './components/Product';
import Header from './components/Header';
import { useSelector } from 'react-redux';
import Cart from './components/Cart';


function App() {
  const loggedin=useSelector((state)=>state.login.loggedin)
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Header></Header>}>
      <Route index element={<Home/>}></Route>
      <Route path='cart' element={<Cart></Cart>}></Route>
      <Route path='product/:id' element={<Product></Product>}></Route>
      </Route>
      {loggedin?null:<Route path='login' element={<Login></Login>}></Route>}
    </Routes>
    </BrowserRouter>
  );
}

export default App;
