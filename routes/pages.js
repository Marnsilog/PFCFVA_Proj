const express = require('express');
const path = require('path');
const mysql = require('mysql');
const router = express.Router();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    // port: process.env.DB_PORT, // Uncomment if you want to use a specific port
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, // Corrected this line
    database: process.env.DB_NAME
});

// Connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected');
});

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect('/');
}
function hasPermission(requiredPermission) {
    return (req, res, next) => {
        const userPermission = req.session.user.permission;

        if (userPermission === requiredPermission) {
            return next();
        }
        return res.status(403).json({ message: 'Forbidden: You do not have access to this resource.' });
    };
}


router.get('/', (req, res) => {
    res.render('index');
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

router.get('/pfcfvaAttendance', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'attendance.html'));
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
    'supervisor_inventory_report',
    'supervisor_leaderboards',
    'supervisor_activity'

];

Supervisor.forEach(route => {
    router.get(`/${route}`, isAuthenticated, hasPermission('Supervisor'), (req, res) => {
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
    'admin_volunteer_configuration',
    'attendance_dashboard',
    'admin_edit_volunter',
    'admin_inventory_logs'
];

adminRoutes.forEach(route => {
    router.get(`/${route}`, isAuthenticated, hasPermission('Admin'), (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', `${route}.html`));
    });
});


const volunteer = [
    'volunteer_dashboard',
    'volunteer_contactus',
    'volunteer_edit_profile',
    'volunteer_leaderboards',
    'volunteer_main_profile',
    'volunteer_inventory',
    'volunteer_form_inv'
];

volunteer.forEach(route => {
    router.get(`/${route}`, isAuthenticated, hasPermission('Volunteer'), (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', `${route}.html`));
    });
});

// router.get('/admin_edit_volunteer/:accountID', (req, res) => {
//     const accountID = req.params.accountID;
//     res.render('admin_edit_volunteer', { accountID }); // Render without the leading '/'
// });

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
