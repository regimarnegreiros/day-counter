//#region setup

import express from 'express';
import { readFileSync } from 'fs';
const serverData = JSON.parse(readFileSync('server-options.json', 'utf-8'));
const [appIP, appPort] = [serverData.appIP, serverData.appPort];

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.debug(`method: ${req.method}`);
  console.debug(`url: ${req.url}`);
  console.debug(`header: ${JSON.stringify(req.headers, null, 2)}`);
  console.debug(`body: ${req.body}`);
  next();
});

//#endregion

//#region GET

app.get('/', (req, res) => {
  res.status(200).send('Hello 👋');
});

app.get('/api/profile', (req, res) => {
  res.status(200).send({
    'user': 'david',
    'age': 21
  });
});

//#endregion

//#region POST

app.post('/api/signup/:id', (req, res) => {
  
});

app.post('/api/signin/:id', (req, res) => {
  
});

//#endregion

//#region PATCH

app.patch('/api/syncevents/:id', (req, res) => {
  
});

//#endregion

//#region DELETE

app.delete('/api/delete/:id', (req, res) => {

});

//#endregion

//#region run

const server = app.listen(appPort, appIP, () => {
  console.log(`Serving @ http://${appIP}:${appPort}/`)
});

//#endregion
