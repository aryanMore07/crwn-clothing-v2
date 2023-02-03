import { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "./utils/firebase/Firebase";
import Home from './routes/home/Home.jsx';
import Navigation from './routes/navigation/Navigation.jsx';
import Authentication from './routes/authentication/Authentication.jsx';
import Shop from './routes/shop/Shop.jsx';
import CheckOut from './components/checkout/CheckOut.jsx';
import { setCurrentUser } from "./store/user/userAction";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }

      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<CheckOut />} />
      </Route>
    </Routes>
  )
};

export default App;
