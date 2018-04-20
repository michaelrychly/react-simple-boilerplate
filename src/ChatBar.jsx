import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: ""
    }
  }
  // get users message and the username and send it to App.jsx
  _newMessage = (event) => {
    if (event.charCode === 13) {
      event.preventDefault();
      this.props.addMessage(this.state.user, event.target.value);
      // clear the message input field
      event.target.value = "";
    }
  };
  // get the new username, update the state and send it to App.jsx
  _newUser = (event) => {
    if (event.charCode === 13) {
      event.preventDefault();
      const state = this.state;
      let newUser = event.target.value;

      this.setState(...state, {user: newUser});
      this.props.addUser(newUser);
    }
  };

  render() {
    return (
      <footer>
        <form className="chatbar">
          <input className="chatbar-username" placeholder="Your Name (Optional)"
           onKeyPress={this._newUser} />
          <input className="chatbar-message" placeholder="Type a message and hit ENTER"
           onKeyPress={this._newMessage} autoFocus/>
        </form>
      </footer>
    )
  }
}

export default ChatBar;