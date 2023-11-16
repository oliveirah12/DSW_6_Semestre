const express = require('express');
const cors = require('cors');
const statusRoutes = require('./src/routes/routes');


const app = express();

app.use(cors());
app.use(express.json());

// Use suas rotas aqui
app.use('/status', statusRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
