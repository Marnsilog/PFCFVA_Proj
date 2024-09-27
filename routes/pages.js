const express = require('express');
const path = require('path');
const mysql = require('mysql');
const router = express.Router();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    //port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect((error) => {
    if (error) {
        console.error('Database connection failed:', error.stack);
        return;
    }
    console.log('MySQL connected as id ' + db.threadId);
});

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect('/');
}

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});


const Supervisor = [
    'supervisor_dashboard',
    'supervisor_edit_profile',
    'supervisor_fire_response',
    'supervisor_ics_form',
    'supervisor_ics_logs',
    'supervisor_ics',
    'supervisor_inventory',
    'supervisor_main_profile',
    'supervisor_leaderboards'

];

Supervisor.forEach(route => {
    router.get(`/${route}`, isAuthenticated, (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', `${route}.html`));
    });
});

const adminRoutes = [
    'admin_add_vehicle',
    'admin_attendance_logs',
    'admin_dashboard',
    'admin_edit_profile',
    'admin_fire_response',
    'admin_ics',
    'admin_inventory_status_logs',
    'admin_inventory_vehicle_ass',
    'admin_inventory',
    'admin_main_profile',
    'admin_merit_tracking',
    'admin_rank_configuration',
    'admin_rank_up',
    'admin_register',
    'admin_volunteer_configuration'
];

adminRoutes.forEach(route => {
    router.get(`/${route}`, isAuthenticated, (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', `${route}.html`));
    });
});

const volunteer = [
    'volunteer_dashboard',
    'volunteer_contactus',
    'volunteer_edit_profile',
    'volunteer_leaderboards',
    'volunteer_main_profile'
];

volunteer.forEach(route => {
    router.get(`/${route}`, isAuthenticated, (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', `${route}.html`));
    });
});

router.get('/get-username', isAuthenticated, (req, res) => {
    res.json({ username: req.session.user.username });
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Could not log out.');
        }
        res.redirect('/login');
    });
});



module.exports = router;
