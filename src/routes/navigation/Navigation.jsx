import React, { Fragment } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './navigation.scss';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';

const Navigation = () => {
  return (
    <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <div>
                    <CrownLogo className='logo' />
                </div>
            </Link>
            <div className='nav-links-container'>
                <Link className='nav-link' to='/shop'>Shop</Link>
                <Link className='nav-link' to='/auth'>Sign In</Link>
            </div>
        </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;
