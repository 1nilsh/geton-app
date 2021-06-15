# GET.ON App

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
ionic serve
```

### Compiles and minifies for production
```
ionic build
```

### Lints and fixes files
```
npm run lint
```

### Generating features
```
ionic generate
```

## Architektur

Grundsätzlich handelt es sich um eine Ionic+Angular App. Deshalb bleibt der obere Teil ("Project Setup") unverändert gültig.
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

Die zugehörigen Build-Konfigurationen werden in der `angular.json` unter dem Schlüssel `projects > app > architect > build > configurations` gesetzt.
