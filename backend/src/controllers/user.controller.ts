import express from 'express'
import KorisnikM from '../models/user'
import multer from 'multer';

const upload = multer();

export class UserController{

    login = (req: express.Request, res: express.Response)=>{
        let u = req.body.kor_ime;
        let p = req.body.lozinka;
        let t = req.body.tip;

        KorisnikM.findOne({korisnicko_ime: u, lozinka: p, tip: t, status: "aktivan"}).then((user)=>{
            res.json(user)
        }).catch((err)=>{
            console.log(err)
            res.json(null)
        })
    }

    
    register = async (req: express.Request, res: express.Response)=>{
        let ki = req.body.korisnicko_ime;
        let l = req.body.lozinka;
        let i = req.body.ime;
        let p = req.body.prezime;
        let pol = req.body.pol;
        let a = req.body.adresa;
        let kt = req.body.kontakt_telefon;
        let e = req.body.email;
        let ps = req.body.profilna_slika;
        let bkk = req.body.broj_kreditne_kartice;
        let tip = req.body.tip;

        try{
            let korisnik = {
                korisnicko_ime: ki,
                lozinka: l,
                ime: i,
                prezime: p,
                pol: pol,
                adresa: a,
                kontakt_telefon: kt,
                email: e,
                profilna_slika: ps,
                broj_kreditne_kartice: bkk,
                tip: tip,
                status: "neaktivan"
            }

        console.log(korisnik)
        
        const user1 = await KorisnikM.findOne({ korisnicko_ime: korisnik.korisnicko_ime });
        if (user1 != null) {
            return res.json({ message: "Korisnik sa ovim korisnickim imenom vec postoji." });
        }

        
        const user2 = await KorisnikM.findOne({ email: korisnik.email });
        if (user2 != null) {
            return res.json({ message: "Korisnik sa ovim email-om vec postoji." });
        }

        new KorisnikM(korisnik).save().then(ok=>{
            res.json({message: "Zahtev za registraciju je poslat, ceka odobrenje administratora."})
        }).catch(err=>{
            console.log(err)
            res.json({message: "Greska prilikom pokusaja registaracije korisnika"})
        })

        //console.log(korisnik)
        
        //res.json({ message: "Zahtev za registraciju je poslat, ceka odobrenje administratora." });

    } catch (err) {
        console.error(err);
        res.json(null);
    }
    }

    changePassword = (req: express.Request, res: express.Response)=>{
        let u = req.body.kor_ime;
        let p = req.body.lozinka;
        let sl = req.body.stara_lozinka;

        //console.log(u)

        KorisnikM.updateOne({korisnicko_ime: u, lozinka: sl}, {$set: {lozinka: p}}).then(data=>{
            if(data.matchedCount === 0){
                res.json({message: "Korisnik ne postoji ili lozinka nije ispravna."})
            }
            else{
                res.json({message: "Ok"})
            }
        }).catch(err=>{
            res.json({message: "Greska prilikom pokusaja promene lozinke"})
        })
    }

    getRegTurista = (req: express.Request, res: express.Response)=>{
        KorisnikM.find({tip: "turista"}).then((user)=>{
            res.json(user)
        }).catch((err)=>{
            console.log(err)
            res.json(null)
        })
    }

    getRegVlasnik = (req: express.Request, res: express.Response)=>{
        KorisnikM.find({tip: "vlasnik_vikendice"}).then((user)=>{
            res.json(user)
        }).catch((err)=>{
            console.log(err)
            res.json(null)
        })
    }

    azuriraj = (req: express.Request, res: express.Response)=>{
        let u = req.body.korisnicko_ime
        let data = req.body
        
        //console.log(data)
        //console.log(u)

        KorisnikM.findOneAndUpdate({korisnicko_ime: u}, { $set: data }).then((user)=>{
            res.json({message: "Uspesno azurirani podaci!"})
        }).catch((err)=>{
            console.log(err)
            res.json({message: "Greška pri ažuriranju korisnika:"})
        })
    }

    getSveKorisnike = (req: express.Request, res: express.Response)=>{

        KorisnikM.find({tip: { $ne: 'admin' } }).then((user)=>{
            res.json(user)
        }).catch((err)=>{
            console.log(err)
            res.json(null)
        })
    }

    deaktivirajKorisnika = (req: express.Request, res: express.Response)=>{
        let k = req.body.k

        KorisnikM.findOneAndUpdate({korisnicko_ime: k.korisnicko_ime}, { $set: {status: "deaktiviran"}}).then((user)=>{
            res.json({message: "Uspesno promenjen status korisniku: " + user?.korisnicko_ime})
        }).catch((err)=>{
            console.log(err)
            res.json({message: "Greška pri pokusaju promene statusa korisniku."})
        })
    }

    aktivirajKorisnika = (req: express.Request, res: express.Response)=>{
        let k = req.body.k

        KorisnikM.findOneAndUpdate({korisnicko_ime: k.korisnicko_ime}, { $set: {status: "aktivan"}}).then((user)=>{
            res.json({message: "Uspesno promenjen status korisniku: " + user?.korisnicko_ime})
        }).catch((err)=>{
            console.log(err)
            res.json({message: "Greška pri pokusaju promene statusa korisniku."})
        })
    }

    deleteKorisnika = (req: express.Request, res: express.Response)=>{
        let k = req.body.k

        KorisnikM.deleteOne({korisnicko_ime: k.korisnicko_ime}).then((user)=>{
            res.json({message: "Uspesno izbrisan korisnik: " + k.korisnicko_ime})
        }).catch((err)=>{
            console.log(err)
            res.json({message: "Greška pri pokusaju brisanja korisnika."})
        })
    }

    odbij = (req: express.Request, res: express.Response)=>{
        let k = req.body.k

        KorisnikM.findOneAndUpdate({korisnicko_ime: k.korisnicko_ime}, { $set: {status: "odbijen"}}).then((user)=>{
            res.json({message: "Uspesno promenjen status korisniku: " + user?.korisnicko_ime})
        }).catch((err)=>{
            console.log(err)
            res.json({message: "Greška pri pokusaju promene statusa korisniku."})
        })
    }
    /*

    register = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;

        let user = {
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname
        }

        new UserM(user).save().then(ok=>{
            res.json({message: "ok"})
        }).catch(err=>{
            console.log(err)
            res.json({message: "fail register"})
        })
    }

    addToFavourites= (req: express.Request, res: express.Response)=>{
        let dateNow = new Date();
        let dateStr = dateNow.getFullYear() + "-" + (dateNow.getMonth()+1) + "-" + dateNow.getDate();
        let fav = {
            name: req.body.name,
            author: req.body.author,
            date: dateStr
        }
        UserM.updateOne({username: req.body.user}, {$push: {favourites: fav}}).then(data=>{
                res.json({message: "Ok"})
            }).catch(err=>{
                res.json({message: "Fail"})
            })
    }

    deleteFromFavourites = (req: express.Request, res: express.Response)=>{
        let name = req.body.book
        let user = req.body.user
        UserM.updateOne({username: user}, 
            {$pull: {favourites: {name: name}}}).then(data=>{
                res.json({message: "Ok"})
            }).catch(err=>{
                res.json({message: "Fail"})
            })
    }

    updateFavourite = (req: express.Request, res: express.Response)=>{
        let name = req.body.book
        let user = req.body.user

        UserM.updateOne({username: user}, {$set: {"favourites.$[fav].name": "New fav changed"}}, {arrayFilters: [{
            "fav.name": name
        }]}).then(data=>{
            res.json({message: "Ok"})
        }).catch(err=>{
            res.json({message: "Fail"})
        })
    }

    getUser = (req: express.Request, res: express.Response)=>{
        let user = req.params.user
        // UserM.findOne({_id: "6588537a44a71c2c6f674495"}).then(user=>{
        //         res.json(user).status(200)
        // }).catch(err=>{
        //         res.json({message: "Fail"}).status(400)
        // })

        UserM.findOne({username: user}).then(user=>{
                res.json(user).status(200)
        }).catch(err=>{
                res.json({message: "Fail"}).status(400)
        })
    }*/
}