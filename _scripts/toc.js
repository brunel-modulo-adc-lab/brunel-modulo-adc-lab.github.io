/*
  fill sidebar with current page's sections, highlight section in view, and
  fade sidebar out when footer comes into view
*/

{
  const onLoad = () => {
    const toc = document.querySelector(".toc");
    const list = document.querySelector(".toc-sections");
    if (!toc || !list) return;

    // list h2 headings of page (anchors.js may have moved id to parent section)
    const headings = [...document.querySelectorAll("main h2")].filter(
      (heading) => heading.id || heading.parentElement.id
    );
    const links = headings.map((heading) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = "#" + (heading.id || heading.parentElement.id);
      link.textContent = heading.textContent.trim();
      item.append(link);
      list.append(item);
      return link;
    });

    // place sidebar just below sticky header
    const place = () => {
      const header = document.querySelector("header");
      const bottom = header ? header.getBoundingClientRect().height : 100;
      toc.style.top = bottom + 30 + "px";
    };
    place();
    window.addEventListener("resize", place);

    // highlight last heading scrolled past
    const highlight = () => {
      let active = 0;
      headings.forEach((heading, index) => {
        if (heading.getBoundingClientRect().top < window.innerHeight * 0.3)
          active = index;
      });
      links.forEach((link, index) => {
        if (index === active) link.setAttribute("data-active", "");
        else link.removeAttribute("data-active");
      });

      // hide when footer overlaps sidebar
      const footer = document.querySelector("footer");
      const overlap =
        footer &&
        footer.getBoundingClientRect().top < toc.getBoundingClientRect().bottom;
      if (overlap) toc.setAttribute("data-hidden", "");
      else toc.removeAttribute("data-hidden");
    };
    highlight();
    window.addEventListener("scroll", highlight, { passive: true });
  };

  // after page loads
  window.addEventListener("load", onLoad);
}
