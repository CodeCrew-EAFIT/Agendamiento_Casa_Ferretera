import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

const LocationContext = createContext()

export function useLocationContext () {
  return useContext(LocationContext)
}

export const LocationContextProvider = ({ children }) => {
  const [location, setLocation] = useState('Amador')

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  )
}

LocationContextProvider.propTypes = {
  children: PropTypes.node
}
