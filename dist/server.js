"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
// Connected With MongoDb
const url = process.env.MONGO_URI;
const port = process.env.PORT || 5000;
// Database Connection
mongoose_1.default.connect(`${url}`).then(() => console.log(`Db Connected`));
// Server Listing
app_1.default.listen(port, () => console.log(`Server Listing Port ${port}`));
