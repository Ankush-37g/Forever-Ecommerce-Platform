// middlewares/errorHandler.js
export const errorHandler = (err, req, res, next) => {

    console.error(err); // Logs the error to the server console
    
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || [],
        data: err.data || null,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
};
