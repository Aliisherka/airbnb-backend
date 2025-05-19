import mongoose from "mongoose";


const CitiesSchema = new mongoose.Schema({
  name: { type: String, required: true},
  country: { type: String, required: true },
  alternateNames: { type: [String], required: true },
  type: { type: String, default: 'city' }
})

export default mongoose.model('City', CitiesSchema)