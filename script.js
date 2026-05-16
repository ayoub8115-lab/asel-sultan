const unitPrice = 150;
const phoneNumber = "212688134940";

const qtyValue = document.getElementById("qtyValue");
const totalPrice = document.getElementById("totalPrice");
const whatsappBtn = document.getElementById("whatsappBtn");
const minusBtn = document.querySelector(".minus");
const plusBtn = document.querySelector(".plus");

const slides = document.querySelectorAll(".product-frame .slide");
const thumbs = document.querySelectorAll(".thumb");

let quantity = 4;
let currentSlide = 0;
let timer = null;

function updateOrder() {
  const total = unitPrice * quantity;
  qtyValue.textContent = quantity;
  totalPrice.textContent = `DH ${total}`;

  const message = encodeURIComponent(
    `السلام عليكم، أريد طلب عسل السلطان.\nالكمية: ${quantity}\nالإجمالي: DH ${total}`
  );

  whatsappBtn.href = `https://wa.me/${phoneNumber}?text=${message}`;
}

function showSlide(index) {
  currentSlide = index;

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  thumbs.forEach((thumb, i) => {
    thumb.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  if (!slides.length) return;
  showSlide((currentSlide + 1) % slides.length);
}

function startSlider() {
  stopSlider();
  timer = setInterval(nextSlide, 3500);
}

function stopSlider() {
  if (timer) clearInterval(timer);
}

minusBtn.addEventListener("click", () => {
  quantity = Math.max(1, quantity - 1);
  updateOrder();
});

plusBtn.addEventListener("click", () => {
  quantity = Math.min(20, quantity + 1);
  updateOrder();
});

thumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    const index = Number(thumb.dataset.slide);
    showSlide(index);
    startSlider();
  });
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopSlider();
  } else {
    startSlider();
  }
});

updateOrder();
showSlide(currentSlide);
startSlider();
