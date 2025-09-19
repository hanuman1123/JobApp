import  Post from './../models/post.model.js';

export const createPost = async(req,res) => {
    try {
        const {content, postType} =  req.body;

        const newPost = await Post.create({
            author: req.user.id,
            content,
            postType,
            image: req.files ? req.files.map(f => f.path) : [],
        });

        res.status(201).json(newPost);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};


export const getFeed = async(req,res) => {
    try {
        const posts = await Post.find().populate("author","name email profileImage").sort({createdAt:-1});
        return res.json(posts);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const likePost = async(req,res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if(!post){
            return res.status(404).json({message:"Post not found"});

        }

        if(!post.likes.includes(req.user.id)) {
            post.likes.push(req.user.id);
            await post.save();
        }

        return res.json(post)
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
};

export const commentPost = async(req,res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if(!post){
            return res.status(404).json({message:"Post not found"});
        }

        post.comments.push({user:req.user.id,text:req.body.text});
        await post.save()
        return res.json(post)
    } catch (error) {
        return res.status(500).json({message:error.message});
        
    }
}


export const deletePost = async(req,res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if(!post){
            return res.status(404).json({message:"Post not found"});
        }

        if(post.author.toString() !== req.user.id) {
            return res.status(403).json({message:"Not authorized"});
        }

        await post.deleteOne();
        res.json({message:"Post was deleted"});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}


export const updatePost = async(req,res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if(!post){
            return res.status(404).json({message:"Post not found"})
        }
        if(post.author.toString() !== req.user.id) {
            return res.status(403).json({message:"not authorized"});
        }

        post.content = req.body.content || post.content;
        post.postType = req.body.postType || post.postType;
        if(req.files && req.files.length > 0) {
            post.images = req.files.map((f) => f.path);

        };

        await post.save();
        res.json(post);
    } catch (error) {
        return res.status(500).json({message: error.message})
        
    }
}