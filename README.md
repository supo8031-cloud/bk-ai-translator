# BK AI Translator

A multilingual translator prototype for Android using Capacitor.

## Features
- Text translation using the MyMemory translation service (internet required; free-service limits apply).
- Language selection with a broad list of languages.
- Speech input through the device/browser Speech Recognition API where supported.
- Text-to-speech output through the device Speech Synthesis API where supported.
- Copy translated text.

## Build APK
GitHub Actions builds a debug APK when code is pushed to `main`, or manually from Actions → Build BK AI Translator APK → Run workflow. Download the APK from the completed workflow's Artifacts section.

## Limitations
Voice recognition and speech output depend on Android WebView/device language services and may not work for every language or device. The translation service is third-party and subject to availability, privacy terms, and rate limits. This is a prototype, not a certified professional translation service.
