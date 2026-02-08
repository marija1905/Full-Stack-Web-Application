"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
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
}, {
    versionKey: false
});
exports.default = mongoose_1.default.model('UserModel', userSchema, 'korisnici');
//# sourceMappingURL=user.js.map