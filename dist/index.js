(() => {
  // script.js
  var Webflow = Webflow || [];
  Webflow.push(function() {
    if (navigator.userAgent.includes("Safari")) {
      document.querySelectorAll('[vertical-tab-element="tab"]').forEach(
        (t) => t.focus = function() {
          const x = window.scrollX, y = window.scrollY;
          const f = () => {
            setTimeout(() => window.scrollTo(x, y), 1);
            t.removeEventListener("focus", f);
          };
          t.addEventListener("focus", f);
          HTMLElement.prototype.focus.apply(this, arguments);
        }
      );
    }
    var tabTimeout;
    clearTimeout(tabTimeout);
    tabLoop();
    function tabLoop() {
      tabTimeout = setTimeout(function() {
        var $next = $("[vertical-tab-element='menu']").children(".w--current:first").next();
        console.log($next);
        if ($next.length) {
          $next.click();
        } else {
          $("[vertical-tab-element='tab']:first").click();
        }
      }, 5e3);
    }
    $("[vertical-tab-element='tab']").click(function() {
      clearTimeout(tabTimeout);
      tabLoop();
    });
  });
})();
