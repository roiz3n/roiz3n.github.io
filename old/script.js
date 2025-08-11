function showSection(id) {
    var sections = ["about", "links", "languages"];
    for (var i = 0; i < sections.length; i++) {
        document.getElementById(sections[i]).style.display = "none";
    }
    document.getElementById(id).style.display = "block";
    document.getElementById("command").innerHTML = "> " + id;
}

function setLanguage(lang) {
    document.getElementById("command").innerHTML = "> Language set to " + lang;
}

function toggleLanguage() {
    var toggle = document.querySelector(".language-toggle");
    if (toggle.innerHTML === "EN") {
        toggle.innerHTML = "UA";
        setLanguage("Ukrainian");
    } else {
        toggle.innerHTML = "EN";
        setLanguage("English");
    }
}
