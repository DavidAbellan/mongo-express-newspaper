var moment = require('moment');
var jwt = require('jwt-simple');

class secureService {
  
     generateToken(user){
         let payload = {
             iss : 'fakeNews',
             sub : user._id,
             iat : moment().unix(),
             exp : moment().add(2,'hours').unix()
         }
         return jwt.encode(payload,'fakeKey');
     }
 

}
module.exports = secureService;