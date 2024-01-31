let currentSlide = 0;
const slides = [document.querySelector(".home-slider1"), document.querySelector(".home-slider2"), document.querySelector(".home-slider3")];
setTimeout(function() {
    slides[0].classList.add("anim");
}, 150);
function advantagesInit() {
    let prevSlider = currentSlide;
    slides[currentSlide].classList.remove("active");
    currentSlide++;
    if(currentSlide  >= 3) {
        currentSlide  = 0;
    }
    slides[currentSlide].classList.add("active");
    slides[currentSlide].classList.add("anim");
    setTimeout(function() {
        slides[prevSlider].classList.remove("anim");
    }, 1150);
}
let advantagesInterval = setInterval(() => {
    advantagesInit();
}, 5000);

// mobile menu
document.querySelector(".mobile-nav-icons").addEventListener("click", function() {
    if(document.querySelector("header nav").classList.contains("active")) {
        document.querySelector("header nav").classList.remove("active");
        document.querySelector(".mobile-nav-icons").classList.remove("active");
    } else {
        document.querySelector("header nav").classList.add("active");
        document.querySelector(".mobile-nav-icons").classList.add("active");
    }
});

// fullscreen scroll
const scrollArray = document.querySelectorAll(".fullscreen-scroll");
let scrollFlag = false;
let currentScrollPosition = 0;
const throttleTime = 800;

function selectSection(id) {
    document.querySelector(".sections-container").style.transform = "translateY(-" + scrollArray[id].offsetTop + "px)";
}

function fullscreenScrolling(event) {
    if(!scrollFlag) {
        scrollFlag = true;
        if(event.deltaY > 0) {
            if(currentScrollPosition < scrollArray.length - 1) {
                currentScrollPosition++;
                selectSection(currentScrollPosition);
            }
        } else if(event.deltaY < 0) {
            if(currentScrollPosition > 0) {
                currentScrollPosition--;
                selectSection(currentScrollPosition);
            }
        } 
        setTimeout(function() {
            scrollFlag = false;
        }, throttleTime);
        setDots();
    }
}
function fullscreenScrollDown() {
    if(!scrollFlag) {
        scrollFlag = true;
        if(currentScrollPosition < scrollArray.length - 1) {
            currentScrollPosition++;
            selectSection(currentScrollPosition);
        }
        setTimeout(function() {
            scrollFlag = false;
        }, throttleTime);
        setDots();
    }   
}
function fullscreenScrollUp() {
    if(!scrollFlag) {
        scrollFlag = true;
        if(currentScrollPosition > 0) {
            currentScrollPosition--;
            selectSection(currentScrollPosition);
        }
        setTimeout(function() {
            scrollFlag = false;
        }, throttleTime);
        setDots();
    }   
}

window.addEventListener("wheel", (event) => {
    fullscreenScrolling(event);
});
window.addEventListener("keydown", (event) => {
    if(event.key === "ArrowDown" || event.key === " " || event.key === "PageDown") {
        fullscreenScrollDown();
    }
    if(event.key === "ArrowUp" || event.key === "PageUp") {
        fullscreenScrollUp();
    }
});

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
document.addEventListener('touchend', handleTouchEnd, false);
let yDown = 0;
let yDiff = 0;
function handleTouchStart(evt) {
    evt.stopPropagation();
    yDown = evt.touches[0].clientY;
};
function handleTouchMove(evt) {
    let yUp = evt.touches[0].clientY;
    yDiff = yDown - yUp;
    if ( yDiff > 40 ) {
        fullscreenScrollDown();
    } else if( yDiff < -40 ) {
        fullscreenScrollUp();
    }
};
function handleTouchEnd(evt) {
    yDown = 0;
    yDiff = 0;
}

// menu nav
const menuArray = document.querySelectorAll("header nav ul li a");
menuArray.forEach(function (item, index) {
    item.addEventListener("click", function(event) {
        event.preventDefault();
        selectSection(index);
        currentScrollPosition = index;
        setDots();
        document.querySelector("header nav").classList.remove("active");
        document.querySelector(".mobile-nav-icons").classList.remove("active");
    });
});

// dots side nav
const dotsArray = document.querySelectorAll(".pointers li");
function setDots() {
    dotsArray.forEach(function (item) {
        item.classList.remove("active");
    });
    menuArray.forEach(function (item) {
        item.classList.remove("active");
    });
    dotsArray[currentScrollPosition].classList.add("active");
    menuArray[currentScrollPosition].classList.add("active");
}

dotsArray.forEach(function (item, index) {
    item.addEventListener("click", function() {
        selectSection(index);
        dotsSectionSelect(index);
    });
});
function dotsSectionSelect(id) {
    // dotsArray[id].classList.add("active");
    currentScrollPosition = id;
    setDots();
}

window.addEventListener("resize", function() {
    selectSection(currentScrollPosition);
})