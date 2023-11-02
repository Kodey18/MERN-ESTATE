const asyncHnadler = require('express-async-handler');
const Ground = require('../models/groundModel');

/*
Desc: Routes to get multiple camping ground.
Route: POST /api/ground/grounds
Access: Private (Token)
*/
const getGrounds = asyncHnadler( async(req, res) => {
    try{
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;

        let foodService = req.query.foodService;
        if(foodService == undefined || foodService === 'false'){
            foodService = { $in : [false, true]};
        };

        let rentalEquip = req.query.rentalEquip;
        if(rentalEquip == undefined || rentalEquip === 'false'){
            rentalEquip = { $in : [false, true]};
        };

        let pets = req.query.pets;
        if(pets == undefined || pets === 'false'){
            pets = { $in : [false, true]};
        };

        let tours = req.query.tours;
        if(tours == undefined || tours === 'false'){
            tours = { $in : [false, true]};
        }

        const searchTerm = req.query.searchTerm || '';
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';

        const grounds = await Ground.find({
            name: { $regex: searchTerm, $options: "i" },
            foodService,
            tours,
            rentalEquip,
            pets,
        })
            .sort({ [sort]: order })
            .limit(limit)
            .skip(startIndex);

        return res.status(200).json(grounds);

    }catch(err){
        const error = new Error(`Error seraching grounds ${err}`);
        error.statusCode = 400;
        throw error;
    }
})

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

    console.log(req.body);

    try{
        const savedGround = await Ground.create({
            name,
            description,
            address,
            // Convert "on" and "off" to boolean values
            "pets" : pets,
            "tours": tours,
            "rentalEquip": rentalEquip,
            "foodService": foodService,
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
const updateCamp = asyncHnadler( async(req, res) => {
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
        lat,
        lng,
    } = req.body;

    const ground = await Ground.findById(req.params.id);

    if(!ground){
        const error = new Error(`ground not Found.`);
        error.statusCode = 404;
        throw error;
    }

    console.log('req : ',req.body);

    console.log(req.user.objId);

    if(req.user.objId !== ground.userRef.toString()){
        const error = new Error(`You can only edit your own Ground.`);
        error.statusCode = 401;
        throw error;
    }

    const uground = {
        name,
        description,
        address,
        // Convert "on" and "off" to boolean values
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
        lat,
        lng,
        userRef: req.user.objId,
    }

    console.log(`new updated ground : ${uground}`);

    try{
        const updateGround = await Ground.findByIdAndUpdate(
            req.params.id,
            uground,
            { new: true }
        );

        return res.status(200).json(updateGround);
    }catch(err){
        const error = new Error(`error at getting ground : ${err}`);
        error.statusCode = 400;
        throw error;
    }
})

/*
Desc : Route to get a ground
Route: GET /api/grounds/ground/:id
access: private
*/
const getGround = asyncHnadler( async(req, res) => {
    try{
        const gid = req.params.id;

        const ground = await Ground.findById(gid);

        if(!ground){
            const error = new Error(`Ground not found`);
            error.statusCode = 400;
            throw error;
        }

        return res.status(200).json(ground);

    }catch(err){
        const error = new Error(`error at getting ground : ${err}`);
        error.statusCode = 400;
        throw error;
    }
});

const getGroundInfo = asyncHnadler( async(req, res) => {
    try {
        // Query the database to retrieve the required fields
        const groundsInfo = await Ground.find({}, "_id name lat lng");

        // Map the results to a new array of objects
        const formattedData = groundsInfo.map((ground) => ({
            _id: ground._id,
            name: ground.name,
            lat: ground.lat,
            lng: ground.lng,
        }));

        return res.status(200).json(formattedData);
    } catch (err) {
        const error = new Error(`Error fetching grounds info: ${err}`);
        error.statusCode = 500; // You can set an appropriate status code
        throw error;
    }
});

module.exports = {
    createGrounds,
    deleteGround,
    updateCamp,
    getGround,
    getGrounds,
    getGroundInfo,
};