const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
require('dotenv').config();

const eventsRoutes = require('./routes/events');
const newsRoutes = require('./routes/news');
const staffRoutes = require('./routes/staff');
const contactRoutes = require('./routes/contact');
const galleryRoutes = require('./routes/gallery');
const newsletterRoutes = require('./routes/newsletter');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/events', eventsRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/newsletter', newsletterRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/school-info', (req, res) => {
  res.json({
    success: true,
    data: {
      name: "Apex Nursery and Primary School",
      motto: "With God We Build a Firm Foundation",
      address: "Kawempe Ttula, Uganda",
      phone: "+256 756 694 381",
      email: "apexschools@gmail.com"
    }
  });
});

app.listen(PORT, () => {
  console.log('Apex School backend running on port ' + PORT);
});
