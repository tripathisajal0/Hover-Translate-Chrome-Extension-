document.addEventListener('DOMContentLoaded', function() {
  const saveButton = document.getElementById('saveLanguage');
  const languageSelect = document.getElementById('languageSelect');

  if (saveButton && languageSelect) {
    saveButton.addEventListener('click', function() {
      const selectedLanguage = languageSelect.value;
      chrome.storage.sync.set({ preferredLanguage: selectedLanguage }, function() {
        alert('Preferred language saved as:', selectedLanguage);
      });
    });
  } else {
    alert('Error: saveLanguage button or languageSelect dropdown not found');
  }
});
