const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./routes/index'));

app.get('/', (req, res) => {
  res.json({ message: 'API Funeraria AlmaSoft - 100% operativa' });
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});