document.addEventListener("DOMContentLoaded", function() {
    // ------------------------
    // NAVIGATION MENU
    // ------------------------
    const toggleButton = document.querySelector(".nav-toggle");
    const navList = document.getElementById("navbar-list");
    const links = navList.querySelectorAll("a");

    const tl = gsap.timeline({ paused: true, reversed: true });
    const glitchColors = gsap.timeline({ paused: true, repeat: -1 });

    glitchColors
        .to(navList, { backgroundColor: "#1a1a1a", duration: 0.1 })
        .to(navList, { backgroundColor: "#2c2c2c", duration: 0.1 })
        .to(navList, { backgroundColor: "rgba(51,51,51,0.7)", duration: 0.1 });

    tl.to(navList, {
            duration: 0.5,
            width: "35vw",
            ease: "power3.out",
            onStart: () => {
                navList.classList.add("blur-active");
            },
        })
        .fromTo(
            links, { opacity: 0, x: "6vw" }, {
                opacity: 1,
                x: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: "power2.out",
            },
            "-=0.3"
        )
        .eventCallback("onReverseComplete", () => {
            navList.classList.remove("blur-active");
        });

    function toggleMenu(forceClose = false) {
        const isActive = !toggleButton.classList.contains("active");

        if (forceClose || !isActive) {
            tl.reverse();
            glitchColors.pause(0);
            toggleButton.classList.remove("active");
            toggleButton.setAttribute("aria-expanded", false);
            navList.setAttribute("aria-hidden", true);
            links.forEach((link) => (link.tabIndex = -1));
        } else {
            toggleButton.classList.add("active");
            tl.play();
            toggleButton.setAttribute("aria-expanded", true);
            navList.setAttribute("aria-hidden", false);
            links.forEach((link) => (link.tabIndex = 0));
        }
    }

    toggleButton.addEventListener("click", () => toggleMenu());

    links.forEach((link) => {
        link.addEventListener("click", () => {
            gsap.to(links, {
                opacity: 0,
                x: "5vw",
                duration: 0.4,
                stagger: 0.05,
                ease: "power2.in",
                onComplete: () => {
                    toggleMenu(true);
                },
            });
        });
    });

    // ------------------------
    // SCROLL PARALLAX EFFECTS
    // ------------------------
    gsap.registerPlugin(ScrollTrigger);

    gsap.set(".circle", { yPercent: -5 });
    gsap.set(".dotsBlue", { yPercent: 10 });
    gsap.set(".owlHorned", { yPercent: -20 });
    gsap.set(".clusterGreat", { yPercent: 5 });

    gsap.to(".circle", {
        yPercent: 5,
        ease: "none",
        scrollTrigger: { trigger: ".clusterGreat", scrub: 1 },
    });

    gsap.to(".dotsBlue", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: { trigger: ".clusterGreat", scrub: 1 },
    });

    gsap.to(".owlHorned", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: { trigger: ".clusterGreat", scrub: 1 },
    });

    gsap.to(".clusterGreat", {
        yPercent: -5,
        ease: "none",
        scrollTrigger: {
            trigger: ".clusterGreat",
            end: "bottom center",
            scrub: 1,
        },
    });

    // ------------------------
    // ANIME EFFECTS FOR SUSTAINABILITY SECTION
    // ------------------------
    gsap.set(".sustainability-video-container", { yPercent: -10 });
    gsap.to(".sustainability-video-container", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
            trigger: ".sustainability-container",
            scrub: 1,
        },
    });

    gsap.set(".sustainability-bg-wrapper", { yPercent: 10 });
    gsap.to(".sustainability-bg-wrapper", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
            trigger: ".sustainability-container",
            scrub: 1,
        },
    });

    gsap.utils.toArray(".feature-item").forEach((item, i) => {
        gsap.fromTo(
            item, {
                y: "0.5vw",
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none reset",
                },
                delay: i * 0.1,
            }
        );
    });

    // ------------------------
    // SPLIT TEXT ANIMATION
    // ------------------------
    function setupGreathornedSplit() {
        const splitTimeline = gsap.timeline();
        const split = new SplitText(".titleGreathorned", { type: "words,chars" });
        const chars = split.chars;

        splitTimeline.from(chars, {
            duration: 0.8,
            opacity: 0,
            y: "1vw",
            ease: "circ.out",
            stagger: 0.02,
            scrollTrigger: {
                trigger: ".titleGreathorned",
                start: "top 50%",
                end: "bottom center",
                scrub: 1,
            },
        });
    }

    window.addEventListener("load", () => {
        setupGreathornedSplit();
    });

    ScrollTrigger.addEventListener("refresh", setupGreathornedSplit);

    // ------------------------
    // Slider for Craftsmanship Section
    // ------------------------
    function getVW(vw) {
        return (window.innerWidth * vw) / 100;
    }

    const swiper = new Swiper(".craftsmanship-slider", {
        slidesPerView: "auto",
        spaceBetween: getVW(1.4),
        loop: false,
        pagination: {
            clickable: true,
            type: "progressbar",
        },
    });

    // ------------------------
    // FEATURED SECTION ANIMATIONS
    // ------------------------
    gsap.from(".featured-header", {
        opacity: 0,
        y: "6vw",
        scale: 0.95,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
            trigger: ".featured-header",
            start: "top 85%",
            toggleActions: "play none none reset",
        },
    });

    gsap.utils.toArray(".featured-image-container").forEach((container, i) => {
        gsap.from(container, {
            opacity: 0,
            y: "5vw",
            scale: 0.95,
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: {
                trigger: container,
                start: "top 90%",
                toggleActions: "play none none reset",
            },
            delay: i * 0.1,
        });
    });

    gsap.utils.toArray(".featured-caption").forEach((caption) => {
        gsap.fromTo(
            caption, { y: "2vw" }, {
                y: "-2vw",
                ease: "none",
                scrollTrigger: {
                    trigger: caption,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                },
            }
        );
    });

    // ------------------------
    // CRAFTSMANSHIP SECTION ANIMATION
    // ------------------------
    function toVW(px) {
        return (px / window.innerWidth) * 100 + "vw";
    }

    gsap.from(".craftsmanship-content", {
        opacity: 0,
        y: toVW(80),
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".craftsmanship-content",
            start: "top 85%",
            toggleActions: "play none none reset",
        },
    });

    gsap.from(".craftsmanship-content .featured-header > *", {
        opacity: 0,
        y: toVW(40),
        duration: 1,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
            trigger: ".craftsmanship-content .featured-header",
            start: "top 90%",
            toggleActions: "play none none reset",
        },
    });

    gsap.utils.toArray(".craftsmanship-slider-content").forEach((slide, i) => {
        gsap.from(slide, {
            opacity: 0,
            y: toVW(30),
            scale: 0.97,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: slide,
                start: "top 95%",
                toggleActions: "play none none reset",
            },
            delay: i * 0.1,
        });
    });

    // ------------------------
    // CTA SECTION ANIMATION
    // ------------------------
    function vwUnit(px) {
        return (px / window.innerWidth) * 100 + "vw";
    }

    gsap.from(".cta-section-video", {
        opacity: 0,
        scale: 1.05,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".cta-section",
            start: "top 85%",
            toggleActions: "play none none reset",
        },
    });

    gsap.to(".cta-video-overlay-one", {
        backgroundColor: "rgba(0,0,0,0.35)",
        ease: "sine.inOut",
        scrollTrigger: {
            trigger: ".cta-section",
            start: "top center",
            end: "bottom center",
            scrub: 1.5,
        },
    });

    gsap.from(".cta-content h1", {
        y: vwUnit(40),
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".cta-content h1",
            start: "top 90%",
            toggleActions: "play none none reset",
        },
    });

    gsap.from(".cta-content p", {
        y: vwUnit(30),
        opacity: 0,
        duration: 1.1,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".cta-content p",
            start: "top 90%",
            toggleActions: "play none none reset",
        },
    });

    gsap.from(".cta-content button", {
        y: vwUnit(25),
        opacity: 0,
        scale: 0.9,
        duration: 1,
        delay: 0.4,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: ".cta-content button",
            start: "top 95%",
            toggleActions: "play none none reset",
        },
    });

    // ------------------------
    // MARQUEE ANIMATION WITH CUSTOM CURSOR
    // ------------------------


    const hoverCircle = document.querySelector('.custom-cursor');
    const marqueeTexts = document.querySelectorAll('.marquee-text');
    const marqueeSection = document.querySelector('.marquee-section');
    const marqueeTrack = document.querySelector('.marquee-track');

    function setCursorSize(widthVW, heightVW) {
        gsap.to(hoverCircle, {
            duration: 0.2,
            width: `${widthVW}vw`,
            height: `${heightVW}vw`,
            ease: 'power3.out',
        });
    }

    function setCursorBackground(url) {
        gsap.to(hoverCircle, {
            duration: 0.1,
            opacity: 0,
            ease: 'power2.out',
            onComplete: () => {
                hoverCircle.style.backgroundImage = url ? `url(${url})` : 'none';
                gsap.to(hoverCircle, {
                    duration: 0.3,
                    opacity: 1,
                    ease: 'power2.in',
                });
            },
        });
    }

    // ✨ Enable hover logic only for screens wider than 992px
    function initializeMarqueeHover() {
        if (window.innerWidth > 992) {
            marqueeSection.addEventListener('mouseenter', () => {
                marqueeSection.classList.add('default-cursor');
                gsap.to(hoverCircle, { duration: 0.2, opacity: 1, ease: 'power3.out' });
                hoverCircle.classList.remove('active');
                setCursorSize(2.5, 2.5);
                setCursorBackground(null);
            });

            marqueeSection.addEventListener('mouseleave', () => {
                marqueeSection.classList.remove('default-cursor');
                gsap.to(hoverCircle, {
                    duration: 0.2,
                    opacity: 0,
                    ease: 'power3.out',
                    onComplete: () => {
                        hoverCircle.style.backgroundImage = 'none';
                        hoverCircle.classList.remove('active');
                    },
                });
            });

            marqueeTexts.forEach(text => {
                text.addEventListener('mouseenter', () => {
                    const imgUrl = text.dataset.img;
                    hoverCircle.classList.add('active');
                    setCursorSize(40, 40);
                    setCursorBackground(imgUrl);
                    marqueeTrack.style.animationPlayState = 'paused';
                });

                text.addEventListener('mouseleave', () => {
                    hoverCircle.classList.remove('active');
                    setCursorSize(2.5, 2.5);
                    setCursorBackground(null);
                    marqueeTrack.style.animationPlayState = 'running';
                });
            });

            marqueeTrack.addEventListener('mouseenter', () => {
                const defaultImg = 'default-image-url.jpg'; // Optional
                hoverCircle.classList.add('active');
                setCursorSize(40, 40);
                setCursorBackground(defaultImg);
                marqueeTrack.style.animationPlayState = 'running';
            });

            marqueeTrack.addEventListener('mouseleave', () => {
                hoverCircle.classList.remove('active');
                setCursorSize(2.5, 2.5);
                setCursorBackground(null);
                marqueeTrack.style.animationPlayState = 'running';
            });

            marqueeSection.addEventListener('mousemove', (e) => {
                const x = e.clientX - hoverCircle.offsetWidth / 2;
                const y = e.clientY - hoverCircle.offsetHeight / 2;
                gsap.to(hoverCircle, {
                    duration: 0,
                    x: x,
                    y: y,
                    ease: 'power3.out',
                });
            });
        } else {
            hoverCircle.style.display = 'none';
        }
    }

    window.addEventListener('load', initializeMarqueeHover);
    // window.addEventListener('resize', () => location.reload()); // Reload on resize to reset logic






    // const hoverCircle = document.querySelector('.custom-cursor');
    // const marqueeTexts = document.querySelectorAll('.marquee-text');
    // const marqueeSection = document.querySelector('.marquee-section');
    // const marqueeTrack = document.querySelector('.marquee-track');

    // function setCursorSize(widthVW, heightVW) {
    //     gsap.to(hoverCircle, {
    //         duration: 0.2,
    //         width: `${widthVW}vw`,
    //         height: `${heightVW}vw`,
    //         ease: 'power3.out',
    //     });
    // }

    // function setCursorBackground(url) {
    //     gsap.to(hoverCircle, {
    //         duration: 0.1,
    //         opacity: 0,
    //         ease: 'power2.out',
    //         onComplete: () => {
    //             hoverCircle.style.backgroundImage = url ? `url(${url})` : 'none';
    //             gsap.to(hoverCircle, {
    //                 duration: 0.3,
    //                 opacity: 1,
    //                 ease: 'power2.in',
    //             });
    //         },
    //     });
    // }

    // function initializeMarqueeHover() {
    //     if (window.innerWidth > 992) {
    //         marqueeSection.addEventListener('mouseenter', () => {
    //             marqueeSection.classList.add('default-cursor');
    //             gsap.to(hoverCircle, { duration: 0.2, opacity: 1, ease: 'power3.out' });
    //             hoverCircle.classList.remove('active');
    //             setCursorSize(2.5, 2.5);
    //             setCursorBackground(null);
    //         });

    //         marqueeSection.addEventListener('mouseleave', () => {
    //             marqueeSection.classList.remove('default-cursor');
    //             gsap.to(hoverCircle, {
    //                 duration: 0.2,
    //                 opacity: 0,
    //                 ease: 'power3.out',
    //                 onComplete: () => {
    //                     hoverCircle.style.backgroundImage = 'none';
    //                     hoverCircle.classList.remove('active');
    //                 },
    //             });
    //         });

    //         marqueeTexts.forEach(text => {
    //             text.addEventListener('mouseenter', () => {
    //                 const imgUrl = text.dataset.img;
    //                 hoverCircle.classList.add('active');
    //                 setCursorSize(35, 35);
    //                 setCursorBackground(imgUrl);
    //                 marqueeTrack.style.animationPlayState = 'paused';
    //             });

    //             text.addEventListener('mouseleave', () => {
    //                 hoverCircle.classList.remove('active');
    //                 setCursorSize(2.5, 2.5);
    //                 setCursorBackground(null);
    //                 marqueeTrack.style.animationPlayState = 'running';
    //             });
    //         });

    //         marqueeTrack.addEventListener('mousemove', (e) => {
    //             const x = e.clientX - hoverCircle.offsetWidth / 2;
    //             const y = e.clientY - hoverCircle.offsetHeight / 2;
    //             gsap.to(hoverCircle, {
    //                 duration: 0.02,
    //                 x: x,
    //                 y: y,
    //                 ease: 'power3.out',
    //             });
    //         });
    //     } else {
    //         hoverCircle.style.display = 'none';
    //     }
    // }

    // window.addEventListener('load', initializeMarqueeHover);

    // ❌ OLD BAD CODE: window.addEventListener('resize', () => location.reload());
    // ✅ BETTER: just refresh scroll triggers and restart cursor logic
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
        initializeMarqueeHover();
    });



    class Scroll extends Lenis {
        constructor() {
            super({
                duration: 1.5,
                easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // https://easings.net
                direction: "vertical",
                smooth: true,
                smoothTouch: false,
                touchMultiplier: 1.5
            });

            this.time = 0;
            this.isActive = true;
            this.init();
        }

        init() {
            this.config();
            this.render();
            this.handleEditorView();
        }

        config() {
            // allow scrolling on overflow elements
            const overscroll = [
                ...document.querySelectorAll('[data-scroll="overscroll"]')
            ];

            if (overscroll.length > 0) {
                overscroll.forEach((item) =>
                    item.setAttribute("onwheel", "event.stopPropagation()")
                );
            }

            // stop and start scroll btns
            const stop = [...document.querySelectorAll('[data-scroll="stop"]')];
            if (stop.length > 0) {
                stop.forEach((item) => {
                    item.onclick = () => {
                        this.stop();
                        this.isActive = false;
                    };
                });
            }

            const start = [...document.querySelectorAll('[data-scroll="start"]')];
            if (start.length > 0) {
                start.forEach((item) => {
                    item.onclick = () => {
                        this.start();
                        this.isActive = true;
                    };
                });
            }

            // toggle page scrolling
            const toggle = [...document.querySelectorAll('[data-scroll="toggle"]')];
            if (toggle.length > 0) {
                toggle.forEach((item) => {
                    item.onclick = () => {
                        if (this.isActive) {
                            this.stop();
                            this.isActive = false;
                        } else {
                            this.start();
                            this.isActive = true;
                        }
                    };
                });
            }

            // anchor links
            const anchor = [...document.querySelectorAll("[data-scrolllink]")];
            if (anchor.length > 0) {
                anchor.forEach((item) => {
                    const id = parseFloat(item.dataset.scrolllink);
                    const target = document.querySelector(`[data-scrolltarget="${id}"]`);
                    if (target) {
                        //console.log(id, target);
                        item.onclick = () => this.scrollTo(target);
                    }
                });
            }
        }

        render() {
            this.raf((this.time += 10));
            window.requestAnimationFrame(this.render.bind(this));
        }

        /* ---- */
        handleEditorView() {
            const html = document.documentElement;
            const config = { attributes: true, childList: false, subtree: false };

            const callback = (mutationList, observer) => {
                for (const mutation of mutationList) {
                    if (mutation.type === "attributes") {
                        const btn = document.querySelector(".w-editor-bem-EditSiteButton");
                        const bar = document.querySelector(".w-editor-bem-EditorMainMenu");
                        const addTrig = (target) =>
                            target.addEventListener("click", () => this.destroy());

                        if (btn) addTrig(btn);
                        if (bar) addTrig(bar);
                    }
                }
            };

            const observer = new MutationObserver(callback);
            observer.observe(html, config);
        }
    }

    window.SmoothScroll = new Scroll();
});
document.addEventListener("DOMContentLoaded", () => {
    // ------------------------
    // HERO BOTTOM AUTO SWITCH (992px–320px)
    // ------------------------
    const container = document.getElementById("heroBottom");
    if (container) {
        const items = Array.from(container.querySelectorAll(".hero-bottom-item"));
        const lines = Array.from(container.querySelectorAll(".hero-bottom-line"));

        function showGroup(groupIndex) {
            items.forEach(el => el.style.display = "none");
            lines.forEach(el => el.style.display = "none");

            if (groupIndex === 0) {
                items[0].style.display = "flex";
                lines[0].style.display = "block";
                items[1].style.display = "flex";
                lines[1].style.display = "block";
            } else {
                items[2].style.display = "flex";
                lines[2].style.display = "block";
                items[3].style.display = "flex";
            }
        }

        let currentGroup = 0;
        let intervalId;

        function startAutoSwitch() {
            if (window.innerWidth >= 320 && window.innerWidth < 992) {
                showGroup(currentGroup);
                clearInterval(intervalId);
                intervalId = setInterval(() => {
                    currentGroup = (currentGroup + 1) % 2;
                    showGroup(currentGroup);
                }, 3000);
            } else {
                clearInterval(intervalId);
                items.forEach(el => el.style.display = "flex");
                lines.forEach(el => el.style.display = "block");
            }
        }

        window.addEventListener("resize", startAutoSwitch);
        startAutoSwitch();
    }

    // ------------------------
    // MARQUEE VIEW-MORE ANIMATION (768px–320px)
    // ------------------------
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const minWidth = 320;
    const maxWidth = 768;

    if (window.innerWidth >= minWidth && window.innerWidth <= maxWidth) {
        const marqueeTrack = document.querySelector(".marquee-track");
        // const marqueeTexts = Array.from(document.querySelectorAll(".marquee-text"));
        // const visibleCount = 5;
        // let currentVisible = visibleCount;

        // marqueeTexts.forEach((el, i) => {
        //     el.style.display = i < visibleCount ? "inline-block" : "none";
        // });

        // marqueeTexts.slice(0, visibleCount).forEach(el => animateText(el));

        // if (marqueeTexts.length > visibleCount && marqueeTrack) {
        //     const btn = document.createElement("button");
        //     btn.className = "view-more-btn";
        //     btn.textContent = "Explorer More";
        //     marqueeTrack.after(btn);

        //     btn.addEventListener("click", () => {
        //         const nextBatch = marqueeTexts.slice(currentVisible, currentVisible + visibleCount);
        //         nextBatch.forEach(el => {
        //             el.style.display = "inline-block";
        //             animateText(el);
        //         });

        //         gsap.from(nextBatch, {
        //             opacity: 0,
        //             y: "3vw",
        //             duration: 0.6,
        //             stagger: 0.1,
        //             ease: "power2.out"
        //         });

        //         currentVisible += nextBatch.length;
        //         if (currentVisible >= marqueeTexts.length) {
        //             btn.remove();
        //         }

        //         ScrollTrigger.refresh();
        //     });
        // }

        // function animateText(el) {
        //     const anchor = el.querySelector("a");
        //     if (anchor && !anchor.classList.contains("split-applied")) {
        //         anchor.classList.add("split-applied");
        //         const split = new SplitText(anchor, { type: "chars,words" });
        //         gsap.from(split.chars, {
        //             opacity: 0,
        //             y: "1.5vw",
        //             duration: 0.8,
        //             ease: "circ.out",
        //             stagger: 0.02,
        //             scrollTrigger: {
        //                 trigger: anchor,
        //                 start: "top 80%",
        //                 end: "bottom 60%",
        //                 scrub: 1,
        //             }
        //         });
        //     }
        // }
        function setupGreathornedSplit() {
            const splitTimeline = gsap.timeline();
            const split = new SplitText(".marquee-track span", { type: "chars,words" });
            const chars = split.chars;

            splitTimeline.from(chars, {
                opacity: 0,
                y: "1.5vw",
                duration: 0.8,
                ease: "circ.out",
                stagger: 0.02,
                scrollTrigger: {
                    trigger: ".marquee-track span",
                    start: "top 80%",
                    end: "bottom 60%",
                    scrub: 1,
                }
            });
        }

        window.addEventListener("load", () => {
            setupGreathornedSplit();
        });

        // ScrollTrigger.addEventListener("refresh", setupGreathornedSplit);
    }

    // ------------------------
    // REMAINING OLD CODE BLOCK
    // ------------------------
    // KEEP YOUR FULL EXISTING CODE HERE (Navigation, Scroll Effects, Split Text, CTA, etc.)
    // You don't need to change that block—just make sure it's still inside this DOMContentLoaded event.
});