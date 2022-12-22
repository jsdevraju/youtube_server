"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../../controllers/user");
const auth_1 = require("../../middleware/auth");
const router = (0, express_1.Router)();
// When User try to update her/she own information fire this function
router.put("/:id", auth_1.isAuthenticated, user_1.updateUser);
// When User try to delete her/she own account fire this function
router.delete("/:id", auth_1.isAuthenticated, user_1.deleteUser);
// When User try to getUser fire this function
router.get("/find/:id", user_1.getUser);
// When User try to subscribe fire this function
router.put("/sub/:id", auth_1.isAuthenticated, user_1.subscribe);
// When User try to unsubscribe fire this function
router.put("/unsub/:id", auth_1.isAuthenticated, user_1.unsubscribe);
// When User try to like fire this function
router.put("/like/:id", auth_1.isAuthenticated, user_1.like);
// When User try to dislike fire this function
router.put("/dislike/:id", auth_1.isAuthenticated, user_1.disLike);
exports.default = router;
