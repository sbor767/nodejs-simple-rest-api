import React from 'react'
import {Link} from 'react-router-dom'

export default function MessageItem({ header, messageId, onDelete }) {
  const onDeleteHandle = () => onDelete(messageId)
  return (
        <div className="message-item" >
          <p title={`id=${messageId}`}>{header}</p>
          <Link to={`/messages/${messageId}`}>
            <button className="blue">Open {messageId}</button>
          </Link>
          <button className="red" onClick={onDeleteHandle} title='Delete'>Delete</button>
        </div>
  )
}