document.addEventListener('DOMContentLoaded', async () => {
    const profileInfo = document.getElementById('profileInfo');
    const errorMessage = document.getElementById('errorMessage');

    try {
        // Primero obtenemos la información del usuario actual
        const authResponse = await fetch('http://localhost:3000/auth/me', {
            method: 'GET',
            credentials: 'include',
        });

        if (!authResponse.ok) {
            throw new Error('No autenticado');
        }

        const userData = await authResponse.json();
        const userId = userData.id;
        const roleId = userData.roleId;

        // Dependiendo del rol, hacemos la petición correspondiente
        const profileUrl = roleId === 2 
            ? `http://localhost:3000/medic/${userId}`
            : `http://localhost:3000/auth/${userId}`;

        const profileResponse = await fetch(profileUrl, {
            method: 'GET',
            credentials: 'include',
        });

        if (!profileResponse.ok) {
            throw new Error('Error al obtener los datos del perfil');
        }

        const profileData = await profileResponse.json();

        // Renderizamos la información según el rol
        if (roleId === 2) {
            // Perfil de médico
            profileInfo.innerHTML = `
                <div class="info-item">
                    <i class="fas fa-user"></i>
                    <div class="info-content">
                        <div class="info-label">Nombre</div>
                        <div class="info-value">${profileData.nombre}</div>
                    </div>
                </div>
                <div class="info-item">
                    <i class="fas fa-user"></i>
                    <div class="info-content">
                        <div class="info-label">Apellido</div>
                        <div class="info-value">${profileData.apellido}</div>
                    </div>
                </div>
                <div class="info-item">
                    <i class="fas fa-envelope"></i>
                    <div class="info-content">
                        <div class="info-label">Email</div>
                        <div class="info-value">${profileData.email}</div>
                    </div>
                </div>
                <div class="info-item">
                    <i class="fas fa-phone"></i>
                    <div class="info-content">
                        <div class="info-label">Teléfono</div>
                        <div class="info-value">${profileData.telefono}</div>
                    </div>
                </div>
            `;
        } else {
            // Perfil de usuario normal
            profileInfo.innerHTML = `
                <div class="info-item">
                    <i class="fas fa-user"></i>
                    <div class="info-content">
                        <div class="info-label">Nombre de usuario</div>
                        <div class="info-value">${profileData.username}</div>
                    </div>
                </div>
                <div class="info-item">
                    <i class="fas fa-envelope"></i>
                    <div class="info-content">
                        <div class="info-label">Email</div>
                        <div class="info-value">${profileData.email}</div>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error:', error);
        errorMessage.style.display = 'block';
        profileInfo.innerHTML = '';
    }
});