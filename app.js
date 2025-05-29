// Language system
let currentLanguage = "en";
let currentGoalData = null;
let currentRating = 0;

const translations = {
  en: {
    mainTitle: "Napoleon Hill's AI Success Coach",
    subtitle: "Transform Your Financial Goal Into Reality - 15 Minutes",
    statMinutes: "Minutes",
    statPossibility: "Possibility",
    statGoal: "Goal",
    formTitle: "Your Definite Chief Aim Session",
    formIntro:
      '"All achievement, all earned riches, have their beginning in an idea!"',
    labelName: "Your Name:",
    labelAmount: "Exact Amount (NIS):",
    labelDeadline: "Definite Deadline:",
    labelMethod: "How Will You Raise This Money?",
    placeholderName: "Enter your name",
    placeholderAmount: "e.g., 50000",
    placeholderMethod:
      "e.g., Freelance web development, selling online courses, starting a consulting business...",
    amountHint: 'Be specific - "I want plenty of money" is not enough',
    deadlineHint:
      'Hill: "Establish a definite date when you intend to possess the money"',
    methodHint: "The more specific your method, the better your plan will be",
    submitText: "Start My Transformation",
    loadingText: "Napoleon Hill's AI is analyzing your goal...",
    resultTitle: "Your Personalized Success Plan",
    emailText: "Email This Plan",
    shareText: "Share",
    nextStepsTitle: "🎯 Ready for the Full Journey?",
    nextStepsText:
      "This is just the beginning. Imagine having this coach guide you every step of the way to your goal.",
    transformBtn: "Transform Another Goal",
    reviewBtn: "Share Your Experience",
    emailModalTitle: "📧 Email Your Success Plan",
    emailLabel: "Your Email:",
    sendEmailBtn: "Send My Plan",
    reviewModalTitle: "⭐ Share Your Experience",
    ratingLabel: "How was your experience?",
    commentLabel: "Your thoughts:",
    commentPlaceholder: "Tell us about your experience...",
    submitReviewBtn: "Submit Review",
    reviewsTitle: "✨ Success Stories",
    langText: "עברית",
  },
  he: {
    mainTitle: "מאמן ההצלחה בינה מלאכותית של נפוליאון היל",
    subtitle: "הפוך את המטרה הכלכלית שלך למציאות - 15 דקות",
    statMinutes: "דקות",
    statPossibility: "אפשרות",
    statGoal: "מטרה",
    formTitle: "סשן המטרה הראשית המוגדרת שלך",
    formIntro: '"כל הישג, כל עושר שנרכש, מתחיל ברעיון!"',
    labelName: "השם שלך:",
    labelAmount: "סכום מדויק (שקלים):",
    labelDeadline: "מועד אחרון מוגדר:",
    labelMethod: "איך תגייס את הכסף הזה?",
    placeholderName: "הכנס את שמך",
    placeholderAmount: "למשל, 50000",
    placeholderMethod:
      "למשל, פיתוח אתרים עצמאי, מכירת קורסים אונליין, פתיחת עסק ייעוץ...",
    amountHint: 'היה ספציפי - "אני רוצה הרבה כסף" זה לא מספיק',
    deadlineHint: 'היל: "קבע תאריך מדויק מתי אתה מתכוון להחזיק בכסף"',
    methodHint: "ככל שהשיטה שלך ספציפית יותר, כך התוכנית שלך תהיה טובה יותר",
    submitText: "התחל את הטרנספורמציה שלי",
    loadingText: "הבינה המלאכותית של נפוליאון היל מנתחת את המטרה שלך...",
    resultTitle: "תוכנית ההצלחה האישית שלך",
    emailText: "שלח תוכנית במייל",
    shareText: "שתף",
    nextStepsTitle: "🎯 מוכן למסע המלא?",
    nextStepsText:
      "זו רק ההתחלה. תאר לעצמך שהמאמן הזה מנחה אותך בכל שלב בדרך למטרה שלך.",
    transformBtn: "הפוך מטרה נוספת",
    reviewBtn: "שתף את החוויה שלך",
    emailModalTitle: "📧 שלח את תוכנית ההצלחה שלך במייל",
    emailLabel: "המייל שלך:",
    sendEmailBtn: "שלח את התוכנית שלי",
    reviewModalTitle: "⭐ שתף את החוויה שלך",
    ratingLabel: "איך הייתה החוויה שלך?",
    commentLabel: "המחשבות שלך:",
    commentPlaceholder: "ספר לנו על החוויה שלך...",
    submitReviewBtn: "שלח ביקורת",
    reviewsTitle: "✨ סיפורי הצלחה",
    langText: "English",
  },
};

// Initialize page
document.addEventListener("DOMContentLoaded", function () {
  initializePage();
  loadReviews();
});

function initializePage() {
  // Set minimum date to today
  document.getElementById("deadline").min = new Date()
    .toISOString()
    .split("T")[0];

  // Setup event listeners
  document
    .getElementById("goalForm")
    .addEventListener("submit", handleFormSubmit);
  document
    .getElementById("langToggle")
    .addEventListener("click", toggleLanguage);
  document
    .getElementById("emailForm")
    .addEventListener("submit", handleEmailSubmit);
  document
    .getElementById("reviewForm")
    .addEventListener("submit", handleReviewSubmit);

  // Setup star rating
  setupStarRating();

  // Apply initial language
  applyLanguage();
}

function toggleLanguage() {
  currentLanguage = currentLanguage === "en" ? "he" : "en";
  applyLanguage();
}

function applyLanguage() {
  const html = document.documentElement;
  const t = translations[currentLanguage];

  // Set direction
  html.setAttribute("dir", currentLanguage === "he" ? "rtl" : "ltr");
  html.setAttribute("lang", currentLanguage);

  // Update all text elements
  document.getElementById("mainTitle").textContent = t.mainTitle;
  document.getElementById("subtitle").textContent = t.subtitle;
  document.getElementById("statMinutes").textContent = t.statMinutes;
  document.getElementById("statPossibility").textContent = t.statPossibility;
  document.getElementById("statGoal").textContent = t.statGoal;
  document.getElementById("formTitle").textContent = t.formTitle;
  document.getElementById(
    "formIntro"
  ).innerHTML = `${t.formIntro}<span class="author">- Napoleon Hill</span>`;
  document.getElementById("labelName").textContent = t.labelName;
  document.getElementById("labelAmount").textContent = t.labelAmount;
  document.getElementById("labelDeadline").textContent = t.labelDeadline;
  document.getElementById("labelMethod").textContent = t.labelMethod;
  document.getElementById("userName").placeholder = t.placeholderName;
  document.getElementById("goalAmount").placeholder = t.placeholderAmount;
  document.getElementById("howMethod").placeholder = t.placeholderMethod;
  document.getElementById("amountHint").textContent = t.amountHint;
  document.getElementById("deadlineHint").textContent = t.deadlineHint;
  document.getElementById("methodHint").textContent = t.methodHint;
  document.getElementById("submitText").textContent = t.submitText;
  document.getElementById("loadingText").textContent = t.loadingText;
  document.getElementById("resultTitle").textContent = t.resultTitle;
  document.getElementById("emailText").textContent = t.emailText;
  document.getElementById("shareText").textContent = t.shareText;
  document.getElementById("nextStepsTitle").textContent = t.nextStepsTitle;
  document.getElementById("nextStepsText").textContent = t.nextStepsText;
  document.getElementById("transformBtn").textContent = t.transformBtn;
  document.getElementById("reviewBtn").textContent = t.reviewBtn;
  document.getElementById("emailModalTitle").textContent = t.emailModalTitle;
  document.getElementById("emailLabel").textContent = t.emailLabel;
  document.getElementById("sendEmailBtn").textContent = t.sendEmailBtn;
  document.getElementById("reviewModalTitle").textContent = t.reviewModalTitle;
  document.getElementById("ratingLabel").textContent = t.ratingLabel;
  document.getElementById("commentLabel").textContent = t.commentLabel;
  document.getElementById("reviewComment").placeholder = t.commentPlaceholder;
  document.getElementById("submitReviewBtn").textContent = t.submitReviewBtn;
  document.getElementById("reviewsTitle").textContent = t.reviewsTitle;

  // Update language toggle
  document.querySelector(".lang-text").textContent = t.langText;
  document.querySelector(".lang-flag").textContent =
    currentLanguage === "en" ? "🇮🇱" : "🇺🇸";
}

async function handleFormSubmit(e) {
  e.preventDefault();

  const userName = document.getElementById("userName").value;
  const goalAmount = document.getElementById("goalAmount").value;
  const deadline = document.getElementById("deadline").value;
  const howMethod = document.getElementById("howMethod").value;

  // Store for later use
  currentGoalData = { userName, goalAmount, deadline, howMethod };

  // Hide form, show loading
  document.getElementById("demo-form").classList.add("hidden");
  document.getElementById("loading").classList.remove("hidden");

  try {
    const response = await fetch("/api/coach", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        goalAmount,
        deadline,
        howMethod,
        language: currentLanguage,
      }),
    });

    const data = await response.json();

    // Hide loading
    document.getElementById("loading").classList.add("hidden");

    if (data.success) {
      // Convert markdown to HTML and show results
      const htmlContent = marked.parse(data.response);
      document.getElementById("coachResponse").innerHTML = htmlContent;
      document.getElementById("results").classList.remove("hidden");

      // Scroll to results
      document.getElementById("results").scrollIntoView({ behavior: "smooth" });
    } else {
      showError(data.error);
    }
  } catch (error) {
    document.getElementById("loading").classList.add("hidden");
    showError("Network error. Please try again.");
  }
}

function showError(message) {
  alert(message);
  document.getElementById("demo-form").classList.remove("hidden");
}

function startOver() {
  // Reset form
  document.getElementById("goalForm").reset();
  currentGoalData = null;

  // Show form, hide results
  document.getElementById("results").classList.add("hidden");
  document.getElementById("demo-form").classList.remove("hidden");

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Email functionality
function showEmailModal() {
  document.getElementById("emailModal").classList.remove("hidden");
}

function closeEmailModal() {
  document.getElementById("emailModal").classList.add("hidden");
}

async function handleEmailSubmit(e) {
  e.preventDefault();

  const email = document.getElementById("userEmail").value;
  const content = document.getElementById("coachResponse").innerHTML;

  if (!currentGoalData) {
    alert("No plan to send!");
    return;
  }

  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        content,
        userName: currentGoalData.userName,
        language: currentLanguage,
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert(
        currentLanguage === "he"
          ? "התוכנית נשלחה בהצלחה!"
          : "Plan sent successfully!"
      );
      closeEmailModal();
      document.getElementById("emailForm").reset();
    } else {
      alert(
        currentLanguage === "he" ? "שגיאה בשליחת המייל" : "Error sending email"
      );
    }
  } catch (error) {
    alert(currentLanguage === "he" ? "שגיאת רשת" : "Network error");
  }
}

// Review functionality
function showReviewForm() {
  document.getElementById("reviewModal").classList.remove("hidden");
}

function closeReviewModal() {
  document.getElementById("reviewModal").classList.add("hidden");
  currentRating = 0;
  document
    .querySelectorAll(".star")
    .forEach((star) => star.classList.remove("active"));
}

function setupStarRating() {
  const stars = document.querySelectorAll(".star");

  stars.forEach((star, index) => {
    star.addEventListener("click", () => {
      currentRating = index + 1;
      updateStarDisplay();
    });

    star.addEventListener("mouseover", () => {
      highlightStars(index + 1);
    });
  });

  document.querySelector(".star-rating").addEventListener("mouseleave", () => {
    updateStarDisplay();
  });
}

function highlightStars(rating) {
  const stars = document.querySelectorAll(".star");
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add("active");
    } else {
      star.classList.remove("active");
    }
  });
}

function updateStarDisplay() {
  highlightStars(currentRating);
}

async function handleReviewSubmit(e) {
  e.preventDefault();

  if (currentRating === 0) {
    alert(
      currentLanguage === "he" ? "אנא בחר דירוג" : "Please select a rating"
    );
    return;
  }

  const comment = document.getElementById("reviewComment").value;
  const userName = currentGoalData ? currentGoalData.userName : "Anonymous";

  try {
    const response = await fetch("/api/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        rating: currentRating,
        comment,
        language: currentLanguage,
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert(
        currentLanguage === "he"
          ? "תודה על הביקורת!"
          : "Thank you for your review!"
      );
      closeReviewModal();
      document.getElementById("reviewForm").reset();
      loadReviews(); // Refresh reviews
    } else {
      alert(
        currentLanguage === "he"
          ? "שגיאה בשליחת הביקורת"
          : "Error submitting review"
      );
    }
  } catch (error) {
    alert(currentLanguage === "he" ? "שגיאת רשת" : "Network error");
  }
}

// Load and display reviews
async function loadReviews() {
  try {
    const response = await fetch("/api/reviews");
    const reviews = await response.json();

    const reviewsList = document.getElementById("reviewsList");

    if (reviews.length === 0) {
      reviewsList.innerHTML = `<p style="text-align: center; color: #7f8c8d; font-style: italic;">
        ${
          currentLanguage === "he"
            ? "היה הראשון לשתף את החוויה שלך!"
            : "Be the first to share your experience!"
        }
      </p>`;
      return;
    }

    reviewsList.innerHTML = reviews
      .map(
        (review) => `
      <div class="review-item">
        <div class="review-header">
          <span class="review-name">${escapeHtml(review.userName)}</span>
          <span class="review-rating">${"⭐".repeat(review.rating)}</span>
        </div>
        ${
          review.comment
            ? `<div class="review-comment">"${escapeHtml(
                review.comment
              )}"</div>`
            : ""
        }
      </div>
    `
      )
      .join("");
  } catch (error) {
    console.error("Error loading reviews:", error);
  }
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Share functionality
function shareResults() {
  if (navigator.share && currentGoalData) {
    navigator.share({
      title: currentLanguage === "he" ? "תוכנית ההצלחה שלי" : "My Success Plan",
      text:
        currentLanguage === "he"
          ? `זה עתה יצרתי תוכנית הצלחה אישית למטרה שלי של ${currentGoalData.goalAmount} שקל!`
          : `I just created a personalized success plan for my goal of ${currentGoalData.goalAmount} NIS!`,
      url: window.location.href,
    });
  } else {
    // Fallback - copy to clipboard
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert(currentLanguage === "he" ? "הקישור הועתק!" : "Link copied!");
    });
  }
}

// Event listeners for modal buttons
document.addEventListener("DOMContentLoaded", function () {
  // Make sure these elements exist before adding listeners
  const emailBtn = document.getElementById("emailBtn");
  const shareBtn = document.getElementById("shareBtn");

  if (emailBtn) emailBtn.addEventListener("click", showEmailModal);
  if (shareBtn) shareBtn.addEventListener("click", shareResults);
});

// Close modals when clicking outside
document.getElementById("emailModal").addEventListener("click", (e) => {
  if (e.target.id === "emailModal") {
    closeEmailModal();
  }
});

document.getElementById("reviewModal").addEventListener("click", (e) => {
  if (e.target.id === "reviewModal") {
    closeReviewModal();
  }
});

// Enhanced keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeEmailModal();
    closeReviewModal();
  }
});

// Add click handlers to close buttons (backup method)
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("modal-close")) {
    closeEmailModal();
    closeReviewModal();
  }
});

// Add some loading animation improvements
function enhanceLoadingExperience() {
  const loadingTexts =
    currentLanguage === "he"
      ? [
          "מנתח את המטרה שלך...",
          "מפעיל את עקרונות נפוליאון היל...",
          "בונה תוכנית מותאמת אישית...",
          "מעורר את התשוקה הבוערת שלך...",
        ]
      : [
          "Analyzing your goal...",
          "Applying Napoleon Hill's principles...",
          "Building your personalized plan...",
          "Igniting your burning desire...",
        ];

  let textIndex = 0;
  const loadingTextElement = document.getElementById("loadingText");

  const interval = setInterval(() => {
    if (document.getElementById("loading").classList.contains("hidden")) {
      clearInterval(interval);
      return;
    }

    textIndex = (textIndex + 1) % loadingTexts.length;
    loadingTextElement.textContent = loadingTexts[textIndex];
  }, 2000);
}
