var express    = require("express");
var  app = express();
var mongoose = require("mongoose");
var Post = require("./models/post");
var User = require("./models/user");
var passport = require("passport");
var Bus = require("./models/bus");
var LocalStrategy = require("passport-local");



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

var dataUser = [
    {
        username: "Hargun",
		password: "admin",
        email: "hargunsinghsahni@gmail.com",
        bio: "Let us assume this is a very good bio",
        image: "data:image/jpeg;base64,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",
        dob: "2019-08-01T00:00:00.000+00:00",
        phoneNumber: "8860997024",
        Post: [],
        coins: 100,
        salt: "dc2aa9b6a999510c44624f3203eae11e3869c531baae39e9f33983dad8f13be0",
        hash: "ec4babcdd10ddfe4c0cd37aabe4c02be982284c561e7258d03a9c93974030ff920ef8ea5b688f8b3acb8a5920183c615a62a4abd5bfba68d84f3e1e1a32735c84de75f91f3c3f3d687a3744b7fa3914c5a9930e66ab3dc73e5b7c9265121df62ab62b72d9bff8194aa016df671c48bc56ef9b3596ffc918280e9b4f3756b3eafe559cd1919ef10aa736cf248a8c2845c831ae24c03f739ec3489d17d6e8206091c30b6f17706da22498643375e0ab83246902d08a5f57b4151090bfe31aa660347e24057bb4cb81f6d78ecd287ad9820386d5fc412b93667bc1bc3d577cd77c3dd4cb2b1ec5fa12211b65f80970cc7a46ffc05cdcd3416ca05b4b0cc991b46b3deb8c8086959116e341b3dc9f0255fd05410516865b713155b28a754c1dafa6ccd26f2758d4952bfe1e23da8bc815a6a97d1752049302d0e09fcc5babdcdd19484ad5184b731ccd2df1b64f2f679fd31f79cc0376705d4f50d01fe3291bc68c2aba0a61467a3d46246563d9f5f9db445b96cec714f326809a6fcbf16b649d10c45560b09787c9c83b1e24467d7af78f12615a11be9424fc257dc6ef6253526f96cfa6683566acd047aef969d10f4865249ff0bc99be9af86ace58219d369652f4dc5ccc1a8b53706787c2a387f029820f2eba31c65b869e2e636c18a939c0a8abc8c22886e5a2980fde2375b8597e72780bcd348c609a444a3fb38a3d67e8d8f"
    },
    {
        username: "Ashish",
		password: "admin",
        email: "ashishkumar120600@gmail.com",
        bio: "Coder Boy",
        image: "https://scontent-bom1-1.xx.fbcdn.net/v/t1.0-9/42689773_1712704018852534_3050443098271252480_n.jpg?_nc_cat=103&_nc_oc=AQkcBif_Bbyo7xzBnpIn9FjaZgVB8SnRYG8zc90ae--JWRdht_0ptS6VSJcRN1IFRCkzPDrASttytxYzd-XfinQ8&_nc_ht=scontent-bom1-1.xx&oh=ab75ab4d9c8e64a8e91531e8b5fb3a84&oe=5DDD32BE",
        dob: "2019-08-01T00:00:00.000+00:00",
        phoneNumber: "8851394024",
        Post: [],
        coins: 100,
        salt: "dc2aa9b6a999510c44624f3203eae11e3869c531baae39e9f33983dad8f13be0",
        hash: "ec4babcdd10ddfe4c0cd37aabe4c02be982284c561e7258d03a9c93974030ff920ef8ea5b688f8b3acb8a5920183c615a62a4abd5bfba68d84f3e1e1a32735c84de75f91f3c3f3d687a3744b7fa3914c5a9930e66ab3dc73e5b7c9265121df62ab62b72d9bff8194aa016df671c48bc56ef9b3596ffc918280e9b4f3756b3eafe559cd1919ef10aa736cf248a8c2845c831ae24c03f739ec3489d17d6e8206091c30b6f17706da22498643375e0ab83246902d08a5f57b4151090bfe31aa660347e24057bb4cb81f6d78ecd287ad9820386d5fc412b93667bc1bc3d577cd77c3dd4cb2b1ec5fa12211b65f80970cc7a46ffc05cdcd3416ca05b4b0cc991b46b3deb8c8086959116e341b3dc9f0255fd05410516865b713155b28a754c1dafa6ccd26f2758d4952bfe1e23da8bc815a6a97d1752049302d0e09fcc5babdcdd19484ad5184b731ccd2df1b64f2f679fd31f79cc0376705d4f50d01fe3291bc68c2aba0a61467a3d46246563d9f5f9db445b96cec714f326809a6fcbf16b649d10c45560b09787c9c83b1e24467d7af78f12615a11be9424fc257dc6ef6253526f96cfa6683566acd047aef969d10f4865249ff0bc99be9af86ace58219d369652f4dc5ccc1a8b53706787c2a387f029820f2eba31c65b869e2e636c18a939c0a8abc8c22886e5a2980fde2375b8597e72780bcd348c609a444a3fb38a3d67e8d8f"
    },
    {
        username: "Shankar",
		password: "admin",
        email: "ayushshanker23@gmail.com",
        bio: "Implying to complicate",
        image: "https://scontent-bom1-1.xx.fbcdn.net/v/t1.0-1/p160x160/49164658_1997160007041464_5004879957864742912_n.jpg?_nc_cat=105&_nc_oc=AQm4uUxc86-OkPLDNECwjavhnfLYdlwk0cmNcWfnSl_j7JQ2feSW8TzLLYleoS91Y6WXWWA3D61tzJjdizHLhqcE&_nc_ht=scontent-bom1-1.xx&oh=bd29ef26e996bc1906b105d8f2d3d405&oe=5DD79ECB",
        dob: "2019-08-01T00:00:00.000+00:00",
        phoneNumber: "8285471847",
        Post: [],
        coins: 200,
        salt: "dc2aa9b6a999510c44624f3203eae11e3869c531baae39e9f33983dad8f13be0",
        hash: "ec4babcdd10ddfe4c0cd37aabe4c02be982284c561e7258d03a9c93974030ff920ef8ea5b688f8b3acb8a5920183c615a62a4abd5bfba68d84f3e1e1a32735c84de75f91f3c3f3d687a3744b7fa3914c5a9930e66ab3dc73e5b7c9265121df62ab62b72d9bff8194aa016df671c48bc56ef9b3596ffc918280e9b4f3756b3eafe559cd1919ef10aa736cf248a8c2845c831ae24c03f739ec3489d17d6e8206091c30b6f17706da22498643375e0ab83246902d08a5f57b4151090bfe31aa660347e24057bb4cb81f6d78ecd287ad9820386d5fc412b93667bc1bc3d577cd77c3dd4cb2b1ec5fa12211b65f80970cc7a46ffc05cdcd3416ca05b4b0cc991b46b3deb8c8086959116e341b3dc9f0255fd05410516865b713155b28a754c1dafa6ccd26f2758d4952bfe1e23da8bc815a6a97d1752049302d0e09fcc5babdcdd19484ad5184b731ccd2df1b64f2f679fd31f79cc0376705d4f50d01fe3291bc68c2aba0a61467a3d46246563d9f5f9db445b96cec714f326809a6fcbf16b649d10c45560b09787c9c83b1e24467d7af78f12615a11be9424fc257dc6ef6253526f96cfa6683566acd047aef969d10f4865249ff0bc99be9af86ace58219d369652f4dc5ccc1a8b53706787c2a387f029820f2eba31c65b869e2e636c18a939c0a8abc8c22886e5a2980fde2375b8597e72780bcd348c609a444a3fb38a3d67e8d8f"
    },
    {
        username: "Gaurav",
		password: "admin",
        email: "gauravnegi2440@gmail.com",
        bio: "Linux User",
        image: "https://images.unsplash.com/photo-1542823671-3cf657be6a10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80",
        dob: "2019-08-01T00:00:00.000+00:00",
        phoneNumber: "7289928640",
        Post: [],
        coins: 50,
        salt: "dc2aa9b6a999510c44624f3203eae11e3869c531baae39e9f33983dad8f13be0",
        hash: "ec4babcdd10ddfe4c0cd37aabe4c02be982284c561e7258d03a9c93974030ff920ef8ea5b688f8b3acb8a5920183c615a62a4abd5bfba68d84f3e1e1a32735c84de75f91f3c3f3d687a3744b7fa3914c5a9930e66ab3dc73e5b7c9265121df62ab62b72d9bff8194aa016df671c48bc56ef9b3596ffc918280e9b4f3756b3eafe559cd1919ef10aa736cf248a8c2845c831ae24c03f739ec3489d17d6e8206091c30b6f17706da22498643375e0ab83246902d08a5f57b4151090bfe31aa660347e24057bb4cb81f6d78ecd287ad9820386d5fc412b93667bc1bc3d577cd77c3dd4cb2b1ec5fa12211b65f80970cc7a46ffc05cdcd3416ca05b4b0cc991b46b3deb8c8086959116e341b3dc9f0255fd05410516865b713155b28a754c1dafa6ccd26f2758d4952bfe1e23da8bc815a6a97d1752049302d0e09fcc5babdcdd19484ad5184b731ccd2df1b64f2f679fd31f79cc0376705d4f50d01fe3291bc68c2aba0a61467a3d46246563d9f5f9db445b96cec714f326809a6fcbf16b649d10c45560b09787c9c83b1e24467d7af78f12615a11be9424fc257dc6ef6253526f96cfa6683566acd047aef969d10f4865249ff0bc99be9af86ace58219d369652f4dc5ccc1a8b53706787c2a387f029820f2eba31c65b869e2e636c18a939c0a8abc8c22886e5a2980fde2375b8597e72780bcd348c609a444a3fb38a3d67e8d8f"
    }
]

var dataBus = [
    {
        number: 7979,
        seats: {
            totalSeats: 15,
            availableSeats: 10
        },
        start: {
            location: "Tilak Nagar",
            time: "10:00"
        },
        end: {
            location: "Kiran Garden",
            time: "15:00"
        },
        via: ['Ganesh Nagar Check Post','Janak Puri East','District Center','Dholi Piao','Vikas Puri','Uttam Nagar Terminal','Prem Nagar','Om Vihar']
    },
    {
        number: 7216,
        seats: {
            totalSeats: 15,
            availableSeats: 5
        },
        start: {
            location: "Kakrola Bridge",
            time: "08:00"
        },
        end: {
            location: "Nirmal Vihar",
            time: "12:00"
        },
        via: ['Sainik Enclave','Rajiv Ratan Awas','Baprola Village','Baprola School','Air Force Station','Jai Vihar']
    },
    {
        number: 2440,
        seats: {
            totalSeats: 15,
            availableSeats: 5
        },
        start: {
            location: 'Dwarka Mor',
            time: "09:00"
        },
        end: {
            location: 'RK Puram Sector 8',
            time: "19:00"
        },
        via: ['NSIT','DPS Matiala','Dwarka Sector 2','Palam Village','Palam Colony','Palam Airport']
    }
]


function seedDB(){
    // User
    Post.deleteMany({}, function(err){
        User.deleteMany({}, function(err){
            if(err){
                console.log(err);
            }
            dataUser.forEach(function(seed){
                User.create(seed, function(err, user){
                    if(err){
                        console.log(err)
                    } else {
                        Post.create(
                            {
                               name: "Post",
                               image: "https://images.unsplash.com/photo-1566632210580-97638495654a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                               description: "NEC hackathon is great",
                            }, function(err, post){
                                if(err){
                                    console.log(err);
                                } else {
                                    user.Post.push(post);
                                    user.save();
                                }
                            });
                    }
                });
            });
        }); 
    })
    // BUS

    Bus.deleteMany({}, function(err){
        if(err)
        {
            console.log(err);
        }
        else
        {
            dataBus.forEach(function(bus){
                Bus.create(bus, function(err, createdBus){
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        for(var i = 0; i < createdBus.seats.totalSeats; i++)
                        {
                            var bool = {
                                available: false
                            };
                            createdBus.seats.seatsInfo.push(bool);
                        }
                        for(var i = 0; i < createdBus.seats.availableSeats; i++)
                        {
                            createdBus.seats.seatsInfo[i].available = true;
                        }
                        createdBus.save();
                    }
                })
            })
        }
    })
 }

module.exports = seedDB;
