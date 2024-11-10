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



/*login*/

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


//login y registro

document.addEventListener('DOMContentLoaded', function() {
    // Validación de formulario de Login
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function(event) {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email === '' || password === '') {
            alert('Por favor, completa todos los campos');
            event.preventDefault(); // Evita el envío del formulario
        }
    });

    // Validación de formulario de Registro
    const registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit', function(event) {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (name === '' || email === '' || password === '') {
            alert('Por favor, completa todos los campos');
            event.preventDefault(); // Evita el envío del formulario
        }
    });
});


$(document).ready(function () {
    var suma = 0; // Variable para llevar el total de los productos

    // Función para actualizar los totales de IVA y Total
    function updateTotals() {
        var iva = suma * 0.19;
        var totalConIva = suma * 1.19;
        $('#ivalb').html(iva.toFixed(2));
        $('#totallb').html(totalConIva.toFixed(2));
        $('#subtotallb').html(suma.toFixed(2));
    }

    // Función para actualizar el total de una fila
    function updateRowTotal(row, precio, cantidad) {
        var total = precio * cantidad;
        row.find('td').eq(2).text(total.toFixed(2)); // Actualizar el total de la fila
        return total;
    }

    // Función para agregar productos
    function addProduct(nombre, precio, cantidad) {
        var total = precio * cantidad; // Calcular total de esa fila
        var row = $("<tr><td>" + nombre.charAt(0).toUpperCase() + nombre.slice(1) + "</td><td>" + cantidad + "</td><td>" + total.toFixed(2) + "</td></tr>");
        row.append("<td><button class='edit-btn'>Editar</button><button class='delete-btn'>Eliminar</button></td>");
        $('#fila').append(row); // Añadir la fila a la tabla

        suma += total; // Sumar al total general
        updateTotals(); // Actualizar totales de IVA y Total
    }

    // Agregar productos con botones
    $('#freebtn').click(function (e) {
        e.preventDefault();
        var cantidad = parseInt($('#ginpt').val()); // Obtener cantidad
        if (cantidad > 0) {
            addProduct('free', 0, cantidad); // Llamar a addProduct para agregar Free
        } else {
            alert("La cantidad debe ser 1 o más.");
        }
    });

    $('#boton2').click(function (e) {
        e.preventDefault();
        var cantidad = parseInt($('#pinpt').val()); // Obtener cantidad
        if (cantidad > 0) {
            addProduct('pro', 34.99, cantidad); // Llamar a addProduct para agregar Pro
        } else {
            alert("La cantidad debe ser 1 o más.");
        }
    });

    $('#boton3').click(function (e) {
        e.preventDefault();
        var cantidad = parseInt($('#spinpt').val()); // Obtener cantidad
        if (cantidad > 0) {
            addProduct('super pro', 59.99, cantidad); // Llamar a addProduct para agregar Super Pro
        } else {
            alert("La cantidad debe ser 1 o más.");
        }
    });

    // Función para editar una fila
    $(document).on('click', '.edit-btn', function () {
        var row = $(this).closest('tr'); // Obtener la fila de la tabla
        var cantidadCell = row.find('td').eq(1); // Obtener la celda de la cantidad
        var cantidad = parseInt(cantidadCell.text(), 10); // Obtener el valor de la cantidad
        var precio = 0;

        // Obtener el precio dependiendo del tipo de producto
        if (row.find('td').eq(0).text() === "Free") {
            precio = 0;
        } else if (row.find('td').eq(0).text() === "Pro") {
            precio = 34.99;
        } else if (row.find('td').eq(0).text() === "Super pro") {
            precio = 59.99;
        }

        // Crear un campo de entrada para la cantidad
        var input = $("<input>", { type: "number", value: cantidad, min: 1 });
        cantidadCell.html(input); // Reemplazar la celda con el input

        // Cambiar el texto del botón a "Guardar"
        $(this).text("Guardar");

        // Deshabilitar el botón de eliminar
        row.find('.delete-btn').prop('disabled', true);

        // Al hacer clic en "Guardar"
        $(this).off('click').on('click', function () {
            var newCantidad = parseInt(input.val(), 10); // Obtener la nueva cantidad
            if (newCantidad > 0) {
                var total = updateRowTotal(row, precio, newCantidad); // Actualizar el total de la fila
                suma -= (cantidad * precio); // Restar el total anterior
                suma += total; // Sumar el nuevo total

                cantidadCell.html(newCantidad); // Reemplazar el campo de cantidad con el nuevo valor

                // Cambiar el texto del botón a "Editar"
                $(this).text("Editar");

                // Habilitar de nuevo el botón de eliminar
                row.find('.delete-btn').prop('disabled', false);

                // Volver a activar la acción de editar
                $(this).off('click').on('click', function () {
                    row.find('.edit-btn').trigger('click');
                });

                // Volver a desactivar la edición
                input.prop('disabled', true);

                updateTotals(); // Actualizar totales
            } else {
                alert("La cantidad debe ser mayor que 0.");
            }
        });
    });

    // Eliminar fila de la tabla
    $(document).on('click', '.delete-btn', function () {
        var row = $(this).closest('tr'); // Obtener la fila
        var totalRow = parseFloat(row.find('td').eq(2).text()) || 0; // Obtener el total de esa fila
        row.remove(); // Eliminar la fila

        suma -= totalRow; // Restar el total de la fila eliminada
        updateTotals(); // Actualizar los totales
    });
});
