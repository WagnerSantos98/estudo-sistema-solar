const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const planetsRoutes = require('./src/routes/planetRoutes');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api', planetsRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ status: 'Hello World' });
});


  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });


// Exportação para a Vercel
module.exports = app; 