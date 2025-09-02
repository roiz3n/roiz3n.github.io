(() => {
  // Tabs
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.panel');

  function activate(targetId){
    tabs.forEach(t => {
      const is = t.dataset.target === targetId;
      t.classList.toggle('active', is);
      t.setAttribute('aria-selected', is ? 'true' : 'false');
    });
    panels.forEach(p => p.id === targetId ? p.classList.remove('hidden') : p.classList.add('hidden'));
  }

  tabs.forEach(t => t.addEventListener('click', () => activate(t.dataset.target)));

  // Accessibility: allow switching tabs with arrow keys
  document.querySelectorAll('.tabs .tab').forEach((tab, idx, list)=>{
    tab.addEventListener('keydown', (e)=>{
      if(e.key === 'ArrowRight'){
        e.preventDefault();
        list[(idx+1)%list.length].focus();
      }else if(e.key === 'ArrowLeft'){
        e.preventDefault();
        list[(idx-1+list.length)%list.length].focus();
      }
    });
  });

  // Copy buttons
  document.querySelectorAll('.copy').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy;
      try{
        await navigator.clipboard.writeText(text);
        btn.textContent = 'Copied!';
        setTimeout(()=> btn.textContent = 'Copy', 1400);
      }catch(e){
        // fallback
        const el = document.createElement('textarea');
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        el.remove();
        btn.textContent = 'Copied!';
        setTimeout(()=> btn.textContent = 'Copy', 1400);
      }
    });
  });

  // Translations
  const translations = {
    ru: {
      bio: `Привет!\n\nИнформация:\nМой ник: roiz3n\nМое ирл имя: Влад\nМестоимения: He/Him\nЯзыки: 🇷🇺/🇺🇸/🇺🇦\nСтрана: 🇺🇦\n\n✦ ✧ ✦\n\nУстройства:\n              \nНоутбук:\n  Asus Vivobook 15 OLED X513EAN\n  Intel Core i3 1125G4\n  16gb\n  Intel UHD Graphics\n  Arch Linux с Hyprland\n              \nТелефон:\n  Redmi Note 10 Pro\n  Snapdragon 732G\n  6gb\n\n✦ ✧ ✦\n\nХобби:\n  Кодинг на Python/C/Web\n  Музыка: Radiohead, RHCP, Weezer, SOAD, Aphex Twin, C418, artifyber.\n  Играю в Minecraft, Geometry Dash и Trackmania Nations Forever.\n\n✦ ✧ ✦\n\nСпасибо, что прочитал моё био :3, хорошего дня\n\nP.S: Я люблю своих друзей, всегда пиши, если хочешь поболтать!`,
      subtitle: 'Мое био в виде сайта',
      linksNote: 'Примечание: все внешние ссылки откроются в новой вкладке.',
      footer: 'Спасибо за просмотр 💬'
    },
    uk: {
      bio: `Привіт!\n\nІнформація:\nМій нік: roiz3n\nМоє ірл ім'я: Влад\nЗвертання: He/Him\nМови: 🇷🇺/🇺🇸/🇺🇦\nКраїна: 🇺🇦\n\n✦ ✧ ✦\n\nПристрої:\n              \nНоутбук:\n  Asus Vivobook 15 OLED X513EAN\n  Intel Core i3 1125G4\n  16gb\n  Intel UHD Graphics\n  Arch Linux з Hyprland\n              \nТелефон:\n  Redmi Note 10 Pro\n  Snapdragon 732G\n  6gb\n\n✦ ✧ ✦\n\nХобі:\n  Кодінг на Python/C/Web\n  Музика: Radiohead, RHCP, Weezer, SOAD, Aphex Twin, C418, artifyber.\n  Граю в Minecraft, Geometry Dash та Trackmania Nations Forever.\n\n✦ ✧ ✦\n\nДякую, що прочитал моє біо :3, гарного дня\n\nP.S: Я люблю своїх друзів, завжди пиши, якщо хочеш поспілкуватись!`,
      subtitle: 'Моє біо у вигляді сайту',
      linksNote: 'Примітка: всі зовнішні посилання відкриються в новій вкладці.',
      footer: 'Дякую за перегляд 💬'
    },
    en: {
      bio: `Hi!\n\nInfo:\nMy nickname: roiz3n\nMy surname: Vlad\nPronouns: He/Him\nLanguages: 🇷🇺/🇺🇸/🇺🇦\nCountry: 🇺🇦\n\n✦ ✧ ✦\n\nDevices:\n              \nLaptop:\n  Asus Vivobook 15 OLED X513EAN\n  Intel Core i3 1125G4\n  16gb\n  Intel UHD Graphics\n  Arch Linux with Hyprland\n              \nPhone:\n  Redmi Note 10 Pro\n  Snapdragon 732G\n  6gb\n\n✦ ✧ ✦\n\nHobbies:\n  Coding on Python/C/Web\n  Music: Radiohead, RHCP, Weezer, SOAD, Aphex Twin, С418, artifyber.\n  Playing Minecraft, Geometry Dash & Trackmania Nations Forever.\n\n✦ ✧ ✦\n\nThank you for reading my bio :3, have a nice day\n\nP.S: I love my friends, always write if you want to chat!`,
      subtitle: 'My bio as a website',
      linksNote: 'Note: external links will open in a new tab.',
      footer: 'Thanks for reading 💬'
    }
  };

  const bioEl = document.getElementById('bioText');
  const subtitleEl = document.getElementById('subtitle');
  const linksNoteEl = document.getElementById('linksNote');
  const footerEl = document.getElementById('footerText');

  function setLang(lang){
    const t = translations[lang] || translations.en;
    bioEl.textContent = t.bio;
    subtitleEl.textContent = t.subtitle;
    linksNoteEl.textContent = t.linksNote;
    footerEl.textContent = t.footer;
    document.querySelectorAll('.lang').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
  }

  document.querySelectorAll('.lang').forEach(b => b.addEventListener('click', ()=> setLang(b.dataset.lang)));

  // Initialize language from navigator or default to ru
  const userLang = (navigator.language || navigator.userLanguage || 'ru').slice(0,2);
  setLang(userLang === 'uk' || userLang === 'en' ? userLang : 'ru');

  // Ensure links open in new tab
  document.querySelectorAll('a.external').forEach(a => a.setAttribute('target','_blank'));

  // small UX: show about by default
  activate('about');
})();
