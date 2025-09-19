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


export const reviewApplication = async(req,res) => {
    try {
        const {status} = req.body;
        const app = await BussinessApplication.findById(req.params.applicationId);

        if(!app) {
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


export const uploadDocuments = async(req,res) => {
    try {
        if(!req.files || req.files.length === 0) {
            return res.status(400).json({message: "No document uploaded"});
        }

        const application = await BussinessApplication.findOne({applicant:req.user.id});
        if(!application){
            return res.status(404).json({message: "Application was not found"});
        }
        application.documents.push(...req.files.map((f) => f.path));
        await application.save();
        return res.json(application);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};


export const getPendingApplications = async(req,res) => {
    try {
        const pendingApps = await
        BussinessApplication.find({status:"PENDING"}).populate("applicant","name email");
        res.json(pendingApps);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}