import { Request } from "express";
export interface AuthRequest extends Request {
    korisnik?: any;
    file?: Express.Multer.File;
}
//# sourceMappingURL=authreq.d.ts.map