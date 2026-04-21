const unitPrice = 150;
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
    `أريد طلب عسل السلطان - الكمية: ${selectedQty} - الإجمالي: DH ${total}`
  );

  whatsappBtn.href = `https://wa.me/212665191677?text=${message}`;
}

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function startSlideshow() {
  stopSlideshow();
  slideshowInterval = setInterval(nextSlide, 3000);
}

function stopSlideshow() {
  if (slideshowInterval) {
    clearInterval(slideshowInterval);
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

confirmBtn.addEventListener("click", () => {
  alert(`تم اختيار ${selectedQty} علبة. يمكنك ربط هذا الزر بفورم الطلب أو صفحة الدفع.`);
});

updateOrderUI();
showSlide(currentSlide);
startSlideshow();