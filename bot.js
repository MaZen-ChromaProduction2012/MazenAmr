(function(){
  var WORKER_URL = 'https://cool-king-57d7.mezooalex2012.workers.dev';
  var SITE_ID = 'heritage';

  var STARTERS = [
    'مين محمد صبري؟',
    'إيه هي تجربة الحرانية؟',
    'إيه العلاقة بين التلاتة؟'
  ];

  var toggle = document.getElementById('faq-toggle');
  var panel = document.getElementById('faq-panel');
  var closeBtn = document.getElementById('faq-close');
  var messages = document.getElementById('faqMessages');
  var form = document.getElementById('faqForm');
  var input = document.getElementById('faq-input');
  var sendBtn = document.getElementById('faq-send');
  var starterWrap = document.getElementById('faqStarters');
  if(!toggle || !panel || !messages || !form || !input) return;

  var sending = false;
  var lastSendAt = 0;

  function addBubble(text, who){
    var bubble = document.createElement('div');
    bubble.className = 'faq-bubble ' + (who === 'user' ? 'faq-bubble-user' : 'faq-bubble-bot');
    var p = document.createElement('p');
    p.textContent = text;
    bubble.appendChild(p);
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
    return bubble;
  }

  function addTyping(){
    var bubble = document.createElement('div');
    bubble.className = 'faq-bubble faq-bubble-bot faq-typing';
    bubble.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
    return bubble;
  }

  function renderStarters(){
    if(!starterWrap) return;
    starterWrap.innerHTML = '';
    STARTERS.forEach(function(q){
      var chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'faq-chip';
      chip.textContent = q;
      chip.addEventListener('click', function(){ sendMessage(q); });
      starterWrap.appendChild(chip);
    });
  }

  function setSending(state){
    sending = state;
    if(sendBtn) sendBtn.disabled = state;
    if(input) input.disabled = state;
  }

  function sendMessage(text){
    text = (text || '').trim();
    if(!text || sending) return;

    var now = Date.now();
    if(now - lastSendAt < 2000){
      addBubble('من فضلك استنى ثانيتين بين كل سؤال والتاني.', 'bot');
      return;
    }
    lastSendAt = now;

    if(starterWrap) starterWrap.style.display = 'none';
    addBubble(text, 'user');
    input.value = '';
    setSending(true);
    var typingBubble = addTyping();

    fetch(WORKER_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({site: SITE_ID, message: text})
    })
    .then(function(res){
      if(!res.ok) throw new Error('bad status');
      return res.json();
    })
    .then(function(data){
      typingBubble.remove();
      addBubble(data.answer || 'معلش، مقدرتش أجاوب دلوقتي، جرب تاني.', 'bot');
    })
    .catch(function(){
      typingBubble.remove();
      addBubble('في مشكلة في الاتصال دلوقتي، جرب تاني بعد شوية.', 'bot');
    })
    .finally(function(){
      setSending(false);
    });
  }

  renderStarters();

  form.addEventListener('submit', function(e){
    e.preventDefault();
    sendMessage(input.value);
  });

  function openPanel(){
    panel.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.addEventListener('click', outsideClick);
    document.addEventListener('keydown', onEsc);
    if(input) input.focus({preventScroll:true});
  }
  function closePanel(){
    panel.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.removeEventListener('click', outsideClick);
    document.removeEventListener('keydown', onEsc);
  }
  function outsideClick(e){
    if(!panel.contains(e.target) && e.target !== toggle && !toggle.contains(e.target)){
      closePanel();
    }
  }
  function onEsc(e){
    if(e.key === 'Escape') closePanel();
  }

  toggle.addEventListener('click', function(){
    if(panel.classList.contains('open')) closePanel(); else openPanel();
  });
  if(closeBtn) closeBtn.addEventListener('click', closePanel);

  // hide the floating button (slide it off-screen) once the footer area is reached
  var footerEl = document.querySelector('footer');
  if(footerEl && 'IntersectionObserver' in window){
    var footerObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          toggle.classList.add('faq-hidden');
          if(panel.classList.contains('open')) closePanel();
        } else {
          toggle.classList.remove('faq-hidden');
        }
      });
    }, {threshold:0});
    footerObserver.observe(footerEl);
  }
})();
