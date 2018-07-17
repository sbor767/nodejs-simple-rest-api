import React from 'react'
import { Link } from 'react-router-dom'

import Header from './Header'
import Loading from './Loading'

export default function Message ({ header, isBodyLoaded, body }) {
  return (
    <div id="MessageContainer" className="inner-container">
      <Header>
        <Link to="/">
          <button className="blue">Back To Forum</button>
        </Link>
        <button className="red">Delete</button>
      </Header>
      {isBodyLoaded ? (
        <div id="message-container">
          <h2 className='message-header'>{header}</h2>
          <p>{body}</p>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  )
}