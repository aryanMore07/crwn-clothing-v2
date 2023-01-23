import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './routes/home/Home.jsx';
import Navigation from './routes/navigation/Navigation.jsx';
import SignIn from './routes/SignIn.jsx';

const Shop = () => {
  return (
    <div>
      Hello from The shop boi      
    <Outlet />
    </div>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='sign-in' element={<SignIn />} />
      </Route>
    </Routes>
  )
};

export default App;
