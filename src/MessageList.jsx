import React, {Component} from 'react';
import Message from "./Message.jsx";

class MessageList extends Component {
  render() {
    //loop over all messages and notifications sent
    const Messages = this.props.value.map((message) => {
      return  (<Message key={message.id} value={message}/>)
    })
    return (
      <main className="messages">
        {Messages}
      </main>
    )
  }
}
export default MessageList;