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
    } = req.body;

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
Route: DELETE /api/ground/create/:id
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

/*
Desc : Route to update a listed camping ground.
Route: POST /api/ground/update/:id
access: private
*/
const updateGround = asyncHnadler( async(req, res) => {
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
    } = req.body;

    const lat = parseFloat(Latitude);
    const lng = parseFloat(Longitude);

    const ground = await Ground.findById(req.params.id);

    if(!ground){
        const error = new Error(`ground not Found.`);
        error.statusCode = 404;
        throw error;
    }

    if(req.user.id !== ground.userRef.toString()){
        const error = new Error(`You can only edit your own Ground.`);
        error.statusCode = 401;
        throw error;
    }

    const uground = {
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
        imageUrls,
        lat,
        lng,
        userRef: req.user.objId,
    }

    try{
        const updatedGround = await Ground.findByIdAndUpdate(
            req.params.id,
            uground,
            { new: true }
        );

        return res.status(200).json(updateGround);
    }catch(err){}
})

module.exports = {
    createGrounds,
    deleteGround,
    updateGround,
};