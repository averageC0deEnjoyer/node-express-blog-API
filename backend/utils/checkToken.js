exports.checkTokenExist=(req,res,next)=>{
    if(req.token){
        return res.status(200).({message: 'Already Log In'})
    } else {
        next()
    }
}

