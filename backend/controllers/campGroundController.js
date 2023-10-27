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

/*
Desc : Route to delete a listed camping ground.
Route: DELETE /api/ground/create
access: private
*/
const deleteGround = asyncHnadler( async(req, res) => {
    const ground = await Ground.findById(req.params.id);
    if(!ground){
        const error = new Error(`No such ground Found.`);
        error.statusCode = 404;
        throw error;
    }

    if(req.user.objId !== ground.userRef.toString()){
        const error = new Error(`You can only delete your own Ground.`);
        error.statusCode = 401;
        throw error;
    }

    try{
        await Ground.findByIdAndDelete(req.params.id);
        return res.status(200).json('Camp Ground has been deleted.')
    }catch(err){
        const error = new Error(`Error deleting ground ${err}`);
        error.statusCode = 400;
        throw error;
    }
});

module.exports = {
    createGrounds,
    deleteGround,
};