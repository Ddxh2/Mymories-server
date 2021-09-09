import mongoose from "mongoose";

export const idValid = (id) => mongoose.Types.ObjectId.isValid(id);
