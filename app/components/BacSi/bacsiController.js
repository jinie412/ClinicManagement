const bacsiService = require('./bacsiService');

module.exports = {
    getBacSis: async (req, res) => {
        try {
            const bacsis = await bacsiService.getBacSis();
            res.status(200).send(bacsis);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    getBacSiById: async (req, res) => {
        try {
            const bacsi = await bacsiService.getBacSiById(req.params.id);
            res.status(200).send(bacsi);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    createBacSi: async (req, res) => {
        try {
            console.log('Controller log:', req.body);
            const bacsi = await bacsiService.createBacSi(req.body);
            res.status(201).send(bacsi);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    updateBacSi: async (req, res) => {
        try {
            const bacsi = await bacsiService.updateBacSi(req.params.id, req.body);
            res.status(200).send(bacsi);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    deleteBacSi: async (req, res) => {
        try {
            await bacsiService.deleteBacSi(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).send(error);
        }
    }
}