import React, {Component} from 'react';
import Message from './Message.jsx';

class ChatBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      newUser: "",
      newMessage: "",
      currentInput: ""
    }
  }

  _newMessage = (event) => {
    event.preventDefault();
    const state = this.state;
    const newMessage = event.target.value;
    const newUser = this.state.newUser;
    const currentInput = event.target.className;

    this.setState(...state, {newMessage: newMessage,
                   newUser: newUser,
                   currentInput: currentInput});
  };

  _newUser = (event) => {
    event.preventDefault();
    console.log("in new user", event.target.value);
    const state = this.state;
    const newUser = event.target.value;
    const currentInput = event.target.className;
    this.setState(...state, {newUser: newUser,
                             currentInput: currentInput});
  };
  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer>
        <form className="chatbar" onSubmit={(event) => {this.props.addMessage(event, this.state)}}>
          <input className="chatbar-username" placeholder="Your Name (Optional)"
           onChange={this._newUser} autoFocus/>
          <input className="chatbar-message" placeholder="Type a message and hit ENTER"
          type="text" name="message" onChange={this._newMessage}/>
          <input className="chatbar-enter" type="submit" />
        </form>
      </footer>
    )
  }
}

export default ChatBar;