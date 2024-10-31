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

        console.log('Imagen subida correctamente:', uploadResult.secure_url);
        
        fs.unlinkSync(filePath);

        return uploadResult.secure_url;
    } catch (error) {
        console.error('Error al subir la imagen a Cloudinary:', error);
        throw error;
    }
}

export async function uploadVideo(filePath) {
    try {
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            resource_type: 'video',
            folder: 'upload'
        });
        console.log('Video subido correctamente:', uploadResult.secure_url);
        
        fs.unlinkSync(filePath)

        return uploadResult.secure_url
    } catch (error) {
        console.error('Error al subir el video a Cloudinary:', error)
        throw error
    }
}

export const deleteImge = async (ImgeId)=>{
    await cloudinary.uploader.destroy(ImgeId)
}
