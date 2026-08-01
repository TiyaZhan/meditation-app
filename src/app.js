const express = require('express');
const session = require('express-session');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { requireAuth } = require('./middleware/auth');
const sequelize = require('./config/database');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const viewsPath = path.join(__dirname, '../views');
const publicPath = path.join(__dirname, '../public');
const distPath = path.join(__dirname, 'public/dist');
const isProduction = process.env.NODE_ENV === 'production';
app.set('views', viewsPath);
app.set('view engine','ejs')
if (isProduction) app.set('trust proxy', 1);

app.use(express.static(publicPath));
// Middleware for reading request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express session

if (isProduction && !process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET must be set in production');
}

const sessionStore = new SequelizeStore({ db: sequelize });

app.use(session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET || 'development-session-secret',
    resave: false,             // Forces the session to be saved back to the session store, even if the session was never modified during the request.
    saveUninitialized: false,  // Forces a session that is "uninitialized" to be saved to the store.
    cookie: {
      secure: isProduction,
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    }
  }));



app.get('/',(req,res)=> {
    console.log('Index page')
    res.render("index",{user: req.session.user})
})

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

const userRouter = require("./routes/users")
const blogRouter = require("./routes/blog")
const commentRouter = require("./routes/comment")

// Protected routes
app.use('/blog', requireAuth, blogRouter);

// Public routes
app.use('/users', userRouter);
app.use('/comment', commentRouter);
app.use('/dist', express.static(distPath));

const port = Number(process.env.PORT || 3000);

const start = async () => {
  await sequelize.connectWithRetry();
  await sessionStore.sync();
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server started on port ${port}`);
  });
};

start().catch((error) => {
  console.error('Application startup failed:', error);
  process.exit(1);
});
