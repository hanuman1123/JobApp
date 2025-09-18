export const authorizedRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.userType)) {
            return res.status(403).json({ message: "Access denied: insufficient permissions" });
        }
        next();
    }
}