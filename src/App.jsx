import React, {Component} from 'react';
import Navbar from "./Navbar.jsx";
import ChatBar from "./ChatBar.jsx";
import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";

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
    const chatSocket = new WebSocket("ws://localhost:3001/");

    chatSocket.onopen = function (event) {
      chatSocket.send("Connected to server");
    };
    this.socket = chatSocket;

    chatSocket.onmessage = (event) => {
      if (event.data != "Connected to server") {
        const state = this.state;
        let newUser = "";
        let newMessage = {};
        let messages = "";
        // The socket event data is encoded as a JSON string.
        // This line turns it into an object
        const data = JSON.parse(event.data);
        //handle the different types of incoming messages
        switch(data.type) {
          // handle number of logged in clients
          case "clientNumber":
            this.setState(...state, {clientNumber: data.number});
            break;
          // handle incoming messages
          case "incomingMessage":
            newMessage = {id: Object.values(JSON.parse(event.data))[1],
                          username: Object.values(JSON.parse(event.data))[2],
                          content: Object.values(JSON.parse(event.data))[3]};
            messages = this.state.messages.concat(newMessage);
            this.setState(...state, {messages: messages});
            break;
          // handle incoming notifications
          case "incomingNotification":
            newUser = "Notification";

            newMessage = {id: Object.values(JSON.parse(event.data))[1],
                          username: newUser,
                          content: Object.values(JSON.parse(event.data))[2]};
            messages = this.state.messages.concat(newMessage);
            this.setState(...state, {messages: messages});
            break;
          // show an error in the console if the message type is unknown
          default:
            throw new Error("Unknown event type " + data.type);
        }
      }
    }
  };

  //adding a new message to the state messages
  _addMessage = (userName, sentMessage) => {
    //if username empty set it to "Anonymous"
    if (userName === "")  {
      userName = "Anonymous";
    };

    //new message and sending it to the server
    const newMessage = {username: userName,
                        content: sentMessage};
    const sendNotification = {type: "postNotification",
                              username: userName,
                              content: newMessage}
    this.socket.send(JSON.stringify(sendNotification));
  };

  _addUser = (newUser) => {
    const state = this.state;

    //define notification of username change and sending it to the server
    if (newUser !== this.state.currentUser.name){
      let content = "";

      if (this.state.currentUser.name === "") {
        content =  `Anonymous has changed their name to ${newUser}.`;
      } else {
        content = `${this.state.currentUser.name} has changed their name to ${newUser}.`
      };
      const sendMessage = {type: "postMessage",
                           content: content};
      this.setState(...state, {currentUser: {name: newUser}});
      this.socket.send(JSON.stringify(sendMessage));
    }
  };

  render() {
    return (
      <div>
        <Navbar value={this.state.clientNumber}/>
        <MessageList value={this.state.messages} />
        <ChatBar addMessage={this._addMessage} addUser={this._addUser}
        />
      </div>
    );
  }
}

export default App;
