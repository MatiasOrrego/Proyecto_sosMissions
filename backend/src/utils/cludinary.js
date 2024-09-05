import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '../../config/config.js';

// Configuración de Cloudinary
cloudinary.config({ 
    cloud_name: CLOUDINARY_NAME, 
    api_key: CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_API_SECRET
});

// Función para subir una imagen a Cloudinary
export async function uploadImage(filePath) {
    try {
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            folder: 'uploads',  // Puedes especificar el folder donde se almacenarán las imágenes
        });

        console.log('Imagen subida correctamente:', uploadResult.secure_url);
        return uploadResult.secure_url;  // Retorna la URL segura de la imagen
    } catch (error) {
        console.error('Error al subir la imagen a Cloudinary:', error);
        throw error;
    }
}

// Ejemplo de uso:
// const imageUrl = await uploadImage('ruta/al/archivo/temporal');
