const User = require('../models/mod-user')

const profile = (req, res) => {
    console.info('reached profile, rendering')
    res.render('profile', {user: req.session.user})
}
const logout = (req, res) => {
    console.info('logout request, logging out')
    req.session.destroy()
    // Implement logout logic here
    res.redirect('/')
}

const getlogin = (req, res) => {
    console.info('login request')
    if(req.session.flash) {
        console.log('Flash message:', req.session.flash)
    }
    
    // logic?

    createFlashMessage(req, 'empty', '')
    res.render('login', {flash: req.session.flash || null})
}
const postlogin = async (req, res) => {
    console.info('login submit')
    
    // logic?

    const {username, password} = req.body

    try {   
        const user = await User.findOne({username})
        if (user && user.password === password) {
            req.session.user = {username: user.username}
            res.redirect('/profile')
            return
        }
    } catch (error) {
        console.error('error at login:', error)
        createFlashMessage(req, 'error', 'An error occurred. Please try again.')
        res.redirect('/login')
        return;
    }

    if (!username || !password) { //with forms required variable, this error *should* be unreachable
        console.warn('login fail: missing username or password')
        createFlashMessage(req, 'error', 'Please provide both username and password.')
        res.redirect('/login')
        return
    }

    console.warn('login fail: denied');    
    createFlashMessage(req, 'error', 'Wrong username or password! Please try again.')
    res.redirect('/login')
}

const getsignup = (req, res) => {
    console.log('sign uprequest')


    if(req.session.flash) {
        console.log('Flash message:', req.session.flash)
    }
    
    // logic?

    createFlashMessage(req, 'empty', '')
    res.render('signup', {flash: req.session.flash || null})
}

const postsignup = async (req, res) => {
    console.info('post submit')
    
    // logic?

    const {username, password} = req.body
    console.log([username, password])

    try {   
        const user = await User.findOne({username})
        console.log(user)
        if (!user) {
            User.insertOne({username, password})
            req.session.user = {username}
            console.warn('signup success')
            res.redirect('/profile')
            return
        }
        else
        {
            console.warn('signup fail: username occupied')
            createFlashMessage(req, 'error', 'Username already taken! Please try another.')
            res.redirect('/signup')
        }
    } catch (error) {
        console.error('error at signup:', error)
        createFlashMessage(req, 'error', 'An error occurred. Please try again.')
        res.redirect('/signup')
        return
    }

    if (!username || !password) { //with forms required variable, this error *should* be unreachable
        console.warn('signup fail: missing username or password')
        createFlashMessage(req, 'error', 'Please provide both username and password.')
        res.redirect('/signup')
        return
    }
    
    console.warn('signup fail: no case')  
    createFlashMessage(req, 'error', 'An unexpected issue had occurred.')
    res.redirect('/signup')
}

function createFlashMessage(req, type, message) {
    req.session.flash = {type, message}
}

module.exports = {
    profile,
    getlogin,
    postlogin,
    logout,
    getsignup,
    postsignup
}