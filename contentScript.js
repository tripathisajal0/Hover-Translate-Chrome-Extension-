chrome.storage.sync.get('preferredLanguage', function(data) {
    const preferredLanguage = data.preferredLanguage || 'hi'; // Default to Hindi

    document.body.addEventListener('mouseover', function(event) {
        const target = event.target;

        // Check if the element is block-level (like a paragraph, div, or header)
        if (target && (['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(target.tagName))) {
            const textToTranslate = target.innerText.trim();

            if (textToTranslate) {
                // Fetch translation using Google Translate API
                fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${preferredLanguage}&dt=t&q=${encodeURIComponent(textToTranslate)}`)
                    .then(response => response.json())
                    .then(data => {
                        // Check if translation data is valid
                        if (data && data[0]) {
                            // Rejoin the translated sentences and set them as a tooltip
                            const translatedText = data[0].map(sentence => sentence[0]).join(' ');
                            target.setAttribute('title', translatedText); // Show translation in a tooltip
                        } else {
                            console.error('Translation data is empty or invalid:', data);
                        }
                    })
                    .catch(error => console.error('Error during translation:', error));
            }
        }
    });
});
