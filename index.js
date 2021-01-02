// Express server will be here

const express = require('express');
const app = express();
const handler = require("./handler.js");
const data = require("./data/users.json");
const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/users',(req, res) => `${handler.getallusers(req, res)}`);
app.get('/users/:id',(req, res) => `${handler.finduser(req,res)}`);
app.post('/users',(req, res) => `${handler.adduser(req, res)}`);
app.delete('/users/:id',(req, res) => `${handler.deleteuser(req, res)}`);
app.put('/users/:id',(req, res) => `${handler.updateuser(req, res)}`);
app.get('/logs',(req, res) => `${handler.alllogs(req, res)}`);
app.all('*',(req, res) => `${handler.all(req, res)}`);

app.listen(port, () => console.log(`listening on port ${port}`));

