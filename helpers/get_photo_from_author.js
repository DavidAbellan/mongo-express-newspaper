var pictureController = require("../controllers/Picture");
async function return_picture (idAuthor){
 return await pictureController.get_picture(idAuthor);
}
module.exports ={
    return_picture
}