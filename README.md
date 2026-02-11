---

# CHOOSER – Fortune Wheel App

Eine mobile Glücksrad-App mit **React Native + Expo**.
Die App läuft in **Expo Go** und benötigt **kein Backend**.

---

## Funktionen

* Optionen zum Rad hinzufügen und löschen
* Dreh-Animation mit zufälligem Ergebnis
* Ergebnis-Popup mit Option zum Entfernen
* Bottom-Tab Navigation (Wheel / Settings / Profile)
* Dark-Mode Umschaltung
* Statische Freundesliste mit Detailansicht

---

## Voraussetzungen

* Node.js **>= 20**
* npm
* Expo Go App (iOS oder Android)

---

## Installation

Repository klonen:

```bash
git clone <REPO-URL>
cd <PROJEKT-ORDNER>
```

Abhängigkeiten installieren:

```bash
npm install
```

---

## App starten

Expo starten:

```bash
npx expo start
```

Dann:

1. **Expo Go** auf dem Smartphone öffnen
2. QR-Code scannen

Wichtig: Smartphone und Computer müssen im **gleichen WLAN** sein.

Falls es nicht verbindet:

```bash
npx expo start --tunnel
```

---

## Verwendete Technologien

* Expo (SDK 54)
* React Native
* React Navigation (Bottom Tabs + Native Stack)
* TypeScript

---

## Hinweise

* Kein Backend notwendig
* Keine API-Keys erforderlich
* Alle Daten werden lokal im State gespeichert

---
