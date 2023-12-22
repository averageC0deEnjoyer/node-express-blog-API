const express = require('express');
const path = require('path');
require('dotenv').config();
const blogRouter = require('./routers/blogRouter');
const signUpRouter = require('./routers/signUpRouter');
const logInRouter = require('./routers/logInRouter');

// const cors = require('cors');
const { connectToDb } = require('./utils/connectDB');

const app = express();

app.use(express.json());
// app.use(cors());

connectToDb().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`server is running at ${process.env.PORT}`);
  });
});

// dont use app.use here, will error
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome!' });
});

app.use('/signup', signUpRouter);

app.use('/login', logInRouter);

app.use('/blogs', blogRouter);

app.use((req, res, next) => {
  next(createError(404));
});

//error handler (from express generator)
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //render the error page
  res.status(err.status || 500);
  res.send('error');
});

//todo dont forget to learn and add the correct way of error handler later on
//maybe use bootstrap?
