import express from 'express';

const PORT = 3000;

const server = express();

server.get('/',(req,res)=>{
  res.status(200).send('Hello 👋');
});

server.listen(PORT,'127.0.0.1',()=>{console.log(`It\'s running at port ${PORT}`)})