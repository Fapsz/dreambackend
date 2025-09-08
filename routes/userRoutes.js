import e from "express";
import {
  del1user,
  forLogin,
  forsignup,
  get1user,
  getAllUsers,
  update1user,
} from "../controllers/usercontroller.js";

const router = e.Router();
import authorize from "../middlewares/authorize.js";

router.post("/register", forsignup);

router.get("/", getAllUsers);

router.get("/:id", get1user);

router.delete("/:id", authorize(["Admin"]), del1user);

router.put("/:id", update1user);

router.post("/login", forLogin);

export default router;
