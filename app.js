const videoInput = document.getElementById('videoInput');
const preview = document.getElementById('preview');
const previewWrap = document.getElementById('previewWrap');
const analyzeBtn = document.getElementById('analyzeBtn');
const resetBtn = document.getElementById('resetBtn');
const progressWrap = document.getElementById('progressWrap');
const progressBar = document.getElementById('progressBar');
const resultWrap = document.getElementById('resultWrap');
const resultBadge = document.getElementById('resultBadge');
const resultText = document.getElementById('resultText');
const confidence = document.getElementById('confidence');
const copyUrlBtn = document.getElementById('copyUrlBtn');
const simulateUploadBtn = document.getElementById('simulateUploadBtn');
const uploadResult = document.getElementById('uploadResult');

let currentFile = null;
let lastResult = null;

// Show preview
videoInput.addEventListener('change', e => {
  const f = e.target.files[0];
  if (!f) return;
  currentFile = f;
  const url = URL.createObjectURL(f);
  preview.src = url;
  previewWrap.classList.remove('hidden');
});

// Reset
resetBtn.addEventListener('click', () => {
  videoInput.value = '';
  preview.src = '';
  previewWrap.classList.add('hidden');
  resultWrap.classList.add('hidden');
  progressWrap.classList.add('hidden');
  progressBar.style.width = '0%';
  currentFile = null;
  lastResult = null;
  uploadResult.textContent = '';
});

// Fake analysis
analyzeBtn.addEventListener('click', () => {
  if (!currentFile) return alert('Please select a video first.');

  progressWrap.classList.remove('hidden');
  progressBar.style.width = '2%';
  resultWrap.classList.add('hidden');

  let progress = 2;
  const interval = setInterval(() => {
    progress += Math.random() * 12;
    if (progress >= 98) progress = 98;
    progressBar.style.width = progress.toFixed(0) + '%';
  }, 300);

  const fakeTime = 2000 + Math.random() * 2000;
  setTimeout(() => {
    clearInterval(interval);
    progressBar.style.width = '100%';

    const isDeepfake = Math.random() < 0.4;
    const conf = Math.floor(60 + Math.random() * 40);

    lastResult = { isDeepfake, conf };

    resultWrap.classList.remove('hidden');
    progressWrap.classList.add('hidden');

    if (isDeepfake) {
      resultBadge.textContent = 'DEEPFAKE (simulated)';
      resultBadge.className = 'inline-block px-3 py-1 rounded-full font-semibold bg-red-100 text-red-800';
      resultText.textContent = 'The system considers this video manipulated (simulation).';
    } else {
      resultBadge.textContent = 'LEGIT (simulated)';
      resultBadge.className = 'inline-block px-3 py-1 rounded-full font-semibold bg-green-100 text-green-800';
      resultText.textContent = 'The system considers this video authentic (simulation).';
    }
    confidence.textContent = 'Estimated confidence: ' + conf + '%';
  }, fakeTime);
});

// Copy result URL
copyUrlBtn.addEventListener('click', () => {
  if (!lastResult) return alert('Analyze a video first.');
  const params = new URLSearchParams({
    r: lastResult.isDeepfake ? 'deep' : 'legit',
    c: lastResult.conf
  });
  const shareUrl = location.origin + location.pathname + '?' + params.toString();
  navigator.clipboard.writeText(shareUrl).then(() => {
    alert('Result URL copied to clipboard');
  });
});

// Simulate upload
simulateUploadBtn.addEventListener('click', () => {
  if (!lastResult) return alert('Analyze a video first.');
  uploadResult.textContent = 'Simulating upload...';
  setTimeout(() => {
    const fakeUrl = 'https://storage-demo.example/' + encodeURIComponent(currentFile?.name || 'video.mp4');
    uploadResult.innerHTML = 'File uploaded (simulated): <a href="' + fakeUrl + '" target="_blank" class="text-blue-600 underline">' + fakeUrl + '</a>';
  }, 1000);
});


