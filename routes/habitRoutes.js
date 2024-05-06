// importing express
import express from "express";
import {
  renderHabits,
  updateHabitStatus,
} from "../controller/myHabitsController.js";

// creating new router variable
const router = express.Router();

router.get("/", renderHabits);
router.get("/toggle-status", updateHabitStatus);

// exporting the router for outside use
export default router;
