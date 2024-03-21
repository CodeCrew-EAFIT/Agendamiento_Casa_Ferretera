import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const UserSessionContext = createContext();

export const useUserSession = () => useContext(UserSessionContext);

export const UserSessionProvider = ({ children }) => {
  const [userType, setUserType] = useState(() => {
    const savedUserType = sessionStorage.getItem('userType');
    return savedUserType ? JSON.parse(savedUserType) : null;
  });

  useEffect(() => {
    if (userType !== null) {
      sessionStorage.setItem('userType', JSON.stringify(userType));
    }
  }, [userType]);

  const setUserSession = (type) => {
    setUserType(type);
  };

  return (
    <UserSessionContext.Provider value={{ userType, setUserSession }}>
      {children}
    </UserSessionContext.Provider>
  );
};

UserSessionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
