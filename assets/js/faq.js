export function initFaq() {
  document.querySelectorAll("[data-faq]").forEach((faq) => {
    faq.querySelectorAll("[data-faq-button]").forEach((button) => {
      const panel = button.nextElementSibling;
      if (!panel) return;

      if (!panel.id) {
        panel.id = `faq-panel-${Math.random().toString(36).slice(2)}`;
      }

      button.setAttribute("aria-controls", panel.id);
      button.setAttribute("aria-expanded", "false");

      button.addEventListener("click", () => {
        const isOpen = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!isOpen));
      });
    });
  });
}
