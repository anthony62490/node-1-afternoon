let messages = [];
let id = 0;

const getMessages = (req, res)=>
{
  res.status(200).json(messages);
};

const postMessage = (req, res)=>
{
  const { text, time } = req.body;
  let newMessage = { id, text, time };
  messages.push(newMessage);
  id++;
  res.status(200).json(messages);
};

const editMessage = (req, res)=>
{
  console.log("HEY!");
  const updateId = req.params.id;
  const {text, time} = req.body;
  messages.forEach( (e, i) =>
  {
    if(e.id === Number(updateId))
    {
      //id should not be changed even in put
      e.text = text || e.text;
      e.time = time;
    }
    else
      return false;
  });
  res.status(200).json(messages);
};

const deleteMessage = (req, res)=>
{
  const remId = Number(req.params.id);
  console.log(remId);
  //consider using messages.findIndex() next time. It might be cleaner.

  messages.forEach((e) =>
  {
    //id was converted to a number. If it is somehow not a number, indicate a malformed request
    if(typeof(remId) !== 'number' || (remId !== remId)) //if i=NaN, then it will not be equal to itself
      res.status(400).json(`Malformed request. "${remId}" is not a number`);
    else if(remId > messages.length-1)
      res.status(404).json(`Content not found. "${remId}" is out of range`);
    else
    {
      messages.splice(remId, 1);
      res.status(200).json(messages);
    }
  });
  res.status(418).json(`This shouldn't happen unless the developer forgot something important`);
}

  module.exports = {
    getMessages,
    postMessage,
    editMessage,
    deleteMessage
  };