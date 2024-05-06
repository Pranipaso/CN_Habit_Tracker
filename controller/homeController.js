// habits model for storing data
import Habits from "../models/habits.js";

// rendering home page on website
export const getHabits = async (req, res) => {
  // rendering homepage and
  // getting all the habits from database
  const habits = await Habits.find({});
  return res.render("home", {
    // all the habits inside the database
    habits,
  });
};

// create a new Habit inside the database
export const createHabit = async (req, res) => {
  try {
    // getting today's date
    let date = new Date().toString();
    date = `${date.slice(4, 15)}`;
    // weekly dates
    const weekStatus = Array(7).fill("None");

    // creating new element in mongodb
    await Habits.create({
      // getting the value of name
      name: req.body.name,
      createdAt: date,
      weeklyStatus: weekStatus,
      completedDays: 0,
    });

    // return response
    return res.redirect("back");
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
