const linkInput = document.getElementById('linkInput');
const fileInput = document.getElementById('fileInput');
const verifyBtn = document.getElementById('verifyBtn');
const previewBox = document.getElementById('previewBox');
const progressArea = document.getElementById('progressArea');
const progressBar = document.getElementById('progressBar');
const resultArea = document.getElementById('resultArea');
const resultBadge = document.getElementById('resultBadge');
const resultConf = document.getElementById('resultConf');
const resultMsg = document.getElementById('resultMsg');

// Mostrar preview si suben archivo
fileInput.addEventListener('change', (e)=>{
  const f = e.target.files[0];
  if(!f) return;
  previewBox.innerHTML = `<video src="${URL.createObjectURL(f)}" controls class="w-full h-full object-cover"></video>`;
});

// Click en input abre selector de archivo
linkInput.addEventListener('click', ()=> fileInput.click());

// Simulación análisis
verifyBtn.addEventListener('click', ()=>{
  if(!linkInput.value && !fileInput.files.length){
    alert('Pega un enlace o selecciona un archivo primero.');
    return;
  }

  resultArea.classList.add('hidden');
  progressArea.classList.remove('hidden');
  progressBar.style.width = '2%';

  let progress = 2;
  const interval = setInterval(()=>{
    progress += Math.random()*10;
    if(progress >= 98) progress = 98;
    progressBar.style.width = progress.toFixed(0)+'%';
  }, 300);

  const fakeTime = 2000 + Math.random()*2000;
  setTimeout(()=>{
    clearInterval(interval);
    progressBar.style.width = '100%';

    const rnd = Math.random()*100;
    const isDeepfake = rnd < 90; // 90% Deepfake
    const conf = isDeepfake ? Math.floor(80+Math.random()*18) : Math.floor(65+Math.random()*25);

    progressArea.classList.add('hidden');
    resultArea.classList.remove('hidden');

    if(isDeepfake){
      resultBadge.textContent = 'DEEPFAKE (simulado)';
      resultBadge.className = 'deep inline-block px-4 py-2 rounded-full font-semibold text-white text-lg';
      resultConf.textContent = `Confianza: ${conf}%`;
      resultMsg.textContent = 'El sistema considera el video manipulado (simulación).';
    } else {
      resultBadge.textContent = 'VIDEO ORIGINAL (simulado)';
      resultBadge.className = 'ok inline-block px-4 py-2 rounded-full font-semibold text-white text-lg';
      resultConf.textContent = `Confianza: ${conf}%`;
      resultMsg.textContent = 'El sistema considera el video auténtico (simulación).';
    }
  }, fakeTime);
});

// Imagen de fondo y tarjetas
document.getElementById('heroBg').style.backgroundImage = "url('assets/hero.jpg')";
document.querySelectorAll('.card-hero').forEach(c=>{
  const img = c.dataset.img || 'assets/img-placeholder.jpg';
  c.style.backgroundImage = `url('${img}')`;
});

