const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const indexRoutes = require('./routes/indexRoutes');
require('dotenv').config();
const PORT = process.env.PORT || 3000;



const app = express();
app.use(cookieParser());
app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');
app.use(expressLayouts); // 📌 Подключаем layout
app.set('layout', 'layout'); // 📌 Указываем, что layout.ejs — основной шаблон
app.set('layout extractScripts', true);
app.use(express.json());
app.use(express.static('public')); // 📌 Для статики (CSS, JS)
app.use(express.urlencoded({ extended: true })); // 📌 Распознаем данные из form-urlencoded

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/book', bookRoutes);
app.use('/books', bookRoutes);
mongoose.connect('mongodb://127.0.0.1:27017/bookstore', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(3000, () => console.log('Server running on port 3000'));

