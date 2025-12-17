const mongoose = require('mongoose')
const readline = require('readline')

const rl = readline.createInterface({ 
    input: process.stdin, 
    output: process.stdout 
})
const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve))

const dbHandler = require('../handler/db-handler')
const Pup = require('../models/mod-pup')

const pups = []

for (var i = 0; i < 10; i++)
{
    const dogNames = ["Bella","Charlie","Max","Luna","Rocky","Daisy","Buddy","Molly","Bailey","Sadie","Oliver","Sophie","Toby","Chloe","Duke","Zoey","Bear","Ruby","Jack","Rosie","Leo","Ellie","Finn","Maggie","Zeus","Nala","Louie","Coco","Bentley","Stella","Riley","Lilly","Diesel","Penny","Murphy","Mia","Marley","Millie","Henry","Harley","Oscar","Gracie","Sam","Abby","Gus","Izzy","Hunter","Emma","Bruno","Layla","Rex","Olivia","Koda","Hazel","George","Annie","Beau","Loki","Belle","Milo","Princess","Thor","Sasha","Simba","Pepper","Ace","Honey","Apollo","Dakota","Archie","Missy","Boomer","Ella","Copper","Maddie","Chester","Angel","Scooter","Cookie","Oreo","Moose","Pixie","Tank","Shadow","Lucky","Ziggy","Remy","Jasper","Ginger","Rocco","Holly","Rusty","Nova","Blue","Misty","Cash","Sunny","Scout","Peanut","Frankie","Teddy","Maple"];
    let obj = {}
    obj.name = dogNames[Math.floor(dogNames.length * Math.random())]
    const min = 2000
    const max = 2025
    obj.birthYear = Math.floor((max - min) * Math.random() + min)
    obj.imageLink = `colorpup${i}`
    pups.push(obj)
}
console.log(pups)

dbHandler.connectDB().then(async() => {
    let run = true
    const docs = await Pup.find() 
    const exists = (docs.length !== 0)
    if (exists) { 
        const answer = await askQuestion('Database already carrying pup documents. Continue anyway? (y/n) ') 
        run = (answer.toLowerCase() === 'y') 
        rl.close() } 
        if (run) { 
            console.info('Seeding database with initial pups...') 
            try { 
                await Pup.insertMany(pups) 
                console.info('All pups saved successfully.') 
            } catch (err) { 
                console.error('Error saving pups:', err) 
            } finally { 
                mongoose.connection.close()
                process.exit(0)
            } 
        } else { 
            mongoose.connection.close()
            process.exit(0)
        }
})