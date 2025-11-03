// ================================
// 🎯 FUNCIONALIDADES GLOBALES DE NOTICIA
// ================================
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ NoticIA cargada correctamente");

  // =====================================================
  // 🔔 SISTEMA DE NOTIFICACIONES TOAST
  // =====================================================
  const toastContainer = document.createElement("div");
  toastContainer.id = "toast-container";
  toastContainer.className =
    "fixed top-5 right-5 z-50 flex flex-col gap-3 pointer-events-none";
  document.body.appendChild(toastContainer);

  window.showToast = (message, type = "info") => {
    const colors = {
      success: "bg-green-500",
      error: "bg-red-500",
      warning: "bg-yellow-500",
      info: "bg-blue-500",
    };

    const toast = document.createElement("div");
    toast.className = `${colors[type] || colors.info
      } text-white px-4 py-2 rounded-lg shadow-md animate-fade-in`;
    toast.textContent = message;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add(
        "opacity-0",
        "translate-x-2",
        "transition-all",
        "duration-300"
      );
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

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
        showToast("Por favor, completa todos los campos.", "warning");
        return;
      }

      // Animación del botón
      btn.disabled = true;
      btn.style.opacity = "0.8";
      btn.textContent = "Iniciando...";

      // Loader animado
      const loader = document.createElement("span");
      loader.className =
        "ml-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin align-middle";
      btn.appendChild(loader);

      // Simular login
      setTimeout(() => {
        loader.remove();
        btn.textContent = "✔ Sesión iniciada";
        btn.style.backgroundColor = "#4cae4f";
        btn.style.opacity = "1";

        showToast("Sesión iniciada correctamente ✅", "success");

        setTimeout(() => {
          window.location.href = "analizar.html";
        }, 1000);
      }, 1500);
    });
  }

  // =====================================================
  // 🔹 REGISTRO: Simulación de guardado + redirección a LOGIN
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
        showToast("Por favor, completa los campos obligatorios.", "warning");
        return;
      }

      if (password !== confirm) {
        showToast("Las contraseñas no coinciden.", "error");
        return;
      }

      // Animación del botón
      btn.disabled = true;
      btn.style.opacity = "0.8";
      btnText.textContent = "Registrando...";

      const loader = document.createElement("span");
      loader.className =
        "ml-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin align-middle";
      btn.appendChild(loader);

      // Simular proceso
      setTimeout(() => {
        localStorage.setItem(
          "noticiaUser",
          JSON.stringify({ name, email, phone: phone || "No especificado" })
        );

        loader.remove();
        btnText.textContent = "✔ Registro completado";
        btn.style.backgroundColor = "#4cae4f";
        btn.style.opacity = "1";

        showToast("Registro completado correctamente ✅", "success");

        setTimeout(() => {
          window.location.href = "login.html";
        }, 1200);
      }, 1800);
    });
  }

  // =====================================================
  // 🔹 RECUPERAR CONTRASEÑA
  // =====================================================
  const resetForm = document.getElementById("resetForm");
  if (resetForm) {
    resetForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email")?.value.trim();
      const btn = resetForm.querySelector(".btn-primary");

      if (!email) {
        showToast("Por favor, introduce tu correo electrónico.", "warning");
        return;
      }

      btn.textContent = "Enviando...";
      btn.disabled = true;

      setTimeout(() => {
        showToast(
          "📧 Se ha enviado un enlace de recuperación a tu correo.",
          "info"
        );
        window.location.href = "login.html";
      }, 1500);
    });
  }

  // =====================================================
  // 🔹 PERFIL: Redirección
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
      showToast("Tu publicación se ha enviado correctamente ✅", "success");
    });
  }

  // =====================================================
  // 🔹 PESTAÑAS DINÁMICAS DE ANALIZAR NOTICIA
  // =====================================================
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  if (tabButtons.length && tabContents.length) {
    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabButtons.forEach((b) =>
          b.classList.remove("text-primary", "underline", "underline-offset-4")
        );
        tabContents.forEach((c) => c.classList.add("hidden"));

        btn.classList.add("text-primary", "underline", "underline-offset-4");
        const tabId = btn.getAttribute("data-tab");
        const content = document.getElementById(`contenido-${tabId}`);
        if (content) {
          content.classList.remove("hidden");
          content.classList.add("fade-in");
        }
      });
    });
  }

  // =====================================================
  // 🔹 DROPZONE (documento): clic, arrastrar y mostrar archivos
  // =====================================================
  const dropzone = document.getElementById("dropzone");
  const fileInput = document.getElementById("fileInput");
  const uploadedFiles = document.getElementById("uploaded-files");

  function handleFiles(files) {
    if (!uploadedFiles) return;

    for (const file of files) {
      // Detectar tipo de archivo
      const ext = file.name.split(".").pop().toLowerCase();
      let icon = "description";
      let colorClass = "text-primary";

      if (ext === "pdf") {
        icon = "picture_as_pdf";
        colorClass = "text-red-500";
      } else if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
        icon = "image";
        colorClass = "text-blue-500";
      } else if (["doc", "docx"].includes(ext)) {
        icon = "article";
        colorClass = "text-indigo-500";
      } else if (["xls", "xlsx", "csv"].includes(ext)) {
        icon = "table_chart";
        colorClass = "text-green-500";
      } else if (["txt", "md", "json"].includes(ext)) {
        icon = "notes";
        colorClass = "text-gray-500";
      }

      // Crear tarjeta visual
      const fileCard = document.createElement("div");
      fileCard.className =
        "flex items-center justify-between bg-background-light dark:bg-surface-dark border border-subtle-text-light/20 dark:border-subtle-text-dark/20 rounded-lg px-4 py-3 shadow-sm animate-fade-in";

      fileCard.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="material-symbols-outlined ${colorClass}">${icon}</span>
        <div>
          <p class="font-medium text-text-light dark:text-text-dark">${file.name}</p>
          <p class="text-sm text-subtle-text-light dark:text-subtle-text-dark">Archivo cargado correctamente ✅</p>
        </div>
      </div>
      <button class="remove-file text-subtle-text-light hover:text-red-500 transition" aria-label="Eliminar archivo">
        <span class="material-symbols-outlined">close</span>
      </button>
    `;

      // Añadir tarjeta a la lista
      uploadedFiles.appendChild(fileCard);

      // Evento de eliminar archivo
      fileCard
        .querySelector(".remove-file")
        .addEventListener("click", () => {
          fileCard.classList.add(
            "opacity-0",
            "translate-x-2",
            "transition-all",
            "duration-300"
          );
          setTimeout(() => fileCard.remove(), 300);
          showToast(`Archivo "${file.name}" eliminado.`, "info");
        });

      // Notificación visual
      showToast(`📎 Archivo "${file.name}" cargado correctamente.`, "success");
    }
  }

  if (dropzone && fileInput) {
    dropzone.addEventListener("click", () => fileInput.click());
    dropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropzone.classList.add("border-primary", "bg-primary/5");
    });
    dropzone.addEventListener("dragleave", () => {
      dropzone.classList.remove("border-primary", "bg-primary/5");
    });
    dropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropzone.classList.remove("border-primary", "bg-primary/5");
      handleFiles(e.dataTransfer.files);
    });
    fileInput.addEventListener("change", (e) => {
      handleFiles(e.target.files);
    });
  }

  // =====================================================
  // 💫 ANIMACIONES GLOBALS (fade-in)
  // =====================================================
  const style = document.createElement("style");
  style.innerHTML = `
  @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
  .animate-fade-in { animation: fadeIn 0.3s ease-out; }
  `;
  document.head.appendChild(style);
});
