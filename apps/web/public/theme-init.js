(function () {
    if (typeof console !== "undefined" && console.error) {
        var orig = console.error;
        console.error = function () {
            var s = Array.prototype.slice
                .call(arguments)
                .map(function (a) {
                    return typeof a === "string" ? a : "";
                })
                .join(" ");
            var isHydrationAttrMismatch =
                (s.indexOf("did not match") !== -1 || s.indexOf("didn't match") !== -1) &&
                (s.indexOf("Hydration") !== -1 || s.indexOf("attributes") !== -1);
            if (isHydrationAttrMismatch) return;
            return orig.apply(console, arguments);
        };
    }
})();
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
