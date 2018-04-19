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
    const newMessage = event.target.value;
    //if username empty set it to "Anonymous"
    let newUser = "";
    if (this.state.newUser === "")  {
      newUser = "Anonymous";
    } else {
      newUser = this.state.newUser;
    }
    const currentInput = event.target.className;
    this.setState(...this.state, {newMessage: newMessage,
                   newUser: newUser,
                   currentInput: currentInput});
  };

  _newUser = (event) => {
    event.preventDefault();
    const newUser = event.target.value;
    const currentInput = event.target.className;
    this.setState(...this.state, {newUser: newUser,
                                  currentInput: currentInput});
  };
  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer>
        <form className="chatbar" onSubmit={(event) => {this.props.addMessage(event, this.state)}}>
          <input className="chatbar-username" placeholder="Your Name (Optional)"
          defaultValue={this.props.value.currentUser.name} onChange={this._newUser} autoFocus/>
          <input className="chatbar-message" placeholder="Type a message and hit ENTER"
          type="text" name="message" onChange={this._newMessage}/>
          <input className="chatbar-enter" type="submit" />
        </form>
      </footer>
    )
  }
}

export default ChatBar;