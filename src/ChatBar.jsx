import React, {Component} from 'react';
import Message from './Message.jsx';

class ChatBar extends Component {
  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer>
        <form className="chatbar" onSubmit={this.props.onSubmit}>
          <input className="chatbar-username" placeholder="Your Name (Optional)"
          defaultValue={this.props.value.currentUser.name}/>
          <input className="chatbar-message" placeholder="Type a message and hit ENTER"
          type="text" name="message" onChange={this.props.onChange}
          />
          <input className="chatbar-enter" type="submit"/>
        </form>
      </footer>
    )
  }
}

export default ChatBar;