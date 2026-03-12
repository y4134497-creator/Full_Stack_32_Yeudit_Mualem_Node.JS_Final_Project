const usersService = require('../services/usersService');

const verifyActions = async (req, res, next) => {
    if (req.method === 'OPTIONS') return next();

    try {
        const userId = req.headers['userid'];
        if (!userId || userId === "null") {
            return res.status(401).json({ message: "Access Denied: No User ID provided" });
        }

        const result = await usersService.checkAndUpdateActions(userId);

        if (!result.success) {
            return res.status(429).json({ message: "The activity quota for today has run out." });
        }
        next();
    } catch (error) {
        console.error("Middleware Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
module.exports = {verifyActions};