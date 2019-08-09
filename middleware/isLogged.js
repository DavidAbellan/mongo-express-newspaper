var jwt = require('jwt-simple');
var LS = require('local-storage');
var moment = require('moment');

module.exports = function isLogged (req,res,next){
        

    if (req.session.username){
        let token = LS.get('token');
        let crToken = jwt.decode(token,'fakeKey');
        try {
            if (crToken.exp <= moment().unix()) {
                return res.status(401).send({message : 'El token ha expirado'});

            } else {
                next();

            }
        }
        catch(error){
            console.error(error);
        }
         
    }
    else 
    {
    res.send("NO TIENE PERMISOS");
    }

}