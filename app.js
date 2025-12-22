import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import expressLayouts from 'express-ejs-layouts';

import authRoutes from './routes/authRoutes.js';
import foodRoutes from './routes/foodRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.use(expressLayouts);        // <-- ADD THIS
app.set('layout', 'layouts/main');  // default layout

// Make logged-in user available in all views
app.use((req, res, next)=>{
  res.locals.user = req.session.user || null;
  next();
});

// Routes
app.use('/', authRoutes);
app.use('/foods', foodRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => res.redirect('/login'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
