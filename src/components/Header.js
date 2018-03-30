import React from 'react'

const Header = ({ children }) => (
  <div id='Header'>
    <img src='/assets/icon.png' alt='logo' />
    <h1>Chatastrophe</h1>
    {children}
  </div>
)

export default Header