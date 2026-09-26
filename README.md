# Fossberg Hotell — designutkast

Eit uoffisielt konsept for ei modernisert nettside for [Fossberg Hotell](https://fossberg.no) i Lom. Laga som eit visuelt utkast for å vise korleis sida kunne sjått ut med oppdatert design — dette er **ikkje** den offisielle nettsida til Fossberg Hotell.

🔗 **Sjå den live her:** https://mrexes72.github.io/fossberg-redesign/

## Innhald i repoet

- **`/site`** — den ferdige, statiske nettsida (vanleg HTML/CSS, ingen byggeprosess). Dette er det som blir publisert til GitHub Pages og Netlify.
  - `index.html` — forside
  - `overnatting.html`, `trim-og-trivsel.html`, `konferanse.html`, `lom.html`, `om-oss.html`, `kontakt.html`, `takk.html` — undersider
  - `styles.css` — delt stilark for heile sida
  - `assets/` — bilete henta frå den eksisterande nettsida, pluss `content.js` som hentar redigerbart innhald
  - `data/` — JSON-innhald som vert redigert via CMS-panelet (sjå under)
  - `admin/` — Decap CMS-panelet hotellet sin kontaktperson brukar for å redigere tekst/bilete sjølv

## Status

- Innhaldet på undersidene er skrive med utgangspunkt i ekte informasjon frå fossberg.no, men manglar framleis detaljar som pris og opningstider.
- Tekst/bilete på alle sider kan redigerast utan kode via `/site/admin` (Decap CMS + Netlify Identity).
- Kontaktskjemaa på `kontakt.html` sender inn ekte via Netlify Forms (eit for generelle spørsmål, eit for møte-/konferanseførespurnad) — romreservasjonar går ikkje via desse.
- "Book opphald"-knappane peikar til den ekte nettbookinga for Fossberg Hotell.

## Neste steg

- **Personvernerklæring.** No som kontaktskjemaa faktisk samlar inn namn/e-post/melding via Netlify Forms, bør sida ha ei kort personvern-side som seier kva som vert samla inn og kvar det vert lagra.
- **Ekte pris- og opningstidsinformasjon** frå hotellet, til erstatning for placeholder-teksten på undersidene.
- **Stadfest e-postvarsling i Netlify Forms** er sett opp mot `booking@fossberg.no` for begge skjema, slik at førespurnadar faktisk vert fanga opp.
- **SEO/deling:** sida manglar favicon, meta-description og Open Graph-tagar (for lenkeførehandsvisingar i t.d. Facebook/Messenger), samt `robots.txt`/`sitemap.xml`.
- **Full gjennomgang av CMS-koplingane** på kvar side — to reelle feil vart nyleg funne og retta (manglande `data-cms`-hookar og ein manglande `content.js`-inkludering på `kontakt.html`), så det er verdt å dobbeltsjekke at alle felt på alle sider faktisk hydrerer frå JSON-en.
- **Avgjer sluttmålet:** skal dette forbli eit visuelt konsept, eller er målet at det etter kvart skal erstatte den offisielle fossberg.no? Det styrer m.a. om domene/DNS skal peikast om, og om disclaimer-teksten i footeren ("Designutkast til ny nettside – ikkje i drift") skal fjernast.

## Bakgrunn

Sjå på det opprinnelege designet på [fossberg.no](https://fossberg.no) for samanlikning.
