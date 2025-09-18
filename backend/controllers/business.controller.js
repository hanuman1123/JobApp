import  BussinessApplication from './../models/businness.application.model.js';

export const applyBusiness = async(req,res) => {
    try {
        const application = await BussinessApplication.create({
            applicant: req.user.id,
            documents: req.files ? req.files.map(f => f.path) : []
        });
        return res.status(201).json(application);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const myApplicationStatus = async(req,res) => {
    try {
        const {status} = req.body;
        const app = await BussinessApplication.findById(req.params.applicationId);
        if(!app){
            return res.status(404).json({message: "Application not found"});
        }
        app.status = status;
        app.reviewedBy = req.user.id;
        await app.save();
        return res.json(app);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}
