  window.lattePluginSetting = {
    "master_uid": "19f4f4831465422c8b1a138b76e2fd73",
      "chatbot_uid": "2fa71371ae654367b4740f174ec5290e",
      "origin_uid": "2fa71371ae654367b4740f174ec5290e"
  };
  (function() {
    if (window.LatteAI) {
      return (window.console.error || window.console.log || function(){})('LatteAI script included twice.');
    }
    var LatteAI = function() {
      LatteAI.c(arguments);
    };
    LatteAI.q = [];
    LatteAI.c = function(args) {
      LatteAI.q.push(args);
    };
    window.LatteAI = LatteAI;

    var loadScript = function() {
      if (window.latteInitialized) {
        return;
      }
      window.latteInitialized = true;
      var scriptTag = document.createElement("script");
      scriptTag.type = "text/javascript";
      scriptTag.async = true;
      scriptTag.src = "https://widget.latte.ai/main.js";
      scriptTag.charset = "UTF-8";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);
    }
    if (document.readyState === 'complete') {
      loadScript();
    } else if (window.attachEvent) {
      window.attachEvent('onload', loadScript);
    } else {
      window.addEventListener('DOMContentLoaded', loadScript, false);
      window.addEventListener('load', loadScript, false);
    }
  })();