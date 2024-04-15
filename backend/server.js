const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;

const userRouter = require('./routes/userRoutes');
const companyRouter = require('./routes/companyRoutes');
const bankRouter = require('./routes/bankRoutes');
const documentRouter = require('./routes/documentRoutes');
const imageRouter = require('./routes/imageRoutes');
const uploadRouter = require('./routes/uploadRoutes');
const clientRouter = require('./routes/clientRoutes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

cloudinary.config({
  cloud_name: 'dnfxw6yf4',
  api_key: '437984696696811',
  api_secret: 'xr2Ak1cS25TnXAvY0vXHgj2hRJQ',
});

app.use('/api/user', userRouter);
app.use('/api/company', companyRouter);
app.use('/api/bank', bankRouter);
app.use('/api/document', documentRouter);
app.use('/api/uploadimage', imageRouter);
app.use('/api/uploadcloudinary', uploadRouter);
app.use('/api/client', clientRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server start at http://:${port}`);
});
