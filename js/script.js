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
    toast.className = `${colors[type] || colors.info} text-white px-4 py-2 rounded-lg shadow-md`;
    toast.style.animation = "fadeIn 0.3s ease-out";
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = "all 0.3s";
      toast.style.opacity = "0";
      toast.style.transform = "translateX(10px)";
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

      if (!email || !password) {
        showToast("Por favor, completa todos los campos.", "warning");
        return;
      }

      btn.disabled = true;
      btn.style.opacity = "0.8";
      btn.textContent = "Iniciando...";

      setTimeout(() => {
        btn.textContent = "✓ Sesión iniciada";
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

      if (!name || !email || !password || !confirm) {
        showToast("Por favor, completa los campos obligatorios.", "warning");
        return;
      }

      if (password !== confirm) {
        showToast("Las contraseñas no coinciden.", "error");
        return;
      }

      btn.disabled = true;
      btn.style.opacity = "0.8";
      btnText.textContent = "Registrando...";

      setTimeout(() => {
        localStorage.setItem("noticiaUser", JSON.stringify({ name, email, phone: phone || "No especificado" }));
        btnText.textContent = "✓ Registro completado";
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
      const email = document.getElementById("resetEmail")?.value.trim();
      const btn = resetForm.querySelector(".btn-primary");

      if (!email) {
        showToast("Por favor, introduce tu correo electrónico.", "warning");
        return;
      }

      btn.textContent = "Enviando...";
      btn.disabled = true;

      setTimeout(() => {
        showToast("📧 Se ha enviado un enlace de recuperación a tu correo.", "info");
        setTimeout(() => window.location.href = "login.html", 1000);
      }, 1500);
    });
  }

  // =====================================================
  // 🔹 PERFIL: Redirección
  // =====================================================
  document.querySelectorAll(".profile-link, [class*='profile']").forEach((link) => {
    if (link.textContent.includes("perfil") || link.querySelector("span")?.textContent === "person") {
      link.addEventListener("click", () => (window.location.href = "perfilUsuario.html"));
    }
  });

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

    Array.from(files).forEach(file => {
      const ext = file.name.split(".").pop().toLowerCase();
      let icon = "description", colorClass = "text-primary";

      if (ext === "pdf") [icon, colorClass] = ["picture_as_pdf", "text-red-500"];
      else if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) [icon, colorClass] = ["image", "text-blue-500"];
      else if (["doc", "docx"].includes(ext)) [icon, colorClass] = ["article", "text-indigo-500"];
      else if (["xls", "xlsx", "csv"].includes(ext)) [icon, colorClass] = ["table_chart", "text-green-500"];

      const fileCard = document.createElement("div");
      fileCard.className = "flex items-center justify-between bg-background-light dark:bg-surface-dark border border-subtle-text-light/20 dark:border-subtle-text-dark/20 rounded-lg px-4 py-3 shadow-sm";
      fileCard.style.animation = "fadeIn 0.3s ease-out";

      fileCard.innerHTML = `
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined ${colorClass}">${icon}</span>
          <div>
            <p class="font-medium text-text-light dark:text-text-dark">${file.name}</p>
            <p class="text-sm text-subtle-text-light dark:text-subtle-text-dark">Archivo cargado correctamente ✅</p>
          </div>
        </div>
        <button class="remove-file text-subtle-text-light hover:text-red-500 transition">
          <span class="material-symbols-outlined">close</span>
        </button>
      `;

      uploadedFiles.appendChild(fileCard);

      fileCard.querySelector(".remove-file").addEventListener("click", () => {
        fileCard.style.transition = "all 0.3s";
        fileCard.style.opacity = "0";
        fileCard.style.transform = "translateX(20px)";
        setTimeout(() => fileCard.remove(), 300);
        showToast(`Archivo "${file.name}" eliminado.`, "info");
      });

      showToast(`📎 Archivo "${file.name}" cargado correctamente.`, "success");
    });
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

    fileInput.addEventListener("change", (e) => handleFiles(e.target.files));
  }

  // =====================================================
  // 🔹 ANÁLISIS DE NOTICIA
  // =====================================================
  const analizarBtn = document.querySelector("main button.bg-primary");
  const barra = document.getElementById("barra-confianza");
  const porcentaje = document.getElementById("porcentaje-confianza");
  const textoAnalisis = document.getElementById("texto-analisis");
  const titulo = document.getElementById("titulo-analisis");
  const porcentajeGrande = document.getElementById("porcentaje-grande");

  if (analizarBtn && resultado) {
    analizarBtn.addEventListener("click", (e) => {
      e.preventDefault();

      resultado.classList.remove("hidden");
      resultado.style.opacity = "0";
      setTimeout(() => {
        resultado.scrollIntoView({ behavior: "smooth", block: "start" });
        resultado.style.transition = "opacity 0.6s";
        resultado.style.opacity = "1";
      }, 100);

      barra.style.width = "0%";
      porcentaje.textContent = "Analizando...";
      porcentajeGrande.textContent = "0%";
      titulo.textContent = "Analizando noticia...";
      textoAnalisis.textContent = "Procesando la información...";

      const resultadoAleatorio = Math.floor(Math.random() * 100) + 1;
      let progreso = 0;

      const intervalo = setInterval(() => {
        progreso += 3;
        if (progreso > resultadoAleatorio) progreso = resultadoAleatorio;

        barra.style.width = `${progreso}%`;
        porcentajeGrande.textContent = `${progreso}%`;

        porcentaje.textContent = `Analizando... (${progreso}%)`;

        if (progreso === resultadoAleatorio) {
          clearInterval(intervalo);
          // Cambiar color final según resultado real
          // 🔵 Aplicar color final según el resultado
          if (resultadoAleatorio < 30) {
            barra.style.backgroundColor = "#ef4444"; // rojo
            porcentajeGrande.style.color = "#ef4444";
          } else if (resultadoAleatorio < 70) {
            barra.style.backgroundColor = "#facc15"; // amarillo
            porcentajeGrande.style.color = "#facc15";
          } else {
            barra.style.backgroundColor = "#4cae4f"; // verde
            porcentajeGrande.style.color = "#4cae4f";
          }


          setTimeout(() => {
            let mensaje, subtitulo, color, emoji;

            if (resultadoAleatorio < 30) {
              color = "text-red-500";
              emoji = "❌";
              subtitulo = `Tiene un <span class="${color} font-bold">${resultadoAleatorio}%</span> de veracidad.`;
              titulo.innerHTML = `La noticia es <span class="${color} font-bold">POCO CONFIABLE</span>`;
              mensaje = "El sistema detecta múltiples señales de manipulación y falta de coherencia.";
            } else if (resultadoAleatorio < 70) {
              color = "text-yellow-500";
              emoji = "⚠️";
              subtitulo = `Muestra un <span class="${color} font-bold">${resultadoAleatorio}%</span> de veracidad.`;
              titulo.innerHTML = `La noticia es <span class="${color} font-bold">DUDOSA</span>`;
              mensaje = "El análisis revela cierta ambigüedad o carencia de fuentes verificadas.";
            } else {
              color = "text-green-600";
              emoji = "✅";
              subtitulo = `Alcanza un <span class="${color} font-bold">${resultadoAleatorio}%</span> de veracidad.`;
              titulo.innerHTML = `La noticia es <span class="${color} font-bold">CONFIABLE</span>`;
              mensaje = "El texto presenta alta coherencia y fuentes verificadas.";
            }

            porcentaje.innerHTML = `${subtitulo} ${emoji}`;
            textoAnalisis.textContent = mensaje;
          }, 400);
        }
      }, 60);
    });
  }

  // =====================================================
  // 🔹 REPORTAR ERROR
  // =====================================================
  const reportarBtn = document.getElementById("reportarErrorBtn");
  const bloqueReporte = document.getElementById("bloque-reporte");
  const formReporte = document.getElementById("formReporte");

  if (reportarBtn && bloqueReporte) {
    reportarBtn.addEventListener("click", () => {
      bloqueReporte.classList.remove("hidden");
      bloqueReporte.style.opacity = "0";
      setTimeout(() => {
        bloqueReporte.scrollIntoView({ behavior: "smooth" });
        bloqueReporte.style.transition = "opacity 0.6s";
        bloqueReporte.style.opacity = "1";
      }, 100);
    });

    if (formReporte) {
      formReporte.addEventListener("submit", (e) => {
        e.preventDefault();
        const msg = document.getElementById("mensajeReporte").value.trim();
        const btn = formReporte.querySelector("button[type='submit']");

        if (!msg) {
          showToast("Por favor, escribe una descripción.", "warning");
          return;
        }

        btn.disabled = true;
        btn.textContent = "Enviando...";

        setTimeout(() => {
          btn.textContent = "✅ Enviado";
          btn.classList.add("bg-green-600");
          btn.classList.remove("bg-primary");
          showToast("✅ Gracias, tu reporte ha sido enviado.", "success");

          setTimeout(() => {
            formReporte.reset();
            btn.textContent = "Enviar reporte";
            btn.classList.remove("bg-green-600");
            btn.classList.add("bg-primary");
            btn.disabled = false;
          }, 3000);
        }, 1500);
      });
    }
  }

  // =====================================================
  // 🔹 FORO: Pestañas
  // =====================================================
  const foroTabs = document.querySelectorAll(".foro-tab");
  const foroSections = document.querySelectorAll(".foro-section");

  if (foroTabs.length > 0) {
    foroTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        foroTabs.forEach((t) => t.classList.remove("text-primary", "underline", "underline-offset-4"));
        foroSections.forEach((s) => s.classList.add("hidden"));
        tab.classList.add("text-primary", "underline", "underline-offset-4");
        const id = tab.getAttribute("data-tab");
        const section = document.getElementById(`contenido-${id}`);
        if (section) section.classList.remove("hidden");
      });
    });
  }

  // =====================================================
  // 💬 INTERACCIONES DEL FORO
  // =====================================================
  console.log("🚀 Iniciando script del foro...");

  setTimeout(() => {
    const todosLosPosts = document.querySelectorAll("article");
    console.log(`📝 Posts encontrados: ${todosLosPosts.length}`);

    todosLosPosts.forEach((post, index) => {
      console.log(`Configurando post #${index + 1}`);

      const iconos = post.querySelectorAll(".material-symbols-outlined");

      iconos.forEach((icono) => {
        const contenedor = icono.parentElement;

        if (contenedor.querySelector(".text-sm")) {
          console.log(`  → Configurando icono: ${icono.textContent.trim()}`);

          contenedor.style.cursor = "pointer";

          contenedor.addEventListener("click", function () {
            console.log(`🔔 Click en: ${icono.textContent.trim()}`);

            const contador = this.querySelector(".text-sm");
            const tipo = icono.textContent.trim();
            let numero = parseInt(contador.textContent) || 0;

            icono.style.transition = "transform 0.15s";
            icono.style.transform = "scale(0.8)";
            setTimeout(() => {
              icono.style.transform = "scale(1)";
            }, 150);

            if (tipo === "favorite") {
              if (this.classList.contains("text-red-500")) {
                this.classList.remove("text-red-500");
                numero = Math.max(0, numero - 1);
                showToast("💔 Ya no te gusta", "info");
              } else {
                this.classList.add("text-red-500");
                numero++;
                showToast("❤️ Te gusta este post", "success");
              }
              contador.textContent = numero;

            } else if (tipo === "bookmark") {
              if (this.classList.contains("text-yellow-500")) {
                this.classList.remove("text-yellow-500");
                showToast("🗑️ Eliminado de guardados", "warning");
              } else {
                this.classList.add("text-yellow-500");
                showToast("📖 Post guardado", "info");
              }

            } else if (tipo === "share") {
              numero++;
              contador.textContent = numero;
              showToast("🔗 Post compartido", "success");

            } else if (tipo === "chat_bubble") {
              showToast("💬 Comentarios próximamente", "info");
            }
          });
        }
      });
    });

    console.log("✅ Configuración completa");
  }, 500);

  // =====================================================
  // 📝 PUBLICAR NUEVO POST CON FUNCIONALIDADES EXTRA Y PREVIEW
  // =====================================================
  const btnPublicar = document.getElementById("publicarBtn");
  const textarea = document.getElementById("inputPost");
  const contenedorTendencias = document.getElementById("contenido-tendencias");
  const previewArea = document.getElementById("preview-area");

  // Elementos multimedia
  let archivoSeleccionado = null;
  let enlaceAgregado = null;

  // Función para actualizar la previsualización
  function actualizarPreview() {
    if (!previewArea) return;

    previewArea.innerHTML = "";

    const hayContenido = archivoSeleccionado || enlaceAgregado;

    if (hayContenido) {
      previewArea.classList.remove("hidden");

      // Previsualizar imagen
      if (archivoSeleccionado && archivoSeleccionado.tipo === "imagen") {
        const imgPreview = document.createElement("div");
        imgPreview.className = "relative mb-3";
        imgPreview.innerHTML = `
        <div class="flex items-center gap-3 p-3 bg-surface-light dark:bg-surface-dark rounded-lg border border-subtle-text-light/20">
          <img src="${archivoSeleccionado.url}" class="w-20 h-20 object-cover rounded-lg">
          <div class="flex-1">
            <p class="font-medium text-sm">📷 Imagen adjunta</p>
            <p class="text-xs text-subtle-text-light dark:text-subtle-text-dark">${archivoSeleccionado.file.name}</p>
          </div>
          <button class="remove-image text-red-500 hover:text-red-700 transition">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
      `;
        previewArea.appendChild(imgPreview);

        imgPreview.querySelector(".remove-image").addEventListener("click", () => {
          archivoSeleccionado = null;
          actualizarPreview();
          resetearColorBoton("image");
          showToast("🗑️ Imagen eliminada", "info");
        });
      }

      // Previsualizar GIF
      if (archivoSeleccionado && archivoSeleccionado.tipo === "gif") {
        const gifPreview = document.createElement("div");
        gifPreview.className = "relative mb-3";
        gifPreview.innerHTML = `
        <div class="flex items-center gap-3 p-3 bg-surface-light dark:bg-surface-dark rounded-lg border border-subtle-text-light/20">
          <img src="${archivoSeleccionado.url}" class="w-20 h-20 object-cover rounded-lg">
          <div class="flex-1">
            <p class="font-medium text-sm">🎬 GIF animado</p>
            <p class="text-xs text-subtle-text-light dark:text-subtle-text-dark">GIF seleccionado</p>
          </div>
          <button class="remove-gif text-red-500 hover:text-red-700 transition">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
      `;
        previewArea.appendChild(gifPreview);

        gifPreview.querySelector(".remove-gif").addEventListener("click", () => {
          archivoSeleccionado = null;
          actualizarPreview();
          resetearColorBoton("gif_box");
          showToast("🗑️ GIF eliminado", "info");
        });
      }

      // Previsualizar enlace
      if (enlaceAgregado) {
        const linkPreview = document.createElement("div");
        linkPreview.className = "relative mb-3";
        linkPreview.innerHTML = `
        <div class="flex items-center gap-3 p-3 bg-surface-light dark:bg-surface-dark rounded-lg border border-primary/30">
          <span class="material-symbols-outlined text-primary text-2xl">link</span>
          <div class="flex-1">
            <p class="font-medium text-sm">🔗 Enlace adjunto</p>
            <p class="text-xs text-primary break-all">${enlaceAgregado}</p>
          </div>
          <button class="remove-link text-red-500 hover:text-red-700 transition">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
      `;
        previewArea.appendChild(linkPreview);

        linkPreview.querySelector(".remove-link").addEventListener("click", () => {
          enlaceAgregado = null;
          actualizarPreview();
          resetearColorBoton("link");
          showToast("🗑️ Enlace eliminado", "info");
        });
      }
    } else {
      previewArea.classList.add("hidden");
    }
  }

  // Función para resetear color de botón
  function resetearColorBoton(iconName) {
    const botones = document.querySelectorAll('.material-symbols-outlined[class*="cursor-pointer"]');
    botones.forEach(btn => {
      if (btn.textContent.trim() === iconName) {
        btn.style.color = "";
      }
    });
  }

  if (btnPublicar && textarea && contenedorTendencias) {
    console.log("✅ Botón de publicar encontrado");

    // =====================================================
    // 🖼️ SUBIR IMAGEN
    // =====================================================
    const iconos = document.querySelectorAll('.material-symbols-outlined[class*="cursor-pointer"]');
    let btnImagen, btnGif, btnEmoji, btnEnlace, btnEncuesta;

    iconos.forEach(icono => {
      const text = icono.textContent.trim();
      if (text === "image") btnImagen = icono;
      else if (text === "gif_box") btnGif = icono;
      else if (text === "mood") btnEmoji = icono;
      else if (text === "link") btnEnlace = icono;
      else if (text === "format_list_bulleted") btnEncuesta = icono;
    });

    if (btnImagen) {
      const inputImagen = document.createElement("input");
      inputImagen.type = "file";
      inputImagen.accept = "image/*";
      inputImagen.style.display = "none";
      document.body.appendChild(inputImagen);

      btnImagen.addEventListener("click", () => {
        inputImagen.click();
      });

      inputImagen.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
          archivoSeleccionado = {
            tipo: "imagen",
            file: file,
            url: URL.createObjectURL(file)
          };
          showToast(`📷 Imagen "${file.name}" seleccionada`, "success");
          btnImagen.style.color = "#4cae4f";
          actualizarPreview();
        } else {
          showToast("⚠️ Por favor selecciona una imagen válida", "warning");
        }
      });
    }

    // =====================================================
    // 🎬 GIF
    // =====================================================
    if (btnGif) {
      btnGif.addEventListener("click", () => {
        const gifs = [
          "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif",
          "https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif",
          "https://media.giphy.com/media/l0HlRnAWXxn0MhKLK/giphy.gif",
          "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif",
          "https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif"
        ];

        const gifAleatorio = gifs[Math.floor(Math.random() * gifs.length)];

        archivoSeleccionado = {
          tipo: "gif",
          url: gifAleatorio
        };

        showToast("🎬 GIF seleccionado", "success");
        btnGif.style.color = "#4cae4f";
        actualizarPreview();
      });
    }

    // =====================================================
    // 😊 EMOJI PICKER
    // =====================================================
    if (btnEmoji) {
      btnEmoji.addEventListener("click", () => {
        const emojis = ["😀", "😂", "❤️", "👍", "🔥", "✨", "🎉", "💯", "🚀", "⚡", "💪", "🙌", "👏", "🤔", "😍", "🥳", "😎", "🤩", "😱", "🤯"];

        const existingModal = document.getElementById("emoji-modal");
        if (existingModal) existingModal.remove();

        const modal = document.createElement("div");
        modal.id = "emoji-modal";
        modal.className = "fixed inset-0 bg-black/50 flex items-center justify-center z-50";
        modal.innerHTML = `
        <div class="bg-surface-light dark:bg-surface-dark rounded-xl p-6 max-w-md shadow-2xl animate-fade-in">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold">Selecciona un emoji</h3>
            <button class="close-emoji text-subtle-text-light hover:text-red-500 transition">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="grid grid-cols-5 gap-3">
            ${emojis.map(emoji => `
              <button class="emoji-btn text-4xl hover:scale-125 transition-transform cursor-pointer">${emoji}</button>
            `).join("")}
          </div>
        </div>
      `;

        document.body.appendChild(modal);

        modal.querySelector(".close-emoji").addEventListener("click", () => modal.remove());
        modal.addEventListener("click", (e) => {
          if (e.target === modal) modal.remove();
        });

        modal.querySelectorAll(".emoji-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            const emoji = btn.textContent;
            textarea.value += emoji + " ";
            textarea.focus();
            showToast(`${emoji} Emoji añadido`, "success");
            modal.remove();
          });
        });
      });
    }

    // =====================================================
    // 🔗 ENLACE
    // =====================================================
    if (btnEnlace) {
      btnEnlace.addEventListener("click", () => {
        const existingModal = document.getElementById("link-modal");
        if (existingModal) existingModal.remove();

        const modal = document.createElement("div");
        modal.id = "link-modal";
        modal.className = "fixed inset-0 bg-black/50 flex items-center justify-center z-50";
        modal.innerHTML = `
        <div class="bg-surface-light dark:bg-surface-dark rounded-xl p-6 max-w-md w-full shadow-2xl animate-fade-in">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold">Añadir enlace</h3>
            <button class="close-link text-subtle-text-light hover:text-red-500 transition">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <input type="url" id="input-enlace" placeholder="https://ejemplo.com" 
            class="w-full rounded-lg border border-subtle-text-light/40 dark:border-subtle-text-dark/40 bg-background-light dark:bg-background-dark p-3 text-base mb-4 focus:ring-2 focus:ring-primary outline-none">
          <button id="btn-agregar-enlace" class="w-full py-3 bg-primary text-white font-bold rounded-full hover:opacity-90">
            Agregar enlace
          </button>
        </div>
      `;

        document.body.appendChild(modal);

        modal.querySelector(".close-link").addEventListener("click", () => modal.remove());
        modal.addEventListener("click", (e) => {
          if (e.target === modal) modal.remove();
        });

        modal.querySelector("#btn-agregar-enlace").addEventListener("click", () => {
          const url = modal.querySelector("#input-enlace").value.trim();
          if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
            enlaceAgregado = url;
            showToast("🔗 Enlace añadido al post", "success");
            btnEnlace.style.color = "#4cae4f";
            actualizarPreview();
            modal.remove();
          } else {
            showToast("⚠️ Por favor introduce una URL válida", "warning");
          }
        });
      });
    }

    // =====================================================
    // 📊 ENCUESTA/LISTA
    // =====================================================
    if (btnEncuesta) {
      btnEncuesta.addEventListener("click", () => {
        const existingModal = document.getElementById("poll-modal");
        if (existingModal) existingModal.remove();

        const modal = document.createElement("div");
        modal.id = "poll-modal";
        modal.className = "fixed inset-0 bg-black/50 flex items-center justify-center z-50";
        modal.innerHTML = `
        <div class="bg-surface-light dark:bg-surface-dark rounded-xl p-6 max-w-md w-full shadow-2xl animate-fade-in">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold">Crear encuesta</h3>
            <button class="close-poll text-subtle-text-light hover:text-red-500 transition">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <input type="text" id="poll-question" placeholder="¿Cuál es tu pregunta?" 
            class="w-full rounded-lg border border-subtle-text-light/40 dark:border-subtle-text-dark/40 bg-background-light dark:bg-background-dark p-3 text-base mb-3 focus:ring-2 focus:ring-primary outline-none">
          <input type="text" id="poll-option1" placeholder="Opción 1" 
            class="w-full rounded-lg border border-subtle-text-light/40 dark:border-subtle-text-dark/40 bg-background-light dark:bg-background-dark p-3 text-base mb-2 focus:ring-2 focus:ring-primary outline-none">
          <input type="text" id="poll-option2" placeholder="Opción 2" 
            class="w-full rounded-lg border border-subtle-text-light/40 dark:border-subtle-text-dark/40 bg-background-light dark:bg-background-dark p-3 text-base mb-4 focus:ring-2 focus:ring-primary outline-none">
          <button id="btn-crear-encuesta" class="w-full py-3 bg-primary text-white font-bold rounded-full hover:opacity-90">
            Crear encuesta
          </button>
        </div>
      `;

        document.body.appendChild(modal);

        modal.querySelector(".close-poll").addEventListener("click", () => modal.remove());
        modal.addEventListener("click", (e) => {
          if (e.target === modal) modal.remove();
        });

        modal.querySelector("#btn-crear-encuesta").addEventListener("click", () => {
          const pregunta = modal.querySelector("#poll-question").value.trim();
          const opcion1 = modal.querySelector("#poll-option1").value.trim();
          const opcion2 = modal.querySelector("#poll-option2").value.trim();

          if (pregunta && opcion1 && opcion2) {
            textarea.value += `\n\n📊 Encuesta: ${pregunta}\n• ${opcion1}\n• ${opcion2}`;
            showToast("📊 Encuesta añadida al post", "success");
            btnEncuesta.style.color = "#4cae4f";
            modal.remove();
          } else {
            showToast("⚠️ Completa todos los campos de la encuesta", "warning");
          }
        });
      });
    }

    // =====================================================
    // 📤 PUBLICAR POST CON CONTENIDO MULTIMEDIA
    // =====================================================
    btnPublicar.addEventListener("click", () => {
      const texto = textarea.value.trim();

      if (!texto && !archivoSeleccionado && !enlaceAgregado) {
        showToast("⚠️ Escribe algo o añade contenido multimedia", "warning");
        return;
      }

      console.log("📤 Publicando post...");

      btnPublicar.disabled = true;
      btnPublicar.textContent = "Publicando...";

      setTimeout(() => {
        const nuevoPost = document.createElement("article");
        nuevoPost.className = "bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-text-light/50 dark:border-text-dark/50 shadow-md";

        let contenidoMultimedia = "";

        if (archivoSeleccionado) {
          if (archivoSeleccionado.tipo === "imagen") {
            contenidoMultimedia = `<img src="${archivoSeleccionado.url}" alt="Imagen del post" class="w-full rounded-lg mt-3 mb-2 max-h-96 object-cover">`;
          } else if (archivoSeleccionado.tipo === "gif") {
            contenidoMultimedia = `<img src="${archivoSeleccionado.url}" alt="GIF" class="w-full rounded-lg mt-3 mb-2 max-h-80 object-cover">`;
          }
        }

        if (enlaceAgregado) {
          contenidoMultimedia += `
          <a href="${enlaceAgregado}" target="_blank" class="block mt-3 p-4 border border-primary/30 rounded-lg hover:bg-primary/5 transition">
            <div class="flex items-center gap-2 text-primary">
              <span class="material-symbols-outlined">link</span>
              <span class="font-medium break-all text-sm">${enlaceAgregado}</span>
            </div>
          </a>
        `;
        }

        nuevoPost.innerHTML = `
        <div class="flex items-center gap-3 mb-2">
          <span class="material-symbols-outlined text-4xl text-primary">account_circle</span>
          <div>
            <p class="font-semibold">Tú <span class="text-subtle-text-light dark:text-subtle-text-dark">@usuario</span></p>
            <p class="text-sm text-subtle-text-light dark:text-subtle-text-dark">ahora mismo</p>
          </div>
        </div>
        <p class="text-base text-text-light dark:text-text-dark mb-2 whitespace-pre-wrap">${texto}</p>
        ${contenidoMultimedia}
        <div class="flex gap-8 mt-4 text-subtle-text-light dark:text-subtle-text-dark">
          <div class="flex items-center gap-1 hover:text-primary cursor-pointer transition">
            <span class="material-symbols-outlined">chat_bubble</span><span class="text-sm">0</span>
          </div>
          <div class="flex items-center gap-1 hover:text-primary cursor-pointer transition">
            <span class="material-symbols-outlined">favorite</span><span class="text-sm">0</span>
          </div>
          <div class="flex items-center gap-1 hover:text-primary cursor-pointer transition">
            <span class="material-symbols-outlined">bookmark</span><span class="text-sm">0</span>
          </div>
          <div class="flex items-center gap-1 hover:text-primary cursor-pointer transition">
            <span class="material-symbols-outlined">share</span><span class="text-sm">0</span>
          </div>
        </div>
      `;

        contenedorTendencias.prepend(nuevoPost);

        // Configurar interacciones
        const iconos = nuevoPost.querySelectorAll(".material-symbols-outlined");
        iconos.forEach((icono) => {
          const contenedor = icono.parentElement;
          if (contenedor.querySelector(".text-sm")) {
            contenedor.style.cursor = "pointer";
            contenedor.addEventListener("click", function () {
              const tipo = icono.textContent.trim();
              const contador = this.querySelector(".text-sm");
              let numero = parseInt(contador.textContent) || 0;

              if (tipo === "favorite") {
                // Si ya tiene el color de "like" (rojo), quitarlo y decrementar el contador
                if (this.classList.contains("text-red-500")) {
                  this.classList.remove("text-red-500");
                  numero = Math.max(0, numero - 1); // Evitar números negativos
                  showToast("💔 Ya no te gusta", "info");
                } else {
                  // Si no tiene el color de "like", añadirlo y aumentar el contador
                  this.classList.add("text-red-500");
                  numero++;
                  showToast("❤️ Te gusta este post", "success");
                }
                contador.textContent = numero; // Actualizar el contador visual
              } else if (tipo === "bookmark") {
                // Función de "guardar" (bookmark)
                const saved = this.classList.toggle("text-yellow-500"); // Cambiar el color de guardado (amarillo)
                numero = saved ? numero + 1 : Math.max(0, numero - 1); // Aumentar o disminuir el contador de guardados
                contador.textContent = numero; // Actualizar el contador visual
                showToast(saved ? "📖 Post guardado" : "🗑️ Eliminado de favoritos", "info");
              } else if (tipo === "share") {
                // Función de "compartir"
                numero++; // Aumentar el contador de compartidos
                contador.textContent = numero; // Actualizar el contador visual
                showToast("🔗 Post compartido", "success");
              } else if (tipo === "chat_bubble") {
                // Función de "comentarios" (en desarrollo)
                showToast("💬 Comentarios próximamente", "info");
              }

            });
          }
        });

        // Limpiar todo
        textarea.value = "";
        archivoSeleccionado = null;
        enlaceAgregado = null;
        actualizarPreview();

        // Resetear colores
        document.querySelectorAll('.material-symbols-outlined[class*="cursor-pointer"]').forEach(btn => {
          btn.style.color = "";
        });

        btnPublicar.textContent = "Publicar";
        btnPublicar.disabled = false;

        showToast("✅ Post publicado correctamente", "success");
        console.log("✅ Post publicado correctamente");
      }, 1000);
      // =====================================================
      // 💾 GUARDAR TAMBIÉN EN "Mis publicaciones" (perfil)
      // =====================================================
      try {
        const postParaPerfil = {
          id: "post_" + Date.now(),
          author: "Tú",
          time: "ahora",
          text: texto,
          url: enlaceAgregado || "",
          comments: 0,
          likes: 0,
          saves: 0,
          shares: 0,
        };

        // Leer publicaciones previas
        let misPublicaciones = JSON.parse(localStorage.getItem("misPublicaciones") || "[]");

        // Insertar al principio
        misPublicaciones.unshift(postParaPerfil);

        // Guardar
        localStorage.setItem("misPublicaciones", JSON.stringify(misPublicaciones));

        console.log("🗂️ Publicación añadida a 'Mis publicaciones'");
      } catch (e) {
        console.error("❌ Error guardando en mis publicaciones:", e);
      }


    });
  }

}
);