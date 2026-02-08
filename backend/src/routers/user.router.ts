import express from 'express'
import { UserController } from '../controllers/user.controller';
import multer from 'multer';


const userRouter = express.Router()
const userController = new UserController();

userRouter.route('/login').post(
    (req, res)=>new UserController().login(req, res)
)

userRouter.route('/register').post(
    (req, res)=>new UserController().register(req, res)
)

userRouter.route('/changePassword').post(
    (req, res)=>new UserController().changePassword(req, res)
)

userRouter.route("/getRegTurista").get(
    (req,res)=>new UserController().getRegTurista(req,res)
)

userRouter.route("/getRegVlasnik").get(
    (req,res)=>new UserController().getRegVlasnik(req,res)
)

userRouter.route('/azuriraj').post(
    (req, res)=>new UserController().azuriraj(req, res)
)

userRouter.route('/getSveKorisnike').get(
    (req, res)=>new UserController().getSveKorisnike(req, res)
)

userRouter.route('/deaktivirajKorisnika').post(
    (req, res)=>new UserController().deaktivirajKorisnika(req, res)
)

userRouter.route('/aktivirajKorisnika').post(
    (req, res)=>new UserController().aktivirajKorisnika(req, res)
)

userRouter.route('/deleteKorisnika').post(
    (req, res)=>new UserController().deleteKorisnika(req, res)
)

userRouter.route('/odbij').post(
    (req, res)=>new UserController().odbij(req, res)
)


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

export default userRouter;