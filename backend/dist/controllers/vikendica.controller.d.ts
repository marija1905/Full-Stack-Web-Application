import express from 'express';
export declare class VikendicaController {
    getVikendice: (req: express.Request, res: express.Response) => void;
    getRezervacije: (req: express.Request, res: express.Response) => void;
    getVikendica: (req: express.Request, res: express.Response) => void;
    getRezervacijeKorisnikaIstekle: (req: express.Request, res: express.Response) => void;
    getRezervacijeKorisnikaAkrivne: (req: express.Request, res: express.Response) => void;
    getRezervacijeKorisnikaNeaktivne: (req: express.Request, res: express.Response) => void;
    dodajKomentar: (req: express.Request, res: express.Response) => void;
    otkazi: (req: express.Request, res: express.Response) => void;
    dodajRezervaciju: (req: express.Request, res: express.Response) => void;
    odbaci: (req: express.Request, res: express.Response) => void;
    potvrdi: (req: express.Request, res: express.Response) => void;
    getVikendiceVlasnika: (req: express.Request, res: express.Response) => void;
    azurirajVikendicu: (req: express.Request, res: express.Response) => void;
    obrisiVikendicu: (req: express.Request, res: express.Response) => void;
    dodajVikendicu: (req: express.Request, res: express.Response) => void;
    getRezervacijePoMesecima: (req: express.Request, res: express.Response) => void;
    getRezervacijeVikendVSRadniDan: (req: express.Request, res: express.Response) => void;
    formatiraj(date: Date): string;
    blokiraj: (req: express.Request, res: express.Response) => void;
}
//# sourceMappingURL=vikendica.controller.d.ts.map