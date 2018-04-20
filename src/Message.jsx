import React, {Component} from 'react';

class Message extends Component {
  render() {
    //show Notification
    if (this.props.value.username === "Notification"){
      return (
        <div className="message-system">
          <span className="notification-content">{this.props.value.content} </span>
        </div>
      )
      //show username and message
    } else {
      return (
        <div className="message-system">
          <span className="message-username">{this.props.value.username}</span>
          <span className="message-content">{this.props.value.content} </span>
        </div>
      )
    }
  }
}

export default Message;