import React, {Component} from 'react';
import Message from './Message.jsx';

class ChatBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      newMessage: ""
    }
  }

  _newMessage = (event) => {
    event.preventDefault();
    const newMessage = event.target.value;
    this.setState({newMessage: newMessage});
  }
  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer>
        <form className="chatbar" onSubmit={(event) => {this.props.addMessage(event, this.state.newMessage)}}>
          <input className="chatbar-username" placeholder="Your Name (Optional)"
          defaultValue={this.props.value.currentUser.name}/>
          <input className="chatbar-message" placeholder="Type a message and hit ENTER"
          type="text" name="message" onChange={this._newMessage}/>
          <input className="chatbar-enter" type="submit" />
        </form>
      </footer>
    )
  }
}

export default ChatBar;