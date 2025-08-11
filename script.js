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
    legacyMenu: 'Switch to legacy version',
    aboutContent: `Name: Vlad
14 years old, birthday 08.06.2011
Country/region: Ukraine, Odessa region
Current OS: I use arch btw
Current WM: Hyprland (<a href="https://github.com/end-4/dots-hyprland">end-4</a>)
Phone: Redmi Note 10 Pro[6/128] (<a href="https://github.com/KernelSU-Next/KernelSU-Next">KernelSU Next</a>)
Interests: Root, Root hiding on phone, Linux, Android, AOSP, Music`
  },
  ru: {
    aboutMenu: 'Обо мне',
    linksMenu: 'Ссылки',
    legacyMenu: 'Переключиться на устаревшую версию',
    aboutContent: `Имя: Влад
14 лет, день рождения 08.06.2011
Страна/регион: Украина, Одесская область
Текущая ОС: I use arch btw
Текущий WM: Hyprland (<a href="https://github.com/end-4/dots-hyprland">end-4</a>)
Телефон: Redmi Note 10 Pro[6/128] (<a href="https://github.com/KernelSU-Next/KernelSU-Next">KernelSU Next</a>)
Интересы: Root права, Скрытие root на телефоне, Linux, Android, AOSP, Музыка`
  },
  uk: {
    aboutMenu: 'Про мене',
    linksMenu: 'Посилання',
    legacyMenu: 'Перейти до застарілої версії',
    aboutContent: `Ім'я: Влад
14 років, день народження 08.06.2011
Країна/регіон: Україна, Одеська область
Поточна ОС: I use arch btw
Поточний WM: Hyprland (<a href="https://github.com/end-4/dots-hyprland">end-4</a>)
Телефон: Redmi Note 10 Pro[6/128] (<a href="https://github.com/KernelSU-Next/KernelSU-Next">KernelSU Next</a>)
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
    if (section === 'about') aboutBlock.style.display = 'block';
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
  document.querySelector('.legacy-text').textContent = translations[lang].legacyMenu;
  aboutBlock.innerHTML = translations[lang].aboutContent;
  showSection(items[selected].dataset.section || 'about');
}

function switchToRetro() {
  window.location.href = './old/';
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
    else switchToRetro();
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
    else switchToRetro();
  }
  updateHighlight();
});

showSection('about');
