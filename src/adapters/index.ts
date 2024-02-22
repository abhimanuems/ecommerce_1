import express from "express";
import * as dotenv from 'dotenv';
import connect from "../framework/database/mongo-db-connect";
import userRouter from "../framework/express/router/user.js"
import adminRoute from "../framework/express/router/admin";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql"
dotenv.config()


const app = express();
const mongoUrl: string = process.env.MONGO_URL || "";
app.use(express.json());
connect(mongoUrl);

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
app.use("/", userRouter);
app.use("/admin", adminRoute)

const PORT: string | number = process.env.PORT || 8080


app.listen(8080, () => console.log("server started at ", PORT))