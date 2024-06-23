document.addEventListener('DOMContentLoaded', () => {
    
    const token = localStorage.getItem('token')

    if(!token){
    } else {
        document.getElementById('btn-lr').innerHTML = `
        <a href='' id='logout'>Cerrar Sesión</a>`

        document.getElementById('logout').addEventListener('click', () => {
            localStorage.removeItem('token')

            window.location.reload()
        })
    }
})