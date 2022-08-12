const mapOfficeIcon = new URL(
  'images/point.svg',
  import.meta.url
);

document.addEventListener("DOMContentLoaded", () => {
  +(function map() {
    ymaps.ready(() => {
      // Создание карты.
      const map = new ymaps.Map("map", {
        center: [55.642979, 37.720501],
        zoom: 16,
      });

      officePoint = new ymaps.Placemark([55.643449, 37.714419], {

      }, {
          preset: 'islands#icon',
          iconColor: '#e21d24',
          // Опции.
          // Необходимо указать данный тип макета.
          // iconLayout: 'default#image',
          // // Своё изображение иконки метки.
          // iconImageHref: mapOfficeIcon.href,
          // // Размеры метки.
          // iconImageSize: [50, 50],
          // // Смещение левого верхнего угла иконки относительно
          // // её "ножки" (точки привязки).
          // iconImageOffset: [-25, -25]
      })

      map.geoObjects
        .add(officePoint)
    });
  })();

  +(function sliderProducts() {
    const slider = new Swiper('.products__content-slider.swiper', {
      speed: 700,
      simulateTouch: false,
      navigation: {
        nextEl: '.slider-arrow-next',
        prevEl: '.slider-arrow-prev',
      },
    })
  })();

  +(function slidersProduct() {
    const activeClass = "--active";
    const items = [...document.querySelectorAll('.products__slide')];
    items.forEach(item => {
      const previews = [
        ...item.querySelectorAll(".products__previews .swiper-slide"),
      ];
      const previewSliderEl = item.querySelector('.products__previews .swiper');
      const mainSliderEl = item.querySelector('.products__slider .swiper');

      const previewSlider = new Swiper(previewSliderEl, {
        speed: 700,
        spaceBetween: 30,
        slidesPerView: "auto",
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
      });

      const mainSlider = new Swiper(mainSliderEl, {
        speed: 700,
        spaceBetween: 30,
      });
  
      addActive(0);
  
      mainSlider.on("slideChange", () => {
        let index = mainSlider.activeIndex;
        if (!index && index !== 0) return;
        removeActive();
        addActive(index);
        previewSlider.slideTo(index);
      });
  
      previewSlider.on("click", () => {
        let index = previewSlider.clickedIndex;
        if (!index && index !== 0) return;
        removeActive();
        addActive(index);
        mainSlider.slideTo(index);
      });
  
      function addActive(index) {
        previews.forEach((preview, i) => {
          if (index === i) {
            preview.classList.add(activeClass);
          }
        });
      }
  
      function removeActive() {
        previews.forEach((preview) => {
          preview.classList.remove(activeClass);
        });
      }
    })
  })();

  +(function anchorScroll() {
    let header = document
      .querySelector(".header")
      .getBoundingClientRect().height;
    let anchors = [...document.querySelectorAll('[href*="#"]')];
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const el = document.querySelector(e.currentTarget.getAttribute("href"));
        const top = el.getBoundingClientRect().top;
        let pageTo = window.scrollY + top - header;
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

  +(function nav() {
    const activeClass = "--active";
    const list = document.querySelector(".nav__list");
    const links = [...document.querySelectorAll(".nav__link")];
    const bar = document.querySelector(".nav__bar");
    const sections = [...document.querySelectorAll(".section")];

    sections.forEach((section) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              links.forEach((link) => {
                const id = link.href.split("#")[1];
                if (id === entry.target.id) {
                  unsetActiveLinks();
                  setActiveLink(link);
                  moveBar(link);
                }
              });
            }
          });
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 0.5,
        }
      );
      observer.observe(section);
    });

    moveBar(links[0]);
    setActiveLink(links[0]);

    links.forEach((link) => {
      link.addEventListener("click", () => {
        unsetActiveLinks();
        setActiveLink(link);
        moveBar(link);
      });
    });

    function setActiveLink(link) {
      link.classList.add(activeClass);
    }

    function unsetActiveLinks() {
      links.forEach((link) => {
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
