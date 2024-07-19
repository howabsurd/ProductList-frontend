import { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './redux/product/product.slice';
import { fetchCategory } from './redux/product/category.slice';
import { fetchGood } from './redux/product/good.slice';
import { fetchCompany } from './redux/product/company.slice';
import Home from './pages/Home';
import { BrowserRouter , Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Category } from './pages/Category';
import Company from './pages/Company';
import Good from './pages/Good';
import Login from './pages/Login';
import { loadUserFromStorage } from './redux/product/user.slice';
import SignUp from './pages/Signup';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  useEffect(()=>{
    dispatch(fetchProducts());
    dispatch(fetchCategory())
    dispatch(fetchGood());
    dispatch(fetchCompany())
  }, [dispatch])


  return (
    <div className="App">
      <BrowserRouter>
      <nav className="App-header">
        <Navbar />
      </nav>
      <Routes>
      <Route path='/login' element={!user ? <Login /> : <Navigate to="/"/>} />
      <Route path='/signup' element={ <SignUp />}  />
      <Route path='/' element={user ? <Home /> : <Navigate to="/login"/>} />
        <Route  path='/category' element = {user  ? <Category /> : <Navigate to="/login"/>} />
        <Route  path='/company' element = {user ? <Company /> : <Navigate to="/login"/>} />
        <Route  path='/good' element = {user ? <Good /> : <Navigate to="/login"/>} />
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
