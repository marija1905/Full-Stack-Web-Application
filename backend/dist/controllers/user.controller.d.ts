import express from 'express';
export declare class UserController {
    login: (req: express.Request, res: express.Response) => void;
    register: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
    changePassword: (req: express.Request, res: express.Response) => void;
    getRegTurista: (req: express.Request, res: express.Response) => void;
    getRegVlasnik: (req: express.Request, res: express.Response) => void;
    azuriraj: (req: express.Request, res: express.Response) => void;
    getSveKorisnike: (req: express.Request, res: express.Response) => void;
    deaktivirajKorisnika: (req: express.Request, res: express.Response) => void;
    aktivirajKorisnika: (req: express.Request, res: express.Response) => void;
    deleteKorisnika: (req: express.Request, res: express.Response) => void;
    odbij: (req: express.Request, res: express.Response) => void;
}
//# sourceMappingURL=user.controller.d.ts.map