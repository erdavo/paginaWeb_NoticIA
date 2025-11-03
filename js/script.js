// ================================
// 🎯 FUNCIONALIDADES GLOBALES DE NOTICIA
// ================================
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ NoticIA cargada correctamente");

  // =====================================================
  // 🔹 Mostrar / ocultar contraseñas (login + registro)
  // =====================================================
  const passwordTogglePairs = [
    ["password", "togglePassword"],
    ["confirmPassword", "toggleConfirmPassword"],
  ];

  passwordTogglePairs.forEach(([inputId, toggleId]) => {
    const input = document.getElementById(inputId);
    const toggle = document.getElementById(toggleId);

    if (input && toggle) {
      toggle.addEventListener("click", () => {
        const isHidden = input.type === "password";
        input.type = isHidden ? "text" : "password";

        const icon = toggle.querySelector("span");
        icon.textContent = isHidden ? "visibility_off" : "visibility";

        // Animación UX de rebote
        icon.style.transform = "scale(0.9)";
        setTimeout(() => (icon.style.transform = "scale(1)"), 150);
      });
    }
  });

  // =====================================================
  // 🔹 LOGIN: Simulación visual de inicio de sesión
  // =====================================================
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email")?.value.trim();
      const password = document.getElementById("password")?.value.trim();
      const btn = loginForm.querySelector(".btn-primary");

      if (!email || !password) {
        alert("⚠️ Por favor, completa todos los campos.");
        return;
      }

      // Animación del botón
      btn.disabled = true;
      btn.style.opacity = "0.8";
      btn.textContent = "Iniciando...";

      // Agregar loader minimalista
      const loader = document.createElement("span");
      loader.className =
        "ml-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin align-middle";
      btn.appendChild(loader);

      // Simular inicio de sesión
      setTimeout(() => {
        loader.remove();
        btn.textContent = "✔ Sesión iniciada";
        btn.style.backgroundColor = "#4cae4f";
        btn.style.opacity = "1";

        setTimeout(() => {
          window.location.href = "analizar.html";
        }, 1000);
      }, 1500);
    });
  }

  // =====================================================
  // 🔹 REGISTRO: Simulación de guardado + animación + redirección a LOGIN
  // =====================================================
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name")?.value.trim();
      const email = document.getElementById("email")?.value.trim();
      const phone = document.getElementById("phone")?.value.trim();
      const password = document.getElementById("password")?.value.trim();
      const confirm = document.getElementById("confirmPassword")?.value.trim();

      const btn = registerForm.querySelector(".btn-primary");
      const btnText = registerForm.querySelector(".btn-text");

      if (!name || !email || !password || !confirm) {
        alert("⚠️ Por favor, completa los campos obligatorios.");
        return;
      }

      if (password !== confirm) {
        alert("⚠️ Las contraseñas no coinciden.");
        return;
      }

      // Animación del botón de registro
      btn.disabled = true;
      btn.style.opacity = "0.8";
      btnText.textContent = "Registrando...";

      const loader = document.createElement("span");
      loader.className =
        "ml-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin align-middle";
      btn.appendChild(loader);

      // Simular guardado en localStorage (solo visual)
      setTimeout(() => {
        localStorage.setItem(
          "noticiaUser",
          JSON.stringify({ name, email, phone: phone || "No especificado" })
        );

        loader.remove();
        btnText.textContent = "✔ Registro completado";
        btn.style.backgroundColor = "#4cae4f";
        btn.style.opacity = "1";

        setTimeout(() => {
          window.location.href = "login.html";
        }, 1200);
      }, 1800);
    });
  }

  // =====================================================
  // 🔹 RECUPERAR CONTRASEÑA: Simular envío de correo
  // =====================================================
  const resetForm = document.getElementById("resetForm");
  if (resetForm) {
    resetForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email")?.value.trim();
      const btn = resetForm.querySelector(".btn-primary");

      if (!email) {
        alert("⚠️ Por favor, introduce tu correo electrónico.");
        return;
      }

      btn.textContent = "Enviando...";
      btn.disabled = true;

      setTimeout(() => {
        alert("📧 Se ha enviado un enlace de recuperación a tu correo electrónico.");
        window.location.href = "login.html";
      }, 1500);
    });
  }

  // =====================================================
  // 🔹 PERFIL: Redirección desde el icono
  // =====================================================
  const profileLinks = document.querySelectorAll(".profile-link");
  if (profileLinks.length > 0) {
    profileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        window.location.href = "perfilUsuario.html";
      });
    });
  }

  // =====================================================
  // 🔹 FORO: Publicar comentario
  // =====================================================
  const publicarBtn = document.querySelector(".foro-publicar-btn");
  if (publicarBtn) {
    publicarBtn.addEventListener("click", () => {
      alert("🗣️ Tu publicación se ha enviado correctamente ✅");
    });
  }
});
