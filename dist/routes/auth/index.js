"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../controllers/auth");
const joi_1 = __importDefault(require("joi"));
const express_joi_validation_1 = require("express-joi-validation");
const auth_2 = require("../../middleware/auth");
const router = (0, express_1.Router)();
const validator = (0, express_joi_validation_1.createValidator)({});
// Server Side Validation
const registerSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(15).required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).max(32).required(),
});
// Server Side Validation
const loginSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(15).required(),
    password: joi_1.default.string().min(8).max(32).required(),
});
// When user try to register fire this function
router.post("/register", validator.body(registerSchema), auth_1.register);
// When user try to login fire this function
router.post("/login", validator.body(loginSchema), auth_1.login);
// When user try to google fire this function
router.post("/google", auth_1.google);
// When user try to logout fire this function
router.get("/logout", auth_2.isAuthenticated, auth_1.logout);
exports.default = router;
