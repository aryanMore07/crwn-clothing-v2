import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../categoriesPreview/CategoriesPreview';
import Category from '../category/Category';
import { useEffect } from 'react';
import { fetchCategoriesAsync } from '../../store/categories/categoryAction';
import { useDispatch } from 'react-redux';

const Shop = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesAsync());   
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  )
}

export default Shop;
