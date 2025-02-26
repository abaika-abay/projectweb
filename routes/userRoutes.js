const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');

const router = express.Router();

// Получение профиля пользователя
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Обновление профиля (изменение имени или email)
router.put('/profile', authMiddleware, async (req, res) => {
    const { username, email } = req.body;

    try {
        let user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        user.username = username || user.username;
        user.email = email || user.email;

        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
