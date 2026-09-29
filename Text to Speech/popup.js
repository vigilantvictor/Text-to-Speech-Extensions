const textInput =
    document.getElementById("textInput");

const voiceSelect =
    document.getElementById("voiceSelect");

const rate =
    document.getElementById("rate");

const pitch =
    document.getElementById("pitch");

const volume =
    document.getElementById("volume");

const rateValue =
    document.getElementById("rateValue");

const pitchValue =
    document.getElementById("pitchValue");

const volumeValue =
    document.getElementById("volumeValue");

const speakBtn =
    document.getElementById("speakBtn");

const pauseBtn =
    document.getElementById("pauseBtn");

const stopBtn =
    document.getElementById("stopBtn");

const clearBtn =
    document.getElementById("clearBtn");

const pasteBtn =
    document.getElementById("pasteBtn");

const charCount =
    document.getElementById("charCount");

const statusText =
    document.getElementById("statusText");

const statusDot =
    document.getElementById("statusDot");


let voices = [];


// ================================
// Load voices
// ================================

function loadVoices() {

    voices =
        speechSynthesis.getVoices();

    voiceSelect.innerHTML = "";

    voices.forEach((voice, index) => {

        const option =
            document.createElement("option");

        option.value = index;

        option.textContent =
            `${voice.name} — ${voice.lang}`;

        voiceSelect.appendChild(option);
    });

    restoreSettings();
}


speechSynthesis.onvoiceschanged =
    loadVoices;

loadVoices();


// ================================
// Character counter
// ================================

textInput.addEventListener(
    "input",
    updateCharacterCount
);


function updateCharacterCount() {

    const count =
        textInput.value.length;

    charCount.textContent =
        `${count} character${count === 1 ? "" : "s"}`;
}


// ================================
// Sliders
// ================================

rate.addEventListener(
    "input",
    () => {

        rateValue.textContent =
            `${Number(rate.value).toFixed(1)}x`;

        saveSettings();
    }
);


pitch.addEventListener(
    "input",
    () => {

        pitchValue.textContent =
            Number(pitch.value).toFixed(1);

        saveSettings();
    }
);


volume.addEventListener(
    "input",
    () => {

        volumeValue.textContent =
            `${Math.round(volume.value * 100)}%`;

        saveSettings();
    }
);


// ================================
// Speak
// ================================

speakBtn.addEventListener(
    "click",
    speakText
);


function speakText() {

    const text =
        textInput.value.trim();

    if (!text) {

        setStatus(
            "Enter some text first.",
            "error"
        );

        textInput.focus();

        return;
    }


    speechSynthesis.cancel();


    const utterance =
        new SpeechSynthesisUtterance(text);


    const selectedVoice =
        voices[voiceSelect.value];


    if (selectedVoice) {
        utterance.voice =
            selectedVoice;
    }


    utterance.rate =
        Number(rate.value);

    utterance.pitch =
        Number(pitch.value);

    utterance.volume =
        Number(volume.value);


    utterance.onstart = () => {

        speakBtn.innerHTML =
            "🔊 Speaking...";

        setStatus(
            "Speaking",
            "speaking"
        );
    };


    utterance.onend = () => {

        speakBtn.innerHTML =
            "▶ Speak";

        pauseBtn.textContent =
            "⏸";

        setStatus(
            "Finished",
            "ready"
        );
    };


    utterance.onerror = () => {

        speakBtn.innerHTML =
            "▶ Speak";

        setStatus(
            "Speech error",
            "error"
        );
    };


    speechSynthesis.speak(
        utterance
    );
}


// ================================
// Pause / Resume
// ================================

pauseBtn.addEventListener(
    "click",
    () => {

        if (!speechSynthesis.speaking) {
            return;
        }


        if (speechSynthesis.paused) {

            speechSynthesis.resume();

            pauseBtn.textContent =
                "⏸";

            setStatus(
                "Speaking",
                "speaking"
            );

        } else {

            speechSynthesis.pause();

            pauseBtn.textContent =
                "▶";

            setStatus(
                "Paused",
                "paused"
            );
        }
    }
);


// ================================
// Stop
// ================================

stopBtn.addEventListener(
    "click",
    () => {

        speechSynthesis.cancel();

        speakBtn.innerHTML =
            "▶ Speak";

        pauseBtn.textContent =
            "⏸";

        setStatus(
            "Stopped",
            "ready"
        );
    }
);


// ================================
// Clear
// ================================

clearBtn.addEventListener(
    "click",
    () => {

        speechSynthesis.cancel();

        textInput.value = "";

        updateCharacterCount();

        speakBtn.innerHTML =
            "▶ Speak";

        setStatus(
            "Ready",
            "ready"
        );
    }
);


// ================================
// Paste
// ================================

pasteBtn.addEventListener(
    "click",
    async () => {

        try {

            const text =
                await navigator.clipboard.readText();

            textInput.value = text;

            updateCharacterCount();

            setStatus(
                "Text pasted",
                "ready"
            );

        } catch {

            setStatus(
                "Clipboard permission denied",
                "error"
            );
        }
    }
);


// ================================
// Status
// ================================

function setStatus(
    message,
    type
) {

    statusText.textContent =
        message;


    if (type === "speaking") {

        statusDot.style.background =
            "#8b5cf6";

    } else if (type === "paused") {

        statusDot.style.background =
            "#f59e0b";

    } else if (type === "error") {

        statusDot.style.background =
            "#ef4444";

    } else {

        statusDot.style.background =
            "#4ade80";
    }
}


// ================================
// Save settings
// ================================

function saveSettings() {

    chrome.storage.local.set({

        rate: rate.value,

        pitch: pitch.value,

        volume: volume.value,

        voice:
            voiceSelect.value
    });
}


// ================================
// Restore settings
// ================================

function restoreSettings() {

    chrome.storage.local.get(
        [
            "rate",
            "pitch",
            "volume",
            "voice"
        ],
        (settings) => {

            if (settings.rate) {
                rate.value =
                    settings.rate;

                rateValue.textContent =
                    `${Number(settings.rate).toFixed(1)}x`;
            }

            if (settings.pitch) {
                pitch.value =
                    settings.pitch;

                pitchValue.textContent =
                    Number(settings.pitch).toFixed(1);
            }

            if (settings.volume) {
                volume.value =
                    settings.volume;

                volumeValue.textContent =
                    `${Math.round(
                        settings.volume * 100
                    )}%`;
            }

            if (
                settings.voice &&
                voices[settings.voice]
            ) {

                voiceSelect.value =
                    settings.voice;
            }
        }
    );
}


// ================================
// Voice change
// ================================

voiceSelect.addEventListener(
    "change",
    saveSettings
);