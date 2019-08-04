var express = require('express');
var router = express.Router();
var authorController = require('../controllers/Author')

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
    //sacar el length de categories para añadirle el code
})


module.exports = router;