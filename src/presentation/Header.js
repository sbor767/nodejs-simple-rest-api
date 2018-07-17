import React from 'react'

export default function Header({ children }) {
  return (
    <div id='HeaderContainer'>
      <img src='/assets/icon.png' alt='logo' />
      <h1>Test Job "FORUM"</h1>
      {children}
    </div>
  )
}