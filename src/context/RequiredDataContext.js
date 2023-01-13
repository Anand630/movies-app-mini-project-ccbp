import React from 'react'

const RequiredDataContext = React.createContext({
  activeTabId: 'Home',
  changeActiveTabId: () => {},
})

export default RequiredDataContext
