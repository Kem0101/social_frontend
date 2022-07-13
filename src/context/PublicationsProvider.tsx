import { createContext, useState, useEffect } from 'react';

const PublicationContext = createContext({});

export const PublicationProvider = ({ children }: any) => {
  const [publications, setPublications] = useState([]);

  return (
    <PublicationContext.Provider value={{ publications }}>
      {children}
    </PublicationContext.Provider>
  );
};

export default PublicationContext;
