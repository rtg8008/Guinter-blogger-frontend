import React, {useContext, useState} from 'react';

const ProfileContext = React.createContext([{},()=> {}]);
const API_URL = 'http://localhost:8080/'
const ProfileProvider = ({children}) => {
  const [profileContext, setProfileContext] = React.useState({id: null, username: null})
  return (
    <ProfileContext.Provider value={[profileContext, setProfileContext]}>
      {children}
    </ProfileContext.Provider>
  )
}
export {ProfileContext, API_URL};
export default ProfileProvider;