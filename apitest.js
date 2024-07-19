// const express = require('express');
// const bodyParser = require('body-parser');
// const mysql = require('mysql2');

// const app = express();
// const port = 3000;

// // Middleware to parse JSON requests
// app.use(bodyParser.json());

// // Create a MySQL connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'your_mysql_user',
//   password: 'your_mysql_password',
//   database: 'myapidb'
// });

// // Connect to the database
// db.connect(err => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//     return;
//   }
//   console.log('Connected to MySQL');
// });

// // Define Routes

// // Get all items
// app.get('/api/items', (req, res) => {
//   db.query('SELECT * FROM items', (err, results) => {
//     if (err) {
//       console.error('Error fetching items:', err);
//       res.status(500).send('Server error');
//       return;
//     }
//     res.json(results);
//   });
// });

// // Add a new item
// app.post('/api/items', (req, res) => {
//   const newItem = req.body;
//   db.query('INSERT INTO items (name) VALUES (?)', [newItem.name], (err, results) => {
//     if (err) {
//       console.error('Error adding item:', err);
//       res.status(500).send('Server error');
//       return;
//     }
//     res.status(201).json({ id: results.insertId, ...newItem });
//   });
// });

// // Get an item by ID
// app.get('/api/items/:id', (req, res) => {
//   const id = req.params.id;
//   db.query('SELECT * FROM items WHERE id = ?', [id], (err, results) => {
//     if (err) {
//       console.error('Error fetching item:', err);
//       res.status(500).send('Server error');
//       return;
//     }
//     if (results.length === 0) {
//       res.status(404).send('Item not found');
//       return;
//     }
//     res.json(results[0]);
//   });
// });

// // Update an item by ID
// app.put('/api/items/:id', (req, res) => {
//   const id = req.params.id;
//   const updatedItem = req.body;
//   db.query('UPDATE items SET name = ? WHERE id = ?', [updatedItem.name, id], (err, results) => {
//     if (err) {
//       console.error('Error updating item:', err);
//       res.status(500).send('Server error');
//       return;
//     }
//     if (results.affectedRows === 0) {
//       res.status(404).send('Item not found');
//       return;
//     }
//     res.json(updatedItem);
//   });
// });

// // Delete an item by ID
// app.delete('/api/items/:id', (req, res) => {
//   const id = req.params.id;
//   db.query('DELETE FROM items WHERE id = ?', [id], (err, results) => {
//     if (err) {
//       console.error('Error deleting item:', err);
//       res.status(500).send('Server error');
//       return;
//     }
//     if (results.affectedRows === 0) {
//       res.status(404).send('Item not found');
//       return;
//     }
//     res.status(204).send();
//   });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`API server listening at http://localhost:${port}`);
// });
