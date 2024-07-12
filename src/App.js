import { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './redux/product/product.slice';
import { fetchCategory } from './redux/product/category.slice';
import { fetchGood } from './redux/product/good.slice';
import { fetchCompany } from './redux/product/company.slice';
import Home from './pages/Home';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Category } from './pages/Category';
import Company from './pages/Company';
import Good from './pages/Good';

function App() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.product.data);
  const categories = useSelector(state =>  state.category.data);
  const goods = useSelector(state => state.good.data )
  const companies = useSelector(state => state.company.data);

  useEffect(()=>{
    dispatch(fetchProducts());
    dispatch(fetchCategory())
    dispatch(fetchGood());
    dispatch(fetchCompany())
  }, [dispatch])

  useEffect(()=>{
    console.log(products)
    console.log(categories);
    console.log(goods)
    console.log(companies)
  },[products, categories, goods, companies])

  return (
    <div className="App">
      <BrowserRouter>
      <nav className="App-header">
        <Navbar />
      </nav>
      <Routes>
        <Route exact path='/' element = {<Home />} />
        <Route  path='/category' element = {<Category />} />
        <Route  path='/company' element = {<Company />} />
        <Route  path='/good' element = {<Good />} />
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
