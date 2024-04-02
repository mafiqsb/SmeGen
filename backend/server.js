const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

const data = require('./data');
const userRouter = require('./routes/userRoutes');

app.get('/api/data/fetchdata', (req, res) => {
  res.send({ data });
});

app.use('/api/user', userRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server start at http://:${port}`);
});
