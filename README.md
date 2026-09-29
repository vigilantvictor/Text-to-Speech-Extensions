# Text-to-Speech-Extensions
Smart Text to Speech — A Chrome extension that converts text into speech with customizable voice, speed, pitch, and volume controls, plus the ability to speak selected text directly from webpages.
===============================================================================================================================
# 🔊 Smart Text to Speech

A lightweight and user-friendly **Chrome Extension** that converts written text into natural speech directly in your browser.

Smart Text to Speech uses the browser's built-in **Web Speech API**, so it does not require external APIs, API keys, or a backend server.

## ✨ Features

* 🔊 Convert typed text into speech
* 🖱️ Speak selected text directly from webpages
* 🎙️ Select from available browser voices
* 🌍 Support for multiple languages and voices provided by the browser
* ⚡ Adjustable speech speed
* 🎚️ Adjustable pitch
* 🔊 Adjustable volume
* ⏯️ Play, pause, resume, and stop speech
* 📋 Paste text directly into the extension
* 🧹 Clear text with one click
* 🔢 Real-time character counter
* 💾 Automatically saves voice and speech settings
* 🌙 Modern dark-themed interface
* 🚫 No external API or backend required

## 🛠️ Technologies Used

* **HTML5** — Extension interface
* **CSS3** — UI design and responsive styling
* **JavaScript** — Application logic and speech controls
* **Chrome Extension Manifest V3** — Browser extension architecture
* **Web Speech API** — Text-to-speech functionality
* **Chrome Storage API** — Saving user preferences
* **Chrome Context Menus API** — Speak selected webpage text

## 📁 Project Structure

```text
Smart-Text-to-Speech/
│
├── manifest.json
├── background.js
├── content.js
├── popup.html
├── popup.css
└── popup.js
```

### File Overview

| File            | Purpose                                                    |
| --------------- | ---------------------------------------------------------- |
| `manifest.json` | Defines the Chrome extension configuration and permissions |
| `popup.html`    | Creates the extension popup interface                      |
| `popup.css`     | Handles the popup's styling and layout                     |
| `popup.js`      | Controls the popup and text-to-speech functionality        |
| `background.js` | Handles extension background tasks and context menus       |
| `content.js`    | Communicates with webpages and handles selected text       |

## 🚀 Installation

This project can be installed locally as an unpacked Chrome extension.

### 1. Clone the repository

```bash
git clone https://github.com/your-username/Smart-Text-to-Speech.git
```

### 2. Open Chrome Extensions

Go to:

```text
chrome://extensions/
```

### 3. Enable Developer Mode

Enable **Developer mode** in the top-right corner.

### 4. Load the extension

Click:

**Load unpacked → Select the Smart-Text-to-Speech folder**

### 5. Pin the extension

Click the Chrome extensions icon 🧩 and pin **Smart Text to Speech**.

## 🖱️ Using Selected Text

The extension can read selected text directly from supported webpages.

1. Open a webpage.
2. Select some text.
3. Right-click the selected text.
4. Choose **🔊 Speak Selected Text**.
5. The selected text will be read aloud.

## ⚙️ How It Works

The extension is built around the browser's native speech synthesis functionality.

```text
User enters text
       ↓
    popup.js
       ↓
SpeechSynthesis API
       ↓
    Browser
       ↓
     🔊 Voice
```

For selected webpage text:

```text
Webpage
   ↓
User selects text
   ↓
Right-click
   ↓
Speak Selected Text
   ↓
background.js
   ↓
content.js
   ↓
SpeechSynthesis API
   ↓
🔊 Speech
```

## 🔐 Privacy

Smart Text to Speech does not require an external server or third-party speech API.

Text is processed using the browser's built-in speech synthesis functionality.

The extension does not require an account or collect text entered into the extension.

## ⚠️ Browser Compatibility

Voice availability depends on the browser and operating system. Different devices may provide different voices and languages.

Some protected Chrome pages, such as `chrome://` pages and the Chrome Web Store, do not allow content scripts to run.

## 🔮 Future Improvements

* 🎨 Light/Dark theme switching
* 🌍 Better language filtering
* 🔎 Voice search and filtering
* 📖 Full webpage reading mode
* ⏩ Reading controls and sentence navigation
* 🎛️ Floating mini-player
* ⌨️ Custom keyboard shortcuts
* 📊 Reading history
* 🔖 Save frequently used texts
* 📦 Chrome Web Store release

## 📄 License

This project is open source and available under the **MIT License**.

---

### 👨‍💻 Author

**Vigilant**

Built with HTML, CSS, JavaScript, and the Web Speech API.
