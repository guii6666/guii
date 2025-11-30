export const speakFrench = (text: string) => {
  if (!('speechSynthesis' in window)) {
    console.warn("TTS not supported in this browser environment");
    alert("您的浏览器或微信版本暂不支持本地语音播放。");
    return;
  }
  
  // Cancel previous to avoid queue buildup
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  // Default to fr-FR, but system will try to match
  utterance.lang = 'fr-FR';
  utterance.rate = 0.9; // Slightly slower for learning
  
  // Logic to force a French voice if available
  // Note: onVoicesChanged is async, so on first load voices might be empty.
  const loadVoicesAndSpeak = () => {
    const voices = window.speechSynthesis.getVoices();
    // Prioritize Google French or generic French
    const frVoice = voices.find(v => v.lang === 'fr-FR' && v.name.includes('Google')) || 
                    voices.find(v => v.lang.includes('fr'));
    
    if (frVoice) {
      utterance.voice = frVoice;
    }
    
    // Error handling
    utterance.onerror = (event) => {
        console.error("Speech synthesis error", event);
    };

    window.speechSynthesis.speak(utterance);
  };

  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.onvoiceschanged = () => {
       loadVoicesAndSpeak();
       window.speechSynthesis.onvoiceschanged = null; // Clean up
    };
  } else {
    loadVoicesAndSpeak();
  }
};