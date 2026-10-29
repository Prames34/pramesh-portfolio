/* =========================================================
   EDIT THIS BLOCK ONLY. Leave "" for anything you do not
   want to show. Empty items are hidden automatically.
   ========================================================= */
var PROFILE = {
  name:     "Pramesh",
  role:     "Full-stack developer",
  email:    "shresthapramesh954@gmail.com",
  phone:    "9769682334",
  whatsapp: "https://wa.me/9869796392",
  location: "",                      // "Nepal"
  photo:    "",                       // "assets/photo.jpg"
  resume:   "",                      // "assets/Pramesh-CV.pdf"
  linkedin: "",                      // "https://www.linkedin.com/in/your-name"
  github:   "",                      // "https://github.com/your-name"
  facebook: "https://www.facebook.com/pramesa.srestha",
  instagram: "https://www.instagram.com/prameshhh___",
  threads: "https://www.threads.net/@prameshhh___",
  GameShop:     "",                    // live GameShop URL
  projecthub: "",
  quotexbot:  ""
};
/* ======================= END EDIT ======================== */

(function () {
  var P = PROFILE;

  function value(key) {
    var v = P[key] || "";
    if (key === "email" && v) return "mailto:" + v;
    if (key === "phone" && v) return "tel:" + v.replace(/[^+\d]/g, "");
    return v;
  }

  // text bindings
  document.querySelectorAll("[data-text]").forEach(function (el) {
    var v = P[el.dataset.text];
    if (v) { el.textContent = v; el.hidden = false; } else if (el.hasAttribute("hidden")) { el.hidden = true; }
  });

  // link bindings
  document.querySelectorAll("[data-href]").forEach(function (el) {
    var href = value(el.dataset.href);
    if (href) { el.href = href; el.hidden = false; }
    else { el.hidden = true; }
  });

  // hide contact rows with no link
  document.querySelectorAll(".clist li").forEach(function (li) {
    var a = li.querySelector("a");
    if (a && a.hidden) li.hidden = true;
  });

  // photo with initials fallback
  var fig = document.getElementById("portrait");
  var img = document.getElementById("photo");
  var ini = fig.querySelector(".initials");
  ini.textContent = (P.name || "S").charAt(0).toUpperCase();
  function noPhoto() { fig.classList.add("no-photo"); }
  img.addEventListener("error", noPhoto);
  if (P.photo) img.src = P.photo;
  else noPhoto();

  // contact form -> opens email app
  var form = document.getElementById("mailForm");
  if (P.email) {
    form.hidden = false;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = new FormData(form);
      var body = f.get("m") + "\n\n— " + f.get("n") + " (" + f.get("e") + ")";
      location.href = "mailto:" + P.email + "?subject=" +
        encodeURIComponent("Portfolio enquiry from " + f.get("n")) +
        "&body=" + encodeURIComponent(body);
    });
  }

  // theme toggle (remembers choice)
  var root = document.documentElement;
  try { var saved = localStorage.getItem("theme"); if (saved) root.dataset.theme = saved; } catch (e) {}
  document.getElementById("themeBtn").addEventListener("click", function () {
    var dark = root.dataset.theme ? root.dataset.theme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
  });

  // project image preview
  var imagePreview = document.getElementById("imagePreview");
  var previewImage = document.getElementById("previewImage");
  var previewClose = imagePreview.querySelector(".preview-close");
  document.querySelectorAll(".preview-trigger").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var source = trigger.querySelector("img");
      previewImage.src = source.currentSrc || source.src;
      previewImage.alt = source.alt;
      imagePreview.showModal();
    });
  });
  previewClose.addEventListener("click", function () { imagePreview.close(); });
  imagePreview.addEventListener("click", function (event) {
    if (event.target === imagePreview) imagePreview.close();
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && imagePreview.open) {
      event.preventDefault();
      imagePreview.close();
    }
  });

  // scroll reveal
  var items = document.querySelectorAll("section:not(.hero):not(.contact) > *, .project");
  items.forEach(function (el) { el.classList.add("reveal"); });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else { items.forEach(function (el) { el.classList.add("in"); }); }

  document.getElementById("yr").textContent = new Date().getFullYear();
})();
