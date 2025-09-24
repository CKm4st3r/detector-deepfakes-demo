// app.js - versión con selección real de archivo + carga simulada + auto-análisis

// Elementos
const fakeInput = document.getElementById('fakeInput');
const fileInput = document.getElementById('fileInput');
const verifyBtn = document.getElementById('verifyBtn');
const previewBox = document.getElementById('previewBox');
const progressArea = document.getElementById('progressArea');
const progressBar = document.getElementById('progressBar');
const resultArea = document.getElementById('resultArea');
const resultBadge = document.getElementById('resultBadge');
const resultConf = document.getElementById('resultConf');
const resultMsg = document.getElementById('resultMsg');

// Inicial: colocar imágenes de hero y tarjetas (si existen)
if (document.getElementById('heroBg')) {
  document.getElementById('heroBg').style.backgroundImage = "url('assets/hero.jpg')";
}
document.querySelectorAll('.card-hero').forEach(c=>{
  const img = c.dataset.img || 'assets/img-placeholder.jpg';
  c.style.backgroundImage = `url('${img}')`;
});

// --- Comportamiento: abrir selector de archivos al clickear la caja ---
fakeInput.addEventListener('click', () => {
  fileInput.click();
});

// --- Cuando el usuario selecciona un archivo desde el explorador ---
fileInput.addEventListener('change', (e) => {
  const f = e.target.files[0];
  if (!f) return;

  // Mostrar nombre en la caja (feedback)
  fakeInput.textContent = `Archivo seleccionado: ${f.name}`;

  // Mostrar mensaje de "cargando" y spinner simulado
  previewBox.innerHTML = `<div class="text-sm text-gray-600">Cargando archivo...</div>`;

  // Simulación de subida (1.2s) antes de mostrar preview
  setTimeout(() => {
    // Mostrar preview de vídeo
    previewBox.innerHTML = `<video src="${URL.createObjectURL(f)}" controls class="w-full h-full object-cover"></video>`;

    // Lanzar el análisis automáticamente después de mostrar preview
    // (damos un pequeño delay para UX)
    setTimeout(() => {
      startAnalysis({ via: 'file', filename: f.name });
    }, 600);
  }, 1200);
});

// --- Si el usuario hace click en VERIFICAR sin haber seleccionado archivo ---
// En ese caso, podemos abrir el selector también (mejora UX)
verifyBtn.addEventListener('click', () => {
  // Si hay preview (archivo) ya seleccionado, iniciar análisis
  const hasVideo = fileInput.files && fileInput.files.length > 0;
  if (hasVideo) {
    startAnalysis({ via: 'file', filename: fileInput.files[0].name });
  } else {
    // abrir selector para forzar selección (UX)
    fileInput.click();
  }
});

// --- Función principal: simula el análisis completo ---
function startAnalysis(meta = {}) {
  // reset UI
  resultArea.classList.add('hidden');
  progressArea.classList.remove('hidden');
  progressBar.style.width = '2%';

  let progress = 2;
  const interval = setInterval(() => {
    progress += Math.random() * 10;
    if (progress >= 98) progress = 98;
    progressBar.style.width = progress.toFixed(0) + '%';
  }, 300);

  // Simulamos tiempo variable (más si viene archivo)
  const fakeTime = meta.via === 'file' ? 2000 + Math.random() * 2200 : 1400 + Math.random() * 1800;

  setTimeout(() => {
    clearInterval(interval);
    progressBar.style.width = '100%';

    // Decisión: 90% deepfake, 10% original
    const rnd = Math.random() * 100;
    const isDeepfake = rnd < 90; // 90% deepfake
    const conf = isDeepfake ? Math.floor(80 + Math.random() * 18) : Math.floor(65 + Math.random() * 25);

    // Mostrar resultado
    progressArea.classList.add('hidden');
    resultArea.classList.remove('hidden');

    if (isDeepfake) {
      resultBadge.textContent = 'DEEPFAKE (simulado)';
      resultBadge.className = 'deep inline-block px-4 py-2 rounded-full font-semibold text-white text-lg';
      resultConf.textContent = `Confianza estimada: ${conf}%`;
      resultMsg.textContent = 'El sistema considera el video manipulado (simulación).';
    } else {
      resultBadge.textContent = 'VIDEO ORIGINAL (simulado)';
      resultBadge.className = 'ok inline-block px-4 py-2 rounded-full font-semibold text-white text-lg';
      resultConf.textContent = `Confianza estimada: ${conf}%`;
      resultMsg.textContent = 'El sistema considera el video auténtico (simulación).';
    }

    // (Opcional) si quieres mostrar link de compartir, etc., lo podemos añadir aquí
  }, fakeTime);
}

