
var UserSchema = mongoose.Schema({
	fname: {
		type: String 
	},
	lname: {
		type: String 
	},
	password: {
		type: String
	},
	email: {
		type: String
	} ,
	address: {
		type: String
	} 
});

var User = module.exports = mongoose.model('User', UserSchema);

 