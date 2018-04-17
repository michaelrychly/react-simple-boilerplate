import React, {Component} from 'react';
//import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>", this.props.value);
    const Messages = this.props.value.map((message) => {
      return (<div key={message.id} className="message">
                <span className="message-username">{message.username}</span>
                <span className="message-content">{message.content} </span>
              </div>  )
    })
    console.log("messages: ", Messages);
    return (
      <main className="messages">
        {Messages}
      </main>
    )
  }
}
export default MessageList;