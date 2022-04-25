var express = require('express');
var router = express.Router();
var upload = require('../config/multer');
var setPicture = require('../helpers/set_avatar_from_author');
var article_control = require('../controllers/Article');
var add_categories = require('../helpers/add_categories_to_article');
var getAuthorPhoto = require('../helpers/get_photo_from_author');
var getAllFrom = require('../helpers/get_all_from_author');
var column_control = require('../controllers/Column');
var categoryControl = require('../controllers/Category');
var authorController = require('../controllers/Author');
var formatArt = require('../helpers/format_article');
var getAuthors = require('../helpers/get_authors');
var getPhotos = require('../helpers/get_pictures_from_article');
var formatCol = require('../helpers/format_column');
var formatHour = require('../helpers/format_hour');
var getAllFromCtgry = require('../helpers/get_all_from_category');
var getRelArt = require('../helpers/get_related_articles');
var pagination = require('../helpers/page');
var search_fun = require('../helpers/search_post');
var ls = require('local-storage');
var searchModule = require('../helpers/search_module');
var page ;
let articles = [];

/* GET home page. */
router.get('/:page?', async function(req, res, next) {
    if (req.params.page == undefined|| !req.params.page){
        page = 0;
    }else {
        page = req.params.page.charAt(6) + req.params.page.charAt(7);
        page = Number(page);
    }
    
    let art = await pagination.page(page);
    articles = await formatArt.format(art);
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const dias_semana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    let fecha = new Date() 
    let timer = String(dias_semana[fecha.getDay()] + ', ' + fecha.getDate() + ' de ' + meses[fecha.getMonth()] + ' de ' + fecha.getUTCFullYear());

    let columns = await pagination.column(page);
    columns = await formatCol.format(columns)
    let authors = await authorController.get_authors();
    let categories = await categoryControl.get_categories();
    
    res.send({
        timer,
        articles,
        columns,
        categories,
        authors
        
        })

    });
router.get('/next', function(req,res,next){
    let numberPage = ls.get('page');
    numberPage = + numberPage +  1;

    ls.set('page',numberPage);
    page = numberPage; 
   
    res.redirect('/');    
})    
router.get('/back', function(req,res,next){
    let numberPage = ls.get('page');
     + numberPage --;
    ls.set('page',numberPage);
    page = numberPage; 
    
    res.redirect('/');    
}) 
router.post('/search', async function(req,res,next) {
    let lookin = req.body.lookin;
    let posts = await search_fun.search(lookin);
    if (posts) {  
    res.render('searchGrid', {
        posts,
        lookin
    })
    } else {
     res.redirect('/');   
    }

    
    
}) 
router.get('/col/allfrom/:idauthor', async function(req,res,next){
    let idauthor = req.params.idauthor;
    let colums = await column_control.get_column_by_author(idauthor);
    res.send({
      colums  
    })

});
router.get('/hst/:code',async function(req,res,next){
    let code = req.params.code;
    let categoryName;
    let posts;
    if (code.toString().length < 4) {
    let category = await categoryControl.get_category_by_code(code);
    categoryName = category[0].name;
    posts = await getAllFromCtgry.sendPosts(code);
    posts = formatArt.format(posts);
   
} else {
    posts = await column_control.get_column_by_author(code);
    let author = await authorController.get_author_by_id(code);
    categoryName = author.name;
   
    }
    res.render('searchGrid',{
        posts,
        categoryName
} )
   


    
}) 
router.get('/art/:id' ,async function(req,res,next){
    let article = await article_control.get_article_by_id(req.params.id);
    let author = await authorController.get_author_by_id(article.author_id);
    let time = formatHour.format(article.updatedAt);
    let categories =  await add_categories.get_categories(article.id); 
    article.categories = categories;
    let posts =  await getRelArt.get_related(article);
    let photos = await getPhotos.get_photos(article.id);
    let authorPhoto = await getAuthorPhoto.return_picture(author.id);
    res.send( {
        authorPhoto,
        photos,
        article,
        author,
        time,
        posts,
        categories
    })

})
router.get('/cat/:id', async (req,res,next) => {
    let articles = await getAllFromCtgry.getPosts(req.params.id);
    articles.reverse();
res.send({
        articles
    })

})
router.get('/col/:id', async(req,res,next)=>{
    let column = await column_control.get_column_by_id(req.params.id);
    let author = await authorController.get_author_by_id(column.author_id);
    let authorPhoto = await getAuthorPhoto.return_picture(author.id);
    
    res.send({
        author,
        column,
        authorPhoto
    })


})
router.get('/search/:n', async (req,res,next)=>{
    let articles = await searchModule.search(req.params.n);
    res.send({
        articles
    })
})
router.get('/getpicture/:idArticle', async (req,res,next) =>{
    let photos = await getPhotos.get_photos(req.params.idArticle);
    res.send({
        photos
    })
})
/*router.get('/create/first/author',function(req,res,next){
    res.render('authorFirst');
});*/
router.post('/create/author', upload.single('file'), async function(req,res,next){
    let name= req.body.name;
    let username = req.body.username;
    let password = req.body.password;
    let description = req.body.description;
    let superAdmin= false;
    if(req.body.switch ==='on'){
        superAdmin = true
    }
    if (password !== req.body.rpassword){
        res.render('authorFirst')
    } else {
        let newauthor = await authorController.set_author(name,username,password,superAdmin,description);
        await setPicture.set_avatar(req.file, newauthor.id);
        res.render('authorFirst')

    }


});
router.get('/author/:id', async (req,res,next)=>{
    let related = await getAllFrom.getPosts(req.params.id);
    res.send({
        related
    });

    
});
router.get('/authors/get',async (req,res,next) =>{
    let authors= await getAuthors.get_all_authors();
    res.send({
        authors
    })
})

module.exports = router;
