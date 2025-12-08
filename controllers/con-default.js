const Pup = require('../models/mod-pup')

const index_get = async (req, res)=>{
    console.log('getting index')
    Pup.find()
    .then(resu => {
        console.log(resu)
        res.render('index', { user: req.session.user, pups: resu })
    })
}

module.exports = {
    index_get
}