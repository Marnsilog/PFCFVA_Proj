const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // Example route to get all attendance records
    router.get('/records', (req, res) => {
        const sql = 'SELECT * FROM tbl_attendance';  // Adjust your table name accordingly
        db.query(sql, (err, results) => {
            if (err) {
                console.error('Error fetching attendance records:', err);
                res.status(500).send('Error fetching records');
                return;
            }
            res.json(results);
        });
    });

    // Add more attendance-related routes here

    return router;
};
