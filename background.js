chrome.commands.onCommand.addListener(function(command) {
  if (command === "translate-text") {
    // Get the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const activeTab = tabs[0];

      // Execute script to get the selected text from the page
      chrome.scripting.executeScript({
        target: {tabId: activeTab.id},
        func: getSelectedText,
      }, (results) => {
        if (results && results[0] && results[0].result) {
          const selectedText = results[0].result;
          // Fetch preferred language from storage
          chrome.storage.sync.get('preferredLanguage', function(data) {
            const preferredLanguage = data.preferredLanguage || 'hi'; // Default to Hindi

            // Fetch the translation using Google Translate API
            fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${preferredLanguage}&dt=t&q=${encodeURIComponent(selectedText)}`)
              .then(response => response.json())
              .then(data => {
                const translatedText = data[0][0][0];
                alert(`Translated text: ${translatedText}`);
              })
              .catch(error => {
                console.error("Translation error:", error);
              });
          });
        } else {
          alert("Please select some text to translate.");
        }
      });
    });
  }
});

// Function to get selected text from the active page
function getSelectedText() {
  return window.getSelection().toString();
}
