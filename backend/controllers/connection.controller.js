import Connection from './../models/connection.model.js';
import User from './../models/auth.model.js';

export const sendRequest = async(req,res) => {
    try {
        const {recipientId} = req.body;
        const connection = await Connection.create({
            requesterId: req.user.id,
            recipientId,
        });
        res.status(201).json(connection);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const updateRequest = async(req,res) => {
    try {
        const {status} = req.body;
        const connection = await Connection.findById(req.params.connectionId);
        if (!connection) {
            return res.status(404).json({message: "Request not found"});
        }
        connection.status = status;
        await connection.save();
        res.json(connection);
    } catch (error) {
        return res.status(500).json({message: error.message});
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


export const getSuggestions = async(req,res) => {
    try {
        const connections = await Connection.find({
            $or: [
                { requesterId: req.user.id },
                { recipientId: req.user.id }
            ],
            status: "ACCEPTED",
        });
        const connectedIds = connections.map((e) =>
            e.requesterId.toString() === req.user.id ? e.recipientId : e.requesterId
        );
        const suggestions = await User.find({
            _id: { $nin: [...connectedIds, req.user.id] },
        }).select("name email skills profileImage");
        return res.json(suggestions);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}