class config {
  constructor() {
    // Environment SetUp
    this.db = "mongodb://localhost:27017/userloginregdb";
    this.apiPort = 3000;
    this.facebookAPI = {
      clientID: "", // your App ID
      clientSecret: "", // your App Secret
      callbackURL: "https://tinyurl.com/zhawz/auth/facebook/callback",
      profileURL:
        "https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email",
      profileFields: ["id", "email", "name"] // For requesting permissions from Facebook API
    };
    this.googleAPI = {
      clientID:
        "",
      clientSecret: "c9lr-",
      callbackURL: "/auth/google/callback"
    };

    this.twitterApi = {
      consumerKey: "",
      consumerSecret: "",
      callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
    };

    mongoose.connect(this.db, { useNewUrlParser: true }, err => {
      if (err) {
        console.log(`[MongoDB] Failed to connect. ${err}`);
      } else {
        console.log(`Connection has been established successfully.`);
        app.listen(this.apiPort, () => {
          //console.log(`[Server] listening on port ${this.apiPort}`);
          console.log(`SiteURl:- http://127.0.0.1:3000`);
        });
      }
    });
  }
}

module.exports = config;
