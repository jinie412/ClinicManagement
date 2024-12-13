const taikhoanService = require('./taikhoanService');

module.exports = {
    // GET /api/taikhoan
    getTaiKhoans: (req, res) => {
        try{
            const taikhoans = taikhoanService.getTaiKhoans();
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

    // GET /api/taikhoan/:id
    getTaiKhoanById: (req, res) => {
        try{
            const { id } = req.params;

            if(!id){
                return res.status(400).json({
                    success: false,
                    message: 'ID is required to fetch the account.'
                });
            }

            const taikhoan = taikhoanService.getTaiKhoanById(id);

            if(taikhoan){
                res.status(200).json({
                    success: true,
                    data: taikhoan
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

    // POST /api/taikhoan/add
    createTaiKhoan: (req, res) => {
        try{
            const { taikhoan } = req.body;

            if(!taikhoan){
                return res.status(400).json({
                    success: false,
                    message: 'Account is required.'
                });
            }

            const newTaiKhoan = taikhoanService.createTaiKhoan(taikhoan);

            res.status(201).json({
                success: true,
                message: 'Account created successfully.',
                data: newTaiKhoan
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

    // PUT /api/taikhoan/update/:id
    updateTaiKhoan: (req, res) => {
        try{
            const { id } = req.params;
            const { taikhoan } = req.body;

            if(!id){
                return res.status(400).json({
                    success: false,
                    message: 'ID is required to update the account.'
                });
            }

            if(!taikhoan){
                return res.status(400).json({
                    success: false,
                    message: 'Account is required to update.'
                });
            }

            const updatedTaiKhoan = taikhoanService.updateTaiKhoan(id, taikhoan);

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
    deleteTaiKhoan: (req, res) => {
        try{
            const { id } = req.params;

            if(!id){
                return res.status(400).json({
                    success: false,
                    message: 'ID is required to delete the account.'
                });
            }

            const deletedTaiKhoan = taikhoanService.deleteTaiKhoan(id);

            if(deletedTaiKhoan){
                res.status(200).json({
                    success: true,
                    message: 'Account deleted successfully.',
                    data: deletedTaiKhoan
                });
            }else{
                res.status(404).json({
                    success: false,
                    message: `Account with ID ${id} not found.`
                });
            }
        }catch(error){
            console.error('Error deleting account:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to delete account.',
                error: error.message
            });
        }
    }
}