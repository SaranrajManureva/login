class config {
  constructor() {
    // Environment SetUp
    this.db = "mongodb://localhost:27017/userloginregdb";
    this.apiPort = 3000;
    this.facebookAPI = {
      clientID: "485948575520768", // your App ID
      clientSecret: "cf24322573d54cf6de1bf345a58684fb", // your App Secret
      callbackURL: "https://tinyurl.com/zhawz/auth/facebook/callback",
      profileURL:
        "https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email",
      profileFields: ["id", "email", "name"] // For requesting permissions from Facebook API
    };
    this.googleAPI = {
      clientID:
        "842811596053-f5apva010go6l45a0mu0sh294jev5tgt.apps.googleusercontent.com",
      clientSecret: "c9lr-flxx9Js6m5WHpoUOcUN",
      callbackURL: "/auth/google/callback"
    };

    this.twitterApi = {
      consumerKey: "r61MJ5H6NRNNRGoLeLCj1q9Hb",
      consumerSecret: "YgqBg5CRPoig5SxM51PlRjpuJURA4NBhWLyaVcJmz2u5vcMg8u",
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
