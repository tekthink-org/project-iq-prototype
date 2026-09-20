/* Project IQ — mobile navigation drawer.
   Add before </body> on every page:  <script src="js/nav.js"></script>
   It reuses your existing .sidebar markup, so nav links stay in sync. */
(function () {
  function init() {
    var sidebar = document.querySelector('.sidebar');
    var host = document.querySelector('.topbar-left') || document.querySelector('.topbar');
    if (!sidebar || !host || document.querySelector('.navbtn')) return;

    var btn = document.createElement('button');
    btn.className = 'navbtn';
    btn.setAttribute('aria-label', 'Open menu');
    btn.innerHTML = '\u2630';                 // ☰
    host.insertBefore(btn, host.firstChild);

    var drawer = document.createElement('nav');
    drawer.className = 'drawer';
    drawer.innerHTML = sidebar.innerHTML;     // clone existing nav

    var back = document.createElement('div');
    back.className = 'drawer-backdrop';

    document.body.appendChild(back);
    document.body.appendChild(drawer);

    var open  = function () { drawer.classList.add('open'); back.classList.add('open'); };
    var close = function () { drawer.classList.remove('open'); back.classList.remove('open'); };

    btn.addEventListener('click', open);
    back.addEventListener('click', close);
    drawer.addEventListener('click', function (e) { if (e.target.closest('a')) close(); });
    window.addEventListener('resize', function () { if (window.innerWidth > 768) close(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
