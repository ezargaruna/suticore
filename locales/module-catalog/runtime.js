(() => {
  const data = JSON.parse(document.getElementById("catalog-languages").textContent);
  const picker = document.getElementById("locale");
  const filter = document.getElementById("filter");
  const empty = document.getElementById("empty");
  const count = document.getElementById("count");
  const cards = [...document.querySelectorAll(".module")];
  const groups = [...document.querySelectorAll("section[data-group]")];
  const navigation = document.querySelector("nav");
  const fields = [...document.querySelectorAll("[data-copy]")];
  const aliases = {"es-419": "es", "pt": "pt-BR", "pt-br": "pt-BR", "zh-hans": "zh-Hans", "zh-cn": "zh-Hans"};
  let current = "ru";

  function normalize(locale) {
    const code = String(locale || "").replaceAll("_", "-").toLowerCase();
    return aliases[code] || (Object.hasOwn(data.editions, code) ? code : "ru");
  }

  function updateFilter() {
    const query = filter.value.trim().normalize("NFC").toLocaleLowerCase();
    let visible = 0;
    for (const card of cards) {
      const index = Number(card.dataset.card);
      const haystack = [
        card.querySelector("h3").textContent, data.originalTitles[index],
        card.querySelector("code").textContent,
      ].join(" ").normalize("NFC").toLocaleLowerCase();
      card.hidden = !haystack.includes(query);
      if (!card.hidden) visible++;
    }
    for (const group of groups) group.hidden = !group.querySelector(".module:not([hidden])");
    empty.hidden = visible > 0;
    const edition = data.editions[current];
    const formatted = new Intl.NumberFormat(edition.lang).format(visible);
    count.textContent = edition.ui.count.replace("{count}", formatted);
  }

  function applyLocale(value, updateUrl) {
    current = normalize(value);
    const edition = data.editions[current];
    const ui = edition.ui;
    picker.value = current;
    document.documentElement.lang = edition.lang;
    document.documentElement.dir = edition.dir;
    document.title = ui["page-title"] + " · SUTI.world";
    document.getElementById("description").content = ui["page-intro"];
    navigation.setAttribute("aria-label", ui.nav);
    for (const element of fields) element.textContent = ui[element.dataset.copy];
    for (const card of cards) {
      const title = edition.titles[Number(card.dataset.card)];
      card.querySelector("h3").textContent = title;
    }
    const home = "https://suti.world/?lang=" + encodeURIComponent(current) + "#library";
    document.getElementById("catalog-home").href = home;
    document.getElementById("catalog-return").href = home;
    const mapLink = document.getElementById("architecture-map");
    const map = current === "ru" ? "index.html" : "architecture/" + current.toLowerCase() + ".html";
    mapLink.href = "https://ezargaruna.github.io/suticore/modules/" + map;
    mapLink.hreflang = edition.lang;
    if (updateUrl && /^https?:$/.test(location.protocol)) {
      const url = new URL(location.href);
      url.searchParams.set("lang", current);
      history.replaceState(null, "", url);
    }
    updateFilter();
  }

  filter.addEventListener("input", updateFilter);
  picker.addEventListener("change", () => applyLocale(picker.value, true));
  document.getElementById("catalog-tools").hidden = false;
  applyLocale(new URL(document.baseURI).searchParams.get("lang"), false);
})();
