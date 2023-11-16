const express = require('express')
const cors = require('cors')
require('dotenv').config();

const router = require('./src/routes/routes')

const app = express()

//no arquivo ".env" vai ter também a config
//DB_PORT=''
const port = process.env.DB_PORT || 4000;

app.use(cors())
app.use(express.json())
app.use(router)


app.listen(port,()=>{
    console.log(`Aplicação rodando na porta ${port}`)
})

app.get('/',(request,response)=>{
    response.send(`Aplicação rodando na porta ${port}`)
 })