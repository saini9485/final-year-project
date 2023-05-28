const express = require('express');
const cors = require('cors');
const { connection } = require('./config/database.js');
const adminRouter = require('./controllers/auth.routes.js');
const adminUserRoutes = require('./controllers/admin.users.tables.routes.js');
const adminProductRouter = require('./controllers/admin.products.routes.js');
const { userRoute } = require('./routes/user.route');
const { userAuthRoute } = require('./routes/user.auth.route');
require('dotenv').config();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/auth', adminRouter);

app.use('/adminproduct', adminProductRouter);

app.use('/adminuser', adminUserRoutes);

app.use('/user/auth', userAuthRoute);

app.use('/', userRoute);

const PORT = process.env.port || 8080;
app.listen(PORT, async () => {
  try {
    await connection;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
  console.log(`Listening to server on port ${PORT}`);
});
