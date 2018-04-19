import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";
const uuidv5 = require('uuid/v5');

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {
        name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
      }
  }

  componentDidMount(){
    console.log("componentDidMount in <App/>");
    const chatSocket = new WebSocket("ws://localhost:3001/");

    chatSocket.onopen = function (event) {
      chatSocket.send("Connected to server");
    };
    this.socket = chatSocket;

    chatSocket.onmessage = (event) => {
      console.log(" original ", event.data);
      if (event.data != "Connected to server") {
        //handle incoming message
        const state = this.state;
        const newMessage = {id: Object.values(JSON.parse(event.data))[0],
                            username: Object.values(JSON.parse(event.data))[1],
                            content: Object.values(JSON.parse(event.data))[2]};
        const messages = this.state.messages.concat(newMessage);
        this.setState({messages: messages});
      } else {
        console.log("hmm");
      }
    }
  }
  //adding a new message to the state messages
  _addMessage = (event, sendMessage) => {
    event.preventDefault();

    console.log("Enter ", sendMessage);
    console.log("event ", event.target);

    const state = this.state;
    //creating new message object with UUID
    const newMessage = {id: uuidv5(`http://localhost:3000/${new Date().getMilliseconds()}`, uuidv5.DNS),
                        username: "Michael",
                        content: sendMessage};
    const messages = this.state.messages.concat(newMessage);
    this.setState({messages: messages});
    this.socket.send(JSON.stringify(newMessage));
  };

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <Navbar />
        <MessageList value={this.state.messages} />
        <ChatBar value={this.state} addMessage={this._addMessage}/>
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
