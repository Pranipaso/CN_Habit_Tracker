// import the mongoose
import mongoose from "mongoose";

// defining schema
const habitsSchema = new mongoose.Schema({
  // habit name
  name: {
    type: String,
    require: true,
  },
  // habit creation date
  createdAt: {
    type: String,
    require: true,
  },
  // days on which the task is completed
  completedDays: {
    type: Number,
    require: true,
  },
  // status of past week
  weeklyStatus: [
    {
      type: String,
      require: true,
      enum: ["Done", "NotDone", "None"],
      default: "None",
    },
  ],
});

// compilling schema into a model
const Habits = mongoose.model("Habits", habitsSchema);
// exporting the model
export default Habits;
