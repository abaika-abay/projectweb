const express = require('express');
const router = express.Router();

// Пример массива книг (если у тебя есть база данных, используй её)
const books = [
    { _id: 1, title: "Book One", author: "Author A" },
    { _id: 2, title: "Book Two", author: "Author B" }
];

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Home - Book Store', // ✅ Передаём title
        books: books // ✅ Передаём список книг, чтобы не было ошибки books is not defined
    });
});

module.exports = router;
