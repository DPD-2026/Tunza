/* Tunza by Shaz – simple shared-password gate.
 *
 * NOTE: this is a client-side screen only. It keeps casual visitors out, but
 * the site is static (GitHub Pages), so anyone who reads the source can get past it.
 *
 * To change the password, put the SHA-256 hash of the new one in PASSWORD_HASH:
 *   printf '%s' 'new-password' | shasum -a 256
 * Changing it also logs everyone out.
 */
(function () {
  var PASSWORD_HASH = '185267883b52fc0d774a032d555d0c772d72a80e8fe16e6755bc046ec13a4806';
  var STORAGE_KEY = 'tunza-auth';

  function isLoggedIn() {
    try { return localStorage.getItem(STORAGE_KEY) === PASSWORD_HASH; } catch (e) { return false; }
  }

  window.TunzaAuth = {
    hash: PASSWORD_HASH,
    isLoggedIn: isLoggedIn,
    logIn: function () { try { localStorage.setItem(STORAGE_KEY, PASSWORD_HASH); } catch (e) {} },
    logOut: function () { try { localStorage.removeItem(STORAGE_KEY); } catch (e) {} location.replace('login.html'); }
  };

  var script = document.currentScript;
  if (script && script.hasAttribute('data-login-page')) return;

  if (!isLoggedIn()) {
    // Hide the page immediately so nothing flashes before the redirect.
    document.documentElement.style.display = 'none';
    var page = location.pathname.split('/').pop() || 'index.html';
    location.replace('login.html?next=' + encodeURIComponent(page + location.search + location.hash));
  }
})();
