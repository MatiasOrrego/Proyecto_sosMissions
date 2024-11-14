document.addEventListener('DOMContentLoaded', async () => {
    const profileInfo = document.getElementById('profileInfo');
    const errorMessage = document.getElementById('errorMessage');

    try {
        // Obtenemos la información del usuario autenticado
        const authResponse = await fetch('http://localhost:3000/auth/me', {
            method: 'GET',
            credentials: 'include',
        });

        if (!authResponse.ok) {
            throw new Error('No autenticado');
        }

        const userData = await authResponse.json();
        const userId = userData.id;

        // Hacemos la petición para obtener los datos del perfil del usuario
        const profileResponse = await fetch(`http://localhost:3000/auth/${userId}`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!profileResponse.ok) {
            throw new Error('Error al obtener los datos del perfil');
        }

        const profileData = await profileResponse.json();

        // Renderizamos la información según si el usuario es médico o no
        profileInfo.innerHTML = `
            <div class="info-item">
                <i class="fas fa-envelope"></i>
                <div class="info-content">
                    <div class="info-label">Email</div>
                    <div class="info-value">${profileData.email}</div>
                </div>
            </div>
            ${profileData.isMedic ? `
            <div class="info-item">
                <i class="fas fa-id-card"></i>
                <div class="info-content">
                    <div class="info-label">Nombre</div>
                    <div class="info-value">${profileData.name}</div>
                </div>
            </div>
            <div class="info-item">
                <i class="fas fa-id-card-alt"></i>
                <div class="info-content">
                    <div class="info-label">Apellido</div>
                    <div class="info-value">${profileData.lastname}</div>
                </div>
            </div>
            <div class="info-item">
                <i class="fas fa-stethoscope"></i>
                <div class="info-content">
                    <div class="info-label">Especialidad</div>
                    <div class="info-value">${profileData.especialidad}</div>
                </div>
            </div>
            <div class="info-item">
                <i class="fas fa-phone"></i>
                <div class="info-content">
                    <div class="info-label">Teléfono</div>
                    <div class="info-value">${profileData.telefono}</div>
                </div>
            </div>` : ''}
        `;
    } catch (error) {
        console.error('Error:', error);
        errorMessage.style.display = 'block';
        profileInfo.innerHTML = '';
    }
});
