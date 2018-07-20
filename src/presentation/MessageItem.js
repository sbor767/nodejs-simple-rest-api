import React from 'react'
import {Link} from 'react-router-dom'

export default function MessageItem({ header, messageId, onDelete }) {
  return (
        <div className="message-item" >
          <p title={`id=${messageId}`}>{header}</p>
          <Link to={`/messages/${messageId}`}>
            <button className="blue">Open {messageId}</button>
          </Link>
          <button className="red" onClick={this.handleLogout} title='Delete'>Delete</button>
        </div>
  )
}