import mongoose from 'mongoose';
const { Schema } = mongoose;

const HotemSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    type:{
        type: String,
        require: true
    },
    city:{
        type: String,
        require: true
    },
    address:{
        type: String,
        require: true
    },
    distance:{
        type: String,
        require: true
    },
    photos:{
        type: [String],
    },
    title:{
        type: String,
        require: true
    },
    desc:{
        type: String,
        require: true
    },
    rating:{
        type: String,
        min: 0,
        max: 5
    },
    rooms:{
        type: [String],
        require: true
    },
    cheapestPrice:{
        type: Number,
        require: true

    },
    featured:{
        type: Boolean,
        require: false
    },
},{timestamps : true});

export default mongoose.model("Hotel" , HotemSchema)