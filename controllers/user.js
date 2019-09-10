userModel = require("../models/user");  
class user {
	constructor(){
		 passport.use(new LocalStrategy({  
			usernameField: 'email',     
			passwordField: 'password'
			 },
		  (username, password, done)=> {
		   userModel.findOne({"email":username}, (err, user)=>{ 
				if(err) throw err;
				if(!user){
					return done(null, false, {message: 'Unknown User'});
				} 
				 
				if (bcrypt.compareSync(password, user.password)==false) {
					return done(null, false, { message: 'Incorrect password.' });
				}
				return done(null, user); 
		   });
		}));  

		passport.serializeUser((user, done) => { 
		  done(null, user.id);
		});

		passport.deserializeUser((id, done) => {
		  userModel.findById(id).then((user)=> { 
			done(null, user);
		  });
		}); 
		
	}
	userRegistration(req,res){
		var hash = bcrypt.hashSync(req.body.password, saltRounds); 
		var user ={"fname":req.body.fname,
					"lname":req.body.lname,
				   "email":req.body.email,
				   "password":bcrypt.hashSync(req.body.password, saltRounds),
				   "address":req.body.address
				  }  
				  
		userModel.findOne({"email":req.body.email}).then((result)=>{
			if(result){
				return res.send({"status":"ERROR","message":"Email already exists"}) 
			}
			else{  
				userModel.create(user).then((result) => {  
					req.logIn(result, function(err) {
					  if (err) { return next(err); }
					  req.flash('success_msg', 'Registered Successfully');
					  return res.send({"status":"OK","message":"Registered Successfully"})
					});
					
				});
			}
		})
			
	}
	
	
	profileUpdate(req,res){ 
		var newvalues = { $set: {"fname":req.body.fname,
					"lname":req.body.lname,
				   "address":req.body.address
				  }  };
		 userModel.updateOne({'_id':req.body.id}, newvalues, function(err, result){
			 req.flash('success_msg', 'Updated Successfully');
		  return res.send({"status":"OK","message":"Registered Successfully"});
		 })
	}
	
	userLogin(req, res, next){
	  passport.authenticate('local', (err, user, info)=> {
		if (err) { return next(err); }
		if (!user) { return res.send({"status":"ERROR","message":info.message}); }
		req.logIn(user, function(err) {
		  if (err) { return next(err); }
				req.flash('success_msg', 'Logged In successfully');
		  return res.send({"status":"OK","message":"Logged In successfully"});
		});
	  })(req, res, next);
	}
	
}
  
module.exports = user;