$(document).ready(function () {
  // Fade-in on scroll
  $(window).on("scroll", function() {
    $("section").each(function() {
      const top = $(this).offset().top - $(window).scrollTop();
      if (top < window.innerHeight - 100) $(this).addClass("visible");
    });
  });

  // Open modal
  $(".timeline-item").click(function() {
    const modalId = $(this).data("modal");
    $("#" + modalId).fadeIn().css("display", "flex");
  });

  // Close modal (x button)
  $(".close-btn").click(function() {
    const modalId = $(this).data("modal");
    $("#" + modalId).fadeOut();
  });

  // Close when clicking outside
  $(window).click(function(e) {
    if ($(e.target).hasClass("modal")) $(e.target).fadeOut();
  });
});

// ✅ Section highlighting logic
$(window).on("scroll", function() {
  let scrollPos = $(window).scrollTop();
  let windowHeight = $(window).height();
  let docHeight = $(document).height();
  
  // 🚫 Remove active highlight when near the top (hero section)
  if (scrollPos < $("#about").offset().top - 100) {
    $("header nav a").removeClass("active");
    return; // stop further checks
  }

  $("header nav a").each(function () {
    let section = $($(this).attr("href"));
    if (section.length) {
      let sectionTop = section.offset().top - 120; // offset for header
      let sectionBottom = sectionTop + section.outerHeight();

      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        $("header nav a").removeClass("active");
        $(this).addClass("active");
      }
    }
  });

  // ✅ Handle bottom-of-page edge case
  if (scrollPos + windowHeight >= docHeight - 10) {
    $("header nav a").removeClass("active");
    $("header nav a[href='#contact']").addClass("active");
  }
});

// 🎾 Animated Background for About Section
const canvas = document.getElementById("about-bg");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let balls = [];
  let colors = ["#2C1A12", "#3A2619", "#A6C48A"]; // dark brown, medium brown, matcha
  let numBalls = 25;

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  for (let i = 0; i < numBalls; i++) {
    balls.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 25 + 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2
    });
  }

  function animate() {
    ctx.fillStyle = "#FAF3E0"; // cream background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    balls.forEach((b) => {
      b.x += b.dx;
      b.y += b.dy;

      // Bounce off walls
      if (b.x + b.r > canvas.width || b.x - b.r < 0) b.dx *= -1;
      if (b.y + b.r > canvas.height || b.y - b.r < 0) b.dy *= -1;

      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = b.color;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }
  animate();
}
