import React, {Component} from 'react';
import Navbar from "./Navbar.jsx";
import ChatBar from "./ChatBar.jsx";
import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";
const uuidv5 = require('uuid/v5');

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {
        name: ""}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      clientNumber: ""};
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
        console.log(" state ", this.state);
        const state = this.state;
        let newUser = "";
        let newMessage = {};
        let messages = "";
        // The socket event data is encoded as a JSON string.
        // This line turns it into an object
        const data = JSON.parse(event.data);
        switch(data.type) {
          case "clientNumber":
            console.log("Number ", data.number);
            this.setState(...state, {clientNumber: data.number});
            break;
          case "incomingMessage":
            console.log("Message ", data);
            // handle incoming messages
            newUser = Object.values(JSON.parse(event.data))[1];

            newMessage = {id: Object.values(JSON.parse(event.data))[1],
                          username: Object.values(JSON.parse(event.data))[2],
                          content: Object.values(JSON.parse(event.data))[3]};
            messages = this.state.messages.concat(newMessage);
            this.setState(...state, {currentUser: {name: newUser},
                                     messages: messages});
            console.log("after addMessage ", this.state);
            break;
          case "incomingNotification":
            console.log("notification ", data);
            // handle incoming notifications
            newUser = "Notification";

            newMessage = {id: uuidv5(`http://localhost:3000/${new Date().getMilliseconds()}`, uuidv5.DNS),
                          username: newUser,
                          content: Object.values(JSON.parse(event.data))[1]};
            messages = this.state.messages.concat(newMessage);
            this.setState(...state, {messages: messages});
            console.log("after addMessage ", this.state);
            break;
          default:
            // show an error in the console if the message type is unknown
            throw new Error("Unknown event type " + data.type);
        }
      }
    }
  }
  //adding a new message to the state messages
  _addMessage = (event, sentMessage) => {
    event.preventDefault();

    console.log("Message ", sentMessage, " user ", sentMessage.newUser);
    console.log("event ", event.target);
    const state = this.state;
    const newUser = sentMessage.newUser;
    const newMessage = {id: uuidv5(`http://localhost:3000/${new Date().getMilliseconds()}`, uuidv5.DNS),
                        username: sentMessage.newUser,
                        content: sentMessage.newMessage};

    if (sentMessage.currentInput === "chatbar-message") {
      //creating new message object with UUID and update the state
      const messages = this.state.messages.concat(newMessage);
      this.setState(...state, {currentUser: {name: newUser},
                               messages: messages});
      const sendNotification = {type: "postNotification",
                                username: newUser,
                                content: newMessage}
      this.socket.send(JSON.stringify(sendNotification));
    } else {
      //new username
      console.log("sent user in addMessage ", newUser);
      console.log(" state name ", this.state.currentUser);
      if (this.state.currentUser.name === "" || newUser === this.state.currentUser.name) {
        console.log("same username");
        const sendNotification = {type: "postNotification",
                                  username: newUser,
                                  content: newMessage}
        this.socket.send(JSON.stringify(sendNotification));
      } else {
        console.log(" changed username");
        const sendMessage = {type: "postMessage",
                             content: `${newUser} has changed their name to ${this.state.currentUser.name}.`}
        this.socket.send(JSON.stringify(sendMessage));
      }
    }
  };

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <Navbar value={this.state.clientNumber}/>
        <MessageList value={this.state.messages} />
        <ChatBar value={this.state} addMessage={this._addMessage}/>
      </div>
    );
  }
}

export default App;
