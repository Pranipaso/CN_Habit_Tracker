// importing express
import express from "express";
import { createHabit, getHabits } from "../controller/homeController.js";
// creating new router variable
const router = express.Router();

router.get("/", getHabits);
router.post("/create-habit", createHabit);

// exporting the router for outside use
export default router;
