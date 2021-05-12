const express = require('express')
const app = express()
const port = 3000
const slotsTracker = require('./controller')

app.get('/', (req, res) => {
    res.send('Cowin Tracker')
    let counter = 0
    setInterval(function () {
        counter++
        slotsTracker(counter)
    }, 180000)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})