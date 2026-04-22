const unitPrice = 150;
const phoneNumber = "212665191677";

const qtyButtons = document.querySelectorAll(".qty-btn");
const totalPrice = document.getElementById("totalPrice");
const whatsappBtn = document.getElementById("whatsappBtn");
const confirmBtn = document.getElementById("confirmBtn");
const slides = document.querySelectorAll(".product-visual .slide");
const dots = document.querySelectorAll(".slider-dot");

let selectedQty = 4;
let currentSlide = 0;
let slideshowInterval = null;

function updateOrderUI() {
  const total = unitPrice * selectedQty;
  totalPrice.textContent = `DH ${total}`;

  const message = encodeURIComponent(
    `السلام عليكم، أريد طلب عسل السلطان.\nالكمية: ${selectedQty}\nالإجمالي: DH ${total}`
  );

  whatsappBtn.href = `https://wa.me/${phoneNumber}?text=${message}`;
}

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
    dot.setAttribute("aria-pressed", i === index ? "true" : "false");
  });
}

function nextSlide() {
  if (!slides.length) return;
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function startSlideshow() {
  if (slides.length <= 1) return;
  stopSlideshow();
  slideshowInterval = setInterval(nextSlide, 3500);
}

function stopSlideshow() {
  if (slideshowInterval) {
    clearInterval(slideshowInterval);
    slideshowInterval = null;
  }
}

qtyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    qtyButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    selectedQty = Number(button.dataset.qty);
    updateOrderUI();
  });
});

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    currentSlide = Number(dot.dataset.slide);
    showSlide(currentSlide);
    startSlideshow();
  });
});

confirmBtn?.addEventListener("click", () => {
  const total = unitPrice * selectedQty;
  alert(
    `تم اختيار ${selectedQty} علبة. الإجمالي هو DH ${total}. يمكنك ربط هذا الزر بفورم الطلب أو صفحة الدفع.`
  );
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopSlideshow();
  } else {
    startSlideshow();
  }
});

updateOrderUI();
showSlide(currentSlide);
startSlideshow();