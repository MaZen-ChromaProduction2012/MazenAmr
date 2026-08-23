(function(){
  var QA = [
    {
      q: "مين محمد صبري؟",
      a: "رائد فن الباستيل في مصر (1923-2017). درس التصوير بكلية الفنون التطبيقية بالقاهرة، وحصل على الأستاذية من أكاديمية سان فرناندو في مدريد، واشتهر بتصوير حارات القاهرة وضوئها المميز بألوان الباستيل."
    },
    {
      q: "مين رمسيس ويصا واصف؟",
      a: "معماري ومربٍّ مصري (1911-1974) درس العمارة في باريس، وآمن أن كل طفل يحمل فناناً بداخله. أسّس تجربة الحرانية لتعليم النسيج اليدوي، وصمّم مبانٍ بالقباب والأقبية من غير خرسانة مسلحة."
    },
    {
      q: "مين عبد الغني الشال؟",
      a: "فنان تشكيلي وباحث في التراث الشعبي (1928-1999)، حاصل على الدكتوراه من جامعة القاهرة. جاب قرى مصر ليدرس الفنون الفطرية، وألّف كتاب \"عروسة المولد\"، واستخدم الرموز الشعبية في لوحاته."
    },
    {
      q: "إيه هي تجربة الحرانية؟",
      a: "تجربة بدأها رمسيس ويصا واصف سنة 1952 في قرية الحرانية بالجيزة، لتعليم أطفال القرية فن النسيج المرسم بثلاث قواعد صارمة: لا رسومات مسبقة، لا تدخل خارجي، ولا آلات؛ النساج ينسج من خياله فقط."
    },
    {
      q: "إيه القواعد التلاتة في نسيج الحرانية؟",
      a: "لا رسومات مسبقة (النساج يعمل من خياله)، لا تدخل خارجي من المعلمين، ولا استخدام لأي آلات — كل حاجة بتتعمل بإيدين النساج بالكامل."
    },
    {
      q: "إيه هو فن الباستيل؟",
      a: "أسلوب تصوير بألوان طباشيرية صعبة التحكم، اشتهر بيه محمد صبري في التقاط الضوء المصري بدقة، ووثّق بيه حارات القاهرة وبيوتها الإسلامية ومساجدها."
    },
    {
      q: "فين لوحات محمد صبري موجودة دلوقتي؟",
      a: "أعماله مقتناة في متاحف عالمية زي متحف البرادو بإسبانيا (اللي أقام فيه معرضاً خاصاً، وهو الفنان المصري الوحيد اللي عمل كده)، وكمان في مدريد وواشنطن وجامعة الدول العربية."
    },
    {
      q: "إيه اللي وثّقه عبد الغني الشال في بحثه؟",
      a: "ركّز في أبحاثه على الوشم، والعرائس الشعبية، والموالد، والحصير المصري، ووثّق كل ده من خلال جولات ميدانية في قرى مصر، مش من خلف المكتب."
    },
    {
      q: "إيه العلاقة بين التلاتة؟",
      a: "شكّلوا معاً ثلاثية الوعي بالتراث المصري: محمد صبري رسم الهوية باللون، رمسيس ويصا واصف نسجها بالممارسة اليدوية، وعبد الغني الشال حلّلها بالبحث العلمي — كل واحد فيهم كمّل التاني."
    },
    {
      q: "إيه أهم جوايز حصل عليها الثلاثة؟",
      a: "محمد صبري حصل على وسام الاستحقاق المدني من إسبانيا وجائزة الدولة التقديرية في الفنون. رمسيس ويصا واصف حصل على جائزة آغا خان للعمارة عام 1983. وعبد الغني الشال أستاذ متفرغ خرّج أجيال من الفنانين."
    }
  ];

  var toggle = document.getElementById('faq-toggle');
  var panel = document.getElementById('faq-panel');
  var closeBtn = document.getElementById('faq-close');
  var list = document.getElementById('faqList');
  var search = document.getElementById('faq-search');
  if(!toggle || !panel || !list) return;

  function renderList(items){
    list.innerHTML = '';
    if(items.length === 0){
      var empty = document.createElement('p');
      empty.className = 'faq-empty';
      empty.textContent = 'مفيش سؤال متطابق، جرّب كلمة تانية.';
      list.appendChild(empty);
      return;
    }
    items.forEach(function(item, idx){
      var wrap = document.createElement('div');
      wrap.className = 'faq-item';

      var qBtn = document.createElement('button');
      qBtn.className = 'faq-q';
      qBtn.setAttribute('aria-expanded', 'false');
      qBtn.innerHTML = '<span>' + item.q + '</span><i class="fa-solid fa-chevron-down"></i>';

      var aBox = document.createElement('div');
      aBox.className = 'faq-a';
      var aP = document.createElement('p');
      aP.textContent = item.a;
      aBox.appendChild(aP);

      qBtn.addEventListener('click', function(){
        var isOpen = wrap.classList.contains('open');
        list.querySelectorAll('.faq-item.open').forEach(function(el){
          el.classList.remove('open');
          el.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        });
        if(!isOpen){
          wrap.classList.add('open');
          qBtn.setAttribute('aria-expanded', 'true');
        }
      });

      wrap.appendChild(qBtn);
      wrap.appendChild(aBox);
      list.appendChild(wrap);
    });
  }

  renderList(QA);

  function openPanel(){
    panel.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.addEventListener('click', outsideClick);
    document.addEventListener('keydown', onEsc);
    if(search) search.focus({preventScroll:true});
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

  if(search){
    search.addEventListener('input', function(){
      var term = search.value.trim();
      if(!term){ renderList(QA); return; }
      var filtered = QA.filter(function(item){
        return item.q.indexOf(term) !== -1 || item.a.indexOf(term) !== -1;
      });
      renderList(filtered);
    });
  }
})();
