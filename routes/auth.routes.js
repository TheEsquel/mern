const { Router } = require('express')
const router = Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('../config/default.json')

//   /api/auth

router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', "Минимальная длина 6").isLength({ min: 6 })
    ],
    async (req, res) => {
    try {

        console.log("Body", req.body);

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            })
        }
        const { email, password } = req.body
        const candidate = await User.findOne( { email} )
        if (candidate) {
            return res.status(400).json({ message: 'Такой email уже есть' })
        }
        const hashedPass = await bcrypt.hash(password, 12)
        console.log(hashedPass);
        const user = new User({ email, password: hashedPass })
        await user.save()
        return res.status(201).json({ message: 'Пользователь создан' })
    } catch (e) {
        await res.status(500).json({message: 'Ошибка', error: e})
    }
})

router.post(
    '/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при входе'
            })
        }
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) return res.status(400).json({ message: 'Пользователь не найден' })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: 'Неверный пароль' })
        console.log(user);
        console.log(config);

        const token = jwt.sign(
            { userId: user._id},
            config.jwtKey,
            { expiresIn: '1h'}
            )
        return res.status(200).json({ token, userId: user.id })

    } catch (e) {
        await res.status(500).json({message: 'Ошибка'})
    }
})

module.exports = router