import express from "express";
import cors from "cors";
import { router } from "./routes";

//@ts-expect-error
//serialize bigint to number
BigInt.prototype.toJSON = function () {
    return Number(this.toString())
};

const app = express();

app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(router);

app.listen(3000, () => {
    console.log('clp-rest-api is running at http://localhost:3000');
});
