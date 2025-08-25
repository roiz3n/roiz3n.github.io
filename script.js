// Функция для вывода текста построчно
function renderMultilineText(elementId, text) {
  const container = document.getElementById(elementId);
  container.innerHTML = "";
  text.split("\n").forEach(line => {
    if (line.trim() !== "") {
      const div = document.createElement("div");
      div.textContent = line;
      container.appendChild(div);
    }
  });
}

// Переключение вкладок (About / Links / Languages)
document.querySelectorAll(".menu-item").forEach(item => {
  item.addEventListener("click", () => {
    const command = document.getElementById("command");
    const about = document.getElementById("about");
    const links = document.getElementById("links");
    const languages = document.getElementById("languages");

    if (item.textContent === "About") {
      command.textContent = "cat about.txt";

      renderMultilineText(
        "about",
        "Hi, I’m roiz3n\nTeenager, coder, tinkerer\nLoves Radiohead & tech stuff"
      );

      about.style.display = "flex";
      links.style.display = "none";
      languages.style.display = "none";
    } 
    
    else if (item.textContent === "Links") {
      command.textContent = "cat links.txt";

      renderMultilineText(
        "links",
        "Discord: your_discord\nMastodon: your_mastodon\nSteam: your_steam\nTelegram: your_telegram\nTelegram Channel: your_channel\nOpenVK: your_openvk"
      );

      about.style.display = "none";
      links.style.display = "flex";
      languages.style.display = "none";
    } 
    
    else if (item.textContent === "Languages") {
      command.textContent = "cat languages.txt";

      languages.innerHTML = `
        <div>🇺🇸 English</div>
        <div>🇷🇺 Russian</div>
        <div>🇺🇦 Ukrainian</div>
      `;

      about.style.display = "none";
      links.style.display = "none";
      languages.style.display = "flex";
    }
  });
});
