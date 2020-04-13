var express    = require("express");
var  app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var Post = require("./models/post");
var Bus = require("./models/bus");
var Comments = require("./models/comments");
var methodOverride = require('method-override');
var seedDB      = require("./seeds");
var request = require("request");
const MongoClient = require('mongodb').MongoClient;
// Relace with your own username, password and MongoDb cluster link.
const uri = "mongodb+srv://SINGHHR:ayush123@cluster0-zq4ke.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  client.close();
});
app.use(bodyparser.urlencoded({extended  : true}));
// Replace with your own link.
mongoose.connect("mongodb+srv://SINGHHR:ayush123@cluster0-zq4ke.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true});
mongoose.set("useFindAndModify", false);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("./library"));
app.use(methodOverride('_method'));

//seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

// ========================
// ROUTES
// ========================

app.get("/", function(req, res){
	res.redirect("/home");
})

app.get("/home",function(req,res){
	res.render("home");
   });

// Location
// ========================

//Places Search Nearby
app.get("/search",function(req,res){
	var url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + req.query.s + "&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyDZc99u5sdXOCYQUDqkyju1EK3Jyb-hJbU"
	;
   request(url,function(err,resp,body){
         if(!err && resp.statusCode == 200){
			body = JSON.parse(body);
			res.render("geoLocation", {
				data: body
			})
         }
		})
   })

app.get("/safehouse", function(req, res){
	res.render("safehouse");
})

app.get("/getLocation", function(req, res){
	res.render("getLocation");
 });

app.get("/safehouse1", function(req, res){
	res.render("safehouse1");
 });

app.get("/safehouse2", function(req, res){
	res.render("safehouse2");
 });

app.get("/safehouse3", function(req, res){
	res.render("safehouse3");
 });

app.get("/safehouse4", function(req, res){
	res.render("safehouse4");
 });

app.get("/safehouse5", function(req, res){
	res.render("safehouse5");
 });

app.get("/safehouse6", function(req, res){
	res.render("safehouse6");
 });

 
 app.get("/geolocation",function(req,res){
	var ip = req.query.ip;
	var url = "http://ip-api.com/json/" + ip;
	console.log(url);
	  request(url,function(err,response,body){
	if(!err && response.statusCode == 200){
	   var data = JSON.parse(body);
	   var latitude = String(data["lat"]);
	   var longitude = String(data["lon"]);
	   res.render("geolocation", {latitude: latitude, longitude: longitude});
	}
  })
 });

// =========================
// SOS
// =========================

app.get("/sos", function(req, res){
	res.render("SOS");
})

app.get('*', function(req, res,next){
    res.locals.user = req.user || null;
    next();
})

app.get("/loc", isLoggedIn, function(req, res) {
      var lat = req.query.lat;
      var lng = req.query.lng;
      var url =
    "mailto:" + req.user.emergencyContactEmail + "?subject=I am in Danger&body=I am sending you my location. My current latitude is " +
    lat +
    " and longitude is " +
    lng;
      res.redirect(url);
});

// =======================
// BUS
// =======================


app.get("/showBus", function(req, res){
	Bus.find({}, function(err, foundBuses){
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.render("bus", { buses: foundBuses });
		}
	})
})

app.get("/showBus/:id", function(req, res){
    Bus.findById(req.params.id, function(err, foundBus){
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.render("showBus", {bus: foundBus});
		}
	});
});

app.get("/showBus/:id/route/:number", function(req, res){
	var number = req.params.number;
	var file = "route" + number;

	Bus.findById(req.params.id, function(err, foundBus){
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.render(file, {bus: foundBus});
		}
	});
})


app.get("/showBus/:id/:seatNumber", function(req, res){
	var cnt = 0;
	var seatNumber = req.params.seatNumber;
    Bus.findById(req.params.id, function(err, foundBus){
		if(err)
		{
			console.log(err);
		}
		else
		{
			foundBus.seats.seatsInfo[seatNumber].available = !foundBus.seats.seatsInfo[seatNumber].available; 
			foundBus.seats.seatsInfo.forEach(function(seat){
				if(seat.available == true)
				{
					cnt++;
				}
			})
			foundBus.seats.availableSeats = cnt;
			foundBus.save(function(err, savedBus){
				if(err)
				{
					console.log(err);
				}
				else
				{
					res.render("showBus", {bus: savedBus});
				}
			})
		}
	});
});
// =================
// Authentication
// =================
app.get("/login",function(req,res){
	res.render("login");
});

app.get("/signup",function(req,res){
	res.render("signup");
});

app.post("/signup", function(req, res) {
  var newUser = new User({
    username: req.body.username,
    dob: req.body.dob,
    email: req.body.email,
    bio: req.body.bio,
    image: req.body.image,
    phoneNumber: req.body.phoneNumber,
    emergencyContactEmail: req.body.emergencyContactEmail
  });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render("signup");
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/home");
    });
  });
});


app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/home");
});

app.post("/login", passport.authenticate("local", 
{
	successRedirect: "/home",
	failureRedirect: "/login"
}), function(req, res){ 
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

// ====================
// USER
// ====================


app.get("/socialPosts",function(req,res)
{
	var expandedUsers = [];
	User.find({}, function(err, foundUsers)
	{
		if(err)
		{
			console.log(err);
		}
		else
		{
			for(var i=0; i < foundUsers.length; i++)
			{
				foundUsers[i].populate("Post", function(err, data)
				{
					if(err)
					{
						console.log(err);
					}
					expandedUsers.push(data);
				})
			}
			setTimeout(function(){
				console.log("USERS", expandedUsers);
				res.render("socialPosts", {
					users: expandedUsers
				});
			}, 6000);
		}
	})

})

app.get("/user/:id", function(req, res){
	User.findById(req.params.id, function(err, foundUser){
		if(err)
		{
			console.log(err);
		}
		else
		{
			if(foundUser.Post.length == 0)
			{
				console.log(foundUser.Post.length);
				res.render("user", {user: foundUser});
			}
			else
			{
			foundUser.populate("Post", function(err, data)
			{
				if(err){
					console.log(err);
				}
				else{
					res.render("user", {user: data});
				}
			})
			}
		}
	})
})

app.put("/user/:id", isLoggedIn, function(req, res) {
  var updatedUser = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    bio: req.body.bio,
    image: req.body.image,
    phoneNumber: req.body.phoneNumber,
    emergencyContactEmail: req.body.emergencyContactEmail
  };

  User.findByIdAndUpdate(req.params.id, updatedUser, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      var showUrl = "/user/" + foundUser._id;
      foundUser.save();
      res.redirect(showUrl);
    }
  });
});


app.get("/user/:id/settings", isLoggedIn, function(req, res){
	User.findById(req.params.id, function(err, foundUser){
		if(err){
			console.log(err);
		}
		else{
			res.render("setting", {user: foundUser});
		}
	})
});


app.get("/user/:id/qr",isLoggedIn, function(req,res){
	var userId = req.params.id;

	User.findById(userId, function(err, foundUser){
		if(err)
	{
		console.log(err);
	}
	else
	{
		res.render("QR", {user: foundUser});
	}
	})
});

app.get("/user/:id/payment/:code", isLoggedIn, function(req, res){
	var userId = req.params.id;
	var qrCode = req.params.code;

	User.findById(userId, function(err, foundUser){
		if(err)
	{
		console.log(err);
	}
	else
	{
		res.render("payment", {
			user: foundUser,
			qrCode: qrCode
		})
	}
	})
})

app.get("/user/:id/newPost",isLoggedIn, function(req,res){
	var userId = req.params.id;
	res.render("newPost" , {id: userId});
});

app.post("/user/:id/newPost",isLoggedIn, function(req,res){
	var url;
	var userId = req.params.id;

	Post.create(req.body.post, function(err, createdPost){
		if(err)
		{
			console.log(err);
			url = "/user/" + userId;
			res.redirect(url);
		}
		else
		{
			User.findById(userId, function(err, foundUser){
				if(err)
				{
					console.log(err);
				}
				else
				{
					foundUser.Post.push(createdPost);
					foundUser.save();

					url = "/user/" + userId;
					res.redirect(url);
				}
			})
		}
	})
});

app.delete("/user/:userid/delete/:postid", isLoggedIn, function(req, res){
	var userId = req.params.userid;
	var postId = req.params.postid;
	var index;

	User.findById(userId, function(err, user){
		if(err)
		{
			console.log(err);
		}
		else
		{
			index = user.Post.indexOf(postId);
			user.Post.slice(index, 1);
			console.log(user.Post)
			Post.findByIdAndDelete(postId, function(err){
				if(err)
				{
					console.log(err);
				}
				else
				{
					var url = "/user/" + userId;
					res.redirect(url);
				}
			})
		}
	})
})

app.post("/user/:id/payment/:coin", isLoggedIn, function(req,res){
	var id = req.params.id;
	var payment = req.params.coin;
	var temp = 0;

	User.findById(id, function(err, foundUser){
		if(err)
		{
			console.log(err);
		}
		else
		{
			temp = Number(foundUser.coins);
			temp += Number(payment);
			console.log(temp);
			foundUser.coins = Number(temp);
			foundUser.save(function(err, savedUser){
				if(err)
				{
					console.log(err);
				}
				else
				{
					var url = "/user/" + id;
					res.redirect(url);
				}
			});
		}
	})
});

app.get("/leaderboard",isLoggedIn, function(req,res){
	User.find({}, function(err, foundUsers){
		if(err){
			console.log(err);
		}
		else
		{
			var i, j, t;
			for(i = 1; i < foundUsers.length; i++)
			{
				for(j = 0; j < foundUsers.length - i; j++){
					if(foundUsers[j].coins < foundUsers[j+1].coins)
					{
						t = foundUsers[j];
						foundUsers[j] = foundUsers[j+1];
						foundUsers[j+1] = t;
					}
				}
			}
			res.render("leaderboard", {users: foundUsers});
		}
	});
 });

// ===================
// MISCELANEOUS
// ===================

app.get("/circular",function(req,res){
	res.render("circular");
});

app.get("/awareness",function(req,res){
	res.render("awareness");
});

app.get("/about",function(req,res){
	res.render("about");
});

app.listen(process.env.PORT || 3000,function(req,res){
console.log("Server Started");
})
