import React from 'react';
import ProductCard from '../productCard/ProductCard';
import {CategoryContainer, CategoryTitle, CategoryPreviewDiv} from './categoryPreview-styles';

const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryContainer>
        <h2>
            <CategoryTitle to={title} >
                {title.toUpperCase()}
            </CategoryTitle>
        </h2>
        <CategoryPreviewDiv>
            {
                products
                    .filter((_, idx) => idx < 4)
                    .map((product) => <ProductCard key={product.id} product={product} />)
            }   
        </CategoryPreviewDiv>
    </CategoryContainer>
  )
}

export default CategoryPreview;
