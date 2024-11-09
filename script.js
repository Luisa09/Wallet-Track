$(function () {
    var suma = 0;
    $('#freebtn').click(function (e) {
        e.preventDefault();

        var cant = $('#ginpt').val();
        var precio = 0
        var total = precio*cant
        if (cant <= 0) {
            alert("La cantidad debe de ser 1 o mas.")
        } else {
            $('#fila').append("<tr><td> Free </td><td>" + cant + "</td><td>" + total + "</td></tr>");

            $('#ivalb').html(suma * 0.19);
            $('#totallb').html(suma * 1.19);
            $('#subtotallb').html(suma);
        }
    });
    $('#boton2').click(function (e) {
        e.preventDefault();

        var cant = $('#pinpt').val();
        var precio = 34.99
        var total = precio*cant
        suma = suma + total
        if (cant == 0) {
            alert("La cantidad debe de ser 1 o mas.")
        } else {
            $('#fila').append("<tr><td> Pro </td><td>" + cant + "</td><td>" + total + "</td></tr>");

            $('#ivalb').html(suma * 0.19);
            $('#totallb').html(suma * 1.19);
            $('#subtotallb').html(suma);
        }
    });
    $('#boton3').click(function (e) {
        e.preventDefault();
        var cant = $('#spinpt').val();
        var precio = 59.99
        var total = precio*cant
        suma = suma + total
        if (cant == 0) {
            alert("La cantidad debe de ser 1 o mas.")
        } else {
            $('#fila').append("<tr><td> Super pro </td><td>" + cant + "</td><td>" + total + "</td></tr>");

            $('#ivalb').html(suma * 0.19);
            $('#totallb').html(suma * 1.19);
            $('#subtotallb').html(suma);
        }
    });

});



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
