"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
const userController = new user_controller_1.UserController();
userRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route('/register').post((req, res) => new user_controller_1.UserController().register(req, res));
userRouter.route('/changePassword').post((req, res) => new user_controller_1.UserController().changePassword(req, res));
userRouter.route("/getRegTurista").get((req, res) => new user_controller_1.UserController().getRegTurista(req, res));
userRouter.route("/getRegVlasnik").get((req, res) => new user_controller_1.UserController().getRegVlasnik(req, res));
userRouter.route('/azuriraj').post((req, res) => new user_controller_1.UserController().azuriraj(req, res));
userRouter.route('/getSveKorisnike').get((req, res) => new user_controller_1.UserController().getSveKorisnike(req, res));
userRouter.route('/deaktivirajKorisnika').post((req, res) => new user_controller_1.UserController().deaktivirajKorisnika(req, res));
userRouter.route('/aktivirajKorisnika').post((req, res) => new user_controller_1.UserController().aktivirajKorisnika(req, res));
userRouter.route('/deleteKorisnika').post((req, res) => new user_controller_1.UserController().deleteKorisnika(req, res));
userRouter.route('/odbij').post((req, res) => new user_controller_1.UserController().odbij(req, res));
/*
userRouter.route("/addToFavourites").post(
    (req,res)=>new UserController().addToFavourites(req,res)
)

userRouter.route("/deleteFromFavourites").post(
    (req,res)=>new UserController().deleteFromFavourites(req,res)
)

userRouter.route("/updateFavourite").post(
    (req,res)=>new UserController().updateFavourite(req,res)
)

userRouter.route("/getUser/:user").get(
    (req,res)=>new UserController().getUser(req,res)
)*/
exports.default = userRouter;
//# sourceMappingURL=user.router.js.map