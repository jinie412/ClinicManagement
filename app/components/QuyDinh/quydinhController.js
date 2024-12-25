const quydinhService = require('./quydinhService');

module.exports = {
    // GET /api/quydinh
    getQuyDinhs: async (req, res, next) => {
        try{
            const quydinhs = await quydinhService.getQuyDinhs();
            if(!quydinhs){
                return res.status(404).json({
                    success: false,
                    message: 'Failed to retrieve list of regulations.'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Retrieved list of regulations successfully.',
                data: quydinhs
            })
        }catch(error){
            console.error('Error fetching regulations:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve regulations.',
                error: error.message
            });
        }
    },

    // GET /api/quydinh/:id
    getQuyDinhById: async (req, res, next) => {
        try{
            const { id } = req.params;

            if(!id){
                return res.status(400).json({
                    success: false,
                    message: 'ID is required to fetch the regulation.'
                });
            }

            const quydinh = await quydinhService.getQuyDinhById(id);

            if(quydinh){
                res.status(200).json({
                    success: true,
                    data: quydinh
                });
            }else{
                res.status(404).json({
                    success: false,
                    message: `Regulation with ID ${id} not found.`
                });
            }
        }catch(error){
            console.error('Error fetching regulation by ID:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve regulation.',
                error: error.message
            });
        }
    },

    // POST /api/quydinh/add
    createQuyDinh: async (req, res, next) => {
        try{
            const quydinh = await quydinhService.createQuyDinh(req.body);
            if(quydinh){
                res.status(201).json({
                    success: true,
                    message: 'Regulation created successfully.',
                    data: quydinh
                });
            }else{
                res.status(400).json({
                    success: false,
                    message: 'Failed to create regulation.'
                });
            }
        }catch(error){
            console.error('Error creating regulation:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to create regulation.',
                error: error.message
            });
        }
    },

    // PUT /api/quydinh/update/:id
    updateQuyDinh: async (req, res) => {
        try {
            const { maquydinh, soluongbenhnhantoida, tienkham } = req.body;
            console.log("Body:", req.body);
    
            if (!maquydinh) {
                return res.status(400).json({
                    success: false,
                    message: 'maquydinh is required to update the regulation.'
                });
            }
    
            if (!maquydinh || !soluongbenhnhantoida || !tienkham) {
                return res.status(400).json({
                    success: false,
                    message: 'maquydinh, soluongbenhnhantoida, and tienkham are required to update the regulation.'
                });
            }
    
            const quydinh = await quydinhService.updateQuyDinh(maquydinh, soluongbenhnhantoida, tienkham);
    
            if (quydinh) {
                res.status(200).json({
                    success: true,
                    message: 'Regulation updated successfully.',
                    data: quydinh
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `Regulation with ID ${id} not found.`
                });
            }
        } catch (error) {
            console.error('Error updating regulation:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to update regulation.',
                error: error.message
            });
        }
    },
}