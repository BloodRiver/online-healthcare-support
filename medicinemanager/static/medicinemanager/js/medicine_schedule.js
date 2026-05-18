document.addEventListener('DOMContentLoaded', function () {
  const DISABLED_BTN_CLASS = 'ms-btn-disabled';
  const CARD_TAKEN_CLASS = 'ms-card-taken';

  
  if (!document.getElementById('ms-toggle-styles')) {
    const style = document.createElement('style');
    style.id = 'ms-toggle-styles';
    style.textContent = `
      .${DISABLED_BTN_CLASS} {
        pointer-events: none;
        opacity: 0.55;
        background-color: #e6e6e6 !important;
        color: #888 !important;
        border-color: transparent !important;
        box-shadow: none !important;
      }
      .${CARD_TAKEN_CLASS} {
        background-color: transparent !important;
        border-color: transparent !important;
        color: #6b7280;
        opacity: 0.85;
      }
      .ms-btn-untaken {
        pointer-events: auto;
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
  }

  function findCardElement(el) {
    return el.closest('.bg-white') || el.closest('.rounded-2xl') || el.closest('.shadow-sm') || el.closest('.border') || el.closest('.p-4');
  }

  function setTakenState(button, taken) {
    if (!button) return;
    
    if (!button.dataset.originalText) button.dataset.originalText = button.textContent.trim();

    const card = findCardElement(button);

    if (taken) {
      button.classList.add(DISABLED_BTN_CLASS);
      button.textContent = 'TAKEN';
      if (card) card.classList.add(CARD_TAKEN_CLASS);
      button.dataset.taken = 'true';
    } else {
      button.classList.remove(DISABLED_BTN_CLASS);
      button.textContent = button.dataset.originalText;
      if (card) card.classList.remove(CARD_TAKEN_CLASS);
      button.dataset.taken = 'false';
    }
  }

  function toggleTaken(button) {
    const currentlyTaken = button.dataset.taken === 'true';
    setTakenState(button, !currentlyTaken);
  }

  function attachToggleToButton(btn) {
    if (!btn || btn._msListenerAttached) return;
    
    btn.addEventListener('click', function (e) {
      
      
      setTimeout(() => {
        
        
        toggleTaken(btn);
      }, 0);
    });
    
    if (btn.dataset.taken === 'true') setTakenState(btn, true);
    btn._msListenerAttached = true;
  }

  
  const takeButtons = Array.from(document.querySelectorAll('button'))
    .filter(b => /MARK AS TAKEN|TAKE NOW|TAKEN/i.test(b.textContent.trim()));

  takeButtons.forEach(attachToggleToButton);

  
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (!(node instanceof HTMLElement)) continue;
        const newBtns = Array.from(node.querySelectorAll('button'))
          .filter(b => /MARK AS TAKEN|TAKE NOW|TAKEN/i.test(b.textContent.trim()));
        newBtns.forEach(attachToggleToButton);
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
