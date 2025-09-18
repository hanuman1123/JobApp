import  Connection from './../models/connection.model.js';

export const sendRequest = async(req,res) => {
    try {
        const {recipientId} = req.body
        const connection = await Connection.create({
            requesterId:req.user.id,
            recipientId,


        })

        res.status(201).json(connection);
    } catch (error) {
        return res.status(201).json({message:error.message})        
    }
};

export const updateRequest = async(req,res) => {
    try {
        const{status} = req.body;
        const connection = await Connection.findById(req.params.connectionid);
        if(!connection){
            return res.status(404).json({message:"Request not found"})
        }

        connection.status = status;
        await connection.save();
        res.json(connection);
    } catch (error) {
        return res.status(500).json({message:error.message});
        
    }
}

export const myNetwork = async(req,res) => {
    try {
        const connections = await Connection.find({
            $or: [
                {
                    requesterId:req.user.id, status:"ACCEPTED"
                },
                {
                    recipientId:req.user.id, status:"ACCEPTED"
                },
            ],
        }).populate("requesterId recipientId","name email");

        res.json(connections);
    } catch (error) {

        res.status(500).json({message:error.message});
        
    }
}