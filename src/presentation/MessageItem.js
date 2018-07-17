import React from 'react'
import {Link} from 'react-router-dom'

export default function MessageItem({ header, id }) {
  return (
        <div
          className={`message`}
        >
          <p title={`id=${id}`}>{header}</p>
          <Link to={`/messages/${id}`}>
            <button className="blue">Open {id}</button>
          </Link>
          <button className="red" onClick={this.handleLogout} title='Delete'>Delete</button>
        </div>
  )
}