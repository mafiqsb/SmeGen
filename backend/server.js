const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');

const userRouter = require('./routes/userRoutes');
const companyRouter = require('./routes/companyRoutes');
const bankRouter = require('./routes/bankRoutes');
const documentRouter = require('./routes/documentRoutes');
const imageRouter = require('./routes/imageRoutes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

app.use('/api/user', userRouter);
app.use('/api/company', companyRouter);
app.use('/api/bank', bankRouter);
app.use('/api/document', documentRouter);
app.use('/api/uploadimage', imageRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server start at http://:${port}`);
});
