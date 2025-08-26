// Helpers
const $ = (s, r=document) => r.querySelector(s);

// Current year
$('#year').textContent = new Date().getFullYear();

// Copy bio
$('#copyBtn').addEventListener('click', async () => {
  const text = $('#bio').innerText;
  try {
    await navigator.clipboard.writeText(text);
    flash($('#copyBtn'), 'Copied!');
  } catch {
    const sel = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents($('#bio'));
    sel.removeAllRanges(); sel.addRange(range);
    document.execCommand('copy');
    sel.removeAllRanges();
    flash($('#copyBtn'), 'Copied!');
  }
});

function flash(btn, text){
  const old = btn.textContent; btn.textContent = text;
  setTimeout(()=>{ btn.textContent = old; }, 1200);
}

// Pointer parallax
const aurora = $('.aurora');
window.addEventListener('pointermove', e => {
  const x = (e.clientX / window.innerWidth - .5) * 10;
  const y = (e.clientY / window.innerHeight - .5) * 10;
  aurora.style.transform = `translate(${x}px, ${y}px)`;
}, {passive:true});

setInterval(draw, 50);
