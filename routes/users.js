import express from "express";
import { creatUser, deleteUser, getAllUsers, getUser, updateUser } from "../controlers/user.js";
import {  verifyAdmin, verifyUser } from "../utils/varifyTokon.js";

const router = express.Router();

// router.get("/checkAuth" , varifyToken , (req,res,next) => {
//     res.send("loged in")
// })
// router.get("/checkUser/:id" , verifyUser , (req,res,next) => {
//     res.send("You can delete Your account")
// })
// router.get("/checkAdmin/:id" , verifyAdmin , (req,res,next) => {
//     res.send("You are admin")
// })
//
router.put("/",creatUser)

//UPDATE
router.put("/:id" , verifyUser ,updateUser)
//DELETE
router.delete("/:id" ,verifyUser, deleteUser)
//GET
router.get("/:id",verifyUser ,getUser)
//GETALL 
router.get("/" ,verifyAdmin, getAllUsers)


export default router