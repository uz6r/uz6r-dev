(function () {
    var v = localStorage.getItem("theme");
    var m = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var dark = v === "dark" || (!v && m);
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
})();
(function () {
    function setThemeColor() {
        var color = getComputedStyle(document.documentElement)
            .getPropertyValue("--background")
            .trim();
        if (!color) return;
        document.querySelectorAll('meta[name="theme-color"]').forEach(function (meta) {
            meta.setAttribute("content", color);
            meta.removeAttribute("media");
        });
    }
    setThemeColor();
    window.addEventListener("themechange", setThemeColor);
})();
