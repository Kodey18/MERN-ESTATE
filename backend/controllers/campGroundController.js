const asyncHnadler = require('express-async-handler');
const Ground = require('../models/groundModel');

/*
Desc: Routes to create a camping ground.
Route: POST /api/ground/create
Access: Private (Token)
*/
const createGrounds = asyncHnadler( async(req, res) => {
    const {
        name,
        description,
        address,
        pets,
        tours,
        rentalEquip,
        foodService,
        accommodation,
        intake,
        sites,
        Rprice,
        Dprice,
        amenities,
        activities,
        imageUrls,
        Latitude,
        Longitude,
    } = req.body; // Assuming you're sending data in the request body

    const lat = parseFloat(Latitude);
    const lng = parseFloat(Longitude);

    try{
        const savedGround = await Ground.create({
            name,
            description,
            address,
            // Convert "on" and "off" to boolean values
            "pets" : pets === "on",
            "tours": tours === "on",
            "rentalEquip": rentalEquip === "on",
            "foodService": foodService === "on",
            accommodation,
            intake,
            sites,
            Rprice,
            Dprice,
            amenities,
            activities,
            lat,
            lng,
            imageUrls,
            userRef: req.user.objId,
        });

        return res.status(200).json(savedGround);
    }catch(err){
        const error = new Error(`Error creatin a ground ${err}`);
        error.statusCode = 400;
        throw error;
    }
});

module.exports = {
    createGrounds,
};