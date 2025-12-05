const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pup = new Schema({
    name: {
        type: String,
        required: true
    },
    puppyPower: {
        type: Array,
        default: []
    },
    bestFriend: {
        type: String,
        default: "None"
    },
    birthYear: {
        type: Number,
        required: true
    },
    imageLink: {
        type: String,
        required: true
    }
})

const Pup = mongoose.model('Pup', pup, 'rainbowPups')
module.exports = Pup