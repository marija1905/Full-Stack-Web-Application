"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookSchema = new mongoose_1.default.Schema({
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
});
exports.default = mongoose_1.default.model('BookModel', bookSchema, 'vikendice');
//# sourceMappingURL=vikendica.js.map