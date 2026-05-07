// middleware/auth.middleware.js

const jwt = require('jsonwebtoken');
const userModel = require('../model/user.models');

module.exports.authMiddleware = async (req, res, next) => {
    try {
        // Get token from cookie or header
        const token =
            req.cookies?.token ||
            req.headers.authorization?.split(' ')[1];

        // Check token
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized',
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user
        const user = await userModel.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found',
            });
        }

        // Attach user to request
        req.user = user;

        next();
    } catch (error) {
        console.log(error);

        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token',
        });
    }
};