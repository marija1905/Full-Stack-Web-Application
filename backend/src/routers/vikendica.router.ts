import express from 'express'
import { VikendicaController } from '../controllers/vikendica.controller'

const vRouter = express.Router()

vRouter.route("/getVikendice").get(
    (req,res)=>new VikendicaController().getVikendice(req,res)
)

vRouter.route("/getRezervacije").get(
    (req,res)=>new VikendicaController().getRezervacije(req,res)
)
vRouter.route("/getVikendica/:id").get(
  (req, res) => new VikendicaController().getVikendica(req, res)
);

vRouter.route("/getRezervacijeKorisnika/:id")
  .get((req, res) => new VikendicaController().getRezervacijeKorisnikaIstekle(req, res)
);

vRouter.route("/getRezervacijeKorisnikaAktivne/:id")
  .get((req, res) => new VikendicaController().getRezervacijeKorisnikaAkrivne(req, res)
);

vRouter.route("/dodajKomentar")
  .post((req, res) => new VikendicaController().dodajKomentar(req, res)
);

vRouter.route("/otkazi")
  .post((req, res) => new VikendicaController().otkazi(req, res)
);

vRouter.route("/dodajRezervaciju")
  .post((req, res) => new VikendicaController().dodajRezervaciju(req, res)
);

vRouter.route("/getRezervacijeKorisnikaNeaktivne/:id")
  .get((req, res) => new VikendicaController().getRezervacijeKorisnikaNeaktivne(req, res)
);

vRouter.route("/odbaci")
  .post((req, res) => new VikendicaController().odbaci(req, res)
);

vRouter.route("/potvrdi")
  .post((req, res) => new VikendicaController().potvrdi(req, res)
);

vRouter.route("/getVikendiceVlasnika/:id").get(
    (req,res)=>new VikendicaController().getVikendiceVlasnika(req,res)
)

vRouter.route("/azurirajVikendicu")
  .post((req, res) => new VikendicaController().azurirajVikendicu(req, res)
);

vRouter.route("/obrisiVikendicu")
  .post((req, res) => new VikendicaController().obrisiVikendicu(req, res)
);

vRouter.route("/dodajVikendicu")
  .post((req, res) => new VikendicaController().dodajVikendicu(req, res)
);

vRouter.route("/getRezervacijePoMesecima/:vlasnik").
  get((req, res) => new VikendicaController().getRezervacijePoMesecima(req, res)
);

vRouter.route("/getRezervacijeVikendVSRadniDan/:vlasnik").
  get((req, res) => new VikendicaController().getRezervacijeVikendVSRadniDan(req, res)
);

vRouter.route("/blokiraj").
  post((req, res) => new VikendicaController().blokiraj(req, res)
);
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

export default vRouter;