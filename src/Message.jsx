import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("Rendering <Message/>");
    return (
      <div className="message-system">
        <MessageSystem className="message-system" />
      </div>
    )
  }
}
export default Message;