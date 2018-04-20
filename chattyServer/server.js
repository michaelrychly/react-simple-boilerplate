const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');
const uuidv5 = require('uuid/v5');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  let clients = { type: "clientNumber",
                  number: wss.clients.size};
  console.log('Client connected', clients);
  //receive messages from the client
  ws.on('message', (data) => {
      // Broadcast to everyone else.
      wss.clients.forEach(function each(client) {
          client.send(JSON.stringify(clients));
          let message = {};
          console.log("client ", client.readyState);
          console.log("Socket ", WebSocket.OPEN);
          if (client.readyState === WebSocket.OPEN) {
          if (data != "Connected to server") {
            const parsed = JSON.parse(data);
            switch(parsed.type) {
              case "postNotification":
                message = {type: "incomingMessage",
                           id: uuidv5(`http://localhost:3000/${new Date().getMilliseconds()}`, uuidv5.DNS),
                           username: parsed.content.username,
                           content: parsed.content.content};
                client.send(JSON.stringify(message));
                break;
              case "postMessage":
                message = {type: "incomingNotification",
                           content: parsed.content};
                console.log("post: ", message, " data ", parsed);
                client.send(JSON.stringify(message));
                break;
              default:
                // show an error in the console if the message type is unknown
                throw new Error("Unknown event type " + parsed.type);
            }
          }
        }
      });
});

// Set up a callback for when a client closes the socket. This usually means they closed their browser.
ws.on('close', () => console.log('Client disconnected'));
});