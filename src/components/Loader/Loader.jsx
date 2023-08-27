import { ThreeDots } from 'react-loader-spinner';
import { LoaderContainer } from './loader.styled';

export const Loader = () => {
  return (
    <LoaderContainer>
      <ThreeDots height={40} width={40} />
    </LoaderContainer>
  );
};
