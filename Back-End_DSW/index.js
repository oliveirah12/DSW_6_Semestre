const express = require('express');
const cors = require('cors');

const router = require('./src/routes/routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.get('/', (request, response) => {
  response.send("Hello world");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Aplicação rodando na porta ${PORT}`);
});
