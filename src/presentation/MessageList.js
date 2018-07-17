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
      {headers.map((msg, i) => (
        <MessageItem key={`item_id-${i}`} header={msg} id={i}/>
      ))}
    </div>
  )
}