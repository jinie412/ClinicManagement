const bacsiService = require('./bacsiService');

module.exports = {
    // GET /api/bac-si/login
    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Username and password are required.'
                });
            }

            const bacsi = await bacsiService.login({ username, password });
            if (bacsi) {
                return res.status(200).json({
                    success: true,
                    data: bacsi,
                    message: 'Login successful.'
                });
            } 

            return res.status(404).json({
                success: false,
                message: 'Doctor not found or invalid credentials.'
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error.',
                error: error.message
            });
        }
    },

    // GET /api/bac-si
    getBacSis: async (req, res) => {
        try {
            const bacsis = await bacsiService.getBacSis();
            if (!bacsis) {
                return res.status(404).json({
                    success: false,
                    message: 'Failed to retrieve list of doctors.'
                });
            }
            res.status(200).json({
                success: true,
                data: bacsis,
                message: 'Retrieved list of doctors successfully.'
            });
        } catch (error) {
            console.error('Error fetching doctors:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve doctors.',
                error: error.message
            });
        }
    },

    // GET /api/bac-si/:id
    getBacSiById: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'Doctor ID is required.'
                });
            }

            const bacsi = await bacsiService.getBacSiById(id);
            if (bacsi) {
                return res.status(200).json({
                    success: true,
                    data: bacsi,
                    message: 'Retrieved doctor details successfully.'
                });
            }

            res.status(404).json({
                success: false,
                message: `Doctor with ID ${id} not found.`
            });
        } catch (error) {
            console.error('Error fetching doctor details:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve doctor details.',
                error: error.message
            });
        }
    },

    // POST /api/bac-si/add
    createBacSi: async (req, res) => {
        try {
            const { body } = req;

            if (!body || Object.keys(body).length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Doctor data is required to create a new record.'
                });
            }

            const bacsi = await bacsiService.createBacSi(body);
            res.status(201).json({
                success: true,
                data: bacsi,
                message: 'Created doctor successfully.'
            });
        } catch (error) {
            console.error('Error creating doctor:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to create doctor.',
                error: error.message
            });
        }
    },

    // PUT /api/bac-si/update/:id
    updateBacSi: async (req, res) => {
        try {
            const { id } = req.params;
            const { body } = req;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'Doctor ID is required to update the record.'
                });
            }

            if (!body || Object.keys(body).length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Updated doctor data is required.'
                });
            }

            const bacsi = await bacsiService.updateBacSi(id, body);
            if (bacsi) {
                return res.status(200).json({
                    success: true,
                    data: bacsi,
                    message: 'Updated doctor successfully.'
                });
            }

            res.status(404).json({
                success: false,
                message: `Doctor with ID ${id} not found.`
            });
        } catch (error) {
            console.error('Error updating doctor:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to update doctor.',
                error: error.message
            });
        }
    },

    // DELETE /api/bac-si/delete/:id
    deleteBacSi: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'Doctor ID is required to delete the record.'
                });
            }

            const result = await bacsiService.deleteBacSi(id);
            if (result) {
                return res.status(200).json({
                    success: true,
                    message: 'Deleted doctor successfully.'
                });
            }

            res.status(404).json({
                success: false,
                message: `Doctor with ID ${id} not found.`
            });
        } catch (error) {
            console.error('Error deleting doctor:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to delete doctor.',
                error: error.message
            });
        }
    }
};
