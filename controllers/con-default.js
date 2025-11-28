const index_get = (req, res)=>{
    console.log('getting index')
    res.render('index')
}

module.exports = {
    index_get
}