"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vikendica_controller_1 = require("../controllers/vikendica.controller");
const vRouter = express_1.default.Router();
vRouter.route("/getVikendice").get((req, res) => new vikendica_controller_1.VikendicaController().getVikendice(req, res));
vRouter.route("/getRezervacije").get((req, res) => new vikendica_controller_1.VikendicaController().getRezervacije(req, res));
vRouter.route("/getVikendica/:id").get((req, res) => new vikendica_controller_1.VikendicaController().getVikendica(req, res));
vRouter.route("/getRezervacijeKorisnika/:id")
    .get((req, res) => new vikendica_controller_1.VikendicaController().getRezervacijeKorisnikaIstekle(req, res));
vRouter.route("/getRezervacijeKorisnikaAktivne/:id")
    .get((req, res) => new vikendica_controller_1.VikendicaController().getRezervacijeKorisnikaAkrivne(req, res));
vRouter.route("/dodajKomentar")
    .post((req, res) => new vikendica_controller_1.VikendicaController().dodajKomentar(req, res));
vRouter.route("/otkazi")
    .post((req, res) => new vikendica_controller_1.VikendicaController().otkazi(req, res));
vRouter.route("/dodajRezervaciju")
    .post((req, res) => new vikendica_controller_1.VikendicaController().dodajRezervaciju(req, res));
vRouter.route("/getRezervacijeKorisnikaNeaktivne/:id")
    .get((req, res) => new vikendica_controller_1.VikendicaController().getRezervacijeKorisnikaNeaktivne(req, res));
vRouter.route("/odbaci")
    .post((req, res) => new vikendica_controller_1.VikendicaController().odbaci(req, res));
vRouter.route("/potvrdi")
    .post((req, res) => new vikendica_controller_1.VikendicaController().potvrdi(req, res));
vRouter.route("/getVikendiceVlasnika/:id").get((req, res) => new vikendica_controller_1.VikendicaController().getVikendiceVlasnika(req, res));
vRouter.route("/azurirajVikendicu")
    .post((req, res) => new vikendica_controller_1.VikendicaController().azurirajVikendicu(req, res));
vRouter.route("/obrisiVikendicu")
    .post((req, res) => new vikendica_controller_1.VikendicaController().obrisiVikendicu(req, res));
vRouter.route("/dodajVikendicu")
    .post((req, res) => new vikendica_controller_1.VikendicaController().dodajVikendicu(req, res));
vRouter.route("/getRezervacijePoMesecima/:vlasnik").
    get((req, res) => new vikendica_controller_1.VikendicaController().getRezervacijePoMesecima(req, res));
vRouter.route("/getRezervacijeVikendVSRadniDan/:vlasnik").
    get((req, res) => new vikendica_controller_1.VikendicaController().getRezervacijeVikendVSRadniDan(req, res));
vRouter.route("/blokiraj").
    post((req, res) => new vikendica_controller_1.VikendicaController().blokiraj(req, res));
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
exports.default = vRouter;
//# sourceMappingURL=vikendica.router.js.map