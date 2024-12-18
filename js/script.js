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

    $(document).ready(function () {
        $("#add-product-btn").click(function () {
            console.log("Evento de clic ejecutado."); // Verifica si el evento se dispara

            // Obtener la calificación seleccionada
            var calificacion = $('input[name="estrellas_gratis"]:checked').val();
            console.log("Calificación seleccionada:", calificacion); // Verifica la calificación seleccionada

            if (!calificacion) {
                alert("Por favor, selecciona una calificación antes de continuar.");
                return;
            }

            // Datos del producto
            var nombre = "Licencia Gratis";
            var precio = 0;  // Precio de la licencia gratis
            var cantidad = 1;
            var total = precio * cantidad;

            console.log("Datos del producto - Nombre:", nombre, "Precio:", precio, "Cantidad:", cantidad, "Total:", total);

            // Crear la fila HTML
            var nuevaFila = "<tr>" +
                            "<td>" + nombre + "</td>" +
                            "<td>" + precio.toFixed(2) + "</td>" +
                            "<td>" + cantidad + "</td>" +
                            "<td>" + total.toFixed(2) + "</td>" +
                            "<td>" + calificacion + " ★</td>" +
                            "</tr>";

            console.log("HTML generado para la fila:", nuevaFila); // Verifica el HTML generado

            // Agregar la fila a la tabla
            $("#tabla-productos tbody").append(nuevaFila);
            console.log("Fila añadida a la tabla."); // Confirma que se añadió la fila

            // Resetear el formulario
            $("#form-free")[0].reset();
            console.log("Formulario reseteado."); // Confirma que el formulario se ha reiniciado
        });
    });

    $(document).ready(function () {
        $("#add-product-btn").click(function () {
            // Obtener valores
            var calificacion = $('input[name="estrellas_gratis"]:checked').val();
            if (!calificacion) {
                alert("Selecciona una calificación antes de agregar.");
                return;
            }
    
            var cantidad = 1; // Sustituye esto con tu lógica para obtener la cantidad
            var precio = 59.99; // Sustituye con tu lógica para obtener el precio
            var total = cantidad * precio;
    
            // Crear fila
            var nuevaFila = `
                <tr>
                    <td>Licencia Gratis</td>
                    <td>${precio.toFixed(2)}</td>
                    <td>${cantidad}</td>
                    <td>${total.toFixed(2)}</td>
                    <td>${calificacion} ★</td>
                </tr>
            `;
    
            // Agregar fila a la tabla
            $("#tabla-productos tbody").append(nuevaFila);
    
            // Actualizar suma
            console.log("Suma después de agregar producto: ", total);
        });
    });
    
    function toggleChatbot() {
        const chatbot = document.getElementById('chatbot-container');
        chatbot.style.display = chatbot.style.display === 'block' ? 'none' : 'block';
    }
    

    /*pERFIL*/

    // Simulación de inicio de sesión
function login() {
    const email = document.getElementById("email").value; // Correo ingresado
    const name = document.getElementById("name").value; // Nombre ingresado

    // Guardar los datos en sessionStorage
    sessionStorage.setItem("userEmail", email);
    sessionStorage.setItem("userName", name);

    // Redirigir a la página principal o perfil
    window.location.href = "index.html";  // Redirigir a la página principal
}


// Verificar si el usuario está logueado al cargar la página
window.onload = function() {
    const userEmail = sessionStorage.getItem("userEmail");
    const userName = sessionStorage.getItem("userName");

    if (userEmail && userName) {
        // Mostrar el correo y habilitar el perfil
        document.getElementById("user-email").textContent = userEmail;
        document.getElementById("profile-name").value = userName;  // Prellenar el nombre en el formulario
        document.getElementById("profile-email").value = userEmail;  // Prellenar el correo
    } else {
        // Si no hay sesión, redirigir al login
        window.location.href = "login.html";
    }

    // Mostrar el formulario de perfil al hacer clic en el correo
    document.getElementById("user-email").addEventListener("click", function() {
        const dropdown = document.getElementById("profile-dropdown");
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });
}

// Guardar los cambios del perfil
function saveProfile() {
    const updatedName = document.getElementById("profile-name").value;
    const updatedEmail = document.getElementById("profile-email").value;

    // Guardar los nuevos datos en sessionStorage
    sessionStorage.setItem("userName", updatedName);
    sessionStorage.setItem("userEmail", updatedEmail);

    alert("Perfil actualizado correctamente!");
}


// Cargar configuraciones almacenadas al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    // Aplicar el tema oscuro si está activado
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }

    // Aplicar el tamaño de la fuente si está configurado
    const fontSize = localStorage.getItem('fontSize');
    if (fontSize) {
        document.body.style.fontSize = fontSize;
    }
});

/*Wallet*/
// Verifica si el usuario está logueado
$(document).ready(function () {
    const userEmail = sessionStorage.getItem("userEmail");
    if (!userEmail) {
      window.location.href = "login.html"; // Redirige al login si no hay sesión
    } else {
      $("#userEmail").text(userEmail);
    }
  
    // Simulación de datos de la wallet
    const walletData = {
      balance: 100.50,
      transactions: [
        { date: "2024-11-25", description: "Pago de servicios", amount: -50.00 },
        { date: "2024-11-24", description: "Transferencia recibida", amount: 200.00 },
      ],
    };
  
    // Cargar balance y transacciones iniciales
    $("#totalBalance").text(walletData.balance.toFixed(2));
    const transactionsList = $("#transactionsList");
    transactionsList.empty();
  
    walletData.transactions.forEach((transaction) => {
      transactionsList.append(
        `<li>${transaction.date} - ${transaction.description}: $${transaction.amount.toFixed(2)}</li>`
      );
    });
  
    // Cerrar sesión
    $("#logoutBtn").on("click", function () {
      sessionStorage.removeItem("userEmail");
      window.location.href = "login.html";
    });
  
    // Agregar fondos
    $("#addFundsBtn").on("click", function () {
      const amount = parseFloat(prompt("Ingresa el monto a agregar:"));
      if (!isNaN(amount) && amount > 0) {
        walletData.balance += amount;
        walletData.transactions.unshift({
          date: new Date().toISOString().split("T")[0],
          description: "Depósito",
          amount,
        });
  
        // Actualizar UI
        $("#totalBalance").text(walletData.balance.toFixed(2));
        transactionsList.prepend(
          `<li>${new Date().toISOString().split("T")[0]} - Depósito: $${amount.toFixed(2)}</li>`
        );
      } else {
        alert("Monto inválido.");
      }
    });
  });
  
/*mETAS financieras*/
document.addEventListener("DOMContentLoaded", function() {
    const formMeta = document.getElementById("form-meta");
    const listaMetas = document.getElementById("lista-metas");
    const graficoProgreso = document.getElementById("graficoProgreso").getContext("2d");
  
    // Arreglo para almacenar las metas
    let metas = [];
  
    // Configuración inicial del gráfico
    const chart = new Chart(graficoProgreso, {
      type: "bar",
      data: {
        labels: [], // Nombres de las metas
        datasets: [{
          label: "Progreso (%)",
          data: [], // Porcentaje de progreso de cada meta
          backgroundColor: "#4caf50",
          borderColor: "#388e3c",
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100 // Máximo 100% de progreso
          }
        }
      }
    });
  
    // Manejar el envío del formulario
    formMeta.addEventListener("submit", function(event) {
      event.preventDefault();
  
      const metaNombre = document.getElementById("meta-nombre").value;
      const metaMonto = parseFloat(document.getElementById("meta-monto").value);
      const metaTiempo = parseInt(document.getElementById("meta-tiempo").value);
  
      // Validar datos
      if (!metaNombre || !metaMonto || !metaTiempo) {
        alert("Por favor, completa todos los campos.");
        return;
      }
  
      // Crear una nueva meta
      const nuevaMeta = {
        nombre: metaNombre,
        monto: metaMonto,
        tiempo: metaTiempo,
        progreso: 0 // Progreso inicial es 0%
      };
  
      // Agregar meta al arreglo
      metas.push(nuevaMeta);
  
      // Limpiar el formulario
      formMeta.reset();
  
      // Actualizar la lista de metas y el gráfico
      actualizarListaMetas();
      actualizarGrafico();
    });
  
    // Función para actualizar la lista de metas
    function actualizarListaMetas() {
      listaMetas.innerHTML = ""; // Limpiar la lista
      metas.forEach((meta, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${meta.nombre}</strong> - Monto: $${meta.monto.toFixed(2)}, Tiempo: ${meta.tiempo} meses
          <span>Progreso: ${meta.progreso}%</span>
        `;
        listaMetas.appendChild(li);
      });
    }
  
    // Función para actualizar el gráfico
    function actualizarGrafico() {
      chart.data.labels = metas.map(meta => meta.nombre); // Actualizar etiquetas
      chart.data.datasets[0].data = metas.map(meta => meta.progreso); // Actualizar datos
      chart.update(); // Refrescar el gráfico
    }
  });
  

/*Pagar*/

document.getElementById('btnIrAPagar').addEventListener('click', () => {
    const total = document.getElementById('totallb').innerText;
    if (parseFloat(total) > 0) {
        document.querySelector('.container').style.display = 'none'; // Ocultar tabla
        document.getElementById('paymentFormContainer').style.display = 'block'; // Mostrar formulario
    } else {
        alert('No hay un total para pagar.');
    }
});



  