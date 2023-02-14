import { FC } from 'react';
import ProductCard from '../productCard/ProductCard';
import {CategoryContainer, CategoryTitle, CategoryPreviewDiv} from './categoryPreview-styles';
import { CategoryItem } from '../../store/categories/categoryTypes';

type CategoryPreviewProps = {
    title: string;
    products: CategoryItem[];
  };

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
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
