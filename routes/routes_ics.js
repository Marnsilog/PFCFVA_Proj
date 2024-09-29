const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // Example route to get all ICS logs
    router.get('/logs', (req, res) => {
        const sql = 'SELECT * FROM tbl_ics_logs';  // Adjust your table name accordingly
        db.query(sql, (err, results) => {
            if (err) {
                console.error('Error fetching ICS logs:', err);
                res.status(500).send('Error fetching logs');
                return;
            }
            res.json(results);
        });
    });

    // Add more ICS-related routes here

    return router;
};
