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
  toastContainer.className = "fixed top-5 right-5 z-50 flex flex-col gap-3 pointer-events-none";
  document.body.appendChild(toastContainer);

  window.showToast = (message, type = "info") => {
    const colors = {
      success: "bg-green-500",
      error: "bg-red-500",
      warning: "bg-yellow-500",
      info: "bg-blue-500",
    };
    const toast = document.createElement("div");
    toast.className = `${colors[type] || colors.info} text-white px-4 py-2 rounded-lg shadow-md animate-fade-in`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("opacity-0", "translate-x-2", "transition-all", "duration-300");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  // =====================================================
  // 🔹 MOSTRAR / OCULTAR CONTRASEÑAS
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
        icon.style.transform = "scale(0.9)";
        setTimeout(() => (icon.style.transform = "scale(1)"), 150);
      });
    }
  });

  // =====================================================
  // 🔹 LOGIN
  // =====================================================
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email")?.value.trim();
      const password = document.getElementById("password")?.value.trim();
      const btn = loginForm.querySelector(".btn-primary");
      if (!email || !password) return showToast("Por favor, completa todos los campos.", "warning");

      btn.disabled = true;
      btn.style.opacity = "0.8";
      btn.textContent = "Iniciando...";

      const loader = document.createElement("span");
      loader.className = "ml-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin";
      btn.appendChild(loader);

      setTimeout(() => {
        loader.remove();
        btn.textContent = "✔ Sesión iniciada";
        btn.style.backgroundColor = "#4cae4f";
        showToast("Sesión iniciada correctamente ✅", "success");
        setTimeout(() => (window.location.href = "analizar.html"), 1000);
      }, 1500);
    });
  }

  // =====================================================
  // 🔹 REGISTRO
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

      if (!name || !email || !password || !confirm) return showToast("Por favor, completa los campos obligatorios.", "warning");
      if (password !== confirm) return showToast("Las contraseñas no coinciden.", "error");

      btn.disabled = true;
      btn.style.opacity = "0.8";
      btnText.textContent = "Registrando...";

      const loader = document.createElement("span");
      loader.className = "ml-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin";
      btn.appendChild(loader);

      setTimeout(() => {
        localStorage.setItem("noticiaUser", JSON.stringify({ name, email, phone: phone || "No especificado" }));
        loader.remove();
        btnText.textContent = "✔ Registro completado";
        btn.style.backgroundColor = "#4cae4f";
        showToast("Registro completado correctamente ✅", "success");
        setTimeout(() => (window.location.href = "login.html"), 1200);
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
      if (!email) return showToast("Por favor, introduce tu correo electrónico.", "warning");

      btn.textContent = "Enviando...";
      btn.disabled = true;

      setTimeout(() => {
        showToast("📧 Se ha enviado un enlace de recuperación a tu correo.", "info");
        window.location.href = "login.html";
      }, 1500);
    });
  }

  // =====================================================
  // 🔹 PERFIL: Redirección
  // =====================================================
  document.querySelectorAll(".profile-link").forEach((link) =>
    link.addEventListener("click", () => (window.location.href = "perfilUsuario.html"))
  );

  // =====================================================
  // 🔹 FORO: Publicar comentario
  // =====================================================
  const publicarBtn = document.querySelector(".foro-publicar-btn");
  if (publicarBtn) publicarBtn.addEventListener("click", () => showToast("Tu publicación se ha enviado correctamente ✅", "success"));

  // =====================================================
  // 🔹 PESTAÑAS DE ANALIZAR NOTICIA
  // =====================================================
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  const resultado = document.getElementById("resultado-analisis");

  if (tabButtons.length && tabContents.length) {
    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabButtons.forEach((b) => b.classList.remove("text-primary", "underline", "underline-offset-4"));
        tabContents.forEach((c) => c.classList.add("hidden"));
        btn.classList.add("text-primary", "underline", "underline-offset-4");
        const tabId = btn.getAttribute("data-tab");
        const content = document.getElementById(`contenido-${tabId}`);
        if (content) content.classList.remove("hidden");

        // Ocultar el resultado de análisis al cambiar de pestaña
        if (resultado) {
          resultado.classList.add("hidden");
          resultado.style.opacity = "0";
        }
      });
    });
  }

  // =====================================================
  // 🔹 DROPZONE
  // =====================================================
  const dropzone = document.getElementById("dropzone");
  const fileInput = document.getElementById("fileInput");
  const uploadedFiles = document.getElementById("uploaded-files");

  function handleFiles(files) {
    if (!uploadedFiles) return;
    for (const file of files) {
      const ext = file.name.split(".").pop().toLowerCase();
      let icon = "description", colorClass = "text-primary";
      if (ext === "pdf") [icon, colorClass] = ["picture_as_pdf", "text-red-500"];
      else if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) [icon, colorClass] = ["image", "text-blue-500"];
      else if (["doc", "docx"].includes(ext)) [icon, colorClass] = ["article", "text-indigo-500"];
      else if (["xls", "xlsx", "csv"].includes(ext)) [icon, colorClass] = ["table_chart", "text-green-500"];
      else if (["txt", "md", "json"].includes(ext)) [icon, colorClass] = ["notes", "text-gray-500"];

      const fileCard = document.createElement("div");
      fileCard.className = "flex items-center justify-between bg-background-light dark:bg-surface-dark border border-subtle-text-light/20 dark:border-subtle-text-dark/20 rounded-lg px-4 py-3 shadow-sm animate-fade-in";
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
      uploadedFiles.appendChild(fileCard);
      fileCard.querySelector(".remove-file").addEventListener("click", () => {
        fileCard.classList.add("opacity-0", "translate-x-2", "transition-all", "duration-300");
        setTimeout(() => fileCard.remove(), 300);
        showToast(`Archivo "${file.name}" eliminado.`, "info");
      });
      showToast(`📎 Archivo "${file.name}" cargado correctamente.`, "success");
    }
  }

  if (dropzone && fileInput) {
    dropzone.addEventListener("click", () => fileInput.click());
    dropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropzone.classList.add("border-primary", "bg-primary/5");
    });
    dropzone.addEventListener("dragleave", () => dropzone.classList.remove("border-primary", "bg-primary/5"));
    dropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropzone.classList.remove("border-primary", "bg-primary/5");
      handleFiles(e.dataTransfer.files);
    });
    fileInput.addEventListener("change", (e) => handleFiles(e.target.files));
  }

  // =====================================================
  // 💫 ANIMACIÓN GLOBAL FADE-IN
  // =====================================================
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
    .animate-fade-in { animation: fadeIn 0.3s ease-out; }
  `;
  document.head.appendChild(style);
});


// =====================================================
// 🔹 ANÁLISIS DE NOTICIA — Versión expresiva y natural
// =====================================================
document.addEventListener("DOMContentLoaded", () => {
  const analizarBtn = document.querySelector("button.bg-primary");
  const resultado = document.getElementById("resultado-analisis");
  const barra = document.getElementById("barra-confianza");
  const porcentaje = document.getElementById("porcentaje-confianza");
  const textoAnalisis = document.getElementById("texto-analisis");
  const titulo = document.getElementById("titulo-analisis");
  const porcentajeGrande = document.getElementById("porcentaje-grande");

  if (!analizarBtn || !resultado) return;

  analizarBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Mostrar resultado con animación suave
    resultado.classList.remove("hidden");
    resultado.style.opacity = "0";
    resultado.style.transform = "translateY(20px)";

    requestAnimationFrame(() => {
      resultado.scrollIntoView({ behavior: "smooth", block: "start" });
      resultado.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      resultado.style.opacity = "1";
      resultado.style.transform = "translateY(0)";
    });

    // Estado inicial
    barra.style.width = "0%";
    barra.style.backgroundColor = "#4cae4f";
    porcentaje.textContent = "Analizando...";
    porcentajeGrande.textContent = "0%";
    porcentajeGrande.style.color = "#131613";
    titulo.textContent = "Analizando noticia...";
    textoAnalisis.textContent = "Procesando la información...";

    // Generar un resultado aleatorio
    const resultadoAleatorio = Math.floor(Math.random() * 100) + 1;
    let progreso = 0;

    const intervalo = setInterval(() => {
      progreso += 3;
      if (progreso > resultadoAleatorio) progreso = resultadoAleatorio;

      barra.style.width = `${progreso}%`;
      porcentajeGrande.textContent = `${progreso}%`;

      // Cambiar color según rango
      if (progreso < 30) barra.style.backgroundColor = "#ef4444";
      else if (progreso < 70) barra.style.backgroundColor = "#facc15";
      else barra.style.backgroundColor = "#4cae4f";

      porcentaje.textContent = `Analizando... (${progreso}%)`;

      // Cuando termina
      if (progreso === resultadoAleatorio) {
        clearInterval(intervalo);

        setTimeout(() => {
          let mensaje = "";
          let subtitulo = "";
          let color = "";
          let emoji = "";

          if (resultadoAleatorio < 30) {
            color = "text-red-500";
            emoji = "❌";
            subtitulo = `Tiene un <span class="${color} font-bold">${resultadoAleatorio}%</span> de veracidad.`;
            titulo.innerHTML = `La noticia es <span class="${color} font-bold">POCO CONFIABLE</span>`;
            mensaje =
              "El sistema detecta múltiples señales de manipulación y falta de coherencia. El contenido muestra indicios de desinformación o sesgo evidente. Se recomienda no compartir esta noticia.";
          } else if (resultadoAleatorio < 70) {
            color = "text-yellow-500";
            emoji = "⚠️";
            subtitulo = `Muestra un <span class="${color} font-bold">${resultadoAleatorio}%</span> de veracidad.`;
            titulo.innerHTML = `La noticia es <span class="${color} font-bold">DUDOSA</span>`;
            mensaje =
              "El análisis revela cierta ambigüedad o carencia de fuentes verificadas. Aunque parte del contenido podría ser real, conviene contrastarlo antes de asumirlo como cierto.";
          } else {
            color = "text-green-600";
            emoji = "✅";
            subtitulo = `Alcanza un <span class="${color} font-bold">${resultadoAleatorio}%</span> de veracidad.`;
            titulo.innerHTML = `La noticia es <span class="${color} font-bold">CONFIABLE</span>`;
            mensaje =
              "El texto presenta alta coherencia, fuentes verificadas y un tono informativo equilibrado. Todo indica que la noticia es auténtica y confiable.";
          }

          // Mostrar resultado expresivo
          porcentaje.innerHTML = `${subtitulo} ${emoji}`;
          textoAnalisis.textContent = mensaje;
        }, 400);
      }
    }, 60);
  });
});
// =====================================================
// 🔹 SCROLL HACIA ABAJO PARA REPORTAR ERROR (con estado "Enviando...")
// =====================================================
const reportarBtn = document.getElementById("reportarErrorBtn");
const bloqueReporte = document.getElementById("bloque-reporte");
const formReporte = document.getElementById("formReporte");

if (reportarBtn && bloqueReporte) {
  reportarBtn.addEventListener("click", () => {
    // Mostrar bloque con animación
    bloqueReporte.classList.remove("hidden");
    bloqueReporte.style.opacity = "0";
    bloqueReporte.style.transform = "translateY(30px)";

    requestAnimationFrame(() => {
      bloqueReporte.scrollIntoView({ behavior: "smooth", block: "start" });
      bloqueReporte.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      bloqueReporte.style.opacity = "1";
      bloqueReporte.style.transform = "translateY(0)";
    });
  });

  // ✅ Enviar reporte con feedback visual
  formReporte.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("emailReporte").value.trim();
    const msg = document.getElementById("mensajeReporte").value.trim();
    const btn = formReporte.querySelector("button[type='submit']");

    if (!msg) {
      showToast("Por favor, escribe una breve descripción.", "warning");
      return;
    }

    // Estado "Enviando..."
    btn.disabled = true;
    const originalText = btn.textContent;
    btn.textContent = "Enviando...";
    btn.style.opacity = "0.8";

    // Loader pequeño animado
    const loader = document.createElement("span");
    loader.className =
      "ml-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin align-middle";
    btn.appendChild(loader);

    // Simulación de envío
    setTimeout(() => {
      loader.remove();
      btn.textContent = "✅ Enviado";
      btn.style.opacity = "1";
      btn.style.backgroundColor = "#4cae4f";
      showToast("✅ Gracias, tu reporte ha sido enviado correctamente.", "success");

      // Reiniciar formulario tras breve pausa
      setTimeout(() => {
        formReporte.reset();
        btn.disabled = false;
        btn.textContent = originalText;
        btn.style.backgroundColor = "var(--primary)";
      }, 1500);
    }, 1800);
  });
}
