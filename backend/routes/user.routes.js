import express from 'express';
const router = express.Router();
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authenticateToken from '../utils/authMiddleware.js';

async function validateUserInput(req, res) {
    // Get the user input from the request body
    const { name, email, password, password_confirmation, role } = req.body;
  
    // Validate the name
    if (!name || !name.trim()) {
      res.status(400).json({ error: 'Name is required.' });
      return false;
    }
  
    // Validate the email address
    if (!email || !email.trim()) {
      res.status(400).json({ error: 'Email address is required.' });
      return false;
    }
  
    // Validate the password
    if (!password || !password.trim()) {
      res.status(400).json({ error: 'Password is required.' });
      return false;
    }
  
    // Validate the password confirmation
    if (password !== password_confirmation) {
      res.status(400).json({ error: 'Password and confirmation do not match.' });
      return false;
    }
  
    // Validate the role (adjust based on your roles)
    if (role && !['admin', 'user'].includes(role)) {
      res.status(400).json({ error: 'Invalid user role.' });
      return false;
    }
  
    // User input is valid
    return true;
  }  


async function checkUniqueEmailAndUsername(req, res) {
    const { email, username } = req.body;

    // Check for existing user with the same email
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
        res.status(400).json({ error: 'Email already exists.' });
        return false;
    }

    // Check for existing user with the same username
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
        res.status(400).json({ error: 'Username already exists.' });
        return false;
    }

    // Email and username are unique
    return true;
}

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, password_confirmation, role } = req.body;

        // Validate user input
        await validateUserInput(req, res);
        if (res.statusCode !== 200) return; // If validation failed, stop further processing

        // Check for unique email
        await checkUniqueEmailAndUsername(req, res);
        if (res.statusCode !== 200) return; // If uniqueness check failed, stop further processing

        // Check if passwords match
        if (password !== password_confirmation) {
            return res.status(400).json({ message: 'Password and password confirmation do not match' });
        }

        // Hash password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ name, email, password: hashedPassword, role });

        // Save user to database
        await newUser.save();

        // Send registration success response
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare provided password with hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // Send login success response with JWT
    res.status(200).json({ token });
});

router.post('/logout', async (req, res) => {
    try {
        // Extract the JWT from the Authorization header
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const token = authorizationHeader.split(' ')[1];

        // Invalidate the JWT
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                // Handle invalid token and return the response
                return res.status(401).json({ error: 'Invalid token' });
            }

            // Update user's session status to inactive
            const userId = decodedToken.userId;
            await User.findByIdAndUpdate(userId, { sessionStatus: 'inactive' });

            // Send logout success response
            res.status(200).json({ message: 'Logged out successfully' });
        });
    } catch (error) {
        console.log(error);
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Apply authentication middleware to specific route
router.get('/current-user', authenticateToken, async (req, res) => {
    try {
      res.json({ user: req.user });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


export default router;