let slideIndex = 1;
showSlides(slideIndex);


function plusSlides(n) {
  showSlides(slideIndex += n);
}

const currentUrl = window.location.href;
  if (currentUrl.includes('.html')) {
    window.location.href = "/";
  }
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" bg-gray-700", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " bg-gray-700";
}


function animateProgressBar(targetWidth) {
  
  const progressBar = document.getElementById('progress');
  if (progressBar) {
    progressBar.style.width = targetWidth + '%';
  }
}

function animateProgressBar2(targetWidth) {
  const progressBar2 = document.getElementById('progress2');
  if (progressBar2) {
    progressBar2.style.width = targetWidth + '%';
  }
}
