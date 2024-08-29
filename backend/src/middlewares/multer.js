import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener __dirname en un entorno ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de Multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'), // Ruta a la carpeta de destino
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Ejemplo: 1663757325698.jpg
    }
});

console.log(storage);
const upload = multer({ storage });

export default upload;