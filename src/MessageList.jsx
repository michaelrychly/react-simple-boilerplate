import React, {Component} from 'react';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>", this.props.value);
    const Messages = this.props.value.map((message) => {
      //differentiate between notifications and messages
      if (message.username === "Notification"){
        return (<div key={message.id} className="notification">
                  <span className="notification-content">{message.content} </span>
                </div>  )
      } else {
        return (<div key={message.id} className="message">
                  <span className="message-username">{message.username}</span>
                  <span className="message-content">{message.content} </span>
                </div>  )
      }
    })
    return (
      <main className="messages">
        {Messages}
      </main>
    )
  }
}
export default MessageList;