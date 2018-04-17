import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      test: "",
      currentUser: {
        name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
          {
            id: 1,
            username: "Bob",
            content: "Has anyone seen my marbles?",
          },
          {
            id: 2,
            "username": "Anonymous",
            "content": "No, I think you lost them. You lost your marbles Bob. You lost them for good."
          }
        ]
      }
  }

  componentDidMount(){
    console.log("componentDidMount in <App/>");
    setTimeout(() => {
      const newMessage = {id:3,
                          username: "Michael",
                          content: "I don't think he lost them all"};
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages});
    }, 500);
  }

  _getID = () => {
    let count = 0;
    for (let id in this.state.messages){
        console.log(id);
        count += 1;
    }
    return count;
  }

  _handleInput = (event) => {
    event.preventDefault();
    const state = this.state;
    const id = this._getID() + 1;
    const newMessage = {id: id,
                        username: "Michael",
                        content: event.target.value};
    const messages = this.state.messages.concat(newMessage);
    this.setState({messages: messages});
    console.log("event trigger else: ", this.state);
  };

  _handleEnter = (event) => {
    event.preventDefault();
    console.log("in onSubmit");

    const state = this.state;
    const id = this._getID() + 1;
    const newMessage = {id: id,
                        username: "Michael",
                        content: event.target.value};
    const messages = this.state.messages.concat(newMessage);
    this.setState({messages: messages});
    console.log("event trigger else: ", this.state);
  };


  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <Navbar />
        <MessageList value={this.state.messages} />
        <ChatBar value={this.state} onSubmit={this._handleEnter} onChange={this._handleInput}/>
      </div>
    );
  }
}

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
    )
  }
}

export default App;
