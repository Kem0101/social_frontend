import { useContext } from 'react';
import PublicationContext from '../context/PublicationsProvider';

const usePublications = () => {
  return useContext(PublicationContext);
};
export default usePublications;
