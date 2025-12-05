import jwt from "jsonwebtoken";


const GLOBAL_JWT_SECRET = process.env.JWT_SECRET || 'skyfly_kunci_rahasia_anda_harus_panjang';

export default function verifyToken(req, res, next) {
    const header = req.header("Authorization");

    if (!header) {
        return res.status(401).json({ message: "Silahkan login terlebih dahulu." });
    }

    const token = header.replace("Bearer ", "");

    try {
        
        const decoded = jwt.verify(token, GLOBAL_JWT_SECRET); 
        req.user = decoded; 
        next();
    } catch (err) {
        
        return res.status(401).json({ message: "Token tidak valid atau sesi berakhir." });
    }
}