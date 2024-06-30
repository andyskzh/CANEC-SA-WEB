AOS.init({
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 900, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

document.addEventListener("DOMContentLoaded", function() {
  // Funcionalidad adicional para el frontend

  // Validación adicional para el formulario de login
  document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    var email = document.getElementById("email").value.trim();
    var password = document.getElementById("password").value.trim();
    
    if (!validateEmail(email)) {
      showError("email", "Por favor, ingrese un correo válido.");
      return;
    }
    
    if (!validatePassword(password)) {
      showError("password", "La contraseña debe tener al menos 8 caracteres, incluyendo letras, números y caracteres especiales.");
      return;
    }
    
    // Si la validación es exitosa, enviar los datos al backend
    authenticateUser(email, password);
  });

  // Mostrar errores
  function showError(field, message) {
    var errorElement = document.getElementById("error-" + field);
    if (!errorElement) {
      errorElement = document.createElement("div");
      errorElement.id = "error-" + field;
      errorElement.className = "text-danger";
      document.getElementById(field).parentElement.appendChild(errorElement);
    }
    errorElement.innerText = message;
  }

  // Validación de email
  function validateEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validación de contraseña
  function validatePassword(password) {
    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&_-]{8,}$/;
    return passwordRegex.test(password);
  }

  // Autenticación del usuario
  function authenticateUser(email, password) {
    fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        // Almacenar el token en el almacenamiento local
        localStorage.setItem('token', data.token);
        // Autenticación exitosa, redirigir al usuario
        window.location.href = "index.html";
      } else {
        // Mostrar mensaje de error
        alert("Error de autenticación: " + data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  // Mostrar/Ocultar contraseña adicional
  document.getElementById("togglePassword").addEventListener("click", function() {
    var passwordField = document.getElementById("password");
    var passwordFieldType = passwordField.getAttribute("type");
    if (passwordFieldType === "password") {
      passwordField.setAttribute("type", "text");
      this.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
      passwordField.setAttribute("type", "password");
      this.innerHTML = '<i class="fas fa-eye"></i>';
    }
  });

  // Funcionalidad para recordar contraseña
  document.getElementById("rememberMe").addEventListener("change", function() {
    var rememberMe = this.checked;
    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberMe");
    }
  });
});

document.addEventListener("DOMContentLoaded", function() {
  // Validación adicional para el formulario de registro
  document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault();
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var password = document.getElementById("password").value.trim();
    var confirmPassword = document.getElementById("confirm-password").value.trim();
    
    if (!validateName(name)) {
      showError("name", "Por favor, ingrese su nombre.");
      return;
    }
    
    if (!validateEmail(email)) {
      showError("email", "Por favor, ingrese un correo válido.");
      return;
    }
    
    if (!validatePassword(password)) {
      showError("password", "La contraseña debe tener al menos 8 caracteres, incluyendo letras y números.");
      return;
    }
    
    if (password !== confirmPassword) {
      showError("confirm-password", "Las contraseñas no coinciden.");
      return;
    }
    
    // Si la validación es exitosa, enviar los datos al backend
    registerUser(name, email, password);
  });

  // Mostrar errores
  function showError(field, message) {
    var errorElement = document.getElementById("error-" + field);
    if (!errorElement) {
      errorElement = document.createElement("div");
      errorElement.id = "error-" + field;
      errorElement.className = "text-danger";
      document.getElementById(field).parentElement.appendChild(errorElement);
    }
    errorElement.innerText = message;
  }

  // Validación de nombre
  function validateName(name) {
    return name.length > 0;
  }

  // Validación de email
  function validateEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validación de contraseña
  function validatePassword(password) {
    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&_-]{8,}$/;
    return passwordRegex.test(password);
  }

  // Registro del usuario
  function registerUser(name, email, password) {
    fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name, email: email, password: password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        // Almacenar el token en el almacenamiento local
        localStorage.setItem('token', data.token);
        // Registro exitoso, redirigir al usuario
        window.location.href = "index.html";
      } else {
        // Mostrar mensaje de error
        alert("Error de registro: " + data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  // Mostrar/Ocultar contraseña adicional
  document.getElementById("togglePassword").addEventListener("click", function() {
    var passwordField = document.getElementById("password");
    var confirmPasswordField = document.getElementById("confirm-password");
    var passwordFieldType = passwordField.getAttribute("type");
    if (passwordFieldType === "password") {
      passwordField.setAttribute("type", "text");
      confirmPasswordField.setAttribute("type", "text");
      this.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
      passwordField.setAttribute("type", "password");
      confirmPasswordField.setAttribute("type", "password");
      this.innerHTML = '<i class="fas fa-eye"></i>';
    }
  });
});


document.getElementById("toggleConfirmPassword").addEventListener("click", function() {
  var confirmPasswordField = document.getElementById("confirm-password");
  var confirmPasswordFieldType = confirmPasswordField.getAttribute("type");
  if (confirmPasswordFieldType === "password") {
    confirmPasswordField.setAttribute("type", "text");
    this.innerHTML = '<i class="fas fa-eye-slash"></i>';
  } else {
    confirmPasswordField.setAttribute("type", "password");
    this.innerHTML = '<i class="fas fa-eye"></i>';
  }
});
