const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // Example route to get all equipment
    router.get('/list', (req, res) => {
        const sql = 'SELECT * FROM tbl_inventory';  // Adjust your table name accordingly
        db.query(sql, (err, results) => {
            if (err) {
                console.error('Error fetching equipment:', err);
                res.status(500).send('Error fetching equipment');
                return;
            }
            res.json(results);
        });
    });

    // Add more equipment-related routes here

    return router;
};
