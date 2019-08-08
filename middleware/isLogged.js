module.exports = function isLogged (req,res,next){
        

    if (req.session.username){
    next();
    }
    else 
    {
    res.send("NO TIENE PERMISOS");
    }

}