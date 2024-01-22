const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files (like HTML, CSS, and images) from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));


// Define routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/gallery', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'gallery.html'));
});

app.get('/booking', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'booking.html'));
});

app.get('/pricing', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pricing.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
app.get('/api/photos', (req, res) => {
  const category = req.query.category || 'all' ; // Default to 'all' if no category specified

  // Get the appropriate folder based on the category
  const folderPath = path.join(__dirname, 'public/images', category);

  // Read the contents of the folder
  require('fs').readdir(folderPath, (err, files) => {
      if (err) {
          console.error('Error reading folder:', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
      }

      // Filter out non-image files (you may need to adjust this based on your image file types)
      const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

      // Create an array of photo objects with URLs and alt text
      const photos = imageFiles.map(file => {
          return {
              url: `/images/${category}/${file}`,
              altText: file.replace(/\.(jpg|jpeg|png|gif)$/i, ''), // Remove file extension for alt text
          };
      });

      res.json(photos);
  });
});
