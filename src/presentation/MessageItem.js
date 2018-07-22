import React from 'react'
import {Link} from 'react-router-dom'

import './MessageItem.css'

export default function MessageItem({ header, messageId, onEditState = false, onEdit, onDelete }) {
  const onEditHandle = () => onEdit(messageId)
  const onDeleteHandle = () => onDelete(messageId)
  return (
        <div className={`message-item ${onEditState && "on-edit-state"}`} >
          <p title={`id=${messageId}`}>{header}</p>
          <Link to={`/messages/${messageId}`}>
            <button className="blue">Open {messageId}</button>
          </Link>
          <button className="blue" onClick={onEditHandle} title='Edit'>Edit</button>
          <button className="red" onClick={onDeleteHandle} title='Delete'>Delete</button>
        </div>
  )
}