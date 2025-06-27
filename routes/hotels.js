import express from "express";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
import { countByCity, countByType, creatHotel, deleteHotel, getAllHotels, getHotel, getHotelRooms, updateHotel } from "../controlers/hotel.js";
import { verifyAdmin } from "../utils/varifyTokon.js";

const router = express.Router();

//CREATE
router.post("/" ,verifyAdmin, creatHotel)
//UPDATE
router.put("/:id" ,verifyAdmin, updateHotel)
//DELETE
router.delete("/:id" ,verifyAdmin, deleteHotel)
//GET
router.get("/:id" ,getHotel)
//GETALL
router.get("/" , getAllHotels)
router.get("/countByCity" , countByCity)
router.get("/countByType" , countByType)


router.get("/room/:id" , getHotelRooms)

export default router