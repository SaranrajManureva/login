router = express.Router(); 
userController = require('../controllers/user');
userControllerObj = new userController();  

//Post

router.post('/registration',(req,res)=>userControllerObj.userRegistration(req,res)); 
router.post('/login',(req,res, next)=>userControllerObj.userLogin(req,res, next));

//Get 
router.get('/', function(req, res){
	res.render('index');
});

router.get('/registration', logInUser,(req,res) => res.render("registration"));  

router.get('/profile', logUser, function(req, res){
	res.render('profile');
});
router.get('/login',(req,res)=>{ 
	res.render("login")
});  
router.get('/logout', function(req, res){
	req.logout(); 
	req.flash('success_msg', 'You are logged out'); 
	res.redirect('/login');
});

//Put
router.put('/profile', logUser, (req,res)=>userControllerObj.profileUpdate(req,res));

function logUser(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else { 
		res.redirect('/');
	}
}

function logInUser(req, res, next){
	if(req.isAuthenticated()){ 
		res.redirect('/profile');
	} else { 
		return next();
	}
}
module.exports = router;

 