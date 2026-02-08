"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const authMiddleware = async (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token)
            return res.status(401).send("Nije prijavljen");
        const decoded = jsonwebtoken_1.default.verify(token, "tajni-key");
        const user = await user_1.default.findById(decoded.id);
        if (!user)
            return res.status(401).send("Korisnik ne postoji");
        req.korisnik = user; // castujemo req
        next();
    }
    catch (err) {
        return res.status(401).send("Nevažeći token");
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=middleware.js.map