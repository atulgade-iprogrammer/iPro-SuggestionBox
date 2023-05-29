const middleware=(req,res,next)=>{
    if(req.body?.feedback!=''){
        next();
    }else{
        res.status(400).send({message:"Please Enter proper feedback"})
    }
}
module.exports=middleware;