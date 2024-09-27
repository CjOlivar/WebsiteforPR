require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const users = [
    { username: 'admin', password: bcrypt.hashSync('admin123', 8), role: 'admin' },
    { username: 'customer', password: bcrypt.hashSync('customer123', 8), role: 'customer' }
];

const secretKey = process.env.JWT_SECRET || 'default_secret_key';

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.post('/login', loginLimiter, [
    body('username').isString(),
    body('password').isString()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) return res.status(404).send('User not found.');

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign({ id: user.username, role: user.role }, secretKey, { expiresIn: 86400 });
    res.status(200).send({ auth: true, token: token, role: user.role });
});

app.get('/profile', verifyToken, (req, res) => {
    res.status(200).send(`Welcome ${req.userId}, you are logged in as ${req.role}.`);
});

function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        req.userId = decoded.id;
        req.role = decoded.role;
        next();
    });
}

app.post('/logout', (req, res) => {
    res.status(200).send({ auth: false, token: null });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
