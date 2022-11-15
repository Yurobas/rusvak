const mapIcon = new URL(
  'images/logo.svg',
  import.meta.url
);

document.addEventListener("DOMContentLoaded", () => {
  let zoom = 8;
  let center = [55.171529, 39.414398]
  if (window.innerWidth < 768) {
    zoom = 7;
    center = [54.913867, 37.567214]
  }
  +(function map() {
    ymaps.ready(() => {
      // Создание карты.
      const map = new ymaps.Map("map", {
        center: center,
        zoom: zoom,
      });

      const officePoint = new ymaps.Placemark([55.577622, 37.624193], {
        balloonContent: `
          <b>Офис:</b>
          <br>
          г. Москва, Востряковский Проезд, 10Бс7
        `,
      }, {
        preset: 'islands#dotIcon',
        iconColor: '#e21d24'
        // iconLayout: 'default#image',
        // iconImageHref: mapIcon.href,
        // iconImageSize: [40, 40]
      })

      const storagePoint = new ymaps.Placemark([54.155066, 37.595222], {
        balloonContent: `
          <b>Производство:</b>
          <br>
          г. Тула, улица Рязанская, дом 20
        `,
      }, {
        preset: 'islands#dotIcon',
        iconColor: '#e21d24'
        // iconLayout: 'default#image',
        // iconImageHref: mapIcon.href,
        // iconImageSize: [40, 40]
      })

      map.geoObjects
        .add(officePoint)
        .add(storagePoint)
    });
  })();

  +(function sliderProducts() {

    let options = {
      speed: 700,
      navigation: {
        nextEl: '.slider-arrow-next',
        prevEl: '.slider-arrow-prev',
      },
      slideActiveClass: '--active',
      effect: 'creative',
      creativeEffect: {
        prev: {
          // will set `translateZ(-400px)` on previous slides
          translate: [0, 0, -400]
        },
        next: {
          // will set `translateX(100%)` on next slides
          translate: [0, 0, 0]
        },
      },
    }

    if (window.innerWidth >= 1280) {
      options = {
        ...options,
        simulateTouch: false
      }
    }

    const slider = new Swiper('.products__content-slider.swiper', options)
  })();

  +(function slidersProduct() {
    const activeClass = "--active";
    const items = [...document.querySelectorAll('.products__slide')];
    items.forEach(item => {
      const previews = [...item.querySelectorAll(".products__previews .swiper-slide")];
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

  +(function burger() {
    const wrapper = document.querySelector('.wrapper');
    const burger = document.querySelector('.header__burger');
    burger.addEventListener('click', () => {
      if (!burger.classList.contains('--active')) {
        burger.classList.add('--active')
        wrapper.classList.add('--tint')
      } else {
        burger.classList.remove('--active')
        wrapper.classList.remove('--tint')
      }
    })
  })();

  +(function navHeader() {
    const activeClass = "--active";
    const block = document.querySelector('.header__nav');
    const list = block.querySelector(".nav__list");
    const links = [...block.querySelectorAll(".nav__link")];
    const bar = block.querySelector(".nav__bar");
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
