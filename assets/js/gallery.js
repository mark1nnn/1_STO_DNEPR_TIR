export function initGallery() {
  const items = Array.from(document.querySelectorAll("[data-lightbox-src]"));
  if (!items.length) return;

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Перегляд медіа");
  lightbox.innerHTML = `
    <button class="lightbox__button lightbox__close" type="button" aria-label="Закрити">×</button>
    <button class="lightbox__button lightbox__prev" type="button" aria-label="Попереднє медіа">‹</button>
    <img alt="">
    <video controls playsinline preload="metadata" hidden></video>
    <button class="lightbox__button lightbox__next" type="button" aria-label="Наступне медіа">›</button>
  `;
  document.body.append(lightbox);

  const image = lightbox.querySelector("img");
  const video = lightbox.querySelector("video");
  const closeButton = lightbox.querySelector(".lightbox__close");
  const prevButton = lightbox.querySelector(".lightbox__prev");
  const nextButton = lightbox.querySelector(".lightbox__next");
  let currentIndex = 0;
  let activeTrigger = null;

  const stopVideo = () => {
    video.pause();
    video.removeAttribute("src");
    video.load();
  };

  const show = (index) => {
    currentIndex = (index + items.length) % items.length;
    const item = items[currentIndex];
    const isVideo = item.dataset.lightboxType === "video";

    stopVideo();
    image.hidden = isVideo;
    video.hidden = !isVideo;

    if (isVideo) {
      video.src = item.dataset.lightboxSrc || "";
      video.setAttribute("aria-label", item.dataset.lightboxAlt || "Відео ремонту вантажної техніки");
      video.load();
    } else {
      image.src = item.dataset.lightboxSrc || "";
      image.alt = item.dataset.lightboxAlt || item.querySelector("img")?.alt || "Фото вантажного СТО";
    }

    lightbox.classList.add("is-open");
    document.body.classList.add("menu-open");
    closeButton.focus();
  };

  const close = () => {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    image.removeAttribute("src");
    stopVideo();
    if (activeTrigger) activeTrigger.focus();
  };

  items.forEach((item, index) => {
    item.addEventListener("click", () => {
      activeTrigger = item;
      show(index);
    });
  });

  closeButton.addEventListener("click", close);
  prevButton.addEventListener("click", () => show(currentIndex - 1));
  nextButton.addEventListener("click", () => show(currentIndex + 1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") show(currentIndex - 1);
    if (event.key === "ArrowRight") show(currentIndex + 1);
  });
}
