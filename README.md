# Fossberg Hotell — designutkast

Eit uoffisielt konsept for ei modernisert nettside for [Fossberg Hotell](https://fossberg.no) i Lom. Laga som eit visuelt utkast for å vise korleis sida kunne sjått ut med oppdatert design — dette er **ikkje** den offisielle nettsida til Fossberg Hotell.

🔗 **Sjå den live her:** https://mrexes72.github.io/fossberg-redesign/

## Innhald i repoet

- **`/site`** — den ferdige, statiske nettsida (vanleg HTML/CSS, ingen byggeprosess). Dette er det som blir publisert til GitHub Pages.
  - `index.html` — forside
  - `overnatting.html`, `trim-og-trivsel.html`, `konferanse.html`, `lom.html`, `kontakt.html` — undersider
  - `styles.css` — delt stilark for heile sida
  - `assets/` — bilete henta frå den eksisterande nettsida
- **`Main.dc.html`, `Mobil.dc.html`, `canvas.json`** — kjeldefiler for det opphavlege visuelle utkastet (skrivebord + mobil), brukt til å generere `fossberg-nyutkast.html`
- **`fossberg-nyutkast.html`** — ein sjølvstendig HTML-fil med eit lite redigeringsverktøy for å justere det visuelle utkastet

## Status

Dette er eit tidleg konsept:
- Innhaldet på undersidene er skrive med utgangspunkt i ekte informasjon frå fossberg.no, men manglar detaljar som pris og opningstider.
- Kontaktskjemaet på `kontakt.html` er kun visuelt og sender ikkje inn noko.
- "Book opphald"-knappane peikar til den ekte nettbookinga for Fossberg Hotell.

## Bakgrunn

Sjå på det opprinnelege designet på [fossberg.no](https://fossberg.no) for samanlikning.
