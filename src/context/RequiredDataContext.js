import React from 'react'

const RequiredDataContext = React.createContext({
  accountName: '',
  accountPassword: '',
  storeDetails: () => {},
})

export default RequiredDataContext
