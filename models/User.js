import mongoose, { models } from "mongoose"

const {Schema} = mongoose;

const userSchema = new Schema(
  { 
    name:{
    type: String,
    required:true,
  },
    email:{
      type: String,
      unique: true,
      required: true, 
    },
    password: {
      type: String,
      required: false,
    }
  },
  {timestamps: true}
)


const user = models.user || mongoose.model("user", userSchema)
export default user