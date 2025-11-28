/* ------------------------------------------
   TRANSLATIONS
-------------------------------------------- */
const translations = {
  en: {
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",

    heroTitle: "Ahmed Sherif",
    heroSubtitle: "Data Scientist",
    heroText: "Transforming data into meaningful insights",
    viewProjects: "View Projects",
    contactMe: "Contact Me",

    aboutTitle: "About Me",
    aboutText1: "I'm Ahmed Sherif, a passionate Data Scientist dedicated to uncovering insights from complex datasets.",
    aboutText2: "With expertise in statistical analysis, machine learning, and data visualization, I help organizations make informed decisions based on data insights.",
    getInTouch: "Get in Touch",
    downloadCV: "Download CV",

    programming: "Programming",
    dataAnalysis: "Data Analysis Libraries",
    dataScienceConcepts: "Data Science Concepts",
    dataVisualization: "Data Visualization",
    statisticalAnalysis: "Statistical Analysis",
    dataCleaning: "Data Cleaning",

    projectsTitle: "Projects",

    customerSegmentation: "Car Company Sales",
    customerSegmentationDesc: "Analysis of car company sales data.",

    salesForecasting: "Dog Rates Tweet Analysis",
    salesForecastingDesc: "Analysis of dog rate tweets.",

    sentimentAnalysis: "TMDB Movies",
    sentimentAnalysisDesc: "Analysis of a movie dataset.",

    contactDesc: "I'm always interested in new opportunities and collaborations. Feel free to reach out!",
    yourName: "Your Name",
    yourEmail: "Your Email",
    message: "Message",
    sendMessage: "Send Message"
  },

  ar: {
    home: "الرئيسية",
    about: "عني",
    skills: "المهارات",
    projects: "المشاريع",
    contact: "اتصل بي",

    heroTitle: "أحمد شريف",
    heroSubtitle: "عالم بيانات",
    heroText: "تحويل البيانات إلى رؤى ذات معنى",
    viewProjects: "عرض المشاريع",
    contactMe: "اتصل بي",

    aboutTitle: "نبذة عني",
    aboutText1:
      "أنا أحمد شريف، عالم بيانات شغوف مكرس لاكتشاف الرؤى من مجموعات البيانات المعقدة.",
    aboutText2:
      "مع الخبرة في التحليل الإحصائي والتعلم الآلي وتصور البيانات، أساعد المؤسسات على اتخاذ قرارات مستنيرة.",
    getInTouch: "تواصل معي",
    downloadCV: "تحميل السيرة الذاتية",

    programming: "البرمجة",
    dataAnalysis: "مكتبات تحليل البيانات",
    dataScienceConcepts: "مفاهيم علوم البيانات",
    dataVisualization: "تصور البيانات",
    statisticalAnalysis: "التحليل الإحصائي",
    dataCleaning: "تنظيف البيانات",

    projectsTitle: "المشاريع",

    customerSegmentation: "مبيعات شركة سيارات",
    customerSegmentationDesc: "تحليل بيانات مبيعات شركة سيارات.",

    salesForecasting: "تحليل تغريدات تقييم الكلاب",
    salesForecastingDesc: "تحليل تغريدات تقييم الكلاب.",

    sentimentAnalysis: "تحليل بيانات الأفلام TMDB",
    sentimentAnalysisDesc: "تحليل قاعدة بيانات الأفلام.",

    contactDesc: "أنا مهتم دائمًا بالفرص والتعاون الجديد. لا تتردد في التواصل!",
    yourName: "اسمك",
    yourEmail: "بريدك الإلكتروني",
    message: "الرسالة",
    sendMessage: "إرسال الرسالة"
  }
};

/* ------------------------------------------
   DOM READY
-------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  console.log("JS Loaded Successfully ✔");

  /* -----------------------------
     EMAILJS SETUP
  ------------------------------ */
  if (window.emailjs) {
    emailjs.init("bw1nonZwyPC_je7oz");
    console.log("EmailJS initialized");
  }

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      const params = {
        to_name: "Ahmed Sherif",
        from_name: `${name} (${email})`,
        message: message,
        reply_to: email,
      };

      const submitBtn = contactForm.querySelector("button");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      emailjs
        .send("service_contact", "template_q9wp6ei", params)
        .then(() => {
          alert("Message sent successfully!");
          contactForm.reset();
        })
        .catch(() => {
          alert("Failed to send message.");
        })
        .finally(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        });
    });
  }

  /* -----------------------------
     MOBILE MENU TOGGLE
  ------------------------------ */
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector("nav ul");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  }

  /* -----------------------------
     SMOOTH SCROLLING
  ------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      target?.scrollIntoView({ behavior: "smooth" });
      navMenu.classList.remove("show");
    });
  });

  /* -----------------------------
     LOAD PROJECTS FROM JSON
  ------------------------------ */
  let projectsData = [];
  
  async function loadProjects() {
    try {
      const response = await fetch('./projects.json');
      if (!response.ok) {
        throw new Error('Failed to load projects');
      }
      projectsData = await response.json();
      renderProjects();
      initializeSlider();
    } catch (error) {
      console.error('Error loading projects:', error);
      projectsContainer.innerHTML = '<p>Failed to load projects. Please try again later.</p>';
    }
  }

  function renderProjects() {
    const projectsContainer = document.querySelector(".projects-container");
    if (!projectsContainer) return;

    projectsContainer.innerHTML = projectsData.map(project => `
      <div class="project-card">
        <div class="project-image" style="background-color: #f5f5f5;">
          <i class="${project.icon}"></i>
        </div>
        <div class="project-content">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-tags">
            ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
          </div>
          <a href="${project.link}" target="_blank" class="btn secondary small">View Project</a>
        </div>
      </div>
    `).join('');
  }

  /* -----------------------------
     PROJECT SLIDER
  ------------------------------ */
  const sliderWrapper = document.querySelector(".slider-wrapper");
  const projectsContainer = document.querySelector(".projects-container");
  const leftArrow = document.querySelector(".slider-arrow-left");
  const rightArrow = document.querySelector(".slider-arrow-right");
  const dotsContainer = document.getElementById("sliderDots");

  let currentIndex = 0;
  let cards = [];
  const GAP = 30;
  const CARD_WIDTH = 300;

  let projectsPerSlide = 1;
  let totalSlides = 0;

  function initializeSlider() {
    cards = document.querySelectorAll(".project-card");
    totalSlides = Math.ceil(cards.length / projectsPerSlide);
    calculateSlides();
    updateSlider();
    
    // Re-initialize slider on window resize
    window.addEventListener("resize", () => {
      calculateSlides();
      currentIndex = 0;
      updateSlider();
    });
  }

  function calculateSlides() {
    cards = document.querySelectorAll(".project-card");
    if (cards.length === 0) return;
    
    const sliderWidth = document.querySelector(".projects-slider").offsetWidth;

    projectsPerSlide = Math.floor((sliderWidth + GAP) / (CARD_WIDTH + GAP));
    projectsPerSlide = Math.max(1, projectsPerSlide);

    totalSlides = Math.ceil(cards.length / projectsPerSlide);

    generateDots();
  }

  function generateDots() {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("div");
      dot.className = "dot";
      if (i === 0) dot.classList.add("active");

      dot.addEventListener("click", () => goToSlide(i));

      dotsContainer.appendChild(dot);
    }
  }

  function updateSlider() {
    const slideWidth = projectsPerSlide * (CARD_WIDTH + GAP) - GAP;
    projectsContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    document.querySelectorAll(".dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function goToSlide(i) {
    currentIndex = i;
    updateSlider();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  if (leftArrow) leftArrow.addEventListener("click", prevSlide);
  if (rightArrow) rightArrow.addEventListener("click", nextSlide);

  // Load projects and initialize slider
  loadProjects();

  /* -----------------------------
     LANGUAGE SWITCH
  ------------------------------ */
  let currentLang = "en";
  const langToggle = document.getElementById("langToggle");

  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "ar" : "en";
    updateLanguage(currentLang);
  });

  function updateLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-key]").forEach((el) => {
      el.textContent = translations[lang][el.dataset.key];
    });

    document.getElementById("heroTitle").textContent = translations[lang].heroTitle;
    document.getElementById("heroSubtitle").textContent = translations[lang].heroSubtitle;
    document.getElementById("heroText").textContent = translations[lang].heroText;

    document.getElementById("viewProjectsBtn").textContent = translations[lang].viewProjects;
    document.getElementById("contactMeBtn").textContent = translations[lang].contactMe;

    document.getElementById("aboutTitle").textContent = translations[lang].aboutTitle;
    document.getElementById("aboutText1").textContent = translations[lang].aboutText1;
    document.getElementById("aboutText2").textContent = translations[lang].aboutText2;
    document.getElementById("getInTouch").textContent = translations[lang].getInTouch;
    document.getElementById("downloadCV").innerHTML = `${translations[lang].downloadCV} <i class="fas fa-download"></i>`;

    document.getElementById("skillsTitle").textContent = translations[lang].skills;
    document.getElementById("programmingTitle").textContent = translations[lang].programming;
    document.getElementById("dataAnalysisTitle").textContent = translations[lang].dataAnalysis;
    document.getElementById("dataScienceConceptsTitle").textContent = translations[lang].dataScienceConcepts;

    document.getElementById("vizLabel").textContent = translations[lang].dataVisualization;
    document.getElementById("statsLabel").textContent = translations[lang].statisticalAnalysis;
    document.getElementById("cleaningLabel").textContent = translations[lang].dataCleaning;

    document.getElementById("projectsTitle").textContent = translations[lang].projects;

    const cards = document.querySelectorAll(".project-card");
    cards[0].querySelector("h3").textContent = translations[lang].customerSegmentation;
    cards[0].querySelector("p").textContent = translations[lang].customerSegmentationDesc;

    cards[1].querySelector("h3").textContent = translations[lang].salesForecasting;
    cards[1].querySelector("p").textContent = translations[lang].salesForecastingDesc;

    cards[2].querySelector("h3").textContent = translations[lang].sentimentAnalysis;
    cards[2].querySelector("p").textContent = translations[lang].sentimentAnalysisDesc;

    document.getElementById("contactDesc").textContent = translations[lang].contactDesc;
    document.getElementById("yourNameLabel").textContent = translations[lang].yourName;
    document.getElementById("yourEmailLabel").textContent = translations[lang].yourEmail;
    document.getElementById("messageLabel").textContent = translations[lang].message;
    document.getElementById("sendMessageBtn").textContent = translations[lang].sendMessage;

    langToggle.innerHTML = `<i class="fas fa-globe"></i> ${lang === "en" ? "عربي" : "English"}`;
  }

  updateLanguage("en");
});