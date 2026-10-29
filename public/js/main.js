/* EDIT HERE: replace each value with your real link. Leave "" to keep the button inactive. */
var LINKS={
  email:"",            // e.g. "mailto:you@example.com"
  linkedin:"",         // e.g. "https://www.linkedin.com/in/your-name"
  github:"",           // e.g. "https://github.com/your-name"
  nepsub:"",           // your live NepSub URL
  projecthub:"",
  quotexbot:""
};
document.querySelectorAll("[data-link]").forEach(function(a){
  var u=LINKS[a.dataset.link];
  if(u){a.href=u;if(u.indexOf("http")===0){a.target="_blank";a.rel="noopener"}}
  else if(a.classList.contains("plink")){a.style.display="none"}
});
document.getElementById("yr").textContent=new Date().getFullYear();
