var knex = require('knex')({ 
    client: 'mysql2', 
    connection: { 
        host: 'localhost',   
        user: 'root',  
        password : 'iago',       
        database : 'relatorios'    
    }
}); 
module.exports = knex