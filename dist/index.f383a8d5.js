function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire5128"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire5128"] = parcelRequire;
}
parcelRequire.register("aKzDW", function(module, exports) {

$parcel$export(module.exports, "register", () => $7d39d93f9098a310$export$6503ec6e8aabbaf, (v) => $7d39d93f9098a310$export$6503ec6e8aabbaf = v);
$parcel$export(module.exports, "resolve", () => $7d39d93f9098a310$export$f7ad0328861e2f03, (v) => $7d39d93f9098a310$export$f7ad0328861e2f03 = v);
var $7d39d93f9098a310$export$6503ec6e8aabbaf;
var $7d39d93f9098a310$export$f7ad0328861e2f03;
"use strict";
var $7d39d93f9098a310$var$mapping = {};
function $7d39d93f9098a310$var$register(pairs) {
    var keys = Object.keys(pairs);
    for(var i = 0; i < keys.length; i++)$7d39d93f9098a310$var$mapping[keys[i]] = pairs[keys[i]];
}
function $7d39d93f9098a310$var$resolve(id) {
    var resolved = $7d39d93f9098a310$var$mapping[id];
    if (resolved == null) throw new Error("Could not resolve bundle with id " + id);
    return resolved;
}
$7d39d93f9098a310$export$6503ec6e8aabbaf = $7d39d93f9098a310$var$register;
$7d39d93f9098a310$export$f7ad0328861e2f03 = $7d39d93f9098a310$var$resolve;

});

var $16850d2959882b89$exports = {};

(parcelRequire("aKzDW")).register(JSON.parse('{"h8h7G":"index.f383a8d5.js","8LBSM":"point.5a315395.svg"}'));

var $7cffefe36f1103ac$exports = {};

$7cffefe36f1103ac$exports = new URL((parcelRequire("aKzDW")).resolve("8LBSM"), import.meta.url).toString();


const $3da87ddc4a220fcd$var$mapOfficeIcon = new URL($7cffefe36f1103ac$exports);
document.addEventListener("DOMContentLoaded", ()=>{
    (function map1() {
        ymaps.ready(()=>{
            // Создание карты.
            const map = new ymaps.Map("map", {
                center: [
                    55.171529,
                    39.414398
                ],
                zoom: 8
            });
            const officePoint = new ymaps.Placemark([
                55.643449,
                37.714419
            ], {
                balloonContent: `
          <b>Офис:</b>
          <br>
          г. Москва, Востряковский Проезд, 10Бс7
        `
            }, {
                iconImageHref: $3da87ddc4a220fcd$var$mapOfficeIcon,
                iconImageSize: [
                    50,
                    50
                ]
            });
            const storagePoint = new ymaps.Placemark([
                54.155066,
                37.595222
            ], {
                balloonContent: `
          <b>Производство:</b>
          <br>
          г. Тула, улица Рязанская, дом 20
        `
            }, {
                iconImageHref: $3da87ddc4a220fcd$var$mapOfficeIcon,
                iconImageSize: [
                    50,
                    50
                ]
            });
            map.geoObjects.add(officePoint).add(storagePoint);
        });
    })();
    (function sliderProducts() {
        const slider = new Swiper(".products__content-slider.swiper", {
            speed: 700,
            navigation: {
                nextEl: ".slider-arrow-next",
                prevEl: ".slider-arrow-prev"
            },
            slideActiveClass: "--active",
            effect: "creative",
            creativeEffect: {
                prev: {
                    // will set `translateZ(-400px)` on previous slides
                    translate: [
                        0,
                        0,
                        -400
                    ]
                },
                next: {
                    // will set `translateX(100%)` on next slides
                    translate: [
                        0,
                        0,
                        0
                    ]
                }
            }
        });
    })();
    (function slidersProduct() {
        const activeClass = "--active";
        const items = [
            ...document.querySelectorAll(".products__slide")
        ];
        items.forEach((item)=>{
            const previews = [
                ...item.querySelectorAll(".products__previews .swiper-slide"), 
            ];
            const previewSliderEl = item.querySelector(".products__previews .swiper");
            const mainSliderEl = item.querySelector(".products__slider .swiper");
            const previewSlider = new Swiper(previewSliderEl, {
                speed: 700,
                spaceBetween: 30,
                slidesPerView: "auto",
                watchSlidesProgress: true,
                watchSlidesVisibility: true
            });
            const mainSlider = new Swiper(mainSliderEl, {
                speed: 700,
                spaceBetween: 30
            });
            addActive(0);
            mainSlider.on("slideChange", ()=>{
                let index = mainSlider.activeIndex;
                if (!index && index !== 0) return;
                removeActive();
                addActive(index);
                previewSlider.slideTo(index);
            });
            previewSlider.on("click", ()=>{
                let index = previewSlider.clickedIndex;
                if (!index && index !== 0) return;
                removeActive();
                addActive(index);
                mainSlider.slideTo(index);
            });
            function addActive(index) {
                previews.forEach((preview, i)=>{
                    if (index === i) preview.classList.add(activeClass);
                });
            }
            function removeActive() {
                previews.forEach((preview)=>{
                    preview.classList.remove(activeClass);
                });
            }
        });
    })();
    (function anchorScroll() {
        let header = document.querySelector(".header").getBoundingClientRect().height;
        let anchors = [
            ...document.querySelectorAll('[href*="#"]')
        ];
        anchors.forEach((anchor)=>{
            anchor.addEventListener("click", (e)=>{
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
    (function burger() {
        const wrapper = document.querySelector(".wrapper");
        const burger = document.querySelector(".header__burger");
        burger.addEventListener("click", ()=>{
            if (!burger.classList.contains("--active")) {
                burger.classList.add("--active");
                wrapper.classList.add("--tint");
            } else {
                burger.classList.remove("--active");
                wrapper.classList.remove("--tint");
            }
        });
    })();
    (function navHeader() {
        const activeClass = "--active";
        const block = document.querySelector(".header__nav");
        const list = block.querySelector(".nav__list");
        const links = [
            ...block.querySelectorAll(".nav__link")
        ];
        const bar = block.querySelector(".nav__bar");
        const sections = [
            ...document.querySelectorAll(".section")
        ];
        sections.forEach((section)=>{
            const observer = new IntersectionObserver((entries)=>{
                entries.forEach((entry)=>{
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
                threshold: 0.5
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


//# sourceMappingURL=index.f383a8d5.js.map
