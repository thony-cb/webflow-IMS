var Webflow = Webflow || [];
Webflow.push(function () {
  // Fix for Safari
  if (navigator.userAgent.includes("Safari")) {
    document.querySelectorAll(".tab-button").forEach(
      (t) =>
        (t.focus = function () {
          const x = window.scrollX,
            y = window.scrollY;
          const f = () => {
            setTimeout(() => window.scrollTo(x, y), 1);
            t.removeEventListener("focus", f);
          };
          t.addEventListener("focus", f);
          HTMLElement.prototype.focus.apply(this, arguments);
        })
    );
  }

  // Start Tabs
  var tabTimeout;
  clearTimeout(tabTimeout);
  tabLoop();

  // Connect your class names to elements.
  function tabLoop() {
    tabTimeout = setTimeout(function () {
      var $next = $(".tabs-menu").children(".w--current:first").next();

      if ($next.length) {
        $next.click(); // user click resets timeout
      } else {
        $(".tab-button:first").click();
      }
    }, 5000); // 5 Second Rotation
  }

  // Reset Loops
  $(".tab-button").click(function () {
    clearTimeout(tabTimeout);
    tabLoop();
  });
});
