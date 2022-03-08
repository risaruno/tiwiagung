// document.getElementById("open").addEventListener("click", () => {
//   let landing = document.getElementById("landing");
//   landing.style.opacity = "0";
//   open = () => {
//     landing.remove();
//   };
//   setTimeout(() => {
//     open();
//   }, 1000);
// });


// Scroll To
var timesection = [];
var navItems = document.querySelectorAll("#navigation>ul>li");
navItems.forEach((item, index) => {
  var target = item.getAttribute("data-target");
  item.addEventListener("click", scroll);
  
  // Navigation Active Toggle
  timesection[index] = gsap.timeline({
    scrollTrigger: {
      trigger: "#" + target,
      start: "top center",
      endTrigger: "#" + target,
      end: "bottom center",
      toggleClass: { targets: item, className: "active" },
    },
  });


});
function scroll() {
  var target = this.getAttribute("data-target");
  gsap.to(window, 1, { scrollTo: "#" + target, ease: "power2.inOut" });
}
