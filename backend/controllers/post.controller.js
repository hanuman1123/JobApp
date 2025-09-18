import  Post from './../models/post.model';

export const createPost = async(req,res) => {
    try {
        const {content, postType} =  req.bod;

        const newPost = await Post.create({
            author:required,
            content,
            postType,
            image:req.files ? req.files.map(f => f.path) : [],

        });
        

        
    } catch (error) {
        return res.status(500).json({message:error.message
        })
        
    }
}
