(function(){
  var yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('navLinks');
  if(toggle && links){
    toggle.addEventListener('click', function(){
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ links.classList.remove('open'); });
    });
  }

  // smooth-scroll offset for in-page anchors (used on the vision page)
  var navbarEl = document.getElementById('navbar');
  var navHeight = navbarEl ? navbarEl.offsetHeight : 0;
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var id = a.getAttribute('href').slice(1);
      if(!id) return;
      var target = document.getElementById(id);
      if(!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - (navHeight - 1);
      window.scrollTo({top: top, behavior: 'smooth'});
    });
  });

  // scroll progress thread
  var thread = document.getElementById('thread-progress');
  function updateThread(){
    if(!thread) return;
    var h = document.documentElement;
    var scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
    thread.style.transform = 'scaleX(' + Math.min(scrolled,1) + ')';
  }
  document.addEventListener('scroll', updateThread, {passive:true});
  updateThread();

  // reveal on scroll
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.15, rootMargin:'0px 0px -60px 0px'});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in-view'); });
  }
})();
