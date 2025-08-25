const items = document.querySelectorAll('.menu-item');
const aboutBlock = document.getElementById('about');
const linksBlock = document.getElementById('links');
const languagesBlock = document.getElementById('languages');
const commandLine = document.getElementById('command');
let selected = 0;
let currentLang = 'en';
let showingLanguages = false;

const translations = {
  en: {
    aboutMenu: 'About me',
    linksMenu: 'Links',
    aboutContent: `Name: Vlad
14 years old, birthday 08.06.2011
Country/region: Ukraine, Odessa region
Current OS: I use arch btw
Current WM: Hyprland (<a href="https://github.com/end-4/dots-hyprland">end-4</a>)
Phone: Redmi Note 10 Pro[6/128] (<a href="https://github.com/TheWildJames/KernelSU-Next">KernelSU Next</a>)
Interests: Root, Root hiding on phone, Linux, Android, AOSP, Music`
  },
  ru: {
    aboutMenu: 'Обо мне',
    linksMenu: 'Ссылки',
    aboutContent: `Имя: Влад
14 лет, день рождения 08.06.2011
Страна/регион: Украина, Одесская область
Текущая ОС: I use arch btw
Текущий WM: Hyprland (<a href="https://github.com/end-4/dots-hyprland">end-4</a>)
Телефон: Redmi Note 10 Pro[6/128] (<a href="https://github.com/TheWildJames/KernelSU-Next">KernelSU Next</a>)
Интересы: Root права, Скрытие root на телефоне, Linux, Android, AOSP, Музыка`
  },
  uk: {
    aboutMenu: 'Про мене',
    linksMenu: 'Посилання',
    aboutContent: `Ім'я: Влад
14 років, день народження 08.06.2011
Країна/регіон: Україна, Одеська область
Поточна ОС: I use arch btw
Поточний WM: Hyprland (<a href="https://github.com/end-4/dots-hyprland">end-4</a>)
Телефон: Redmi Note 10 Pro[6/128] (<a href="https://github.com/TheWildJames/KernelSU-Next">KernelSU Next</a>)
Інтереси: Root права, Приховування root на телефоні, Linux, Android, AOSP, Музика`
  }
};

function updateHighlight() {
  items.forEach((item, index) => item.classList.toggle('highlight', index === selected));
}

function showSection(section) {
  showingLanguages = false;
  aboutBlock.style.display = 'none';
  linksBlock.style.display = 'none';
  languagesBlock.style.display = 'none';
  commandLine.style.display = 'block';
  commandLine.textContent = section === 'about' ? 'cat about.txt' : 'cat links.txt';
  setTimeout(() => {
    if (section === 'about') {
      aboutBlock.innerHTML = translations[currentLang].aboutContent;
      aboutBlock.style.display = 'block';
    }
    if (section === 'links') linksBlock.style.display = 'block';
  }, 300);
}

function showLanguages() {
  showingLanguages = true;
  aboutBlock.style.display = 'none';
  linksBlock.style.display = 'none';
  commandLine.style.display = 'block';
  commandLine.textContent = 'cat list.lang';
  setTimeout(() => { if (showingLanguages) languagesBlock.style.display = 'block'; }, 300);
}

function setLanguage(lang) {
  currentLang = lang;
  document.querySelectorAll('.menu-text')[0].textContent = translations[lang].aboutMenu;
  document.querySelectorAll('.menu-text')[1].textContent = translations[lang].linksMenu;
  aboutBlock.innerHTML = translations[lang].aboutContent;
  showSection(items[selected].dataset.section || 'about');
}

function closeWindow() {
  if (confirm('Close terminal?')) window.close();
}

items.forEach((item, index) => {
  item.addEventListener('click', () => {
    selected = index;
    updateHighlight();
    const section = item.dataset.section;
    if (section) showSection(section);
  });
});

document.addEventListener('keydown', e => {
  if (showingLanguages) return;
  if (e.key === 'ArrowRight') {
    selected = (selected + 1) % items.length;
  } else if (e.key === 'ArrowLeft') {
    selected = (selected - 1 + items.length) % items.length;
  } else if (e.key === 'Enter') {
    const section = items[selected].dataset.section;
    if (section) showSection(section);
  }
  updateHighlight();
});

showSection('about');


// MATRIX RAIN
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 14;
const columns = Math.floor(canvas.width / fontSize);

const drops = Array(columns).fill(1);

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0F0";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(draw, 35);

window.addEventListener("resize", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});
