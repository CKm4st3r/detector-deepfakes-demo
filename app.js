// Elements
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

// Background and card images
if (document.getElementById('heroBg')) {
  document.getElementById('heroBg').style.backgroundImage = "url('assets/hero.jpg')";
}
document.querySelectorAll('.card-hero').forEach(c=>{
  const img = c.dataset.img || 'assets/img-placeholder.jpg';
  c.style.backgroundImage = `url('${img}')`;
});

// Click on visible box opens file input
fakeInput.addEventListener('click', () => {
  fileInput.click();
});

// When user selects a file
fileInput.addEventListener('change', (e) => {
  const f = e.target.files[0];
  if (!f) return;

  fakeInput.textContent = `Selected file: ${f.name}`;
  previewBox.innerHTML = `<div class="text-sm text-gray-600">Uploading file...</div>`;

  setTimeout(() => {
    previewBox.innerHTML = `<video src="${URL.createObjectURL(f)}" controls class="w-full h-full object-cover"></video>`;
    setTimeout(() => {
      startAnalysis();
    }, 600);
  }, 1200);
});

// If user clicks VERIFY directly
verifyBtn.addEventListener('click', () => {
  if (fileInput.files && fileInput.files.length > 0) {
    startAnalysis();
  } else {
    fileInput.click();
  }
});

// Analysis simulation
function startAnalysis() {
  resultArea.classList.add('hidden');
  progressArea.classList.remove('hidden');
  progressBar.style.width = '2%';

  let progress = 2;
  const interval = setInterval(() => {
    progress += Math.random() * 10;
    if (progress >= 98) progress = 98;
    progressBar.style.width = progress.toFixed(0) + '%';
  }, 300);

  const fakeTime = 2000 + Math.random() * 2000;
  setTimeout(() => {
    clearInterval(interval);
    progressBar.style.width = '100%';

    const rnd = Math.random() * 100;
    const isDeepfake = rnd < 90;
    const conf = isDeepfake 
      ? Math.floor(80 + Math.random() * 18) 
      : Math.floor(65 + Math.random() * 25);

    progressArea.classList.add('hidden');
    resultArea.classList.remove('hidden');

    if (isDeepfake) {
      resultBadge.textContent = 'DEEPFAKE (simulated)';
      resultBadge.className = 'deep inline-block px-4 py-2 rounded-full font-semibold text-white text-lg';
      resultConf.textContent = `Confidence: ${conf}%`;
      resultMsg.textContent = 'The system considers this video manipulated (simulation).';
    } else {
      resultBadge.textContent = 'ORIGINAL VIDEO (simulated)';
      resultBadge.className = 'ok inline-block px-4 py-2 rounded-full font-semibold text-white text-lg';
      resultConf.textContent = `Confidence: ${conf}%`;
      resultMsg.textContent = 'The system considers this video authentic (simulation).';
    }
  }, fakeTime);
}

