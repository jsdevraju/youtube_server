import { Router } from "express";
import { updateUser } from "../../controllers/user";
import {
  addVideo,
  addView,
  deleteVideo,
  getVideo,
  random,
  sub,
  trend,
  getByTag,
  search,
} from "../../controllers/video";
import { isAuthenticated } from "../../middleware/auth";

const router = Router();

router.post("/create", isAuthenticated, addVideo);
router.put("/:id", isAuthenticated, updateUser);
router.delete("/:id", isAuthenticated, deleteVideo);
router.get("/find/:id", getVideo);
router.get("/view/:id", addView);
router.get("/trend", trend);
router.get("/random", random);
router.get("/sub", isAuthenticated, sub);
router.get("/tags", getByTag);
router.get("/search", search);

export default router;
