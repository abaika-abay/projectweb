const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Book = require('../models/Book');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
// Показать страницу регистрации
router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

// Показать страницу входа
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

// Регистрация нового пользователя
router.post(
    '/register',
    [
        check('username', 'Username is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { username, email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (user) return res.status(400).json({ msg: 'User already exists' });

            const hashedPassword = await bcrypt.hash(password, 10);
            user = new User({ username, email, password: hashedPassword });

            await user.save();

            const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
            res.render('register-success', { title: 'Registered successfully', message: 'Registered successfully!' });

        } catch (err) {
            res.status(500).send('Server Error');
        }
    }
);

// Вход пользователя
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Incorrect password');
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

        // ✅ Исправляем отправку данных на страницу profile
        res.render('profile', {
            title: 'Profile',
            user: user // Передаем объект user в EJS
        });

    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).send('Server Error');
    }
});


router.get('/logout', (req, res) => {
    res.clearCookie('token'); // Удаляем куку с токеном
    res.redirect('/'); // Перенаправляем на страницу входа
});



router.get('/profile', authMiddleware, async (req, res) => {
    console.log('📄 Запрос на /profile');

    if (!req.user) {
        console.log('❌ req.user не найден, перенаправляем на login');
        return res.redirect('/auth/login');
    }

    const user = await User.findById(req.user.userId).select('-password');
    console.log('👤 Найденный пользователь:', user);

    if (!user) {
        return res.status(404).send('User not found');
    }

    res.render('profile', { user });
});
router.get('/book/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).send('Книга не найдена');

        res.render('book', { book }); // Отображаем страницу книги
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка сервера');
    }
});
module.exports = router;
