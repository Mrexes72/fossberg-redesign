(function () {
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function setText(id, value) {
    if (value == null) return;
    var el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function setImg(id, value) {
    if (!value) return;
    var el = document.getElementById(id);
    if (el) el.src = value;
  }

  // Updates just the trailing text of an element without touching any icon
  // (e.g. an <svg>) that lives inside it alongside the text.
  function setTrailingText(el, value) {
    if (!el || value == null) return;
    for (var i = el.childNodes.length - 1; i >= 0; i--) {
      var n = el.childNodes[i];
      if (n.nodeType === Node.TEXT_NODE && n.nodeValue.trim() !== "") {
        n.nodeValue = n.nodeValue.replace(n.nodeValue.trim(), value);
        return;
      }
    }
    el.appendChild(document.createTextNode(value));
  }

  function renderTimeline(items) {
    var container = document.getElementById("timeline");
    if (!container || !Array.isArray(items) || !items.length) return;
    container.innerHTML = items
      .map(function (item, i, arr) {
        var isLast = i === arr.length - 1;
        return (
          '<div class="timeline-item">' +
          '<div class="timeline-year">' + escapeHtml(item.aar) + "</div>" +
          '<div class="timeline-marker"><div class="timeline-dot"></div>' +
          (isLast ? "" : '<div class="timeline-line"></div>') +
          "</div>" +
          '<div class="timeline-text"><h3>' + escapeHtml(item.tittel) + "</h3><p>" + escapeHtml(item.tekst) + "</p></div>" +
          "</div>"
        );
      })
      .join("");
  }

  function applyKontaktInfo(data) {
    if (!data) return;
    var tel = data.telefon;
    var telHref = tel ? "tel:" + tel.replace(/\s+/g, "") : null;
    document.querySelectorAll('[data-cms="telefon"]').forEach(function (el) {
      setTrailingText(el, tel);
      if (telHref && el.tagName === "A") el.href = telHref;
    });
    document.querySelectorAll('[data-cms="epost"]').forEach(function (el) {
      setTrailingText(el, data.epost);
      if (data.epost && el.tagName === "A") el.href = "mailto:" + data.epost;
    });
    document.querySelectorAll('[data-cms="adresse"]').forEach(function (el) {
      setTrailingText(el, data.adresse);
    });
  }

  function applyPage(page, data) {
    if (!page || !data || !data[page]) return;
    var p = data[page];
    setText("hero-eyebrow", p.hero_eyebrow);
    setText("hero-tittel", p.hero_tittel);
    setText("hero-tekst", p.hero_tekst);
    setImg("hero-bilete", p.hero_bilete);
    setText("intro-tekst", p.intro);

    for (var i = 1; i <= 4; i++) {
      setText("kort" + i + "-tittel", p["kort" + i + "_tittel"]);
      setText("kort" + i + "-tekst", p["kort" + i + "_tekst"]);
      setImg("kort" + i + "-bilete", p["kort" + i + "_bilete"]);
      setText("punkt" + i + "-tittel", p["punkt" + i + "_tittel"]);
      setText("punkt" + i + "-tekst", p["punkt" + i + "_tekst"]);
      setText("natur" + i + "-tittel", p["natur" + i + "_tittel"]);
      setText("natur" + i + "-tekst", p["natur" + i + "_tekst"]);
      setText("historie" + i + "-tittel", p["historie" + i + "_tittel"]);
      setText("historie" + i + "-tekst", p["historie" + i + "_tekst"]);
    }

    setText("treningsrom-tittel", p.treningsrom_tittel);
    setText("treningsrom-tekst", p.treningsrom_tekst);
  }

  var page = document.body.getAttribute("data-page");
  var needsTimeline = document.getElementById("timeline");
  var needsContent = page || document.querySelector("[data-cms]");

  if (needsTimeline) {
    fetch("data/om-oss.json")
      .then(function (r) {
        if (!r.ok) throw new Error("no data file");
        return r.json();
      })
      .then(function (data) {
        renderTimeline(data.tidslinje);
      })
      .catch(function () {
        /* nettverk-/datafeil: sida viser den statiske teksten som allereie ligg i HTML-en */
      });
  }

  if (needsContent) {
    fetch("data/content.json")
      .then(function (r) {
        if (!r.ok) throw new Error("no data file");
        return r.json();
      })
      .then(function (data) {
        applyKontaktInfo(data.kontakt_info);
        applyPage(page, data);
      })
      .catch(function () {
        /* nettverk-/datafeil: sida viser den statiske teksten som allereie ligg i HTML-en */
      });
  }
})();
