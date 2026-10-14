(() => {
  "use strict";

  /* =========================================================
     SEFAT BHUIYAN — PORTFOLIO
     COMPLETE JAVASCRIPT
     Previous Features + Steps 1–8
     ========================================================= */


  /* =========================================================
     BASIC HELPERS
     ========================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  const hasFinePointer = window.matchMedia(
    "(pointer: fine)"
  ).matches;


  /* =========================================================
     THEME SYSTEM
     ========================================================= */

  const themeButton =
    $("#themeBtn");

  const savedTheme =
    localStorage.getItem(
      "sb-theme"
    );


  if (
    savedTheme === "light"
  ) {
    document.body.classList.add(
      "light"
    );
  }


  function updateThemeButton() {

    if (!themeButton) {
      return;
    }


    const isLight =
      document.body.classList.contains(
        "light"
      );


    themeButton.textContent =
      isLight
        ? "☀"
        : "◔";


    themeButton.setAttribute(
      "aria-label",
      isLight
        ? "Switch to dark mode"
        : "Switch to light mode"
    );


    themeButton.setAttribute(
      "title",
      isLight
        ? "Switch to dark mode"
        : "Switch to light mode"
    );

  }


  updateThemeButton();


  if (
    themeButton
  ) {

    themeButton.addEventListener(
      "click",
      () => {

        document.body.classList.toggle(
          "light"
        );


        localStorage.setItem(
          "sb-theme",
          document.body.classList.contains(
            "light"
          )
            ? "light"
            : "dark"
        );


        updateThemeButton();

      }
    );

  }


  /* =========================================================
     LOADING SCREEN
     ========================================================= */

  const loader =
    document.createElement(
      "div"
    );


  loader.id =
    "siteLoader";


  loader.innerHTML = `
    <div class="loader-shell">

      <div class="loader-mark" aria-hidden="true">
        <span>SB</span>
      </div>

      <h2 class="loader-title">
        Sefat Bhuiyan
      </h2>

      <p class="loader-subtitle">
        Digital Marketer &amp; Graphic Designer
      </p>

      <div class="loader-bar" aria-hidden="true">
        <span></span>
      </div>

      <span
        class="loader-percent"
        id="loaderPercent"
      >
        0%
      </span>

    </div>
  `;


  document.body.prepend(
    loader
  );


  document.body.style.overflow =
    "hidden";


  const loaderPercent =
    $("#loaderPercent");


  let loaderValue =
    0;


  const loaderCounter =
    setInterval(
      () => {

        loaderValue +=
          Math.floor(
            Math.random() * 7
          ) + 3;


        if (
          loaderValue >= 100
        ) {

          loaderValue =
            100;

          clearInterval(
            loaderCounter
          );

        }


        if (
          loaderPercent
        ) {

          loaderPercent.textContent =
            `${loaderValue}%`;

        }

      },
      55
    );


  let loaderHidden =
    false;


  function startHeroCardAnimation() {

    const heroCard =
      $(".id-card");


    if (
      !heroCard
    ) {
      return;
    }


    heroCard.classList.add(
      "is-ready"
    );


    heroCard.style.animation =
      "cardEntrance 1.15s cubic-bezier(.16,1,.3,1) both";


    heroCard.style.animationPlayState =
      "running";

  }


  function hideLoader() {

    if (
      loaderHidden
    ) {
      return;
    }


    loaderHidden =
      true;


    clearInterval(
      loaderCounter
    );


    if (
      loaderPercent
    ) {

      loaderPercent.textContent =
        "100%";

    }


    setTimeout(
      () => {

        loader.classList.add(
          "loaded"
        );


        document.body.style.overflow =
          "";


        setTimeout(
          startHeroCardAnimation,
          prefersReducedMotion
            ? 0
            : 160
        );


        setTimeout(
          () => {

            loader.remove();

          },
          750
        );

      },
      prefersReducedMotion
        ? 120
        : 1850
    );

  }


  if (
    document.readyState ===
    "complete"
  ) {

    hideLoader();

  } else {

    window.addEventListener(
      "load",
      hideLoader,
      {
        once: true
      }
    );

  }


  /* =========================================================
     SCROLL PROGRESS
     ========================================================= */

  const scrollProgress =
    document.createElement(
      "div"
    );


  scrollProgress.className =
    "scroll-progress";


  document.body.appendChild(
    scrollProgress
  );


  function updateScrollProgress() {

    const scrollTop =
      window.scrollY ||
      window.pageYOffset ||
      0;


    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;


    const percentage =
      documentHeight > 0
        ? Math.min(
            100,
            Math.max(
              0,
              (
                scrollTop /
                documentHeight
              ) * 100
            )
          )
        : 0;


    scrollProgress.style.width =
      `${percentage}%`;

  }


  window.addEventListener(
    "scroll",
    updateScrollProgress,
    {
      passive: true
    }
  );


  updateScrollProgress();


  /* =========================================================
     MOUSE POSITION
     ========================================================= */

  let mouseClientX =
    window.innerWidth / 2;


  let mouseClientY =
    window.innerHeight / 2;


  if (
    hasFinePointer
  ) {

    window.addEventListener(
      "pointermove",
      (event) => {

        mouseClientX =
          event.clientX;


        mouseClientY =
          event.clientY;


        document.documentElement.style.setProperty(
          "--mx",
          `${(
            mouseClientX /
            window.innerWidth
          ) * 100}%`
        );


        document.documentElement.style.setProperty(
          "--my",
          `${(
            mouseClientY /
            window.innerHeight
          ) * 100}%`
        );

      },
      {
        passive: true
      }
    );

  }


  /* =========================================================
     CUSTOM CURSOR
     ========================================================= */

  const cursor =
    $("#cursor");


  if (
    cursor &&
    hasFinePointer &&
    !prefersReducedMotion
  ) {

    document.body.classList.add(
      "has-custom-cursor"
    );


    let cursorX =
      window.innerWidth / 2;


    let cursorY =
      window.innerHeight / 2;


    const trailPoints =
      [];


    for (
      let i = 0;
      i < 8;
      i++
    ) {

      const trailElement =
        document.createElement(
          "span"
        );


      trailElement.className =
        "cursor-trail";


      trailElement.style.opacity =
        String(
          Math.max(
            0.05,
            0.32 -
            i * 0.035
          )
        );


      document.body.appendChild(
        trailElement
      );


      trailPoints.push({
        element:
          trailElement,
        x:
          cursorX,
        y:
          cursorY
      });

    }


    function animateCursor() {

      cursorX +=
        (
          mouseClientX -
          cursorX
        ) * 0.22;


      cursorY +=
        (
          mouseClientY -
          cursorY
        ) * 0.22;


      cursor.style.transform =
        `translate3d(${cursorX}px, ${cursorY}px, 0)`;


      let previousX =
        cursorX;


      let previousY =
        cursorY;


      trailPoints.forEach(
        (
          point,
          index
        ) => {

          const strength =
            0.22 -
            index * 0.014;


          point.x +=
            (
              previousX -
              point.x
            ) * strength;


          point.y +=
            (
              previousY -
              point.y
            ) * strength;


          point.element.style.transform =
            `translate3d(${point.x}px, ${point.y}px, 0)`;


          previousX =
            point.x;


          previousY =
            point.y;

        }
      );


      requestAnimationFrame(
        animateCursor
      );

    }


    requestAnimationFrame(
      animateCursor
    );


    const interactiveElements =
      $$(
        `
        a,
        button,
        input,
        textarea,
        select,
        .chip,
        .skill-row,
        .featured-project-card
        `
      );


    interactiveElements.forEach(
      (
        element
      ) => {

        element.addEventListener(
          "mouseenter",
          () => {

            cursor.classList.add(
              "is-link"
            );

          }
        );


        element.addEventListener(
          "mouseleave",
          () => {

            cursor.classList.remove(
              "is-link"
            );

          }
        );

      }
    );

  } else if (
    cursor &&
    !hasFinePointer
  ) {

    cursor.style.display =
      "none";

  }


  /* =========================================================
     LIVE BACKGROUND
     ========================================================= */

  const liveBackground =
    document.createElement(
      "div"
    );


  liveBackground.className =
    "live-background";


  liveBackground.setAttribute(
    "aria-hidden",
    "true"
  );


  const orbContainer =
    document.createElement(
      "div"
    );


  orbContainer.className =
    "live-orbs";


  for (
    let i = 1;
    i <= 3;
    i++
  ) {

    const orb =
      document.createElement(
        "span"
      );


    orb.className =
      `ambient-orb ambient-orb-${i}`;


    orbContainer.appendChild(
      orb
    );

  }


  const particleContainer =
    document.createElement(
      "div"
    );


  particleContainer.className =
    "live-particles";


  if (
    !prefersReducedMotion
  ) {

    const particleCount =
      hasFinePointer
        ? 28
        : 10;


    for (
      let i = 0;
      i < particleCount;
      i++
    ) {

      const particle =
        document.createElement(
          "span"
        );


      particle.className =
        "bg-particle";


      particle.style.setProperty(
        "--delay",
        `${(
          Math.random() * 10
        ).toFixed(2)}s`
      );


      particle.style.setProperty(
        "--duration",
        `${(
          8 +
          Math.random() * 12
        ).toFixed(2)}s`
      );


      particle.style.setProperty(
        "--left",
        `${(
          Math.random() * 100
        ).toFixed(2)}%`
      );


      particle.style.setProperty(
        "--size",
        `${(
          1.5 +
          Math.random() * 3.5
        ).toFixed(2)}px`
      );


      particleContainer.appendChild(
        particle
      );

    }

  }


  liveBackground.appendChild(
    orbContainer
  );


  liveBackground.appendChild(
    particleContainer
  );


  document.body.prepend(
    liveBackground
  );


  /* =========================================================
     MARQUEE
     ========================================================= */

  const marqueeTrack =
    $("#marqueeTrack");


  const defaultMarquee = [
    "DIGITAL MARKETING",
    "GRAPHIC DESIGN",
    "CONTENT CREATION",
    "SOCIAL MEDIA",
    "BRAND VISUALS",
    "CREATIVE STRATEGY"
  ];


  function renderMarquee(
    items
  ) {

    if (
      !marqueeTrack
    ) {
      return;
    }


    const build =
      () =>
        items
          .map(
            (
              item
            ) => `
              <span>${item}</span>
              <i>✦</i>
            `
          )
          .join("");


    marqueeTrack.innerHTML =
      build() +
      build();

  }


  renderMarquee(
    defaultMarquee
  );


  /* =========================================================
     LANGUAGE SYSTEM
     English • Bangla • Arabic
     ========================================================= */

  const languageSwitcher =
    $(".language-switcher");


  const languageToggle =
    $("#languageToggle");


  const languageMenu =
    $("#languageMenu");


  const languageCurrent =
    $("#languageCurrent");


  const languageOptions =
    $$(".language-option");


  const languageData = {

    /* =======================================================
       ENGLISH
       ======================================================= */

    en: {

      lang:
        "en",

      dir:
        "ltr",

      short:
        "EN",

      title:
        "Sefat Bhuiyan — Portfolio",

      description:
        "Personal portfolio of Sefat Bhuiyan — Digital Marketer & Graphic Designer.",


      nav: [
        "Home",
        "About",
        "Education",
        "Career",
        "Projects"
      ],


      hero: {

        availability:
          "Available for work",

        heading:
          `Hi, I'm<br><span class="gradient">Sefat Bhuiyan</span>`,

        lead:
          "I build creative digital experiences. Specialized in digital marketing, content creation, graphic design, and modern social media visuals.",

        viewWork:
          "View Work&nbsp;→",

        resume:
          "Resume&nbsp;↗"

      },


      card: {

        role:
          "Digital Marketer & Graphic Designer",

        specialty:
          "SPECIALTY",

        specialtyValue:
          "Marketing & Design",

        location:
          "LOCATION",

        locationValue:
          "Dhaka, Bangladesh",

        experience:
          "EXPERIENCE",

        experienceValue:
          "Creative Projects",

        status:
          "STATUS",

        statusValue:
          "● Active",

        brand:
          "PERSONAL BRAND"

      },


      about: {

        eyebrow:
          "About Me",

        heading:
          `Passionate about <span class="gradient">Digital Excellence</span>`,

        description:
          "I am a creative digital marketer and designer focused on building clear, engaging, and visually strong digital experiences. I blend marketing strategy, content creation, and design to help brands communicate better.",

        stats: [
          "Creative Skills",
          "Projects & Designs",
          "Clients / Collaborations",
          "Core Services"
        ]

      },


      services: {

        eyebrow:
          "What I Do",

        heading:
          "Creative services that move brands forward.",

        description:
          "A focused set of services combining strategy, design, content, and social media support.",

        items: [
          [
            "Social Media Marketing",
            "Page setup, content planning, growth-focused social media support."
          ],
          [
            "Graphic Design",
            "Posts, banners, thumbnails, business creatives, and visual systems."
          ],
          [
            "Content Creation",
            "Creative concepts, ad creatives, scripts, and branded visual content."
          ],
          [
            "Brand Visuals",
            "Clean identity assets, campaign visuals, and consistent presentation."
          ]
        ]

      },


      projects: {

        eyebrow:
          "Selected Works",

        heading:
          `Explore My <span class="gradient">Projects</span>`,

        description:
          "Want to see all of my work in one place? Open my complete project collection on Google Drive.",

        kicker:
          "Complete Portfolio Collection",

        headingCard:
          "সবগুলো Project দেখতে এখানে ক্লিক করুন",

        descriptionCard:
          "আমার সব ডিজাইন, marketing creatives, social media work এবং অন্যান্য project একসাথে দেখতে নিচের button-এ click করুন।",

        button:
          "All Projects",

        tags: [
          "Design",
          "Marketing",
          "Content",
          "Creative"
        ]

      },


      featured: {

        eyebrow:
          "Featured Project Focus",

        heading:
          "Selected creative directions for brands & social media.",

        description:
          "Explore a few core project categories and open the full collection to see the detailed work.",

        cards: [

          [
            "Social Media Marketing",
            "Social Media Campaign",
            "Page visuals, content planning, and growth-focused creative direction.",
            "View Collection",
            "Open social media campaign work"
          ],

          [
            "Graphic Design",
            "Brand Visual Design",
            "Clean visual assets, campaign creatives, and consistent brand presentation.",
            "View Collection",
            "Open brand visual design work"
          ],

          [
            "Content Creation",
            "Content & Ad Creative",
            "Creative concepts, ad-ready visuals, scripts, and branded content direction.",
            "View Collection",
            "Open content and ad creative work"
          ]

        ]

      },


      career: {

        eyebrow:
          "Career Journey",

        heading:
          "My professional path.",

        items: [

          [
            "Digital Marketing & Design",
            "Freelance / Personal Projects",
            "Building campaigns, social visuals, creative content, and digital brand materials with a strong focus on clarity and visual quality."
          ],

          [
            "Graphic Design Practice",
            "Creative Projects",
            "Designed social posts, banners, thumbnails, logos, and visual assets while developing a consistent production workflow."
          ],

          [
            "Content & Social Media",
            "Independent Work",
            "Explored content creation, page growth, and social media strategy through hands-on projects and experimentation."
          ]

        ]

      },


      education: {

        eyebrow:
          "Academic Background",

        heading:
          `Academic <span class="gradient">Background</span>`,

        description:
          "Academic and technical learning that supports my creative and digital work.",

        current:
          "Current",

        completed:
          "Completed",

        items: [

          [
            "Diploma in Computer Technology",
            "Bangladesh · Computer Technology",
            [
              "Computer fundamentals and practical technology learning",
              "Digital tools and problem-solving practice",
              "Hands-on technical learning and projects"
            ]
          ],

          [
            "Secondary School Certificate",
            "Bangladesh · SSC",
            [
              "Completed higher secondary education",
              "Academic foundation for further technical study",
              "Transitioned into diploma and professional skill development"
            ]
          ]

        ]

      },


      skills: {

        eyebrow:
          "Expertise & Skills",

        heading:
          "What I bring to the table.",

        arsenal:
          "Technical / Creative Arsenal",

        traits:
          "Professional Traits",

        traitsItems: [
          "Creative Thinking",
          "Problem Solving",
          "Content Strategy",
          "Visual Storytelling",
          "Brand Consistency",
          "Client Communication"
        ],

        learner:
          "Constant Learner",

        learnerText:
          "Continuously learning new tools, creative workflows, digital marketing techniques, and design systems."

      },


      testimonials: {

        eyebrow:
          "Client Testimonials",

        heading:
          "People I have worked with.",

        clients: [
          "Client",
          "Creative Partner"
        ],

        roles: [
          "Business / Brand",
          "Creative Collaboration"
        ],

        texts: [

          "Creative, responsive, and easy to communicate with. The visuals were delivered cleanly and matched the direction very well.",

          "Strong attention to detail and a very good sense of modern social media presentation. Would work together again."

        ]

      },


      contact: {

        eyebrow:
          "Let's Connect",

        heading:
          "Have a project in mind?",

        description:
          "Let's discuss your next campaign, design need, or digital project.",

        labels: [
          "WhatsApp",
          "Facebook",
          "Email",
          "LinkedIn",
          "Location"
        ],

        values: [
          "01828157751",
          "Open Profile ↗",
          "ksefat94@gmail.com",
          "View Profile ↗",
          "Dhaka, Bangladesh"
        ],

        name:
          "Your Name",

        email:
          "Email Address",

        subject:
          "Subject",

        message:
          "Write your message...",

        send:
          "Send Message&nbsp;→"

      },


      footer: {

        role:
          "DIGITAL MARKETER • DESIGNER",

        back:
          "Back to top ↑",

        nav: [
          "Home",
          "About",
          "Career",
          "Projects",
          "Education",
          "Contact"
        ],

        copyright:
          "© 2026 Sefat Bhuiyan. Crafted with ♥"

      },


      aria: {

        changeLanguage:
          "Change language",

        whatsapp:
          "Chat on WhatsApp",

        facebook:
          "Open Facebook profile",

        email:
          "Send email",

        linkedin:
          "Open LinkedIn profile",

        resume:
          "Open Sefat Bhuiyan resume"

      },


      marquee: [
        "DIGITAL MARKETING",
        "GRAPHIC DESIGN",
        "CONTENT CREATION",
        "SOCIAL MEDIA",
        "BRAND VISUALS",
        "CREATIVE STRATEGY"
      ]

    },


    /* =======================================================
       BANGLA
       ======================================================= */

    bn: {

      lang:
        "bn",

      dir:
        "ltr",

      short:
        "বাংলা",

      title:
        "সিফাত ভুঁইয়া — পোর্টফোলিও",

      description:
        "সিফাত ভুঁইয়ার ব্যক্তিগত পোর্টফোলিও — ডিজিটাল মার্কেটার ও গ্রাফিক ডিজাইনার।",


      nav: [
        "হোম",
        "আমার সম্পর্কে",
        "শিক্ষা",
        "ক্যারিয়ার",
        "প্রজেক্ট"
      ],


      hero: {

        availability:
          "কাজের জন্য উপলব্ধ",

        heading:
          `হাই, আমি<br><span class="gradient">সিফাত ভুঁইয়া</span>`,

        lead:
          "আমি সৃজনশীল ডিজিটাল এক্সপেরিয়েন্স তৈরি করি। Digital Marketing, Content Creation, Graphic Design এবং আধুনিক Social Media Visuals নিয়ে কাজ করি।",

        viewWork:
          "আমার কাজ দেখুন&nbsp;→",

        resume:
          "রেজুমে&nbsp;↗"

      },


      card: {

        role:
          "ডিজিটাল মার্কেটার ও গ্রাফিক ডিজাইনার",

        specialty:
          "বিশেষত্ব",

        specialtyValue:
          "মার্কেটিং ও ডিজাইন",

        location:
          "অবস্থান",

        locationValue:
          "ঢাকা, বাংলাদেশ",

        experience:
          "অভিজ্ঞতা",

        experienceValue:
          "ক্রিয়েটিভ প্রজেক্ট",

        status:
          "স্ট্যাটাস",

        statusValue:
          "● সক্রিয়",

        brand:
          "পার্সোনাল ব্র্যান্ড"

      },


      about: {

        eyebrow:
          "আমার সম্পর্কে",

        heading:
          `ডিজিটাল <span class="gradient">এক্সিলেন্স</span> নিয়ে কাজ করতে ভালোবাসি`,

        description:
          "আমি একজন সৃজনশীল ডিজিটাল মার্কেটার ও ডিজাইনার। পরিষ্কার, আকর্ষণীয় এবং শক্তিশালী ভিজ্যুয়াল ডিজিটাল এক্সপেরিয়েন্স তৈরি করার দিকে আমার ফোকাস। Marketing Strategy, Content Creation এবং Design একসাথে ব্যবহার করে ব্র্যান্ডকে আরও ভালোভাবে যোগাযোগ করতে সাহায্য করি।",

        stats: [
          "ক্রিয়েটিভ স্কিল",
          "প্রজেক্ট ও ডিজাইন",
          "ক্লায়েন্ট / সহযোগিতা",
          "মূল সার্ভিস"
        ]

      },


      services: {

        eyebrow:
          "আমি যা করি",

        heading:
          "ব্র্যান্ডকে এগিয়ে নিতে সৃজনশীল সার্ভিস।",

        description:
          "ডিজিটাল মার্কেটিং, ডিজাইন, কনটেন্ট এবং সোশ্যাল মিডিয়া সাপোর্টের একটি focused service system.",

        items: [

          [
            "Social Media Marketing",
            "Page setup, content planning এবং growth-focused social media support."
          ],

          [
            "Graphic Design",
            "Posts, banners, thumbnails, business creatives এবং visual systems."
          ],

          [
            "Content Creation",
            "Creative concepts, ad creatives, scripts এবং branded visual content."
          ],

          [
            "Brand Visuals",
            "Clean identity assets, campaign visuals এবং consistent presentation."
          ]

        ]

      },


      projects: {

        eyebrow:
          "নির্বাচিত কাজ",

        heading:
          `আমার <span class="gradient">প্রজেক্টসমূহ</span> দেখুন`,

        description:
          "আমার সব কাজ এক জায়গায় দেখতে complete project collection খুলুন।",

        kicker:
          "সম্পূর্ণ পোর্টফোলিও কালেকশন",

        headingCard:
          "সবগুলো Project দেখতে এখানে ক্লিক করুন",

        descriptionCard:
          "আমার সব ডিজাইন, marketing creatives, social media work এবং অন্যান্য project একসাথে দেখতে নিচের button-এ click করুন।",

        button:
          "সব প্রজেক্ট",

        tags: [
          "ডিজাইন",
          "মার্কেটিং",
          "কনটেন্ট",
          "ক্রিয়েটিভ"
        ]

      },


      featured: {

        eyebrow:
          "ফিচার্ড প্রজেক্ট ফোকাস",

        heading:
          "ব্র্যান্ড ও সোশ্যাল মিডিয়ার জন্য নির্বাচিত ক্রিয়েটিভ কাজ।",

        description:
          "আমার কাজের কয়েকটি মূল প্রজেক্ট ক্যাটাগরি দেখুন এবং বিস্তারিত কাজ দেখতে সম্পূর্ণ কালেকশন খুলুন।",

        cards: [

          [
            "সোশ্যাল মিডিয়া মার্কেটিং",
            "সোশ্যাল মিডিয়া ক্যাম্পেইন",
            "পেজ ভিজ্যুয়াল, কনটেন্ট প্ল্যানিং এবং গ্রোথ-ফোকাসড ক্রিয়েটিভ ডিরেকশন।",
            "কাজ দেখুন",
            "সোশ্যাল মিডিয়া ক্যাম্পেইনের কাজ খুলুন"
          ],

          [
            "গ্রাফিক ডিজাইন",
            "ব্র্যান্ড ভিজ্যুয়াল ডিজাইন",
            "ক্লিন ভিজ্যুয়াল অ্যাসেট, ক্যাম্পেইন ক্রিয়েটিভ এবং কনসিস্টেন্ট ব্র্যান্ড প্রেজেন্টেশন।",
            "কাজ দেখুন",
            "ব্র্যান্ড ভিজ্যুয়াল ডিজাইনের কাজ খুলুন"
          ],

          [
            "কনটেন্ট ক্রিয়েশন",
            "কনটেন্ট ও অ্যাড ক্রিয়েটিভ",
            "ক্রিয়েটিভ কনসেপ্ট, বিজ্ঞাপনের উপযোগী ভিজ্যুয়াল, স্ক্রিপ্ট এবং ব্র্যান্ডেড কনটেন্ট ডিরেকশন।",
            "কাজ দেখুন",
            "কনটেন্ট ও অ্যাড ক্রিয়েটিভের কাজ খুলুন"
          ]

        ]

      },


      career: {

        eyebrow:
          "ক্যারিয়ার জার্নি",

        heading:
          "আমার পেশাগত পথ।",

        items: [

          [
            "ডিজিটাল মার্কেটিং ও ডিজাইন",
            "ফ্রিল্যান্স / ব্যক্তিগত প্রজেক্ট",
            "ক্যাম্পেইন, সোশ্যাল ভিজ্যুয়াল, ক্রিয়েটিভ কনটেন্ট এবং ডিজিটাল ব্র্যান্ড ম্যাটেরিয়াল তৈরি করছি।"
          ],

          [
            "গ্রাফিক ডিজাইন প্র্যাকটিস",
            "ক্রিয়েটিভ প্রজেক্ট",
            "সোশ্যাল পোস্ট, ব্যানার, থাম্বনেইল, লোগো এবং বিভিন্ন ভিজ্যুয়াল অ্যাসেট ডিজাইন করেছি।"
          ],

          [
            "কনটেন্ট ও সোশ্যাল মিডিয়া",
            "ইন্ডিপেন্ডেন্ট ওয়ার্ক",
            "Content Creation, page growth এবং Social Media Strategy নিয়ে hands-on কাজ ও experimentation করেছি।"
          ]

        ]

      },


      education: {

        eyebrow:
          "শিক্ষাগত পটভূমি",

        heading:
          `শিক্ষাগত <span class="gradient">পটভূমি</span>`,

        description:
          "আমার সৃজনশীল ও ডিজিটাল কাজকে সহায়তা করা একাডেমিক ও টেকনিক্যাল লার্নিং।",

        current:
          "চলমান",

        completed:
          "সম্পন্ন",

        items: [

          [
            "ডিপ্লোমা ইন কম্পিউটার টেকনোলজি",
            "বাংলাদেশ · কম্পিউটার টেকনোলজি",
            [
              "কম্পিউটার ফান্ডামেন্টাল ও ব্যবহারিক প্রযুক্তি শিক্ষা",
              "ডিজিটাল টুলস ও সমস্যা সমাধানের অনুশীলন",
              "হাতে-কলমে টেকনিক্যাল লার্নিং ও প্রজেক্ট"
            ]
          ],

          [
            "সেকেন্ডারি স্কুল সার্টিফিকেট",
            "বাংলাদেশ · SSC",
            [
              "উচ্চ মাধ্যমিক শিক্ষা সম্পন্ন",
              "পরবর্তী টেকনিক্যাল পড়াশোনার জন্য একাডেমিক ভিত্তি",
              "ডিপ্লোমা ও প্রফেশনাল স্কিল ডেভেলপমেন্টে অগ্রসর"
            ]
          ]

        ]

      },


      skills: {

        eyebrow:
          "দক্ষতা ও স্কিল",

        heading:
          "আমি যে দক্ষতাগুলো নিয়ে কাজ করি।",

        arsenal:
          "টেকনিক্যাল / ক্রিয়েটিভ আর্সেনাল",

        traits:
          "প্রফেশনাল বৈশিষ্ট্য",

        traitsItems: [
          "Creative Thinking",
          "Problem Solving",
          "Content Strategy",
          "Visual Storytelling",
          "Brand Consistency",
          "Client Communication"
        ],

        learner:
          "সবসময় শেখার আগ্রহ",

        learnerText:
          "নতুন টুল, creative workflow, digital marketing technique এবং design system নিয়মিত শিখছি।"

      },


      testimonials: {

        eyebrow:
          "ক্লায়েন্ট মতামত",

        heading:
          "যাদের সাথে কাজ করেছি।",

        clients: [
          "ক্লায়েন্ট",
          "ক্রিয়েটিভ পার্টনার"
        ],

        roles: [
          "ব্যবসা / ব্র্যান্ড",
          "ক্রিয়েটিভ সহযোগিতা"
        ],

        texts: [

          "সৃজনশীল, দ্রুত সাড়া দেয় এবং যোগাযোগ করা সহজ। ভিজ্যুয়ালগুলো পরিষ্কারভাবে ডেলিভার করা হয়েছে এবং নির্দেশনার সঙ্গে ভালোভাবে মিলেছে।",

          "ডিটেইলের প্রতি ভালো নজর এবং আধুনিক সোশ্যাল মিডিয়া প্রেজেন্টেশনের দারুণ ধারণা আছে। আবারও একসাথে কাজ করতে চাই।"

        ]

      },


      contact: {

        eyebrow:
          "যোগাযোগ করি",

        heading:
          "কোনো প্রজেক্টের পরিকল্পনা আছে?",

        description:
          "আপনার পরবর্তী campaign, design need অথবা digital project নিয়ে আলোচনা করা যাক।",

        labels: [
          "WhatsApp",
          "Facebook",
          "Email",
          "LinkedIn",
          "অবস্থান"
        ],

        values: [
          "01828157751",
          "প্রোফাইল খুলুন ↗",
          "ksefat94@gmail.com",
          "প্রোফাইল দেখুন ↗",
          "ঢাকা, বাংলাদেশ"
        ],

        name:
          "আপনার নাম",

        email:
          "ইমেইল ঠিকানা",

        subject:
          "বিষয়",

        message:
          "আপনার মেসেজ লিখুন...",

        send:
          "মেসেজ পাঠান&nbsp;→"

      },


      footer: {

        role:
          "ডিজিটাল মার্কেটার • ডিজাইনার",

        back:
          "উপরে যান ↑",

        nav: [
          "হোম",
          "আমার সম্পর্কে",
          "ক্যারিয়ার",
          "প্রজেক্ট",
          "শিক্ষা",
          "যোগাযোগ"
        ],

        copyright:
          "© 2026 সিফাত ভুঁইয়া। Crafted with ♥"

      },


      aria: {

        changeLanguage:
          "ভাষা পরিবর্তন",

        whatsapp:
          "WhatsApp-এ যোগাযোগ করুন",

        facebook:
          "Facebook প্রোফাইল খুলুন",

        email:
          "ইমেইল পাঠান",

        linkedin:
          "LinkedIn প্রোফাইল খুলুন",

        resume:
          "সিফাত ভুঁইয়ার রেজুমে খুলুন"

      },


      marquee: [
        "ডিজিটাল মার্কেটিং",
        "গ্রাফিক ডিজাইন",
        "কনটেন্ট ক্রিয়েশন",
        "সোশ্যাল মিডিয়া",
        "ব্র্যান্ড ভিজ্যুয়াল",
        "ক্রিয়েটিভ স্ট্র্যাটেজি"
      ]

    },


    /* =======================================================
       ARABIC
       ======================================================= */

    ar: {

      lang:
        "ar",

      dir:
        "rtl",

      short:
        "عربي",

      title:
        "سيفات بويان — الملف الشخصي",

      description:
        "الملف الشخصي لسيفات بويان — مسوّق رقمي ومصمم جرافيك.",


      nav: [
        "الرئيسية",
        "نبذة عني",
        "التعليم",
        "المسار المهني",
        "المشاريع"
      ],


      hero: {

        availability:
          "متاح للعمل",

        heading:
          `مرحباً، أنا<br><span class="gradient">سيفات بويان</span>`,

        lead:
          "أصنع تجارب رقمية إبداعية متخصصة في التسويق الرقمي، صناعة المحتوى، التصميم الجرافيكي، والتصاميم الحديثة لوسائل التواصل الاجتماعي.",

        viewWork:
          "شاهد أعمالي&nbsp;→",

        resume:
          "السيرة الذاتية&nbsp;↗"

      },


      card: {

        role:
          "مسوّق رقمي ومصمم جرافيك",

        specialty:
          "التخصص",

        specialtyValue:
          "التسويق والتصميم",

        location:
          "الموقع",

        locationValue:
          "دكا، بنغلاديش",

        experience:
          "الخبرة",

        experienceValue:
          "مشاريع إبداعية",

        status:
          "الحالة",

        statusValue:
          "● نشط",

        brand:
          "علامة شخصية"

      },


      about: {

        eyebrow:
          "نبذة عني",

        heading:
          `شغوف بـ <span class="gradient">التميز الرقمي</span>`,

        description:
          "أنا مسوّق رقمي ومصمم إبداعي أركز على بناء تجارب رقمية واضحة وجذابة وقوية بصرياً. أدمج استراتيجية التسويق وصناعة المحتوى والتصميم لمساعدة العلامات التجارية على التواصل بشكل أفضل.",

        stats: [
          "مهارات إبداعية",
          "المشاريع والتصاميم",
          "العملاء / التعاونات",
          "الخدمات الأساسية"
        ]

      },


      services: {

        eyebrow:
          "ماذا أقدم",

        heading:
          "خدمات إبداعية تساعد العلامات التجارية على التقدم.",

        description:
          "مجموعة خدمات مركزة تجمع بين التسويق الرقمي والتصميم وصناعة المحتوى ودعم وسائل التواصل.",

        items: [

          [
            "التسويق عبر وسائل التواصل",
            "إعداد الصفحات، تخطيط المحتوى، ودعم نمو وسائل التواصل الاجتماعي."
          ],

          [
            "التصميم الجرافيكي",
            "منشورات، بانرات، صور مصغرة، تصاميم تجارية وأنظمة بصرية."
          ],

          [
            "صناعة المحتوى",
            "أفكار إبداعية، تصاميم إعلانية، نصوص ومحتوى بصري للعلامة التجارية."
          ],

          [
            "الهوية البصرية",
            "أصول هوية نظيفة، تصاميم الحملات وتقديم متناسق."
          ]

        ]

      },


      projects: {

        eyebrow:
          "أعمال مختارة",

        heading:
          `استكشف <span class="gradient">مشاريعي</span>`,

        description:
          "شاهد جميع أعمالي في مكان واحد من خلال مجموعة المشاريع الكاملة.",

        kicker:
          "مجموعة الأعمال الكاملة",

        headingCard:
          "اضغط هنا لمشاهدة جميع المشاريع",

        descriptionCard:
          "شاهد جميع تصاميمي، وأعمال التسويق، ومحتوى وسائل التواصل الاجتماعي والمشاريع الأخرى في مكان واحد.",

        button:
          "جميع المشاريع",

        tags: [
          "تصميم",
          "تسويق",
          "محتوى",
          "إبداع"
        ]

      },


      featured: {

        eyebrow:
          "تركيز على المشاريع المميزة",

        heading:
          "اتجاهات إبداعية مختارة للعلامات التجارية ووسائل التواصل الاجتماعي.",

        description:
          "استكشف بعض فئات المشاريع الأساسية وافتح المجموعة الكاملة لرؤية الأعمال بالتفصيل.",

        cards: [

          [
            "التسويق عبر وسائل التواصل",
            "حملة لوسائل التواصل",
            "تصاميم الصفحات وتخطيط المحتوى والتوجيه الإبداعي الموجّه للنمو.",
            "عرض الأعمال",
            "فتح أعمال حملة وسائل التواصل"
          ],

          [
            "التصميم الجرافيكي",
            "تصميم الهوية البصرية",
            "أصول بصرية نظيفة وتصاميم للحملات وعرض متناسق للعلامة التجارية.",
            "عرض الأعمال",
            "فتح أعمال الهوية البصرية"
          ],

          [
            "صناعة المحتوى",
            "محتوى وتصاميم إعلانية",
            "أفكار إبداعية وتصاميم جاهزة للإعلانات ونصوص وتوجيه للمحتوى الخاص بالعلامة التجارية.",
            "عرض الأعمال",
            "فتح أعمال المحتوى والتصاميم الإعلانية"
          ]

        ]

      },


      career: {

        eyebrow:
          "المسار المهني",

        heading:
          "مساري المهني.",

        items: [

          [
            "التسويق الرقمي والتصميم",
            "عمل حر / مشاريع شخصية",
            "أعمل على الحملات والتصاميم الاجتماعية والمحتوى الإبداعي ومواد العلامات التجارية الرقمية."
          ],

          [
            "ممارسة التصميم الجرافيكي",
            "مشاريع إبداعية",
            "صممت منشورات اجتماعية وبانرات وصوراً مصغرة وشعارات وأصولاً بصرية مختلفة."
          ],

          [
            "المحتوى ووسائل التواصل",
            "عمل مستقل",
            "استكشفت صناعة المحتوى ونمو الصفحات واستراتيجية وسائل التواصل من خلال مشاريع عملية."
          ]

        ]

      },


      education: {

        eyebrow:
          "الخلفية الأكاديمية",

        heading:
          `الخلفية <span class="gradient">الأكاديمية</span>`,

        description:
          "تعلم أكاديمي وتقني يدعم عملي الإبداعي والرقمي.",

        current:
          "حالي",

        completed:
          "مكتمل",

        items: [

          [
            "دبلوم تكنولوجيا الحاسوب",
            "بنغلاديش · تكنولوجيا الحاسوب",
            [
              "أساسيات الحاسوب والتعلم التقني العملي",
              "الأدوات الرقمية وممارسة حل المشكلات",
              "التعلم التقني والمشاريع العملية"
            ]
          ],

          [
            "شهادة الثانوية",
            "بنغلاديش · SSC",
            [
              "إكمال التعليم الثانوي",
              "أساس أكاديمي لمواصلة الدراسة التقنية",
              "الانتقال إلى الدبلوم وتطوير المهارات المهنية"
            ]
          ]

        ]

      },


      skills: {

        eyebrow:
          "الخبرات والمهارات",

        heading:
          "ما أقدمه من مهارات.",

        arsenal:
          "المهارات التقنية والإبداعية",

        traits:
          "الصفات المهنية",

        traitsItems: [
          "التفكير الإبداعي",
          "حل المشكلات",
          "استراتيجية المحتوى",
          "السرد البصري",
          "اتساق العلامة التجارية",
          "التواصل مع العملاء"
        ],

        learner:
          "متعلم باستمرار",

        learnerText:
          "أتعلم باستمرار أدوات جديدة وأساليب إبداعية وتقنيات التسويق الرقمي وأنظمة التصميم."

      },


      testimonials: {

        eyebrow:
          "آراء العملاء",

        heading:
          "الأشخاص الذين عملت معهم.",

        clients: [
          "العميل",
          "شريك إبداعي"
        ],

        roles: [
          "نشاط / علامة تجارية",
          "تعاون إبداعي"
        ],

        texts: [

          "مبدع وسريع الاستجابة وسهل التواصل معه. تم تسليم التصاميم بشكل نظيف وتوافقت جيداً مع التوجيه.",

          "اهتمام قوي بالتفاصيل وفهم جيد جداً لأسلوب العرض الحديث على وسائل التواصل الاجتماعي. سأعمل معه مرة أخرى."

        ]

      },


      contact: {

        eyebrow:
          "لنتواصل",

        heading:
          "هل لديك مشروع في ذهنك؟",

        description:
          "لنتحدث عن حملتك القادمة أو احتياجك التصميمي أو مشروعك الرقمي.",

        labels: [
          "واتساب",
          "فيسبوك",
          "البريد الإلكتروني",
          "لينكدإن",
          "الموقع"
        ],

        values: [
          "01828157751",
          "فتح الملف ↗",
          "ksefat94@gmail.com",
          "عرض الملف ↗",
          "دكا، بنغلاديش"
        ],

        name:
          "اسمك",

        email:
          "البريد الإلكتروني",

        subject:
          "الموضوع",

        message:
          "اكتب رسالتك...",

        send:
          "إرسال الرسالة&nbsp;→"

      },


      footer: {

        role:
          "مسوّق رقمي • مصمم",

        back:
          "العودة إلى الأعلى ↑",

        nav: [
          "الرئيسية",
          "نبذة عني",
          "المسار المهني",
          "المشاريع",
          "التعليم",
          "التواصل"
        ],

        copyright:
          "© 2026 سيفات بويان. صُنع بكل حب ♥"

      },


      aria: {

        changeLanguage:
          "تغيير اللغة",

        whatsapp:
          "التواصل عبر واتساب",

        facebook:
          "فتح ملف فيسبوك",

        email:
          "إرسال بريد إلكتروني",

        linkedin:
          "فتح ملف لينكدإن",

        resume:
          "فتح السيرة الذاتية لسيفات بويان"

      },


      marquee: [
        "التسويق الرقمي",
        "التصميم الجرافيكي",
        "صناعة المحتوى",
        "وسائل التواصل الاجتماعي",
        "الهوية البصرية",
        "الاستراتيجية الإبداعية"
      ]

    }

  };


  /* =========================================================
     META HELPER
     ========================================================= */

  function ensureMeta(
    attribute,
    key,
    content
  ) {

    let meta =
      document.querySelector(
        `meta[${attribute}="${key}"]`
      );


    if (
      !meta
    ) {

      meta =
        document.createElement(
          "meta"
        );


      meta.setAttribute(
        attribute,
        key
      );


      document.head.appendChild(
        meta
      );

    }


    meta.setAttribute(
      "content",
      content
    );

  }


  /* =========================================================
     LANGUAGE HELPERS
     ========================================================= */

  function setText(
    selector,
    value
  ) {

    const element =
      $(selector);


    if (
      element
    ) {

      element.textContent =
        value;

    }

  }


  function setHTML(
    selector,
    value
  ) {

    const element =
      $(selector);


    if (
      element
    ) {

      element.innerHTML =
        value;

    }

  }


  function setAttr(
    selector,
    attribute,
    value
  ) {

    const element =
      $(selector);


    if (
      element
    ) {

      element.setAttribute(
        attribute,
        value
      );

    }

  }


  function setTextFromElement(
    element,
    value
  ) {

    if (
      element
    ) {

      element.textContent =
        value;

    }

  }


  /* =========================================================
     FEATURED PROJECT LANGUAGE
     ========================================================= */

  function applyFeaturedProjects(
    data
  ) {

    if (
      !data ||
      !data.featured
    ) {

      return;

    }


    setText(
      "#featuredProjectsEyebrow",
      data.featured.eyebrow
    );


    setText(
      "#featuredProjectsHeading",
      data.featured.heading
    );


    setText(
      "#featuredProjectsDescription",
      data.featured.description
    );


    const cards =
      $$("#featuredProjects .featured-project-card");


    data.featured.cards.forEach(
      (
        item,
        index
      ) => {

        const card =
          cards[index];


        if (
          !card
        ) {

          return;

        }


        const category =
          $(".featured-project-category", card);


        const heading =
          $("h4", card);


        const description =
          $(".featured-project-body > p", card);


        const linkText =
          $(".featured-project-link span:first-child", card);


        const link =
          $(".featured-project-link", card);


        setTextFromElement(
          category,
          item[0]
        );


        setTextFromElement(
          heading,
          item[1]
        );


        setTextFromElement(
          description,
          item[2]
        );


        setTextFromElement(
          linkText,
          item[3]
        );


        if (
          link
        ) {

          link.setAttribute(
            "aria-label",
            item[4]
          );

        }

      }
    );

  }


  /* =========================================================
     APPLY LANGUAGE
     ========================================================= */

  function applyLanguage(
    language
  ) {

    const data =
      languageData[language] ||
      languageData.en;


    document.documentElement.lang =
      data.lang;


    document.documentElement.dir =
      data.dir;


    document.title =
      data.title;


    setAttr(
      'meta[name="description"]',
      "content",
      data.description
    );


    ensureMeta(
      "property",
      "og:title",
      data.title
    );


    ensureMeta(
      "property",
      "og:description",
      data.description
    );


    ensureMeta(
      "name",
      "twitter:title",
      data.title
    );


    ensureMeta(
      "name",
      "twitter:description",
      data.description
    );


    if (
      languageCurrent
    ) {

      languageCurrent.textContent =
        data.short;

    }


    if (
      languageToggle
    ) {

      languageToggle.setAttribute(
        "aria-label",
        data.aria.changeLanguage
      );


      languageToggle.setAttribute(
        "title",
        data.aria.changeLanguage
      );

    }


    /* ---------- Navbar ---------- */

    const navLinks =
      $$(".nav a");


    data.nav.forEach(
      (
        value,
        index
      ) => {

        if (
          navLinks[index]
        ) {

          navLinks[index].textContent =
            value;

        }

      }
    );


    /* ---------- Hero ---------- */

    setText(
      "#home .pill",
      data.hero.availability
    );


    setHTML(
      "#home h1",
      data.hero.heading
    );


    setText(
      "#home .lead",
      data.hero.lead
    );


    setHTML(
      "#home .btn.primary",
      data.hero.viewWork
    );


    setHTML(
      "#resumeBtn",
      data.hero.resume
    );


    setAttr(
      "#resumeBtn",
      "aria-label",
      data.aria.resume
    );


    setAttr(
      "#resumeBtn",
      "title",
      data.aria.resume
    );


    /* ---------- Hero Card ---------- */

    setText(
      ".card-role",
      data.card.role
    );


    const cardLabels =
      $$(".card-grid .label");


    const cardValues =
      $$(".card-grid .value");


    const cardLabelData = [

      data.card.specialty,

      data.card.location,

      data.card.experience,

      data.card.status

    ];


    const cardValueData = [

      data.card.specialtyValue,

      data.card.locationValue,

      data.card.experienceValue,

      data.card.statusValue

    ];


    cardLabelData.forEach(
      (
        value,
        index
      ) => {

        if (
          cardLabels[index]
        ) {

          cardLabels[index].textContent =
            value;

        }

      }
    );


    cardValueData.forEach(
      (
        value,
        index
      ) => {

        if (
          cardValues[index]
        ) {

          cardValues[index].textContent =
            value;

        }

      }
    );


    setText(
      ".barcode span",
      data.card.brand
    );


    /* ---------- About ---------- */

    setText(
      "#about .eyebrow",
      data.about.eyebrow
    );


    setHTML(
      "#about h2",
      data.about.heading
    );


    setText(
      "#about .section-desc",
      data.about.description
    );


    const statLabels =
      $$("#about .stat > span");


    data.about.stats.forEach(
      (
        value,
        index
      ) => {

        if (
          statLabels[index]
        ) {

          statLabels[index].textContent =
            value;

        }

      }
    );


    /* ---------- Services ---------- */

    setText(
      "#services .eyebrow",
      data.services.eyebrow
    );


    setText(
      "#services h2",
      data.services.heading
    );


    setText(
      "#services .section-desc",
      data.services.description
    );


    const serviceCards =
      $$("#services .service");


    data.services.items.forEach(
      (
        item,
        index
      ) => {

        const card =
          serviceCards[index];


        if (
          !card
        ) {

          return;

        }


        setTextFromElement(
          $("h3", card),
          item[0]
        );


        setTextFromElement(
          $("p", card),
          item[1]
        );

      }
    );


    /* ---------- Projects ---------- */

    setText(
      "#projects .eyebrow",
      data.projects.eyebrow
    );


    setHTML(
      "#projects .section-head h2",
      data.projects.heading
    );


    setText(
      "#projects .section-head .section-desc",
      data.projects.description
    );


    setText(
      "#projects .all-projects-kicker",
      data.projects.kicker
    );


    setText(
      "#projects .all-projects-copy h3",
      data.projects.headingCard
    );


    setText(
      "#projects .all-projects-copy p",
      data.projects.descriptionCard
    );


    setText(
      "#projects .all-projects-btn span:first-child",
      data.projects.button
    );


    const projectTags =
      $$("#projects .all-projects-tags span");


    data.projects.tags.forEach(
      (
        value,
        index
      ) => {

        if (
          projectTags[index]
        ) {

          projectTags[index].textContent =
            value;

        }

      }
    );


    applyFeaturedProjects(
      data
    );


    /* ---------- Career ---------- */

    setText(
      "#career .eyebrow",
      data.career.eyebrow
    );


    setText(
      "#career .section-head h2",
      data.career.heading
    );


    const careerItems =
      $$("#career .timeline-item");


    data.career.items.forEach(
      (
        item,
        index
      ) => {

        const card =
          careerItems[index];


        if (
          !card
        ) {

          return;

        }


        setTextFromElement(
          $("h3", card),
          item[0]
        );


        setTextFromElement(
          $(".company", card),
          item[1]
        );


        setTextFromElement(
          $("p", card),
          item[2]
        );

      }
    );


    /* ---------- Education ---------- */

    setText(
      "#education .eyebrow",
      data.education.eyebrow
    );


    setHTML(
      "#education .section-head h2",
      data.education.heading
    );


    setText(
      "#education .section-head .section-desc",
      data.education.description
    );


    const educationCards =
      $$("#education .edu-card");


    data.education.items.forEach(
      (
        item,
        index
      ) => {

        const card =
          educationCards[index];


        if (
          !card
        ) {

          return;

        }


        setTextFromElement(
          $(".tag", card),
          index === 0
            ? data.education.current
            : data.education.completed
        );


        setTextFromElement(
          $("h3", card),
          item[0]
        );


        setTextFromElement(
          $(".meta", card),
          item[1]
        );


        const listItems =
          $$("li", card);


        item[2].forEach(
          (
            value,
            itemIndex
          ) => {

            if (
              listItems[itemIndex]
            ) {

              listItems[itemIndex].textContent =
                value;

            }

          }
        );

      }
    );


    /* ---------- Skills ---------- */

    setText(
      "#skills .eyebrow",
      data.skills.eyebrow
    );


    setText(
      "#skills .section-head h2",
      data.skills.heading
    );


    setText(
      "#skills .skill-card:first-child h3",
      data.skills.arsenal
    );


    setText(
      "#skills .skill-card:nth-child(2) h3",
      data.skills.traits
    );


    const skillChips =
      $$("#skills .skill-card:nth-child(2) .chip");


    data.skills.traitsItems.forEach(
      (
        value,
        index
      ) => {

        if (
          skillChips[index]
        ) {

          skillChips[index].textContent =
            value;

        }

      }
    );


    const learnerBlock =
      $("#skills .skill-card:nth-child(2) > div:last-child");


    if (
      learnerBlock
    ) {

      setTextFromElement(
        $("b", learnerBlock),
        data.skills.learner
      );


      setTextFromElement(
        $("p", learnerBlock),
        data.skills.learnerText
      );

    }


    /* ---------- Testimonials ---------- */

    setText(
      "#testimonials .eyebrow",
      data.testimonials.eyebrow
    );


    setText(
      "#testimonials .section-head h2",
      data.testimonials.heading
    );


    const testimonialCards =
      $$("#testimonials .testimonial");


    data.testimonials.texts.forEach(
      (
        value,
        index
      ) => {

        const card =
          testimonialCards[index];


        if (
          !card
        ) {

          return;

        }


        setTextFromElement(
          card.querySelector(
            ":scope > p"
          ),
          value
        );


        setTextFromElement(
          card.querySelector(
            ".person b"
          ),
          data.testimonials.clients[index]
        );


        setTextFromElement(
          card.querySelector(
            ".person > div:last-child > div"
          ),
          data.testimonials.roles[index]
        );

      }
    );


    /* ---------- Contact ---------- */

    setText(
      "#contact .eyebrow",
      data.contact.eyebrow
    );


    setText(
      "#contact h2",
      data.contact.heading
    );


    setText(
      "#contact .section-desc",
      data.contact.description
    );


    const contactLabels =
      $$("#contact .contact-item > span");


    const contactValues =
      $$("#contact .contact-item > b");


    data.contact.labels.forEach(
      (
        value,
        index
      ) => {

        if (
          contactLabels[index]
        ) {

          contactLabels[index].textContent =
            value;

        }

      }
    );


    data.contact.values.forEach(
      (
        value,
        index
      ) => {

        if (
          contactValues[index]
        ) {

          contactValues[index].textContent =
            value;

        }

      }
    );


    const form =
      $("#contactForm");


    if (
      form
    ) {

      const nameInput =
        form.querySelector(
          'input[name="name"]'
        );


      const emailInput =
        form.querySelector(
          'input[name="email"]'
        );


      const subjectInput =
        form.querySelector(
          'input[name="subject"]'
        );


      const messageInput =
        form.querySelector(
          'textarea[name="message"]'
        );


      const submitButton =
        form.querySelector(
          'button[type="submit"]'
        );


      if (
        nameInput
      ) {

        nameInput.placeholder =
          data.contact.name;

      }


      if (
        emailInput
      ) {

        emailInput.placeholder =
          data.contact.email;

      }


      if (
        subjectInput
      ) {

        subjectInput.placeholder =
          data.contact.subject;

      }


      if (
        messageInput
      ) {

        messageInput.placeholder =
          data.contact.message;

      }


      if (
        submitButton
      ) {

        submitButton.innerHTML =
          data.contact.send;

      }

    }


    /* ---------- Social aria ---------- */

    setAttr(
      "#socialWhatsApp",
      "aria-label",
      data.aria.whatsapp
    );


    setAttr(
      "#socialFacebook",
      "aria-label",
      data.aria.facebook
    );


    setAttr(
      "#socialEmail",
      "aria-label",
      data.aria.email
    );


    setAttr(
      "#socialLinkedIn",
      "aria-label",
      data.aria.linkedin
    );


    /* ---------- Footer ---------- */

    setText(
      "footer .brand small",
      data.footer.role
    );


    setText(
      "footer .footer-top > .btn",
      data.footer.back
    );


    const footerLinks =
      $$("footer .footer-nav a");


    data.footer.nav.forEach(
      (
        value,
        index
      ) => {

        if (
          footerLinks[index]
        ) {

          footerLinks[index].textContent =
            value;

        }

      }
    );


    setText(
      "footer .copyright",
      data.footer.copyright
    );


    /* ---------- Marquee ---------- */

    renderMarquee(
      data.marquee
    );


    /* ---------- Save ---------- */

    localStorage.setItem(
      "sb-language",
      language
    );


    /* ---------- Active option ---------- */

    languageOptions.forEach(
      (
        option
      ) => {

        option.classList.toggle(
          "active",
          option.dataset.lang ===
            language
        );

      }
    );

  }


  /* =========================================================
     LANGUAGE MENU EVENTS
     ========================================================= */

  if (
    languageSwitcher &&
    languageToggle &&
    languageMenu
  ) {

    languageToggle.addEventListener(
      "click",
      (
        event
      ) => {

        event.stopPropagation();


        const isOpen =
          languageSwitcher.classList.toggle(
            "open"
          );


        languageToggle.setAttribute(
          "aria-expanded",
          String(
            isOpen
          )
        );

      }
    );


    languageOptions.forEach(
      (
        option
      ) => {

        option.addEventListener(
          "click",
          () => {

            const language =
              option.dataset.lang;


            applyLanguage(
              language
            );


            languageSwitcher.classList.remove(
              "open"
            );


            languageToggle.setAttribute(
              "aria-expanded",
              "false"
            );

          }
        );

      }
    );


    document.addEventListener(
      "click",
      (
        event
      ) => {

        if (
          !languageSwitcher.contains(
            event.target
          )
        ) {

          languageSwitcher.classList.remove(
            "open"
          );


          languageToggle.setAttribute(
            "aria-expanded",
            "false"
          );

        }

      }
    );


    document.addEventListener(
      "keydown",
      (
        event
      ) => {

        if (
          event.key ===
          "Escape"
        ) {

          languageSwitcher.classList.remove(
            "open"
          );


          languageToggle.setAttribute(
            "aria-expanded",
            "false"
          );

        }

      }
    );

  }


  /* =========================================================
     INITIAL LANGUAGE
     ========================================================= */

  const savedLanguage =
    localStorage.getItem(
      "sb-language"
    ) || "en";


  applyLanguage(
    savedLanguage
  );


  /* =========================================================
     SCROLL REVEAL
     Compatible with .reveal-ready in style.css
     ========================================================= */

  const revealElements =
    $$(
      `
      .section,
      .about-copy,
      .stats,
      .stat,
      .service,
      .project,
      .timeline-item,
      .edu-card,
      .skill-card,
      .testimonial,
      .contact,
      footer .footer-top
      `
    );


  revealElements.forEach(
    (
      element,
      index
    ) => {

      element.classList.add(
        "reveal-ready"
      );


      if (
        !prefersReducedMotion
      ) {

        element.style.setProperty(
          "--reveal-delay",
          `${Math.min(
            index * 35,
            280
          )}ms`
        );

      }

    }
  );


  if (
    "IntersectionObserver" in window &&
    !prefersReducedMotion
  ) {

    const revealObserver =
      new IntersectionObserver(
        (
          entries,
          observer
        ) => {

          entries.forEach(
            (
              entry
            ) => {

              if (
                !entry.isIntersecting
              ) {

                return;

              }


              entry.target.classList.add(
                "in-view"
              );


              observer.unobserve(
                entry.target
              );

            }
          );

        },
        {
          threshold:
            0.12,

          rootMargin:
            "0px 0px -50px 0px"
        }
      );


    revealElements.forEach(
      (
        element
      ) => {

        revealObserver.observe(
          element
        );

      }
    );

  } else {

    revealElements.forEach(
      (
        element
      ) => {

        element.classList.add(
          "in-view"
        );

      }
    );

  }


  /* =========================================================
     GENERAL CARD TILT
     ========================================================= */

  if (
    hasFinePointer &&
    !prefersReducedMotion
  ) {

    const tiltCards =
      $$(
        `
        .service,
        .project,
        .edu-card,
        .testimonial,
        .stat
        `
      );


    tiltCards.forEach(
      (
        card
      ) => {

        card.addEventListener(
          "pointermove",
          (
            event
          ) => {

            const rect =
              card.getBoundingClientRect();


            if (
              !rect.width ||
              !rect.height
            ) {

              return;

            }


            const x =
              (
                (
                  event.clientX -
                  rect.left
                ) /
                rect.width
              ) -
              0.5;


            const y =
              (
                (
                  event.clientY -
                  rect.top
                ) /
                rect.height
              ) -
              0.5;


            const rotateX =
              -y * 5;


            const rotateY =
              x * 5;


            card.style.transform =
              `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;

          },
          {
            passive: true
          }
        );


        card.addEventListener(
          "pointerleave",
          () => {

            card.style.transform =
              "";

          }
        );

      }
    );

  }


  /* =========================================================
     SKILL BAR ANIMATION
     ========================================================= */

  const skillCards =
    $$(".skill-card");


  function animateSkillCard(
    card
  ) {

    const rows =
      $$(".skill-row", card);


    card.classList.add(
      "in-view"
    );


    rows.forEach(
      (
        row
      ) => {

        const bar =
          $(".bar span", row);


        const percentage =
          $("strong", row);


        if (
          !bar ||
          !percentage
        ) {

          return;

        }


        bar.style.setProperty(
          "--skill-width",
          percentage.textContent.trim()
        );

      }
    );

  }


  if (
    "IntersectionObserver" in window
  ) {

    const skillObserver =
      new IntersectionObserver(
        (
          entries,
          observer
        ) => {

          entries.forEach(
            (
              entry
            ) => {

              if (
                !entry.isIntersecting
              ) {

                return;

              }


              animateSkillCard(
                entry.target
              );


              observer.unobserve(
                entry.target
              );

            }
          );

        },
        {
          threshold:
            0.2
        }
      );


    skillCards.forEach(
      (
        card
      ) => {

        skillObserver.observe(
          card
        );

      }
    );

  } else {

    skillCards.forEach(
      animateSkillCard
    );

  }


  /* =========================================================
     ARSENAL SPOTLIGHT
     ========================================================= */

  const arsenalCard =
    $(".skill-wrap .skill-card:first-child");


  if (
    arsenalCard &&
    hasFinePointer &&
    !prefersReducedMotion
  ) {

    let targetX =
      50;


    let targetY =
      50;


    let currentX =
      50;


    let currentY =
      50;


    let spotlightFrame =
      0;


    function animateArsenalSpotlight() {

      currentX +=
        (
          targetX -
          currentX
        ) * 0.12;


      currentY +=
        (
          targetY -
          currentY
        ) * 0.12;


      arsenalCard.style.setProperty(
        "--card-mx",
        `${currentX}%`
      );


      arsenalCard.style.setProperty(
        "--card-my",
        `${currentY}%`
      );


      if (
        Math.abs(
          targetX -
          currentX
        ) > 0.1 ||
        Math.abs(
          targetY -
          currentY
        ) > 0.1
      ) {

        spotlightFrame =
          requestAnimationFrame(
            animateArsenalSpotlight
          );

      } else {

        spotlightFrame =
          0;

      }

    }


    arsenalCard.addEventListener(
      "pointermove",
      (
        event
      ) => {

        const rect =
          arsenalCard.getBoundingClientRect();


        if (
          !rect.width ||
          !rect.height
        ) {

          return;

        }


        targetX =
          (
            (
              event.clientX -
              rect.left
            ) /
            rect.width
          ) * 100;


        targetY =
          (
            (
              event.clientY -
              rect.top
            ) /
            rect.height
          ) * 100;


        if (
          !spotlightFrame
        ) {

          spotlightFrame =
            requestAnimationFrame(
              animateArsenalSpotlight
            );

        }

      },
      {
        passive: true
      }
    );


    arsenalCard.addEventListener(
      "pointerleave",
      () => {

        targetX =
          50;


        targetY =
          50;

      }
    );

  }


  /* =========================================================
     MAIN PROJECT CTA CARD
     ========================================================= */

  const projectShowcase =
    $(".all-projects-card");


  if (
    projectShowcase
  ) {

    if (
      "IntersectionObserver" in window &&
      !prefersReducedMotion
    ) {

      const projectObserver =
        new IntersectionObserver(
          (
            entries,
            observer
          ) => {

            entries.forEach(
              (
                entry
              ) => {

                if (
                  !entry.isIntersecting
                ) {

                  return;

                }


                entry.target.classList.add(
                  "is-visible"
                );


                observer.unobserve(
                  entry.target
                );

              }
            );

          },
          {
            threshold:
              0.18,

            rootMargin:
              "0px 0px -60px 0px"
          }
        );


      projectObserver.observe(
        projectShowcase
      );

    } else {

      projectShowcase.classList.add(
        "is-visible"
      );

    }


    if (
      hasFinePointer &&
      !prefersReducedMotion
    ) {

      projectShowcase.addEventListener(
        "pointermove",
        (
          event
        ) => {

          const rect =
            projectShowcase.getBoundingClientRect();


          if (
            !rect.width ||
            !rect.height
          ) {

            return;

          }


          const x =
            (
              (
                event.clientX -
                rect.left
              ) /
              rect.width
            ) -
            0.5;


          const y =
            (
              (
                event.clientY -
                rect.top
              ) /
              rect.height
            ) -
            0.5;


          projectShowcase.style.transform =
            `translateY(0) scale(1) perspective(1100px) rotateX(${(
              -y * 3.2
            ).toFixed(2)}deg) rotateY(${(
              x * 3.2
            ).toFixed(2)}deg)`;

        },
        {
          passive: true
        }
      );


      projectShowcase.addEventListener(
        "pointerleave",
        () => {

          projectShowcase.style.transform =
            "";

        }
      );

    }

  }


  /* =========================================================
     FEATURED PROJECT CARDS
     ========================================================= */

  const featuredCards =
    $$("#featuredProjects .featured-project-card");


  if (
    featuredCards.length
  ) {

    if (
      "IntersectionObserver" in window &&
      !prefersReducedMotion
    ) {

      const featuredObserver =
        new IntersectionObserver(
          (
            entries,
            observer
          ) => {

            entries.forEach(
              (
                entry
              ) => {

                if (
                  !entry.isIntersecting
                ) {

                  return;

                }


                entry.target.classList.add(
                  "is-visible"
                );


                observer.unobserve(
                  entry.target
                );

              }
            );

          },
          {
            threshold:
              0.12,

            rootMargin:
              "0px 0px -50px 0px"
          }
        );


      featuredCards.forEach(
        (
          card
        ) => {

          featuredObserver.observe(
            card
          );

        }
      );

    } else {

      featuredCards.forEach(
        (
          card
        ) => {

          card.classList.add(
            "is-visible"
          );

        }
      );

    }


    if (
      hasFinePointer &&
      !prefersReducedMotion
    ) {

      featuredCards.forEach(
        (
          card
        ) => {

          card.addEventListener(
            "pointermove",
            (
              event
            ) => {

              const rect =
                card.getBoundingClientRect();


              if (
                !rect.width ||
                !rect.height
              ) {

                return;

              }


              const x =
                (
                  (
                    event.clientX -
                    rect.left
                  ) /
                  rect.width
                ) * 100;


              const y =
                (
                  (
                    event.clientY -
                    rect.top
                  ) /
                  rect.height
                ) * 100;


              card.style.setProperty(
                "--project-mx",
                `${x}%`
              );


              card.style.setProperty(
                "--project-my",
                `${y}%`
              );

            },
            {
              passive: true
            }
          );


          card.addEventListener(
            "pointerleave",
            () => {

              card.style.removeProperty(
                "--project-mx"
              );


              card.style.removeProperty(
                "--project-my"
              );

            }
          );

        }
      );

    }

  }


  /* =========================================================
     NAVIGATION ACTIVE STATE
     ========================================================= */

  const navigationLinks =
    $$(".nav a, .quicknav a");


  const pageSections =
    $$("main section[id]");


  if (
    "IntersectionObserver" in window
  ) {

    const navigationObserver =
      new IntersectionObserver(
        (
          entries
        ) => {

          entries.forEach(
            (
              entry
            ) => {

              if (
                !entry.isIntersecting
              ) {

                return;

              }


              const sectionId =
                entry.target.id;


              navigationLinks.forEach(
                (
                  link
                ) => {

                  const href =
                    link.getAttribute(
                      "href"
                    );


                  const active =
                    href ===
                      `#${sectionId}` ||
                    (
                      sectionId ===
                        "home" &&
                      href ===
                        "#top"
                    );


                  link.classList.toggle(
                    "active",
                    active
                  );

                }
              );

            }
          );

        },
        {
          rootMargin:
            "-35% 0px -55% 0px"
        }
      );


    pageSections.forEach(
      (
        section
      ) => {

        navigationObserver.observe(
          section
        );

      }
    );

  }


  /* =========================================================
     SMOOTH ANCHOR SCROLL
     ========================================================= */

  $$(
    'a[href^="#"]'
  ).forEach(
    (
      link
    ) => {

      link.addEventListener(
        "click",
        (
          event
        ) => {

          const targetId =
            link.getAttribute(
              "href"
            );


          if (
            !targetId ||
            targetId === "#"
          ) {

            return;

          }


          const target =
            targetId === "#top"
              ? document.body
              : $(targetId);


          if (
            !target
          ) {

            return;

          }


          event.preventDefault();


          target.scrollIntoView(
            {
              behavior:
                prefersReducedMotion
                  ? "auto"
                  : "smooth",

              block:
                "start"
            }
          );

        }
      );

    }
  );


  /* =========================================================
     CONTACT FORM
     ========================================================= */

  const contactForm =
    $("#contactForm");


  if (
    contactForm
  ) {

    const emailInput =
      contactForm.querySelector(
        'input[name="email"]'
      );


    const replyToField =
      contactForm.querySelector(
        'input[name="_replyto"]'
      );


    const submitButton =
      contactForm.querySelector(
        'button[type="submit"]'
      );


    if (
      emailInput &&
      replyToField
    ) {

      emailInput.addEventListener(
        "input",
        () => {

          replyToField.value =
            emailInput.value.trim();


          emailInput.setCustomValidity(
            ""
          );

        }
      );


      emailInput.addEventListener(
        "blur",
        () => {

          const value =
            emailInput.value.trim();


          if (
            value &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
              value
            )
          ) {

            emailInput.setCustomValidity(
              "Please enter a valid email address."
            );

          } else {

            emailInput.setCustomValidity(
              ""
            );

          }

        }
      );

    }


    contactForm.addEventListener(
      "submit",
      () => {

        if (
          !submitButton
        ) {

          return;

        }


        submitButton.setAttribute(
          "aria-busy",
          "true"
        );


        submitButton.disabled =
          true;


        submitButton.innerHTML =
          "Sending...";

      }
    );


    contactForm.addEventListener(
      "invalid",
      () => {

        const notice =
          $("#formNotice");


        if (
          !notice
        ) {

          return;

        }


        notice.textContent =
          "Please check the highlighted fields and try again.";

      },
      true
    );

  }


  /* =========================================================
     RESUME BUTTON
     ========================================================= */

  const resumeButton =
    $("#resumeBtn");


  if (
    resumeButton
  ) {

    


    resumeButton.target =
      "_blank";


    resumeButton.rel =
      "noopener noreferrer";


    const activeLanguage =
      localStorage.getItem(
        "sb-language"
      ) || "en";


    const activeData =
      languageData[
        activeLanguage
      ] ||
      languageData.en;


    resumeButton.setAttribute(
      "aria-label",
      activeData.aria.resume
    );


    resumeButton.setAttribute(
      "title",
      activeData.aria.resume
    );

  }


  /* =========================================================
     STEP 6 — SEO / SOCIAL META
     ========================================================= */

  ensureMeta(
    "name",
    "author",
    "Sefat Bhuiyan"
  );


  ensureMeta(
    "name",
    "robots",
    "index, follow"
  );


  ensureMeta(
    "property",
    "og:type",
    "website"
  );


  ensureMeta(
    "property",
    "og:site_name",
    "Sefat Bhuiyan — Portfolio"
  );


  ensureMeta(
    "property",
    "og:title",
    "Sefat Bhuiyan — Digital Marketer & Graphic Designer"
  );


  ensureMeta(
    "property",
    "og:description",
    "Personal portfolio of Sefat Bhuiyan — Digital Marketing, Graphic Design, Content Creation and Social Media."
  );


  ensureMeta(
    "name",
    "twitter:card",
    "summary_large_image"
  );


  ensureMeta(
    "name",
    "twitter:title",
    "Sefat Bhuiyan — Digital Marketer & Graphic Designer"
  );


  ensureMeta(
    "name",
    "twitter:description",
    "Digital Marketer & Graphic Designer portfolio."
  );


  /* =========================================================
     STEP 7 — IMAGE PERFORMANCE
     ========================================================= */

  const portfolioImages =
    $$("img");


  portfolioImages.forEach(
    (
      image
    ) => {

      image.decoding =
        "async";


      if (
        image.classList.contains(
          "portrait"
        )
      ) {

        image.loading =
          "eager";


        image.fetchPriority =
          "high";

      } else {

        image.loading =
          "lazy";


        image.fetchPriority =
          "low";

      }

    }
  );


  /* =========================================================
     STEP 8 — ACCESSIBILITY
     ========================================================= */

  document
    .querySelectorAll(
      'a[target="_blank"]'
    )
    .forEach(
      (
        link
      ) => {

        const rel =
          new Set(
            (
              link.getAttribute(
                "rel"
              ) ||
              ""
            )
              .split(
                /\s+/
              )
              .filter(
                Boolean
              )
          );


        rel.add(
          "noopener"
        );


        rel.add(
          "noreferrer"
        );


        link.setAttribute(
          "rel",
          [
            ...rel
          ].join(" ")
        );

      }
    );


  /* =========================================================
     MOBILE NAVIGATION
     ========================================================= */

  const mobileNav =
    $(".nav");


  const menuToggle =
    $("#menuToggle");


  const topbar =
    $(".topbar");


  if (
    mobileNav &&
    !mobileNav.id
  ) {

    mobileNav.id =
      "mobileNavigation";

  }


  if (
    menuToggle
  ) {

    menuToggle.setAttribute(
      "aria-controls",
      "mobileNavigation"
    );

  }


  if (
    menuToggle &&
    topbar
  ) {

    const mobileNavLinks =
      $$(".nav a");


    function closeMobileMenu() {

      topbar.classList.remove(
        "mobile-open"
      );


      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );


      menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
      );

    }


    menuToggle.addEventListener(
      "click",
      (
        event
      ) => {

        event.stopPropagation();


        const isOpen =
          topbar.classList.toggle(
            "mobile-open"
          );


        menuToggle.setAttribute(
          "aria-expanded",
          String(
            isOpen
          )
        );


        menuToggle.setAttribute(
          "aria-label",
          isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
        );

      }
    );


    mobileNavLinks.forEach(
      (
        link
      ) => {

        link.addEventListener(
          "click",
          closeMobileMenu
        );

      }
    );


    document.addEventListener(
      "click",
      (
        event
      ) => {

        if (
          !topbar.contains(
            event.target
          )
        ) {

          closeMobileMenu();

        }

      }
    );


    document.addEventListener(
      "keydown",
      (
        event
      ) => {

        if (
          event.key ===
          "Escape"
        ) {

          closeMobileMenu();

        }

      }
    );

  }


  /* =========================================================
     PAGE VISIBILITY PERFORMANCE
     ========================================================= */

  document.addEventListener(
    "visibilitychange",
    () => {

      document.documentElement.classList.toggle(
        "page-hidden",
        document.hidden
      );

    }
  );


  /* =========================================================
     CONTENT CLEANUP
     ========================================================= */

  $$("#education .section-desc").forEach(
    (
      element
    ) => {

      const value =
        element.textContent.trim();


      if (
        value ===
        "Replace these education entries with your exact study history later."
      ) {

        element.textContent =
          "Academic and technical learning that supports my creative and digital work.";

      }

    }
  );


  $$(".testimonials .person b").forEach(
    (
      element,
      index
    ) => {

      if (
        element.textContent.trim() ===
        "Client Name"
      ) {

        element.textContent =
          index === 0
            ? "Client"
            : "Creative Partner";

      }

    }
  );


  /* =========================================================
     FINAL EXACT BANGLA NAME
     ========================================================= */

  languageData.bn.title =
    "সিফাত ভুঁইয়া — পোর্টফোলিও";


  languageData.bn.description =
    "সিফাত ভুঁইয়ার ব্যক্তিগত পোর্টফোলিও — ডিজিটাল মার্কেটার ও গ্রাফিক ডিজাইনার।";


  languageData.bn.hero.heading =
    `হাই, আমি<br><span class="gradient">সিফাত ভুঁইয়া</span>`;


  languageData.bn.footer.copyright =
    "© 2026 সিফাত ভুঁইয়া। Crafted with ♥";


  languageData.bn.aria.resume =
    "সিফাত ভুঁইয়ার রেজুমে খুলুন";


  /* =========================================================
     RE-APPLY FINAL LANGUAGE
     ========================================================= */

  applyLanguage(
    localStorage.getItem(
      "sb-language"
    ) || "en"
  );


  /* =========================================================
     RESIZE
     ========================================================= */

  window.addEventListener(
    "resize",
    updateScrollProgress,
    {
      passive: true
    }
  );


  /* =========================================================
     END
     ========================================================= */

})();