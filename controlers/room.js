import Room from "../models/Rooms.js"
import Hotel from "../models/Hotel.js";


export const createRoom = async (req,res,next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId,{$push : {rooms:savedRoom._id}})
        } catch (err) {
            next(err)
        }
        res.status(200).json(savedRoom);
    } catch (err) {
        next(err);
        
    }

};

export const updateRoom = async ( req , res , next ) => {
    
    try{
             const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set : req.body },{new : true})
             res.status(200).json(updatedRoom);
         }catch(err){
             next();
         }
}
export const deleteRoom = async ( req , res , next ) => {
    const hotelId = req.params.hotelid;
    try {
        try {
            await Hotel.findByIdAndUpdate(hotelId,{$pull : {rooms: req.params.id}})
        } catch (err) {
            next(err)
        }
        res.status(200).json("Room Has been Deleted");
    } catch (err) {
        next(err);
        
    }
}
export const getRoom = async ( req , res , next ) => {
    try{
            const room = await Room.findById(req.params.id)
            res.status(200).json(room);
        }catch(err){
             next();
         }
}
export const getAllRooms = async ( req , res , next ) => {
     const newRoom = new Room(req.body);
     
        try{
                const room = await Room.find();
                res.status(200).json(room);
            }catch(err){
             next();
         }
}

export const updateRoomAvalibility = async ( req , res , next ) => { 
       try{
            await Room.updateOne({"roomNumbers._id" : req.params.id} , {$push: {
                "roomNumbers.$.unavailableDates" : req.body.dates
            }})
           res.status(200).json("Room Status Has Been Updated");
       }catch(err){
           next();
       }
}
