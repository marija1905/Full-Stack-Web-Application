"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VikendicaController = void 0;
const vikendica_1 = __importDefault(require("../models/vikendica"));
class VikendicaController {
    constructor() {
        this.getVikendice = (req, res) => {
            vikendica_1.default.find({}).then((v) => {
                res.json(v);
            }).catch((err) => {
                console.log(err);
                res.json(null);
            });
        };
        this.getRezervacije = (req, res) => {
            vikendica_1.default.find({}).then((v) => {
                const r = v.map((elem) => elem.rezervacije);
                //console.log(r)
                res.json(r);
            }).catch((err) => {
                console.log(err);
                res.json(null);
            });
        };
        this.getVikendica = (req, res) => {
            const id = req.params.id;
            vikendica_1.default.findOne({ naziv: id }).then((v) => {
                //console.log(v)
                res.json(v);
            }).catch((err) => {
                console.log(err);
                res.json(null);
            });
        };
        this.getRezervacijeKorisnikaIstekle = (req, res) => {
            const k = req.params.id;
            console.log(k);
            const dateNow = new Date();
            vikendica_1.default.find({}).then((v) => {
                let filteredVikendice = v.map(vikendica => {
                    const filteredRezervacije = vikendica.rezervacije.filter(r => (r.turista === k && (new Date(r.datum_do.replace(" ", "T")) < dateNow)
                        || (r.status === "otkazana" || r.status === "odbijena")));
                    if (filteredRezervacije.length) {
                        vikendica.rezervacije = filteredRezervacije;
                        return vikendica;
                    }
                    else {
                        return;
                    }
                });
                filteredVikendice = filteredVikendice.filter((v) => v != undefined);
                console.log(filteredVikendice);
                res.json(filteredVikendice);
            }).catch((err) => {
                console.log(err);
                res.json(null);
            });
        };
        this.getRezervacijeKorisnikaAkrivne = (req, res) => {
            const k = req.params.id;
            console.log(k);
            const dateNow = new Date();
            vikendica_1.default.find({}).then((v) => {
                let filteredVikendice = v.map(vikendica => {
                    const filteredRezervacije = vikendica.rezervacije.filter(r => (r.turista === k &&
                        (new Date(r.datum_do.replace(" ", "T")) >= dateNow && r.status === "odobrena")));
                    if (filteredRezervacije.length) {
                        vikendica.rezervacije = filteredRezervacije;
                        return vikendica;
                    }
                    else {
                        return;
                    }
                });
                filteredVikendice = filteredVikendice.filter((v) => v != undefined);
                console.log(filteredVikendice);
                res.json(filteredVikendice);
            }).catch((err) => {
                console.log(err);
                res.json(null);
            });
        };
        this.getRezervacijeKorisnikaNeaktivne = (req, res) => {
            const dateNow = new Date();
            vikendica_1.default.find({ vlasnik: req.params.id }).then((v) => {
                let filteredVikendice = v.map(vikendica => {
                    const filteredRezervacije = vikendica.rezervacije.filter(r => r.status === "neaktivna" || r.status === "odobrena");
                    if (filteredRezervacije.length) {
                        vikendica.rezervacije = filteredRezervacije;
                        return vikendica;
                    }
                    else {
                        return;
                    }
                });
                filteredVikendice = filteredVikendice.filter((v) => v != undefined);
                console.log(filteredVikendice);
                res.json(filteredVikendice);
            }).catch((err) => {
                console.log(err);
                res.json(null);
            });
        };
        this.dodajKomentar = (req, res) => {
            let k = req.body.k;
            let vik = req.body.vik;
            if (!vik.komentari.length) {
                vik.ocena = k.ocena;
            }
            else {
                vik.ocena = (vik.ocena + k.ocena) / (vik.komentari.length + 1);
            }
            vikendica_1.default.updateOne({ naziv: vik.naziv }, { $set: { ocena: vik.ocena }, $push: { komentari: k } }).then(data => {
                res.json({ message: "Komentar uspesno dodat!" });
            }).catch(err => {
                res.json({ message: "Greska prilikom pokusaja dodavanja komentara" });
            });
        };
        this.otkazi = (req, res) => {
            let r = req.body.r;
            let n = req.body.naziv;
            vikendica_1.default.updateOne({
                "naziv": n,
                "rezervacije": {
                    $elemMatch: {
                        "turista": r.turista,
                        "datum_rezervacije": r.datum_rezervacije
                    }
                }
            }, {
                $set: {
                    "rezervacije.$.status": "otkazana"
                }
            })
                .then(updateResult => {
                if (updateResult.modifiedCount === 0) {
                    return res.status(404).json({
                        message: "Rezervacija nije pronađena ili je već otkazana."
                    });
                }
                res.status(200).json({
                    message: "Rezervacija uspešno otkazana!"
                });
            })
                .catch(error => {
                console.error("Greška pri otkazivanju rezervacije:", error);
                res.status(500).json({ message: "Greška na serveru." });
            });
        };
        this.dodajRezervaciju = (req, res) => {
            let v = req.body.v;
            let r = req.body.r;
            //console.log(r)
            vikendica_1.default.updateOne({ naziv: v.naziv }, { $set: { kapacitet: v.kapacitet }, $push: { rezervacije: r } }).then(data => {
                res.json({ message: "Rezervacija uspesno dodata!" });
            }).catch(err => {
                res.json({ message: "Greska prilikom pokusaja dodavanja rezervacije" });
            });
        };
        this.odbaci = (req, res) => {
            let n = req.body.v.naziv;
            let r = req.body.v;
            console.log(n);
            console.log(r);
            vikendica_1.default.updateOne({
                "naziv": n,
                "rezervacije": {
                    $elemMatch: {
                        "turista": r.turista,
                        "datum_rezervacije": r.datum_rezervacije
                    }
                }
            }, {
                $set: {
                    "rezervacije.$.status": "odbijena",
                    "rezervacije.$.komentar": r.komentar
                }
            })
                .then(updateResult => {
                if (updateResult.modifiedCount === 0) {
                    return res.status(404).json({
                        message: "Rezervacija nije pronađena ili je već odbijena."
                    });
                }
                res.status(200).json({
                    message: "Rezervacija uspešno odbijena!"
                });
            })
                .catch(error => {
                console.error("Greška pri otkazivanju rezervacije:", error);
                res.status(500).json({ message: "Greška na serveru." });
            });
        };
        this.potvrdi = (req, res) => {
            let n = req.body.v.naziv;
            let r = req.body.v;
            vikendica_1.default.updateOne({
                "naziv": n,
                "rezervacije": {
                    $elemMatch: {
                        "turista": r.turista,
                        "datum_rezervacije": r.datum_rezervacije
                    }
                }
            }, {
                $set: {
                    "rezervacije.$.status": "odobrena"
                }
            })
                .then(updateResult => {
                if (updateResult.modifiedCount === 0) {
                    return res.status(404).json({
                        message: "Rezervacija nije pronađena ili je već odobrena."
                    });
                }
                res.status(200).json({
                    message: "Rezervacija uspešno odobrena!"
                });
            })
                .catch(error => {
                console.error("Greška pri otkazivanju rezervacije:", error);
                res.status(500).json({ message: "Greška na serveru." });
            });
        };
        this.getVikendiceVlasnika = (req, res) => {
            vikendica_1.default.find({ vlasnik: req.params.id }).then((v) => {
                console.log(v);
                res.json(v);
            }).catch((err) => {
                console.log(err);
                res.json(null);
            });
        };
        this.azurirajVikendicu = (req, res) => {
            let v = req.body.v;
            //console.log(data)
            //console.log("******************************************************************")
            //console.log(req.body)
            vikendica_1.default.findOneAndUpdate({ naziv: v.naziv }, { $set: req.body.v }).then((user) => {
                //console.log(user)
                res.json({ message: "Uspesno azurirani podaci!" });
            }).catch((err) => {
                console.log(err);
                res.json({ message: "Greška pri ažuriranju vikendice" });
            });
        };
        this.obrisiVikendicu = (req, res) => {
            vikendica_1.default.deleteOne({ naziv: req.body.v.naziv }).then(v => {
                res.json({ message: "Vikendica uspesno izbrisana!" });
            }).catch((err) => {
                console.log(err);
                res.json({ message: "Greska prilikom pokusaja brisanja vikendice" });
            });
        };
        this.dodajVikendicu = (req, res) => {
            let vikendica = {
                naziv: req.body.v.naziv,
                mesto: req.body.v.mesto,
                kapacitet: req.body.v.kapacitet,
                cenovnik: req.body.v.cenovnik,
                telefon: req.body.v.telefon,
                galerija: req.body.v.galerija,
                usluge: req.body.v.usluge,
                ocena: req.body.v.ocena,
                komentari: [],
                rezervacije: [],
                lokacija: req.body.v.lokacija,
                vlasnik: req.body.v.vlasnik,
                datumDo: ""
            };
            new vikendica_1.default(vikendica).save().then(ok => {
                res.json({ message: "Vikendica uspesno dodata!" });
            }).catch(err => {
                console.log(err);
                res.json({ message: "Greska prilikom pokusaja dodavanja vikendice" });
            });
        };
        this.getRezervacijePoMesecima = (req, res) => {
            let k = req.params.vlasnik;
            const dateNow = new Date();
            vikendica_1.default.find({ vlasnik: k }).then((v) => {
                let filteredVikendice = v.map(vikendica => {
                    const filteredRezervacije = vikendica.rezervacije.filter(r => ((new Date(r.datum_do.replace(" ", "T")) < dateNow && r.status === "odobrena")));
                    if (filteredRezervacije.length) {
                        vikendica.rezervacije = filteredRezervacije;
                        return vikendica;
                    }
                    else {
                        return;
                    }
                });
                filteredVikendice = filteredVikendice.filter((v) => v != undefined);
                //console.log("-------------------------------------------")
                //console.log(filteredVikendice)
                res.json(filteredVikendice);
            }).catch((err) => {
                console.log(err);
                res.json(null);
            });
        };
        this.getRezervacijeVikendVSRadniDan = (req, res) => {
            let k = req.params.vlasnik;
            vikendica_1.default.find({ vlasnik: k }).then((vikendice) => {
                const rezultat = vikendice.map(v => {
                    let vikendRez = 0;
                    let radniRez = 0;
                    v.rezervacije.forEach(r => {
                        const datum = new Date(r.datum_rezervacije.replace(" ", "T"));
                        const dan = datum.getDay(); // 0 -> nedelja, 6 -> subota
                        if (dan === 0 || dan === 6)
                            vikendRez++;
                        else
                            radniRez++;
                    });
                    return {
                        naziv: v.naziv,
                        vikend: vikendRez,
                        radni: radniRez
                    };
                });
                res.json(rezultat);
            }).catch((err) => {
                console.log(err);
                res.status(500).json({ message: 'Greška na serveru' });
            });
        };
        this.blokiraj = (req, res) => {
            let vikendica = req.body.v;
            const datumDo = new Date(Date.now() + 48 * 60 * 60 * 1000);
            let datumString = this.formatiraj(datumDo);
            console.log(vikendica.naziv);
            console.log(datumString);
            vikendica_1.default.updateOne({ naziv: vikendica.naziv }, { $set: { datumDo: datumString } }).then((v) => {
                res.json({ message: "Vikendica uspesno blokirana!" });
            }).catch((err) => {
                console.log(err);
                res.json({ message: "Greska prilikom pokusaja blokiranja vikendice." });
            });
        };
        /*
        getAll = (req: express.Request, res: express.Response)=>{
            BookM.find({}).sort({pages: 1}).then(books=>{
                res.json(books)
            }).catch((err)=>{
                console.log(err)
            })
        }
    
        deleteBook = (req: express.Request, res: express.Response)=>{
            BookM.deleteOne({name: req.body.name}).then(books=>{
                res.json({message: "Book deleted"})
            }).catch((err)=>{
                console.log(err)
                res.json({message: "Fail"})
            })
        }
    
        updateBook = (req: express.Request, res: express.Response)=>{
            BookM.updateOne({name: req.body.name},
                {pages: req.body.pages}).then(books=>{
                res.json({message: "Book updated"})
            }).catch((err)=>{
                console.log(err)
                res.json({message: "Fail"})
            })
        }*/
    }
    formatiraj(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
}
exports.VikendicaController = VikendicaController;
//# sourceMappingURL=vikendica.controller.js.map