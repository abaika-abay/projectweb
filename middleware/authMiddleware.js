const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log('🛑 Middleware вызывается для:', req.path);

    const token = req.cookies.token;
    console.log('🔑 Токен из cookies:', token);

    if (!token) {
        console.log('❌ Нет токена, перенаправляем на /auth/login');
        return res.redirect('/auth/login');
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret'); // Используй свой секретный ключ
        console.log('✅ Декодированный токен:', decoded);
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Ошибка проверки токена:', err);
        res.redirect('/auth/login');
    }
};
