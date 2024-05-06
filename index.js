import express from "express";
import expressLayouts from "express-ejs-layouts";
import { connect } from "./config/mongoose.js";
import router from "./routes/index.js";
import habitRouter from "./routes/habitRoutes.js";
import dotenv from "dotenv";
dotenv.config();
// port id
const { PORT } = process.env;

// define instance of express
const app = express();

// for reading data passed inside the url
app.use(
  express.urlencoded({
    extended: true,
  })
);

// static folder
app.use(express.static("assets"));

// using layouts
app.use(expressLayouts);

// extracting stylesheets and scripts for individual pages
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// setting view engine as ejs and defining its path
app.set("view engine", "ejs");
app.set("views", "./views");

// setting up routes
app.use("/", router);

// setting habit router
router.use("/my-habits", habitRouter);

// starting server
app.listen(PORT, async () => {
  await connect();
  console.log(`server is running on port:${PORT}`);
});
