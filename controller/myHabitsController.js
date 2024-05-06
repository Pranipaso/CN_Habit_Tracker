// getting Habits model for accessing the database
import Habits from "../models/habits.js";

// to get list of all the days and dates in last week
const _calculateWeekDays = (date) => {
  // array storing all the dates and day
  var days = new Array();
  // storing values in asceding order of date
  for (var i = 6; i >= 0; i--) {
    // store values in the form of string
    days[6 - i] = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - i
    ).toString();
    days[6 - i] = `${days[6 - i].slice(0, 4)}, ${days[6 - i].slice(4, 11)}`;
  }
  // return the array of dates
  return days;
};

// render all the habits with weekly status
export const renderHabits = async (req, res) => {
  try {
    // today's date
    let date = new Date().toString();
    // getting only the date part
    date = `${date.slice(0, 3)},${date.slice(3, 15)}`;

    // days of past week
    const pastWeek = _calculateWeekDays(new Date());

    // getting all the habits from database
    const habits = await Habits.find({});

    // render all the habits
    return res.render("myHabits", {
      // today's date
      date,
      // all habits
      habits,
      // past week date
      weekDays: pastWeek,
    });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};

// for toggeling status of a habit on a specific day
export const updateHabitStatus = async (req, res) => {
  try {
    // getting id of habit
    let id = req.query.id;

    // index of week day
    let index = req.query.i;

    // new status of habit
    let status = req.query.status;
    console.log("req.query", req.query);
    // find the habit
    const habit = await Habits.findOne({ _id: id });

    // if the new status is true (done)
    if (status === "Done") {
      // if task is not done then update the status
      if (
        habit.weeklyStatus[index] === "None" ||
        habit.weeklyStatus[index] === "NotDone"
      ) {
        // increase the number of days on which the task is completed
        habit.completedDays = habit.completedDays + 1;
      }
    }
    // if new status is not either done or pending
    else {
      // if task was previously done
      if (
        habit.weeklyStatus[index] === "Done" ||
        habit.weeklyStatus[index] === "None"
      ) {
        // reduce the number of day on which the habit is completed
        habit.completedDays = Math.max(habit.completedDays - 1, 0);
      }
    }

    // update the task's status
    habit.weeklyStatus[index] = status;

    // save the task inside the database
    await habit.save();

    // return resposne
    return res.redirect("back");
  } catch (err) {
    // if error
    console.log(err.message);
    res.redirect("back");
  }
};
