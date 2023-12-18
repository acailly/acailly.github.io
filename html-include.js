(function () {
  const currentScript = /** @type HTMLScriptElement */ (document.currentScript);
  const url = new URL(currentScript.src).searchParams.get("url");
  if (url) {
    fetch(url)
      .then((response) => response.text())
      .then((result) => {
        currentScript.insertAdjacentHTML("afterend", result);
        currentScript.remove();
      });
  }
})();
