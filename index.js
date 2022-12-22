const { faker } = require("@faker-js/faker")
const express = require("express")
const { default: knex } = require("knex")

const app = express()
const port = process.env.PORT

const config = require("./knexfile")[process.env.NODE_ENV || "development"]
const client = knex(config)

app.get('/', async (req, res) => {
    await client.insert({name: faker.name.firstName()}).into('peoples')
    const people = await client.select('name').from('peoples')
    res.send(`
        <h1>Full Cycle Rocks!</h1>
        <ul>
            ${people.map(person => `<li>${person.name}</li>`).join('\n')}
        </ul>    
    `)
})

app.listen(port, () => {
    console.log(`server running`)
})
