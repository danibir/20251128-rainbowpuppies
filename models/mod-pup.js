const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pupSchema = new Schema({
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
    },
    pupID: {
        type: Number,
        default: 0
    }
})

pupSchema.pre('save', async function () {
    while (true)
    {
        const Pup = this.constructor
        let unique = false
        while (!unique) {
            const digits = 6
            const min = Math.pow(10, digits - 1)
            const max = Math.pow(10, digits) - 1
            const candidate = Math.floor(Math.random() * (max - min + 1)) + min
            const exists = await Pup.findOne({ pupID: candidate })
            if (!exists) {
                this.pupID = candidate
                unique = true
            }
        }
    }
})

const Pup = mongoose.model('Pup', pupSchema, 'rainbowPups')
module.exports = Pup