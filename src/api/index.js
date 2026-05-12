import express from 'express';

const PORT = 3000;

const server = express();

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

let DATA = {data:[ //esses dados serão puxados da API
  {
    id: 0,
    titulo: "Reunião",
    icone: "💼",
    tipo: "r",
    data_inicial: "2026-04-10",
    data_alvo: "2026-04-30",
    hue: 0,
    descricao: "Reunião sobre o debates da empresa",
    notificacao: "Mensal",
  },
  {
    id: 1,
    titulo: "Dias sem fumar",
    icone: "💼",
    tipo: "p",
    data_inicial: "2026-04-10",
    data_alvo: "2026-04-30",
    hue: 39,
    descricao: "Sem fumar",
    notificacao: "Mensal",
  },
  {
    id: 3,
    titulo: "Reunião",
    icone: "💼",
    tipo: "r",
    data_inicial: "2026-04-10",
    data_alvo: "2026-04-30",
    hue: 126,
    descricao: "Reunião sobre o debates da empresa",
    notificacao: "Mensal",
  },
  {
    id: 4,
    titulo: "Dias sem fumar",
    icone: "💼",
    tipo: "p",
    data_inicial: "2026-04-10",
    data_alvo: "2026-04-30",
    hue: 207,
    descricao: "Sem fumar",
    notificacao: "Mensal",
  },
  {
    id: 5,
    titulo: "Reunião",
    icone: "💼",
    tipo: "r",
    data_inicial: "2026-04-10",
    data_alvo: "2026-04-30",
    hue: 240,
    descricao: "Reunião sobre o debates da empresa",
    notificacao: "Mensal",
  },
  {
    id: 6,
    titulo: "Dias sem fumar",
    icone: "💼",
    tipo: "p",
    data_inicial: "2026-04-10",
    data_alvo: "2026-04-30",
    hue: 296,
    descricao: "Sem fumar",
    notificacao: "Mensal",
  },
  {
    id: 7,
    titulo: "Dias sem fumar",
    icone: "💼",
    tipo: "p",
    data_inicial: "2026-04-10",
    data_alvo: "2026-04-30",
    hue: 273,
    descricao: "Sem fumar",
    notificacao: "Mensal",
  },
]}
let id = 8;

server.get('/',(req,res)=>{
  res.status(200).send('Hello 👋');
});

server.get('/data',(req,res)=>{
  res.send(JSON.stringify(DATA));
})
server.post('/data',(req,res)=>{
  const newCounter = req.body.data;
  newCounter['id'] = id;
  id++;
  DATA['data'].push(newCounter);
  res.status(201).send();
});

server.delete('/data',(req,res)=>{
  id = req.body;
  DATA['data'] = DATA['data'].filter((item)=> item.id !== id);
  res.status(200).send();
});

server.put('/data',(req,res)=>{
  const update = req.body.data;
  DATA['data'] = DATA['data'].map(item =>{
    if(item['id'] === update['id']){
      return update;
    }
    return item;
  })
  res.status(200).send();
});

server.listen(PORT,()=>{console.log(`It\'s running at port ${PORT}`)})