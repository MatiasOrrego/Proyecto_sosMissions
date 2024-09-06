import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '../../config/config.js';
import fs from 'fs'

// Configuración de Cloudinary
cloudinary.config({ 
    cloud_name: CLOUDINARY_NAME, 
    api_key: CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_API_SECRET
});

export async function uploadImage(filePath) {
    try {
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            folder: 'uploads',
        });

        console.log('Imagen subida correctamente:', uploadResult.secure_url)

        fs.unlinkSync(filePath);

        return uploadResult.secure_url;
    } catch (error) {
        console.error('Error al subir la imagen a Cloudinary:', error);
        throw error;
    }
}
