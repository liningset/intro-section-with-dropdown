const burgerBtn = document.querySelector(".menu-toggle");
const overlay = document.querySelector(".overlay");
const dpdnParents = document.querySelectorAll(".has-dropdown");

function animOnDropdowns(target, allowed) {
  return gsap
    .timeline({ defaults: { ease: "linear" } })
    .to(target.querySelector("i"), 0.3, {
      rotateX: allowed ? "180deg" : "0",
    })
    .to(
      target.querySelector(".dropdown"),
      0.4,
      {
        height: allowed ? "auto" : "0",
        padding: allowed ? "1rem" : "0",
      },
      "-=0.3"
    )
    .to(
      target.querySelectorAll(".dropdown li"),
      0.3,
      { height: allowed ? "1.5rem" : "none" },
      "-=0.3"
    );
}
function animOnModal(allowed) {
  return gsap
    .timeline({ defaults: { ease: "linear" } })
    .to(".overlay", 0.3, {
      opacity: allowed ? 1 : 0,
      pointerEvents: allowed ? "auto" : "none",
    })
    .to(".modal", 0.3, { right: allowed ? 0 : "-100%" }, "-=0.4")
    .to("body", 0.3, { overflowY: allowed ? "hidden" : "visible" });
}

overlay.addEventListener("click", (e) => {
  if (e.target.classList.contains("overlay")) {
    burgerBtn.classList.remove("is-active");
    animOnModal(false);
  }
});

burgerBtn.addEventListener("click", () => {
  burgerBtn.classList.toggle("is-active");

  burgerBtn.classList.contains("is-active")
    ? animOnModal(true)
    : animOnModal(false);
});

dpdnParents.forEach((node) => {
  node.addEventListener("click", (e) => {
    let target = e.target;
    if (target.classList.contains("nav-item")) {
      dpdnParents.forEach((p) => {
        animOnDropdowns(p, false);
        if (p.classList.contains("active")) p.classList.remove("active");
      });
      target.classList.toggle("active");

      target.classList.contains("active")
        ? animOnDropdowns(target, true)
        : animOnDropdowns(target, false);
    }
  });
});
