"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookRouter = express_1.default.Router();
/*
bookRouter.route("/getAll").get(
    (req,res)=>new BookController().getAll(req,res)
)

bookRouter.route("/deleteBook").post(
    (req,res)=>new BookController().deleteBook(req,res)
)

bookRouter.route("/updateBook").post(
    (req,res)=>new BookController().updateBook(req,res)
)*/
exports.default = bookRouter;
//# sourceMappingURL=book.router.js.map