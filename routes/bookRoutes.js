const express = require('express');
const mongoose = require('mongoose');
const authMiddleware = require('../middleware/authMiddleware');
const Book = require('../models/Book');
const {get} = require("mongoose");

const router = express.Router();

// Добавить новую книгу (POST /books)
router.post('/', authMiddleware, async (req, res) => {
    const { title, author, description, price } = req.body;

    try {
        const book = new Book({ title, author, description, price, user: req.user.userId });
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        console.error('Ошибка при добавлении книги:', err);
        res.status(500).send('Ошибка сервера');
    }
});

router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.render('books', { title: 'Все книги', books }); // ✅ Передаем books
    } catch (err) {
        console.error('Ошибка при получении списка книг:', err);
        res.status(500).send('Ошибка сервера');
    }
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log('Полученный ID:', id); // 🔥 Логируем ID в консоль

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.render("login", { message: "You must be loginned" })
    }

    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).render({ msg: 'Book not found' });
        }

        res.render('book', { book });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});




// Обновить книгу (PUT /books/:id)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        let book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ msg: 'Книга не найдена' });

        book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(book);
    } catch (err) {
        console.error('Ошибка при обновлении книги:', err);
        res.status(500).send('Ошибка сервера');
    }
});

// Удалить книгу (DELETE /books/:id)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ msg: 'Книга не найдена' });

        await book.remove();
        res.json({ msg: 'Книга удалена' });
    } catch (err) {
        console.error('Ошибка при удалении книги:', err);
        res.status(500).send('Ошибка сервера');
    }
});
module.exports = router;
