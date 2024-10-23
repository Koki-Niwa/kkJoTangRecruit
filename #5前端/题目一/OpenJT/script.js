document.addEventListener("DOMContentLoaded", function () {
  // 轮播图
  const slides = document.querySelectorAll(".carousel-slide");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let currentSlide = 0;

  function showSlide(n) {
    slides[currentSlide].style.display = "none";
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].style.display = "block";
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  // 自动翻页
  setInterval(nextSlide, 5000);

  showSlide(0);

  // 图表
  const ctx = document.getElementById("growthChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["6月", "7月", "8月", "9月", "10月", "11月"],
      datasets: [
        {
          label: "用户增长",
          data: [4, 50, 60, 70, 90, 110],
          backgroundColor: "rgba(255, 165, 0, 0.2)", // 半透明橙色
          borderColor: "rgba(210, 105, 30, 1)", // 黄褐色
          borderWidth: 2,
          pointBackgroundColor: "rgba(255, 165, 0, 1)", // 橙色
          pointRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(0, 0, 0, 0.1)",
          },
          ticks: {
            color: "rgba(0, 0, 0, 0.7)",
          },
        },
        x: {
          grid: {
            color: "rgba(0, 0, 0, 0.1)",
          },
          ticks: {
            color: "rgba(0, 0, 0, 0.7)",
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: "rgba(0, 0, 0, 0.7)",
          },
        },
      },
    },
  });
});
// 提交反馈
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  alert("感谢您的留言！我们会尽快回复您。");
  contactForm.reset();
});
