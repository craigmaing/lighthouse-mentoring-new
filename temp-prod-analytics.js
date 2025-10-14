// Google Analytics initialization
(function() {
  // Get the GA measurement ID from the script tag's data attribute
  const gaScript = document.currentScript;
  const gaId = gaScript ? gaScript.getAttribute('data-ga-id') : null;

  if (gaId) {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', gaId, {
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure'
    });
  }
})();
