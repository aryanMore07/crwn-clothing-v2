import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/Home.jsx';
import Navigation from './routes/navigation/Navigation.jsx';
import Authentication from './routes/authentication/Authentication.jsx';
import Shop from './routes/shop/Shop.jsx';
import CheckOut from './components/checkout/CheckOut.jsx';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<CheckOut />} />
      </Route>
    </Routes>
  )
};

export default App;
