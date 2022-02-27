const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth.route')

const app = express()

app.use('/api/auth', authRouter)

const PORT = config.get('port') || 5000
async function start() {
    try {
        await mongoose.connect(config.get('mongoURL'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT, () => {
            console.log(`app has been started on ${PORT}`);
        })
    } catch (e) {
        console.log(e);
        process.exit(1)
    }

}
start()