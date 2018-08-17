const express = require('express');
const {json} = require('body-parser');
const app = express();
const port = 3000;

const {
  getMessages,
  postMessage,
  editMessage,
  deleteMessage
} = require('./controllers/messages_controller');

app.use(json());
app.use( express.static(__dirname + "/../public/build") );

app.get( "/api/messages", getMessages );
app.post( "/api/messages", postMessage );
app.put( `/api/messages/:id`, editMessage );
app.delete( `/api/messages/:id`, deleteMessage );


app.listen(port, ()=> console.log(`Server listening for requests on port ${port}`));