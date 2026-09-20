(function () {
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
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

  var timelineEl = document.getElementById("timeline");
  if (timelineEl) {
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
})();
