import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    //userId: {
    //  type: mongoose.Schema.Types.ObjectId,
    //  ref: "User",
    //  required: true,
    //},
    name: { type: String, required: true },
    points: { type: Number, required: true },
    date: { type: String, required: true }, // or Date if you prefer
  },
  { timestamps: true }
);

const Activity = mongoose.model("Activity", activitySchema);
export default Activity;
