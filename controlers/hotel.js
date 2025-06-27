import Hotel  from "../models/Hotel.js";
import Rooms from "../models/Rooms.js";

export const creatHotel = async ( req , res , next ) => {
     const newHotel = new Hotel(req.body);
      console.log(newHotel)
     
         try{
             const savedHotel = await newHotel.save();
             res.status(200).json(savedHotel);
         }catch(err){
             next();
         }
}
export const updateHotel = async ( req , res , next ) => {
      const updatedHotel = new Hotel(req.body);
     
         try{
             await Hotel.findByIdAndUpdate(req.params.id, { $set : req.body },{new : true})
             res.status(200).json(updatedHotel);
         }catch(err){
             next();
         }
}
export const deleteHotel = async ( req , res , next ) => {
      try{
            await Hotel.findByIdAndDelete(req.params.id)
            res.status(200).json("Hotel Has been Deleted");
        }catch(err){
             next();
         }
}
export const getHotel = async ( req , res , next ) => {
 
    
    try{
            const hotel = await Hotel.findById(req.params.id)
            res.status(200).json(hotel);
        }catch(err){
             next();
         }
}
export const getAllHotels = async ( req , res , next ) => {
    const {city} = req.query;
    try {
        const {limit,featured}=req.query;
        let hotels=await Hotel.find({city:city});
        if(hotels.length == 0) {
            hotels=await Hotel.find();
        }
        return res.status(200).json(hotels);
    } catch (err) {
        next(err);
    }
}


export const countByCity = async ( req , res , next ) => {
    const cities = req.query.cities.split(",")
    try{
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({city:city});
        }))
            res.status(200).json(list);
            }catch(err){
             next();
         }
}
export const countByType = async ( req , res , next ) => {
    try{
      
        const hotelcount = await Hotel.countDocuments({type:"Hotel"});
        const apartmentcount = await Hotel.countDocuments({type:"Apartment"});
        const resortcount = await Hotel.countDocuments({type:"Resort"});
        const villacount = await Hotel.countDocuments({type:"Villa"});
        const cabincount = await Hotel.countDocuments({type:"Cabin"});

        res.status(200).json([
            {type : "Hotel" , count:hotelcount},
            {type : "Apartment" , count:apartmentcount},
            {type : "Resort" , count:resortcount},
            {type : "Villa" , count:villacount},
            {type : "Cabin" , count:cabincount},
        ]);

            }catch(err){
             next();
         }
}



export const getHotelRooms = async (req,res,next) => {

    
try{
    const hotel = await Hotel.findById(req.params.id);

    
    const list = await Promise.all(hotel.rooms.map(room => {
        return Rooms.findById(room);
    }));
    res.status(200).json(list);
} catch(err){
    next(err)
}
}