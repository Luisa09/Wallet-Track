// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Slider de imágenes
document.addEventListener('DOMContentLoaded', function () {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    // Función para mostrar la imagen correspondiente
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active')); // Oculta todas las imágenes
        slides[index].classList.add('active'); // Muestra la imagen activa
    }

    // Mostrar la primera imagen
    showSlide(currentSlide);

    // Cambiar automáticamente las imágenes cada 3 segundos
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }, 3000);
});

/* Login */

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Cerrar el modal si se hace clic fuera del contenido
window.onclick = function(event) {
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    
    if (event.target == loginModal) {
        loginModal.style.display = 'none';
    } else if (event.target == registerModal) {
        registerModal.style.display = 'none';
    }
};

$(document).ready(function () {
    let suma = 0; // Suma total de los productos

    // Función para actualizar los totales (IVA, Total)
    function updateTotals() {
        console.log("Actualizando totales...");
        console.log("Suma actual: ", suma);  // Verifica que suma esté actualizada
        if (isNaN(suma)) {
            console.error("El valor de suma no es válido:", suma);
            return;
        }

        // Calcular IVA y Total
        let iva = suma * 0.19;
        let totalConIva = suma * 1.19;

        // Actualizar las etiquetas en la tabla con los nuevos valores
        $('#ivalb').text(iva.toFixed(2));
        $('#totallb').text(totalConIva.toFixed(2));
        $('#subtotallb').text(suma.toFixed(2));
    }

    // Función para agregar productos a la tabla
    function addProduct(nombre, precio, cantidad) {
        // Verificar que precio y cantidad son números válidos
        if (isNaN(precio) || isNaN(cantidad) || cantidad <= 0) {
            console.error("Precio o cantidad no son válidos. Precio:", precio, "Cantidad:", cantidad);
            return;
        }

        let total = precio * cantidad; // Calcular total
        let row = $("<tr>");
        row.append("<td>" + nombre + "</td>");
        row.append("<td class='cantidad'>" + cantidad + "</td>");
        row.append("<td class='total'>" + total.toFixed(2) + "</td>");
        $('#fila').append(row);

        suma += total; // Actualizar el total general
        console.log("Suma después de agregar producto: ", suma); // Verificar suma
        updateTotals(); // Actualizar los totales
    }

    // Agregar productos con botones
    $('#freebtn').click(function (e) {
        e.preventDefault();
        let cantidad = parseInt($('#ginpt').val(), 10);
        if (cantidad > 0) {
            addProduct('Free', 0, cantidad);
            $('#ginpt').val('');  // Vaciar el campo de cantidad
        } else {
            alert("La cantidad debe ser 1 o más.");
        }
    });

    $('#boton2').click(function (e) {
        e.preventDefault();
        let cantidad = parseInt($('#pinpt').val(), 10);
        if (cantidad > 0) {
            addProduct('Pro', 34.99, cantidad);
            $('#pinpt').val('');  // Vaciar el campo de cantidad
        } else {
            alert("La cantidad debe ser 1 o más.");
        }
    });

    $('#boton3').click(function (e) {
        e.preventDefault();
        let cantidad = parseInt($('#spinpt').val(), 10);
        if (cantidad > 0) {
            addProduct('Super Pro', 59.99, cantidad);
            $('#spinpt').val('');  // Vaciar el campo de cantidad
        } else {
            alert("La cantidad debe ser 1 o más.");
        }
    });
});

// Comprobar si hay un usuario guardado en localStorage
const storedUser = JSON.parse(localStorage.getItem('user'));

document.addEventListener('DOMContentLoaded', function() {
    const loginRegisterBtn = document.getElementById('login-register-btn');
    const userInfoDiv = document.getElementById('user-info');
    const userEmailSpan = document.getElementById('user-email');
    const logoutBtn = document.getElementById('logout-btn');

    // Mostrar el correo y el botón "Salir" solo si el usuario ha iniciado sesión
    if (storedUser && storedUser.email) {
        // Ocultar el botón de Login o Registro
        if (loginRegisterBtn) loginRegisterBtn.classList.add('hidden');
        
        // Mostrar la sección con el correo y el botón de logout
        if (userInfoDiv) userInfoDiv.style.display = 'block';
        if (userEmailSpan) userEmailSpan.innerText = `Hola, ${storedUser.email}`;
    } else {
        // Si no hay usuario logueado, mostrar el botón de Login o Registro
        if (loginRegisterBtn) loginRegisterBtn.classList.remove('hidden');
    }

    // Evento para el botón "Salir"
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('user'); // Eliminar el usuario de localStorage
            window.location.href = 'index.html'; // Redirigir a la página de login
        });
    }
});


  
