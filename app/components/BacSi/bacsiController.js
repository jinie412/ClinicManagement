const bacsiService = require('./bacsiService');

exports.getBacsis = async (req, res) => {
    try {
        const bacsis = await bacsiService.getBacsis();
        res.status(200).json(bacsis);
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const bacsi = await bacsiService.login({ username, password });
        console.log('bacsi', bacsi);

        if (bacsi) {
            res.status(200).json({
                success: true,
                bacsi: bacsi,
                message: 'Login successful'
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'BacSi not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};
