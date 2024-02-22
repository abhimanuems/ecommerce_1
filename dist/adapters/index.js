"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const mongo_db_connect_1 = __importDefault(require("../framework/database/mongo-db-connect"));
const user_js_1 = __importDefault(require("../framework/express/router/user.js"));
const admin_1 = __importDefault(require("../framework/express/router/admin"));
dotenv.config();
const app = (0, express_1.default)();
const mongoUrl = process.env.MONGO_URL || "";
app.use(express_1.default.json());
(0, mongo_db_connect_1.default)(mongoUrl);
// app.use('/graphql', graphqlHTTP({
//     schema: buildSchema(`
//       type  RootQuery {
//         events : [String!]!
//     }
//     type RootMutation {
//         createEvents(name : String): String
//     }
//     schema {
//         query : RootQuery
//         mutation : RootMutation
//     }
//     `),
//     rootValue: {}
// }));
app.use("/", user_js_1.default);
app.use("/admin", admin_1.default);
const PORT = process.env.PORT || 8080;
app.listen(8080, () => console.log("server started at ", PORT));
