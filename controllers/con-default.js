const Pup = require('../models/mod-pup')

const index_get = async (req, res)=>{
    console.log('getting index')
    Pup.find()
    .then(resu => {
        console.log(resu)
        res.render('index', { user: req.session?.user || NaN, pups: resu })
    })
}

const missingdb = async (req, res)=>{
    console.log('database fail')
    res.render('dbfail', { user: req.session?.user || NaN })
}


module.exports = {
    index_get,
    missingdb
}