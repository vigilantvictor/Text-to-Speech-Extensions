chrome.runtime.onInstalled.addListener(() => {

    chrome.contextMenus.create({

        id: "speak-selected-text",

        title: "🔊 Speak Selected Text",

        contexts: ["selection"]
    });

});


chrome.contextMenus.onClicked.addListener(
    (info, tab) => {

        if (
            info.menuItemId ===
            "speak-selected-text"
        ) {

            if (
                tab &&
                tab.id &&
                info.selectionText
            ) {

                chrome.tabs.sendMessage(
                    tab.id,
                    {
                        action: "speak",
                        text: info.selectionText
                    }
                );
            }
        }
    }
);