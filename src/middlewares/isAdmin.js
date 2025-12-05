
import verifyToken from './verifyToken.js'; 

export default function isAdmin(req, res, next) {
    
    verifyToken(req, res, () => {
       
        if (req.user && req.user.role === 'admin') {
            next(); 
        } else {
            
            return res.status(403).json({ 
                message: "Akses ditolak. Diperlukan hak akses Admin." 
            });
        }
    });
}