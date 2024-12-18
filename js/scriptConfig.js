document.addEventListener('DOMContentLoaded', function() {
    // Si estamos en la página wallet.html, aplicar las configuraciones guardadas
    if (window.location.pathname.endsWith('wallet.html')) {
        aplicarConfiguracionWallet();
    }

    // Detectar cambios en el modo oscuro y tamaño de fuente
    document.getElementById('theme-switch').addEventListener('change', function() {
        guardarConfiguracion();
    });

    document.getElementById('font-size').addEventListener('change', function() {
        guardarConfiguracion();
    });

    // Función para aplicar configuraciones guardadas
    function aplicarConfiguracionWallet() {
        // Obtener configuración guardada de localStorage
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        const fontSize = localStorage.getItem('fontSize') || 'medium';

        // Aplicar modo oscuro si está activado
        if (isDarkMode) {
            document.body.classList.add('dark-mode-wallet');
            document.getElementById('theme-switch').checked = true; // Reflejar el estado en el switch
        } else {
            document.body.classList.remove('dark-mode-wallet');
            document.getElementById('theme-switch').checked = false; // Reflejar el estado en el switch
        }

        // Aplicar tamaño de fuente
        document.body.style.fontSize = getFontSize(fontSize);
    }

    // Función para devolver el tamaño de fuente según la opción seleccionada
    function getFontSize(size) {
        switch (size) {
            case 'small': return '14px';
            case 'medium': return '16px';
            case 'large': return '18px';
            default: return '16px'; // tamaño por defecto
        }
    }

    // Función para guardar las configuraciones en localStorage
    function guardarConfiguracion() {
        const isDarkMode = document.getElementById('theme-switch').checked;
        const fontSize = document.getElementById('font-size').value;

        // Guardar configuraciones en localStorage
        localStorage.setItem('darkMode', isDarkMode);
        localStorage.setItem('fontSize', fontSize);

        // Aplicar configuraciones de inmediato
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        document.body.style.fontSize = getFontSize(fontSize);
    }

    // Función para redirigir a wallet.html con las configuraciones guardadas
    document.getElementById('save-btn').addEventListener('click', function() {
        // Al hacer clic en el botón "Guardar", se guarda la configuración
        guardarConfiguracion();

        // Redirigir a wallet.html con la configuración aplicada
        window.location.href = "wallet.html";
    });
});
