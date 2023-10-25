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
        regularPrice,
        discountedPrice,
        offer,
        imageUrls,
        capacity,
        sites,
        amenities,
        activities,
        pets,
        userRef,
    } = req.body; // Assuming you're sending data in the request body

    if(!name ||
        !description ||
        !address ||
        !regularPrice ||
        !discountedPrice ||
        !offer ||
        !imageUrls ||
        !capacity ||
        !sites ||
        !amenities ||
        !activities ||
        !pets
    ){
        return res.status(400).json({msg:'Please fill all fields.'});
    }

    try{
        const savedGround = await Ground.create(req.body);
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