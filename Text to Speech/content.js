chrome.runtime.onMessage.addListener(
    (message) => {

        if (message.action === "speak") {

            speak(message.text);
        }


        if (
            message.action ===
            "getSelectedText"
        ) {

            const text =
                window
                    .getSelection()
                    .toString()
                    .trim();

            if (text) {

                speak(text);
            }
        }
    }
);


function speak(text) {

    if (!text) return;

    speechSynthesis.cancel();

    const speech =
        new SpeechSynthesisUtterance(text);

    speechSynthesis.speak(speech);
}