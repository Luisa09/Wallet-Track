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
        
        // Aquí agregamos el precio por unidad y el total por licencia
        row.append("<td>" + nombre + "</td>");
        row.append("<td class='precio'>" + precio.toFixed(2) + "</td>"); // Precio por unidad
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
            addProduct('Free', 0, cantidad); // Licencia Free (0 de precio)
            $('#ginpt').val('');  // Vaciar el campo de cantidad
        } else {
            alert("La cantidad debe ser 1 o más.");
        }
    });

    $('#boton2').click(function (e) {
        e.preventDefault();
        let cantidad = parseInt($('#pinpt').val(), 10);
        if (cantidad > 0) {
            addProduct('Pro', 34.99, cantidad); // Licencia Pro
            $('#pinpt').val('');  // Vaciar el campo de cantidad
        } else {
            alert("La cantidad debe ser 1 o más.");
        }
    });

    $('#boton3').click(function (e) {
        e.preventDefault();
        let cantidad = parseInt($('#spinpt').val(), 10);
        if (cantidad > 0) {
            addProduct('Super Pro', 59.99, cantidad); // Licencia Super Pro
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

// Estrellas de rating
document.addEventListener("DOMContentLoaded", function () {
    const ratings = document.querySelectorAll('.rating span');
    let selectedRating = null;  // Variable para almacenar la calificación seleccionada

    ratings.forEach(star => {
        star.addEventListener('click', function () {
            let ratingValue = this.getAttribute('data-value');
            selectedRating = ratingValue;  // Guardar la calificación seleccionada
            
            // Cambiar el color de las estrellas seleccionadas
            this.parentElement.querySelectorAll('span').forEach(star => {
                if (star.getAttribute('data-value') <= ratingValue) {
                    star.style.color = 'gold'; // Estrella seleccionada
                } else {
                    star.style.color = 'gray'; // Estrella no seleccionada
                }
            });

            // Puedes guardar o mostrar el valor de la calificación aquí
            console.log(`Licencia calificada con ${ratingValue} estrellas.`);
        });
    });
});

// Función que permite solo texto (letras y espacios)
function allowOnlyText(event) {
    const charCode = event.charCode;
    if (!(charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122 || charCode === 32 || (charCode >= 192 && charCode <= 255))) {
        event.preventDefault(); // Si no es letra o espacio, evitar entrada
    }
}

// Asignar el evento de permitir solo texto a los campos de nombre y apellidos
document.getElementById('name').addEventListener('keypress', allowOnlyText);
document.getElementById('apellidos').addEventListener('keypress', allowOnlyText);

// Función para calcular la edad a partir de la fecha de nacimiento
function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    // Ajustar la edad si no ha cumplido años en el año actual
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return edad;
}

// Evento de cambio en la fecha de nacimiento
document.getElementById('fecha').addEventListener('change', function () {
    const fecha = this.value; // Obtener la fecha seleccionada
    if (fecha) {
        const edad = calcularEdad(fecha);
        if (edad >= 0) {
            document.getElementById('edad').textContent = `Edad: ${edad} años`;
        } else {
            document.getElementById('edad').textContent = 'Edad: Fecha inválida.';
        }
    } else {
        document.getElementById('edad').textContent = '';
    }

    // Generar el nombre de usuario solo cuando se selecciona la fecha
    const name = document.getElementById('name').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();

    if (name && apellidos) {
        const inicialPrimerNombre = name.charAt(0).toLowerCase();
        const primerApellido = apellidos.split(' ')[0].toLowerCase();
        const fechaNacimiento = new Date(fecha);
        const dia = fechaNacimiento.getDate().toString().padStart(2, '0');
        const mes = (fechaNacimiento.getMonth() + 1).toString().padStart(2, '0');
        const año = fechaNacimiento.getFullYear();

        const usuario = `${inicialPrimerNombre}${primerApellido}${dia}${mes}${año}`;

        // Asignar el nombre de usuario al campo correspondiente
        document.getElementById('usuario').value = usuario;
    }
});

// Evento de envío del formulario de registro
// Evento de envío del formulario de registro
document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir el envío del formulario

    // Obtener los valores del formulario
    const name = document.getElementById('name').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const fecha = document.getElementById('fecha').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    // Validar correo electrónico
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zAZ]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }

    // Validar que el nombre y apellidos sean solo texto
    const textPattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!textPattern.test(name) || !textPattern.test(apellidos)) {
        alert('El nombre y los apellidos solo pueden contener letras y espacios.');
        return;
    }

    // Validar fecha de nacimiento
    if (!fecha) {
        alert('Por favor, selecciona una fecha de nacimiento válida.');
        return;
    }

    const today = new Date();
    const birthDate = new Date(fecha);
    const minDate = new Date('1999-01-01');
    today.setHours(0, 0, 0, 0); // Ajustar hora a 00:00

    if (birthDate > today) {
        alert('La fecha de nacimiento no puede ser posterior al día de hoy.');
        return;
    }

    if (birthDate < minDate) {
        alert('La fecha de nacimiento debe ser posterior al 1 de enero de 1999.');
        return;
    }

    if (isNaN(birthDate.getTime())) {
        alert('Por favor, ingresa una fecha válida.');
        return;
    }

    // Validación de la contraseña
    const passwordPattern = /^(?=(.*\d.*\d))(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!passwordPattern.test(password)) {
        alert('La contraseña debe tener al menos 8 caracteres, 2 números, una letra mayúscula y un carácter especial.');
        return;
    }

    // Validar que la contraseña y la confirmación sean iguales
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }
    // Generar nombre de usuario al enviar el formulario
    const inicialPrimerNombre = name.charAt(0).toLowerCase();
    const primerApellido = apellidos.split(' ')[0].toLowerCase();
    const fechaNacimiento = new Date(fecha);
    const dia = fechaNacimiento.getDate().toString().padStart(2, '0');
    const mes = (fechaNacimiento.getMonth() + 1).toString().padStart(2, '0');
    const año = fechaNacimiento.getFullYear();

    const usuario = `${inicialPrimerNombre}${primerApellido}${dia}${mes}${año}`;

    // Guardar datos del usuario en localStorage
    const user = { name, apellidos, fecha, email, password, usuario };
    localStorage.setItem('user', JSON.stringify(user));

    // Confirmar registro y redirigir al login
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    window.location.href = 'login.html'; // Redirigir al login
});


document.addEventListener('DOMContentLoaded', function () {
    const fechaInput = document.getElementById('fecha');
    const registerBtn = document.getElementById('register-btn');

    // Función para calcular la edad
    function calcularEdad(fechaNacimiento) {
        const hoy = new Date();
        const nacimiento = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();

        // Ajustar la edad si no ha cumplido años en el año actual
        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }
        return edad;
    }

    // Evento de cambio en la fecha de nacimiento
    fechaInput.addEventListener('change', function () {
        const fecha = fechaInput.value; // Obtener la fecha seleccionada
        const edad = calcularEdad(fecha);

        if (edad >= 18) {
            registerBtn.disabled = false; // Habilitar el botón si la edad es 18 o mayor
        } else {
            registerBtn.disabled = true; // Mantener el botón desactivado si la edad es menor
        }
    });
});
// Evento para el botón "Limpiar"
document.getElementById('clear-btn').addEventListener('click', function() {
    // Obtener todos los elementos de entrada dentro del formulario
    const form = document.getElementById('register-form');
    
    // Limpiar los campos del formulario
    form.reset(); // Resetea el formulario, borra todos los campos

    // Opcional: Si deseas también deshabilitar el botón de registro después de limpiar el formulario
    document.getElementById('register-btn').disabled = true;

    // Limpiar cualquier mensaje de edad
    document.getElementById('edad').textContent = '';
});




// Verifica si el usuario está registrado (simulación de inicio de sesión)
function checkLoginStatus() {
    const userEmail = localStorage.getItem('userEmail'); // Almacena el correo en el localStorage
    const userInfo = document.getElementById('user-info');
    const userEmailDisplay = document.getElementById('user-email');
    const loginButton = document.getElementById('login-register-btn');

    if (userEmail) {
        userEmailDisplay.textContent = `Bienvenido, ${userEmail}`;
        userInfo.style.display = 'block';
        loginButton.style.display = 'none';
    } else {
        userInfo.style.display = 'none';
        loginButton.style.display = 'block';
    }
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('userEmail');
    checkLoginStatus();
}

// Maneja la acción de login (simulando un registro)
document.getElementById('login-register-btn').addEventListener('click', function() {
    const userEmail = prompt("Ingresa tu correo para iniciar sesión:");
    if (userEmail) {
        localStorage.setItem('userEmail', userEmail); // Almacena el correo en localStorage
        checkLoginStatus();
    }
});

// Llama a la función al cargar la página para verificar el estado de login
document.addEventListener('DOMContentLoaded', checkLoginStatus);

// Funciones para manejar el cálculo de totales y la calificación de licencias
function updateLicenseTable() {
    const rows = document.querySelectorAll('input[type="text"]');
    let subtotal = 0;
    let iva = 0;
    let total = 0;

    rows.forEach(row => {
        const cantidad = row.value;
        const precio = parseFloat(row.getAttribute('data-price')); // Usamos un atributo para almacenar el precio
        const calificacion = row.parentElement.querySelector('input[type="radio"]:checked');

        if (cantidad && !isNaN(cantidad) && calificacion) {
            const rowTotal = precio * cantidad;
            subtotal += rowTotal;
        }
    });

    iva = subtotal * 0.16; // Suponiendo un 16% de IVA
    total = subtotal + iva;

    document.getElementById('subtotallb').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('ivalb').textContent = `$${iva.toFixed(2)}`;
    document.getElementById('totallb').textContent = `$${total.toFixed(2)}`;
}

// Añadir eventos a los campos de cantidad y radio buttons
document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('input', updateLicenseTable);
});

document.querySelectorAll('.clasificacion input').forEach(radio => {
    radio.addEventListener('change', updateLicenseTable);
});

// Funciones para añadir licencias a la tabla
document.getElementById('freebtn').addEventListener('click', function() {
    addLicenseRow('Gratis', 0, document.getElementById('ginpt').value);
});

document.getElementById('boton2').addEventListener('click', function() {
    addLicenseRow('Exclusiva', 34.99, document.getElementById('pinpt').value);
});

document.getElementById('boton3').addEventListener('click', function() {
    addLicenseRow('Super Exclusiva', 59.99, document.getElementById('spinpt').value);
});

// Añadir una nueva fila a la tabla de licencias
function addLicenseRow(name, price, quantity) {
    if (quantity && !isNaN(quantity)) {
        const tableBody = document.getElementById('fila');
        const total = price * quantity;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${name}</td>
            <td>$${price.toFixed(2)}</td>
            <td>${quantity}</td>
            <td>$${total.toFixed(2)}</td>
            <td>${getSelectedRating(name)}</td>
        `;
        tableBody.appendChild(row);
        updateLicenseTable();
    }
}

// Obtener la calificación seleccionada
function getSelectedRating(name) {
    const ratingRadios = document.querySelectorAll(`input[name="estrellas_${name.toLowerCase().replace(' ', '_')}"]`);
    for (const radio of ratingRadios) {
        if (radio.checked) {
            return `★`.repeat(radio.value);
        }
    }
    return 'No calificado';
}

document.getElementById('logout-btn').addEventListener('click', logout);

