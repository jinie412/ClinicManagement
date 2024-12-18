const taikhoanService = require('./taikhoanService');

module.exports = {
    // GET /api/tai-khoan
    getTaiKhoans: async (req, res) => {
        try{
            const taikhoans = await taikhoanService.getTaiKhoans();
            console.log("taikhoanController log:", taikhoans);
            if(!taikhoans){
                return res.status(404).json({
                    success: false,
                    message: 'Failed to retrieve list of accounts.'
                })
            }
            res.status(200).json({
                success: true,
                message: 'Retrieved list of accounts successfully.',
                data: taikhoans
            });
        }catch(error){
            console.error('Error fetching accounts:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve accounts.',
                error: error.message
            });
        }
    },

    // GET /api/tai-khoan/:id
    getTaiKhoanById: async (req, res) => {
        try{
            const id = req.params.id;

            if(!id){
                return res.status(400).json({
                    success: false,
                    message: 'ID is required to fetch the account.'
                });
            }

            const taikhoan = await taikhoanService.getTaiKhoanById(id);

            if(taikhoan){
                res.status(200).json({
                    success: true,
                    data: taikhoan,
                    message: 'Account retrieved successfully.'
                });
            }else{
                res.status(404).json({
                    success: false,
                    message: `Account with ID ${id} not found.`
                });
            }
        }catch(error){
            console.error('Error fetching account by ID:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve account.',
                error: error.message
            });
        }
    },

    // POST /api/tai-khoan/add
    createTaiKhoan: async(req, res) => {
        try{
            const taikhoan = req.body;

            console.log("taikhoanController log:", req.body);
            console.log("taikhoanController log:", taikhoan);
            if(!taikhoan){
                return res.status(400).json({
                    success: false,
                    message: 'Account is required.'
                });
            }

            const newTaiKhoan = await taikhoanService.createTaiKhoan(taikhoan);

            res.status(201).json({
                success: true,
                message: 'Account created successfully.',
            });

        }catch(error){
            console.error('Error creating account:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to create account.',
                error: error.message
            });
        }
    },

    // PUT /api/tai-khoan/update/:id
    updateTaiKhoan: async (req, res) => {
        try{
            const id = req.params.id;
            const taikhoan = req.body;

            if(!id){
                return res.status(400).json({
                    success: false,
                    message: 'ID is required to update the account.'
                });
            }

            if (!taikhoan || Object.keys(taikhoan).length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Account data is required to update.',
                });
            }

            const updatedTaiKhoan = await taikhoanService.updateTaiKhoan(id, taikhoan);

            res.status(200).json({
                success: true,
                message: 'Account updated successfully.',
                data: updatedTaiKhoan
            });

        }catch(error){
            console.error('Error updating account:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to update account.',
                error: error.message
            });
        }
    },

    // DELETE /api/taikhoan/delete/:id
    deleteTaiKhoan : async(req, res) => {
        try {
            const id = req.params.id;
    
            console.log("taikhoanController log:", id);
    
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID is required to delete the account.'
                });
            }
    
            const deletedTaiKhoan = await taikhoanService.deleteTaiKhoan(id);
    
            if (deletedTaiKhoan) {
                res.status(200).json({
                    success: true,
                    message: 'Account deleted successfully.',
                    data: deletedTaiKhoan
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `Account with ID ${id} not found.`
                });
            }
        } catch (error) {
            console.error('Error deleting account:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to delete account.',
                error: error.message
            });
        }
    }
}