# GET.ON App

## Projektsetup

### Technische Voraussetzungen

Es muss `Node.js` in der Version `^16.0` auf dem Entwicklerrechner global installiert sein.

Außerdem muss der Node Package Manager `npm` in der Version `^7.19.0` installiert sein.

Optional kann `ionic/cli` in der Version `^6.13.0` global installiert werden.
Im Folgenden wird davon ausgegangen, dass dies der Fall ist.
Wenn Ionic nicht global installiert ist, müssen alle `ionic` Aufrufe in dieser Dokumentation durch
`./node_modules/@ionic/cli/bin/ionic` ersetzt werden.

### Dependencies installieren

Im Projektverzeichnis ausführen:
```bash
npm install
```

### Projekt für die Entwicklung kompilieren und mit hot-reload starten
```bash
ionic serve
```

### Lints and fixes files
```bash
npm run lint
```

### Generating features
```bash
ionic generate
```

### Build für Staging/Production environments
```bash
ionic build --configuration=staging
```

```bash
ionic build --configuration=production
```

## Architektur

Grundsätzlich handelt es sich um eine Ionic+Angular App. Deshalb bleibt der
obere Teil ("Project Setup") unverändert gültig.
Dokumentation unter https://ionicframework.com/docs/angular/overview

Unter `src/app/` liegen `applicationlogic`, `data`, `infrastructure` und `presentation`.

* `applicationlogic` enthält die Logik der App
* `data` enthält die Datenzugriffsschicht, also z.B. speichern auf dem Gerät
* `infrastructure` enthält übergreifende infrastrukturelle Hilfsklassen, z.B. die eigene time pipe
* `presentation` enthält die Darstellung der App, also die angezeigten Seiten

Unter `src/theme/` liegen die Dateien

* `app.scss` mit generellen, App-übergreifenden Stylings
* `variables.scss` mit den anpassbaren Farbvariablen

Unter `src/environments/` liegen Konfigurationen für die Deployment-Environments.
Das sind noch das standardmäßige environment für die lokale Entwicklung sowie environments für staging und production.

Die zugehörigen Build-Konfigurationen werden in der `angular.json` unter dem Schlüssel
`projects > app > architect > build > configurations` gesetzt.
