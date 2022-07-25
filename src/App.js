import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/home/Home'
import Login from './Components/login/Login';
import Signup from './Components/signup/Signup';
import PageNotFound from './Components/pagenotfound/PageNotFound';
import Cart from './Components/cart/Cart'
import UserProfile from './Components/userprofile/UserProfile';
import AddProducts from './Components/addproducts/AddProducts';
import AllProductPage from './Components/SomeProductComponent/AllProductPage';
import SpecificProductPage from './Components/specificproductpage/SpecificProductPage';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/home" element={<Home/>} />
          <Route exact path="/signup" element={<Signup/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/cart" element={<Cart/>} />
          <Route exact path="/userprofile" element={<UserProfile/>} />
          <Route exact path='/addproducts' element={<AddProducts />} />
          <Route exact path='/product-types/triton' element={<AllProductPage type={'Triton'} />} />
          <Route exact path='/product-types/rosco' element={<AllProductPage type={'Rosco'} />} />
          <Route exact path='/product-types/duracoat' element={<AllProductPage type={'Duracoat'} />} />
          <Route exact path='/product-types/odourfresh' element={<AllProductPage type={'Odourfresh'} />} />
          <Route exact path='/product-types/duraseal' element={<AllProductPage type={'Duraseal'} />} />
          <Route exact path='/product-types/lotus' element={<AllProductPage type={'Lotus'} />} />
          <Route exact path='/product-types/primecoat' element={<AllProductPage type={'Primecoat'} />} />
          <Route exact path='/product-types/acrilux' element={<AllProductPage type={'Acrilux'} />} />
          <Route path='/product/:type/:id' element={<SpecificProductPage />} />
          <Route exact path='/cartdata' element={<Cart />} />
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
