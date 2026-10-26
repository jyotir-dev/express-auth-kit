// Health
exports.health = (req, res) => {
    res.status(200).json({
        success: true,
        status: 'ok'
    });
};