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

## Personar

- **Per** (repo-eigar, `git@github.com:Mrexes72/fossberg-redesign.git`) gjer kode-/designendringar.
- Ein namngjeven kontaktperson hos hotellet ("henne") redigerer løpande tekst/bilete via CMS-panelet — ho skal ikkje trenge Git eller kode.

## Design

Nynorsk tekst, forest-green/paper-cream palett, DM Serif Display + Manrope. Sjå `site/styles.css` for design-tokens (`:root` CSS custom properties).
