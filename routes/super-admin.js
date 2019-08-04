var express = require('express');
var router = express.Router();
var authorController = require('../controllers/Author')
var upload = require('../config/multer');
var matcher = require('../helpers/match_category');
var long = require('../helpers/category_length');

router.get('/users', async function(req,res){
   let authors = await authorController.get_authors();
   res.render('users', {
       authors
   })

})
router.get('/erase/:id', async function(req,res){

})
router.get('/modify/:id', async function(req,res){
    
})

router.get('/category', function(req,res){
    res.render('category');
})

router.post('/category', async function(req,res){
    let name = req.body.name;
    matcher.match(name).then(resp =>{
        console.log('REspuesta',resp);
    }).catch(console.error)
    let catlenght = await long.large();
    console.log('CATEFSDFASF',catlenght);
    
    //sacar el length de categories para añadirle el code
})
router.get('/create', function(req,res){
    res.render('author');
} );
router.post('/create', upload.single('file',1), async function(req,res){
    let name= req.body.name;
    let username = req.body.username;
    let password = req.body.password;
    let avatar = req.file
    let superAdmin= false;
  

    if(req.body.switch ==='on'){
        superAdmin = true
    }

    if (password !== req.body.rpassword){
        res.render('author')
    } else {
        
        await authorController.set_author(name,username,password,avatar,superAdmin);
        let authors = await authorController.get_authors();
        res.render('users',{
            authors
        })

    }


})


module.exports = router;