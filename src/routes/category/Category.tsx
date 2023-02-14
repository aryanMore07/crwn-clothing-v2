import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/productCard/ProductCard';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/categorySelector';
import { CategoryContainer, Title } from './category-styles';
import { Spinner } from '../../components/spinner/Spinner';

type CategoryRouteParams = {
  category: string;
}

const Category = () => {

  const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading)
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      {
        isLoading ? (
            <Spinner />
          ) : (
            <CategoryContainer>
              {products &&
                products.map((product) => <ProductCard key={product.id} product={product} />)
              }
            </CategoryContainer>
          )
      }

    </Fragment>
  )

}

export default Category;
