const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiRouter = require('./api');
app.use('/api', apiRouter);

const databaseUrl = process.env.DatabaseUrl;
const serverPort = process.env.Port;
const connectOptions = { useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true};

mongoose.connect(databaseUrl, connectOptions) 
  .then(() => console.log(`Database connected: ${databaseUrl}`))
  .then(() => app.listen(serverPort, () => console.log(`Server started: ${serverPort}`)))
  .catch(err => console.log(`Start error: ${err}`));
