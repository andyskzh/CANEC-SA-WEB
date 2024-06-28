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

$(document).ready(function () {
  // Cargar credenciales guardadas si existen
  if (localStorage.getItem("rememberMe") === "true") {
    $("#email").val(localStorage.getItem("rememberedEmail"));
    $("#password").val(localStorage.getItem("rememberedPassword"));
    $("#rememberMe").prop("checked", true);
  }
});

  $(document).ready(function () {
    // Toggle Password Visibility
    $("#togglePassword").click(function () {
      var passwordField = $("#password");
      var passwordFieldType = passwordField.attr("type");
      if (passwordFieldType == "password") {
        passwordField.attr("type", "text");
        $(this).html('<i class="fas fa-eye-slash"></i>');
      } else {
        passwordField.attr("type", "password");
        $(this).html('<i class="fas fa-eye"></i>');
      }
    });
  
    // Real-time Validation
    $("#nombre").on("input", function () {
      var nameRegex = /^[a-zA-Z\s]+$/;
      if (!nameRegex.test($(this).val().trim())) {
        $("#error-nombre").show().text("El nombre solo debe contener letras y espacios.");
      } else {
        $("#error-nombre").hide();
      }
    });
  
    $("#email").on("input", function () {
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test($(this).val().trim())) {
        $("#error-email").show().text("Por favor, ingrese un correo válido.");
      } else {
        $("#error-email").hide();
      }
    });
  
    $("#password").on("input", function () {
      var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&_-]{8,}$/;
      if (!passwordRegex.test($(this).val().trim())) {
        $("#error-password").show().text("La contraseña debe tener al menos 8 caracteres, incluyendo letras, números y caracteres especiales.");
      } else {
        $("#error-password").hide();
      }
    });
  
    // Form Submission
    $("#register-form").submit(function (event) {
      event.preventDefault();
      var nombre = $("#nombre").val().trim();
      var email = $("#email").val().trim();
      var password = $("#password").val().trim();
      var isValid = true;
  
      var nameRegex = /^[a-zA-Z\s]+$/;
      if (!nameRegex.test(nombre)) {
        $("#error-nombre").show().text("El nombre solo debe contener letras y espacios.");
        isValid = false;
      } else {
        $("#error-nombre").hide();
      }
  
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        $("#error-email").show().text("Por favor, ingrese un correo válido.");
        isValid = false;
      } else {
        $("#error-email").hide();
      }
  
      var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&_-]{8,}$/;
      if (!passwordRegex.test(password)) {
        $("#error-password").show().text("La contraseña debe tener al menos 8 caracteres, incluyendo letras, números y caracteres especiales.");
        isValid = false;
      } else {
        $("#error-password").hide();
      }
  
      if (isValid) {
        var avatarUrl = "img/messi.jpg";
        localStorage.setItem(email, JSON.stringify({
          name: nombre,
          email: email,
          password: password,
          avatar: avatarUrl,
        }));
  
        sessionStorage.setItem("isAuthenticated", "true");
        sessionStorage.setItem("userName", nombre);
        sessionStorage.setItem("userEmail", email);
        sessionStorage.setItem("userAvatar", avatarUrl);
  
        alert("Registro exitoso.");
        window.location.href = "index.html";
      }
    });

  // Simulando la autenticación y validando la información del usuario
  $("#login-form").submit(function (event) {
    event.preventDefault();
    var email = $("#email").val().trim();
    var password = $("#password").val().trim();
    var rememberMe = $("#rememberMe").prop("checked");
    var userData = JSON.parse(localStorage.getItem(email));

    if (userData) {
      if (userData.password === password) {
        var name = userData.name;
        var avatarUrl = userData.avatar;

        // Guardar en sessionStorage
        sessionStorage.setItem("isAuthenticated", "true");
        sessionStorage.setItem("userName", name);
        sessionStorage.setItem("userEmail", email);
        sessionStorage.setItem("userAvatar", avatarUrl);

        // Guardar credenciales si se selecciona "Recordar Contraseña"
        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
          localStorage.setItem("rememberedEmail", email);
          localStorage.setItem("rememberedPassword", password);
        } else {
          localStorage.removeItem("rememberMe");
          localStorage.removeItem("rememberedEmail");
          localStorage.removeItem("rememberedPassword");
        }

        // Redirigir a la página de inicio
        window.location.href = "index.html";
      } else {
        alert("Contraseña incorrecta. Inténtalo de nuevo.");
      }
    } else {
      alert("Correo electrónico no registrado.");
    }
  });

  // Manejar el restablecimiento de contraseña
  $("#reset-password-form").submit(function (event) {
    event.preventDefault();
    var email = $("#reset-email").val().trim();
    var newPassword = $("#new-password").val().trim();
    var confirmNewPassword = $("#confirm-new-password").val().trim();
    var userData = JSON.parse(localStorage.getItem(email));

    if (!userData) {
      alert("Correo electrónico no registrado.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    userData.password = newPassword;
    localStorage.setItem(email, JSON.stringify(userData));
    alert("Contraseña restablecida exitosamente.");
    $("#resetPasswordModal").modal("hide");
  });
});
