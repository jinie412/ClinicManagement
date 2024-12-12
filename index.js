require('dotenv').config();
require('pg');
const express = require('express');
const sequelize = require('./app/config/postgreDB');
const db = require('./app/models/model.index');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Import and use helmet
const helmet = require('helmet');
// Use helmet to set security-related HTTP headers
app.use(helmet({
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}));

//Connect to PostgreSQL
sequelize.authenticate()
  .then(() => {
    console.log('Connection PostgreSQL success.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});

// Sync the models with the database
db.sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
});

const benhnhanRouter = require('./app/components/BenhNhan/benhnhanRouter');
app.use('/api/benhnhan', benhnhanRouter);

// const routerMain = require('./app/routers/routerMain');
// app.use('/', routerMain);

const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});