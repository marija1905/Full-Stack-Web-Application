import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema(
    {
        naziv: String,
        mesto: String,
        kapacitet: Number,
        cenovnik: Array,
        usluge: Array,
        telefon: String,
        ocena: Number,
        galerija: Array,
        komentari: Array,
        rezervacije: Array,
        lokacija: Array,
        opis: Array,
        vlasnik: String,
        datumDo: String
    }
);

export default mongoose.model('BookModel', bookSchema, 'vikendice');