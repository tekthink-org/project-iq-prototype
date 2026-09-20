/* Project IQ — mobile navigation drawer.
   Add before </body> on every page:  <script src="js/nav.js"></script>
   Works with both static sidebars and the sidebar that common.js
   injects at runtime (it waits for .sidebar to appear). */
(function () {
  function build(sidebar, host) {
    if (document.querySelector('.navbtn')) return;   // already built

    var btn = document.createElement('button');
    btn.className = 'navbtn';
    btn.setAttribute('aria-label', 'Open menu');
    btn.innerHTML = '\u2630';                          // ☰
    host.insertBefore(btn, host.firstChild);

    var drawer = document.createElement('nav');
    drawer.className = 'drawer';
    drawer.innerHTML = sidebar.innerHTML;             // reuse existing nav

    var back = document.createElement('div');
    back.className = 'drawer-backdrop';

    document.body.appendChild(back);
    document.body.appendChild(drawer);

    var open  = function () { drawer.classList.add('open');  back.classList.add('open');  };
    var close = function () { drawer.classList.remove('open'); back.classList.remove('open'); };

    btn.addEventListener('click', open);
    back.addEventListener('click', close);
    drawer.addEventListener('click', function (e) { if (e.target.closest('a')) close(); });
    window.addEventListener('resize', function () { if (window.innerWidth > 768) close(); });
  }

  // Poll for the sidebar + topbar (the sidebar may be injected by common.js).
  function waitFor(attempt) {
    var sidebar = document.querySelector('.sidebar');
    var host = document.querySelector('.topbar-left') || document.querySelector('.topbar');
    if (sidebar && host) { build(sidebar, host); return; }
    if (attempt < 40) setTimeout(function () { waitFor(attempt + 1); }, 100); // ~4s max
  }
  function start() { waitFor(0); }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
