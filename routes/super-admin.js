var express = require('express');
var router = express.Router();
var authorController = require('../controllers/Author');
var categoryController = require('../controllers/Category');
var upload = require('../config/multer');
var matcher = require('../helpers/match_category');
var long = require('../helpers/category_length');
var isLogged = require('../middleware/isLogged');
var updateAuthor = require('../helpers/update_user');
var setPicture = require('../helpers/set_avatar_from_author');

router.get('/users',isLogged , async (req,res) =>{
   let authors = await authorController.get_authors();
   res.render('users', {
       authors
   })

})
router.get('/erase/:id', isLogged, async function(req,res){
    await authorController.remove_author(req.params.id);
    res.render('index');
})
router.post('/mod/:id',isLogged,upload.single('file',1),async function(req,res){
    let pictures;
    let author;
    if (req.file != undefined){
    pictures =req.file;
    }
    let password = req.body.password;
     author = new Object (
         {
             name: req.body.name,
             avatar : pictures,
             password ,
             username : req.body.username
         }
     );
     let id = req.params.id;
     await updateAuthor.update_user(author,id);

    res.redirect('/');


            
})
router.get('/modify/:id',isLogged, async function(req,res){
    let author = await authorController.get_author_by_id(req.params.id);
    res.render('authmod', {
        author
    })
    
})
router.get('/category', isLogged, function(req,res){
    res.render('category');
})
router.post('/category',isLogged, async function(req,res){
    let name = req.body.name;
    let catlenght = await long.large() + 1;
    matcher.match(name).then(resp =>{
        if (!resp) {
            categoryController.set_category(name,catlenght).then(resp =>{
                console.log(resp);
            });
            res.redirect('/');
            
        }else {
            res.render('category');
        }
    }).catch(console.error)

})
router.get('/create', isLogged, function(req,res){
    res.render('author');
});
router.post('/create',isLogged, upload.single('file'), async function(req,res){
    let name= req.body.name;
    let username = req.body.username;
    let password = req.body.password;
    let description = req.body.description;
    let superAdmin= false;
  
    if(req.body.switch ==='on'){
        superAdmin = true
    }
    if (password !== req.body.rpassword){
        res.render('author')
    } else {
        let newauthor = await authorController.set_author(name,username,password,superAdmin,description);
        await setPicture.set_avatar(req.file, newauthor.id);
        let authors = await authorController.get_authors();
        res.render('users',{
            authors
        })

    }


})


module.exports = router;