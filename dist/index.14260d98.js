document.addEventListener("DOMContentLoaded", ()=>{
    (function anchorScroll() {
        let anchors = [
            ...document.querySelectorAll('[href*="#"]')
        ];
        anchors.forEach((anchor)=>{
            anchor.addEventListener("click", (e)=>{
                const el = document.querySelector(e.currentTarget.getAttribute("href"));
                const top = el.getBoundingClientRect().top;
                let pageTo = window.scrollY + top;
                const time = Date.now();
                requestAnimationFrame(scroll);
                function scroll() {
                    var timeFracion = (Date.now() - time) / 1250;
                    if (timeFracion > 1) {
                        window.scrollTo(0, pageTo);
                        return;
                    }
                    var multiple = 1 - Math.sin(Math.acos(timeFracion - 1));
                    window.scrollTo(0, pageTo - top * multiple);
                    requestAnimationFrame(scroll);
                }
            });
        });
    })();
    (function nav() {
        const activeClass = "--active";
        const list = document.querySelector(".nav__list");
        const links = [
            ...document.querySelectorAll(".nav__link")
        ];
        const bar = document.querySelector(".nav__bar");
        const sections = [
            ...document.querySelectorAll(".section")
        ];
        sections.forEach((section)=>{
            const observer = new IntersectionObserver((entries)=>{
                entries.forEach((entry)=>{
                    console.log(entry);
                    if (entry.isIntersecting) links.forEach((link)=>{
                        const id = link.href.split("#")[1];
                        if (id === entry.target.id) {
                            unsetActiveLinks();
                            setActiveLink(link);
                            moveBar(link);
                        }
                    });
                });
            }, {
                root: null,
                rootMargin: "0px",
                threshold: .5
            });
            observer.observe(section);
        });
        moveBar(links[0]);
        setActiveLink(links[0]);
        links.forEach((link)=>{
            link.addEventListener("click", ()=>{
                unsetActiveLinks();
                setActiveLink(link);
                moveBar(link);
            });
        });
        function setActiveLink(link) {
            link.classList.add(activeClass);
        }
        function unsetActiveLinks() {
            links.forEach((link)=>{
                link.classList.remove(activeClass);
            });
        }
        function moveBar(item) {
            const width = item.getBoundingClientRect().width;
            const startPosition = list.getBoundingClientRect().left;
            const itemPosition = item.getBoundingClientRect().left;
            const offset = itemPosition - startPosition;
            bar.style.width = `${width}px`;
            bar.style.transform = `translate3d(${offset}px, 0, 0)`;
        }
    })();
});

//# sourceMappingURL=index.14260d98.js.map
