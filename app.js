import express from "express";
import cors from "cors";
import register from "./controller/auth/register.js";
import login from "./controller/auth/login.js";
import logout from "./controller/auth/logout.js";
import view from "./controller/user/view.js";
import listAll from "./controller/user/listAll.js";
import { check } from "express-validator";
import validatorResponse from "./middleware/validatorResponse.js";
import isAuthenticated from "./middleware/isAuthenticated.js";
import isAdmin from "./middleware/isAdmin.js";
import checkStatus from "./controller/health/checkStatus.js";
import downloadUserInformation from "./controller/user/downloadUserInfo.js";

const app = express();
app.use(express.json());
app.use(cors());

// public routes
app.get("/", checkStatus);

app.get("/public", (req, res) =>
  res.status(200).json({ message: "Public route" })
);
app.post(
  "/api/register",
  check("email").notEmpty().bail().isEmail().bail(),
  check("username").notEmpty().bail().isLength({ min: 4 }).bail(),
  check("password").notEmpty().bail().isLength({ min: 8 }).bail(),
  validatorResponse,
  register
);
app.post(
  "/api/login",
  check("identifier").notEmpty().bail(),
  check("password").notEmpty().bail().isLength({ min: 4 }).bail(),
  validatorResponse,
  login
);

// private routes
app.get("/private", isAuthenticated, (req, res) =>
  res.status(200).json({ message: "Private route", user: req.user })
);
app.get("/admin", isAuthenticated, isAdmin, (req, res) =>
  res.status(200).json({ message: "Admin route", user: req.user })
);

app.get("/api/users", isAuthenticated, listAll);
app.get("/api/users/:username", isAuthenticated, view);
app.get("/api/users/download/:id", isAuthenticated, downloadUserInformation);
app.put("/api/logout", isAuthenticated, logout);

export default app;
