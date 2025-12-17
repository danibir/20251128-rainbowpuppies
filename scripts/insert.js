const dbHandler = require('../handler/db-handler');
const User = require('../models/mod-user');

const users = [{ username: 'testy', password: 'password123' },{ username: 'bob', password: 'qwerty' }]
dbHandler.connectDB().then(() => {
    console.info('Seeding database with initial users...')
    users.forEach(u => {
        const user = new User(u)
        user.save().then(() => {
            console.info(`User ${u.username} saved to database.`)  
        }).catch(err => {
            console.error(`Error saving user ${u.username}:`, err)
        })
    })
})