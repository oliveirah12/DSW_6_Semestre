require('dotenv').config();

//Crie um Arquivo chamado ".env" e coloque os dados do seu banco desse jeito nele:
//DB_HOST=''
//DB_USER=''
//DB_PASSWORD=''
//DB_NAME=''
//DB_PORT=''


var knex = require('knex')({ 
    client: 'mysql2', 
    connection: { 
        host: process.env.DB_HOST || 'localhost',   
        user: process.env.DB_USER || 'root',
        password : process.env.DB_PASSWORD || '',       
        database : process.env.DB_NAME ||  'estufa'    
    }
}); 
module.exports = knex