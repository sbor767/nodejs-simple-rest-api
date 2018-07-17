import React from 'react'

import MessageItem from './MessageItem'

export default function MessageList({ headers }) {
  return (
    <div
      id="message-container"
      ref={element => {
        this.headerContainer = element
      }}
    >
      {headers.map((header, id) => (
        <MessageItem key={`item_id-${id}`} header={header} messageId={id}/>
      ))}
    </div>
  )
}