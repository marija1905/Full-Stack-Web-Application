import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        korisnicko_ime: String,
        lozinka: String,
        ime: String,
        prezime: String,
        pol: String,
        adresa: String,
        kontakt_telefon: String,
        email: String,
        profilna_slika: String,
        broj_kreditne_kartice: String,
        tip: String,
        status: String
    },{
      versionKey:false  
    }
);

export default mongoose.model('UserModel', userSchema, 'korisnici');