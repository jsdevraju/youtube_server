import { Router } from "express";
import {
  deleteUser,
  disLike,
  getUser,
  like,
  subscribe,
  unsubscribe,
  updateUser,
} from "../../controllers/user/index.js";
import { isAuthenticated } from "../../middleware/auth.js";

const router = Router();
// When User try to update her/she own information fire this function
router.put("/:id", isAuthenticated, updateUser);
// When User try to delete her/she own account fire this function
router.delete("/:id", isAuthenticated, deleteUser);
// When User try to getUser fire this function
router.get("/find/:id", getUser);
// When User try to subscribe fire this function
router.put("/sub/:id", isAuthenticated, subscribe);
// When User try to unsubscribe fire this function
router.put("/unsub/:id", isAuthenticated, unsubscribe);
// When User try to like fire this function
router.put("/like/:id", isAuthenticated, like);
// When User try to dislike fire this function
router.put("/dislike/:id", isAuthenticated, disLike);

export default router;
