import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './navigation-styles.tsx';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import CartIcon from '../../components/cartIcon/CartIcon';
import CartDropDown from '../../components/cartDropDown/CartDropDown';
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation-styles';
import { selectCurrentUser } from '../../store/user/userSelector';
import { selectIsCartOpen } from '../../store/cart/cartSelector';
import { signOutStart } from '../../store/user/userAction';
import { FaUserAlt } from "react-icons/fa";

const Navigation = () => {

  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  
  const signOutHandler = () => dispatch(signOutStart());
  
  return (
    <Fragment>
        <NavigationContainer>
            <LogoContainer to='/'>
                <div>
                    <CrownLogo className='logo' />
                </div>
            </LogoContainer>
            <NavLinks >
                <NavLink to='/'>
                  <FaUserAlt /> &nbsp; {currentUser ? `Welcome, ${currentUser.displayName}` : 'Guest'}
                </NavLink>
                <NavLink to='/shop'>SHOP</NavLink>
                { currentUser ? (<NavLink as='span' onClick={signOutHandler}>SIGN OUT</NavLink>) : (<NavLink to='/auth'>SIGN IN</NavLink>) } 
              <CartIcon />
            </NavLinks>
              {isCartOpen && <CartDropDown />}
        </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;
