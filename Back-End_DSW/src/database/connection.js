var knex = require('knex')({ 
    client: 'mysql2', 
    connection: { 
        host: 'localhost',   
        user: 'root',
        password : 'mat2101',       
        database : 'estufa'    
    }
}); 
module.exports = knex