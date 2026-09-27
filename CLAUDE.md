# Fossberg Hotell — redesign-konsept

Uoffisielt visuelt konsept for [Fossberg Hotell](https://fossberg.no) i Lom. Sjå `README.md` for bakgrunn.

## Struktur

- `/site` er det som faktisk vert publisert — vanleg HTML/CSS/JS, ingen byggeprosess, ingen rammeverk.

## Publisering (to parallelle mål — begge er live)

1. **GitHub Pages** via `.github/workflows/deploy-pages.yml` — trigga automatisk på push til `main`, publiserer `./site`. URL: https://mrexes72.github.io/fossberg-redesign/
2. **Netlify** — kopla til same GitHub-repo, "Publish directory" sett til `site`. URL: https://mellow-dragon-32a0df.netlify.app — dette er sida CMS-et og Netlify Identity peikar på (sjå under), så det er denne URL-en som er den "eigentlege" i praksis.

Push til `main` oppdaterer begge automatisk. Repoet har òg ein auto-commit/push-hook i dette miljøet — endringar kan dukke opp i git-historia utan at nokon eksplisitt har køyrd `git commit`.

## Innhaldsstyring (Decap CMS)

`/site/admin/` er eit Decap CMS-panel som hotellet sin kontaktperson brukar til å redigere tekst og bilete sjølv, utan å røre kode.

- **Backend:** `git-gateway` (sjå `admin/config.yml`) — krev Netlify Identity + Git Gateway aktivert på Netlify-sida over. Redaktørar vert inviterte på e-post og treng **ikkje** ein eigen GitHub-konto.
- **⚠️ Filstiar i `admin/config.yml` er relative til rota av Git-repoet, ikkje til Netlify sin "Publish directory".** Ein tidlegare feil kom av at ein `file:`-sti stod som `data/x.json` i staden for `site/data/x.json` — CMS-et fann då ingenting og synte tomme felt utan feilmelding. Hugs `site/`-prefikset når nye datafiler/felt vert lagt til.
- **Redigerbart innhald** ligg i to JSON-filer:
  - `site/data/content.json` — hero-tittel/bilete, ingress og kort/lister for kvar side, pluss delt kontaktinfo (telefon/e-post/adresse).
  - `site/data/om-oss.json` — historie-tidslinja på Om oss-sida (open liste, kan leggjast til/fjernast/omorganiserast).
- **Korleis det heng saman:** kvar HTML-side har `id="..."`/`data-cms="..."`-hooks på dei elementa som er redigerbare (t.d. `id="hero-tittel"`, `id="kort1-bilete"`). `site/assets/content.js` hentar dei to JSON-filene ved sidelast og fyller inn feltene. Den statiske teksten som alt står i HTML-en er eit fallback dersom JSON-fila manglar eller fetch feilar — endre difor **både** HTML-fallback og JSON når du gjer manuelle kodeendringar i innhald, elles kjem dei ut av synk.
- Bilete lastar opp til `site/assets/uploads/` via CMS-et sitt innebygde media-bibliotek.
- Guide til redaktøren (kva ho ser, korleis Publish fungerer): https://claude.ai/code/artifact/343091d9-c5c6-41ab-bdfd-a7b41c4afce7

## Kontaktskjema (Netlify Forms)

`site/kontakt.html` har to skjema som sender via [Netlify Forms](https://docs.netlify.com/manage/forms/setup/) — ingen backend-kode, Netlify oppdagar dei automatisk frå `data-netlify="true"` i den statiske HTML-en ved deploy:

- `generelt-sporsmal` — vanlege spørsmål som ikkje er svart på i sida.
- `konferanse-forespurnad` — førespurnad om møte/konferanse (dato, tal på deltakarar, formål).

Begge har ein skjult honeypot-feil (`bot-field`, styla usynleg via `.hp-field` i `styles.css`) for spam-filtrering, og sender brukaren vidare til `site/takk.html` ved vellukka innsending. Reine **romreservasjonar skal ikkje gå via desse skjemaa** — sida peikar i staden til Bedify-booking (same lenke som «Book opphald»-knappane elles på sida). Innsende skjema hamnar i Netlify sitt Forms-panel for nettstaden (sjå Netlify-dashbordet under "Forms") — set opp e-postvarsling der om det er ønskeleg. Fungerer berre etter deploy til Netlify, ikkje ved lokal filvisning.

## Designutkast (midlertidig — fjern når eit design er valt)

`site/design-oversikt.html` er ei intern, ikkje-lenka side for å samanlikne tre visuelle retningar på **same** HTML/funksjonalitet, før eit endeleg design vert valt:

- **A · Skog** — standarden (forest-green, DM Serif Display + Manrope).
- **B · Varme fjell** — terrakotta/rust, Fraunces + Manrope.
- **C · Fjord** — kjølig blå-grå, Space Grotesk + Manrope.
- **D · Fossbergom** — tjørebrunt/mosegrønt henta frå Lomskyrkja (tjærebredde veggar, raudmåla vindaugsposter) og Lom sentrum sin samanhengande byggeskikk (nasjonalparklandsby sidan 2008), pluss Fossberg sin eigen historie (røter til 1894, gradvis modernisert sidan 1953-ombygginga). Playfair Display + Manrope.

**Korleis det verkar:** kvar side har eit `[data-theme="b"|"c"]`-attributt-basert palett/font-sett i `styles.css` (sjå `:root` og dei to `[data-theme=...]`-blokkene). Ein liten synkron `<script>` i `<head>` på kvar side les valet frå `localStorage`-nøkkelen `fossberg-design` og set attributtet på `<html>` før sida vert måla, slik at det ikkje "blinkar" til standarddesignet først. `content.js` viser ein liten badge nedst til høgre ("Visar design B/C") med ei lenke for å nullstille.

**Viktig:** dette er **per nettlesar** (localStorage), ikkje ei global innstilling — vanlege besøkande ser alltid standarddesignet (A) uansett kva som er valt i `design-oversikt.html` i éin bestemt nettlesar. Alle design deler same `content.json`/CMS-innhald og same Netlify Forms-skjema.

**Når eit design er valt:** fjern dei to ubrukte `[data-theme=...]`-blokkene i `styles.css`, dei ekstra Google Fonts-familiane frå `<head>` på kvar side (behald berre den valde overskriftsfonten + Manrope), den vesle theme-scriptet i `<head>` på kvar side, badge-logikken øvst i `content.js`, og `design-oversikt.html`.

## Personar

- **Per** (repo-eigar, `git@github.com:Mrexes72/fossberg-redesign.git`) gjer kode-/designendringar.
- Ein namngjeven kontaktperson hos hotellet ("henne") redigerer løpande tekst/bilete via CMS-panelet — ho skal ikkje trenge Git eller kode.

## Design

Nynorsk tekst, forest-green/paper-cream palett, DM Serif Display + Manrope. Sjå `site/styles.css` for design-tokens (`:root` CSS custom properties).
