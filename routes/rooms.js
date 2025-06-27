import express from "express";
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom, updateRoomAvalibility } from "../controlers/room.js";
import { verifyAdmin } from "../utils/varifyTokon.js";

const router = express.Router();

//CREATE
router.post("/:hotelid" ,verifyAdmin, createRoom)
//UPDATE
router.put("/:id" ,verifyAdmin, updateRoom)
router.put("/avalibility/:id" , updateRoomAvalibility)
//DELETE
router.delete("/:id/:hotelid" ,verifyAdmin, deleteRoom)
//GET
router.get("/:id" ,getRoom)
//GETALL
router.get("/" , getAllRooms)

export default router