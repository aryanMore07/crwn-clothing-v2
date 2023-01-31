import { useNavigate } from 'react-router-dom';
import { DirectoryContainer, Body, BgImg } from './directoryItem-styles';

const DirectoryItem = ({ category }) => {
  const { title, imageUrl, route } = category
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryContainer onClick={onNavigateHandler}>
      <BgImg imageUrl={imageUrl}/>
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryContainer>
  )
}

export default DirectoryItem;