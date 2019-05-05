
var mongoose = require("mongoose");
var Moto = require("./models/motorcycle");
var Comment = require("./models/comment");

var data = [
        {
        brand: "Honda",
        model:  "CB500F",
        imageurl: "https://cdp.azureedge.net/products-private/prod/30eb66df-20ab-4172-bde6-2a081a37e1d8/414fcce9-673b-4db0-9717-a5d2012c2344/00000000-0000-0000-0000-000000000000/612a86b1-37e9-4fa1-8931-a4280185b80a/2319f7a6-391b-47c0-aae3-a6c200fc415b/6000000001.jpg",
        description: "Great mid-range all round awesome bike. Low price, great styling and comfortable riding position.",
        },
        {
        brand: "Suzuki",
        model:  "GSX-S750",
        imageurl: "https://cdp.azureedge.net/products-private/prod/69b93a89-4aa9-4790-ac69-b6a15538b6c9/e6a45930-39d1-4555-a8f6-a62b013fd415/00000000-0000-0000-0000-000000000000/da60f55e-228f-4f29-9a6f-a69f004196c7/852d79d1-172f-4d3f-8a15-a793000d1b96/6000000003.jpg",
        description: "Super sexy naked roadster fun. Aggressive styling and aggressive handling at a great price.",
        },
        {
        brand: "Yamaha",
        model:  "YZF-R6",
        imageurl: "https://cf-img.autorevo.com/2015-yamaha-yzf-burbank-ca-6473718/640x640/2107193-0-revo.jpg",
        description: "Top tier 600cc racing pedigree. Fantastic performance and to die for specs will serve you well when the track day comes around.",
        },
        {
        brand: "BMW",
        model:  "GS 310R",
        imageurl: "https://ultimatemotorcycling.com/wp-content/uploads/2018/07/2018-BMW-G-310-gs-g-310-r-recall.jpg",
        description: "Light 300cc get-around. Great for commuting, or just cruising.",
        },
        {
        brand: "Honda",
        model:  "CMX500 Rebel",
        imageurl: "https://images.honestjohn.co.uk/imagecache/file/crop/620x400/media-kit/1300/honda-cmx500-rebel-9.jpg",
        description: "Easy rider rebuilt for the 21st century. Classic cruiser styling, screams sophistication and character.",
        },
    ];

function seedDB(){
    // Delete all existing motorcycles
    Moto.remove({}, function(err){
        if(err){
        console.log(err);
        }
        console.log("MOTORCYCLES REMOVED");
        
        // Add some new motorcycles
        data.forEach(function(seed){
            Moto.create(seed, function(err, motorcycle){
             if(err){
                console.log(err);
            } else {
                console.log("MOTORCYCLES ADDED TO DB");
                
                // create comment
                Comment.create(
                    {
                    text:   "Wow, such a sick bike. Wish I had the money to buy one!",
                    author: "Carl Fogharti"
                    },
                    
                    function(err, comment){
                    if(err){
                        console.log(err);
                        
                    } else {
                        motorcycle.comments.push(comment);
                        motorcycle.save();
                        console.log("Created new comment");
                    }
                    });
                }
            });            
        });
    });
}


module.exports = seedDB;