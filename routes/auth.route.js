const { Router } = require('express')
const router = Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')

//   /api/auth

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body
        const candidate = await User.findOne( { email} )

        if (candidate) {
            return res.status(400).json({ message: 'Такой email уже есть' })
        }
        const hashedPass = bcrypt.hash(password, 12)

        const user = new User({ email, password: hashedPass })

        await user.save()
        return res.status(201).json({ message: 'Пользователь создан' })

    } catch (e) {
        await res.status(500).json({message: 'Ошибка'})
    }
})

router.post('/login', async (req, res) => {

})

module.exports = router