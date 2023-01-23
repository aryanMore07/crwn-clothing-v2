import React from 'react';
import './directory.scss';
import CategoryItem from '../components/categoryItem/CategoryItem';


const Directory = ({categories}) => {
  return (
    <div className='directory-container'>
      {
        categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))
      }
    </div>
  )
}

export default Directory
