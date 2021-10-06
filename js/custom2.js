var testim = document.getElementById("testim"),
    testimDots = Array.prototype.slice.call(document.getElementById("testim-dots").children),
    testimContent = Array.prototype.slice.call(document.getElementById("testim-content").children),
    testimLeftArrow = document.getElementById("left-arrow"),
    testimRightArrow = document.getElementById("right-arrow"),
    testimSpeed = 10000,
    currentSlide = 0,
    currentActive = 0,
    testimTimer,
    touchStartPos,
    touchEndPos,
    touchPosDiff,
    ignoreTouch = 30,
    prevDot = 0;

window.onload = function() {

    // Testim Script
    let mnIndex = 0;

    function playSlide(slide) {


        for (var k = 0; k < testimDots.length; k++) {
            testimContent[k].classList.remove("active");
            testimContent[k].classList.remove("inactive");

            testimContent[k].classList.remove("active-left");
            testimContent[k].classList.remove("inactive-left");


            testimDots[k].classList.remove("active");
        }

        if (slide < 0) {
            slide = currentSlide = testimContent.length - 1;
        }

        if (slide > testimContent.length - 1) {
            slide = currentSlide = 0;
        }

        if (currentActive != currentSlide) {
            testimContent[currentActive].classList.add("inactive");
        }
        testimContent[slide].classList.add("active");
        testimDots[slide].classList.add("active");

        currentActive = currentSlide;

        clearTimeout(testimTimer);
        testimTimer = setTimeout(function() {
            playSlide(currentSlide += 1);
        }, testimSpeed)
    }


    function playSlideLeft(slide) {

        for (var k = 0; k < testimDots.length; k++) {
            testimContent[k].classList.remove("active");
            testimContent[k].classList.remove("inactive");

            testimContent[k].classList.remove("active-left");
            testimContent[k].classList.remove("inactive-left");


            testimDots[k].classList.remove("active");
        }

        if (slide < 0) {
            slide = currentSlide = testimContent.length - 1;
        }

        if (slide > testimContent.length - 1) {
            slide = currentSlide = 0;
        }

        if (currentActive != currentSlide) {
            testimContent[currentActive].classList.add("inactive-left");
        }
        testimContent[slide].classList.add("active-left");
        testimDots[slide].classList.add("active");

        currentActive = currentSlide;

        clearTimeout(testimTimer);
        testimTimer = setTimeout(function() {
            playSlide(currentSlide += 1);
        }, testimSpeed)
    }


    function getPrevDotNumber() {
        for (let index = 0; index < testimDots.length; index++) {
            if (testimDots[index].classList.contains("active")) {
                return index;
            }
        }
    }


    testimLeftArrow.addEventListener("click", function() {
        playSlideLeft(currentSlide -= 1);
    })

    testimRightArrow.addEventListener("click", function() {
        playSlide(currentSlide += 1);
    })

    for (var l = 0; l < testimDots.length; l++) {
        testimDots[l].addEventListener("click", function() {

            mnIndex = getPrevDotNumber();


            if (mnIndex > testimDots.indexOf(this)) {

                playSlideLeft(currentSlide = testimDots.indexOf(this));
            } else {

                playSlide(currentSlide = testimDots.indexOf(this));
            }
        })
    }

    // playSlide(currentSlide);

    // keyboard shortcuts
    document.addEventListener("keyup", function(e) {
        switch (e.keyCode) {
            case 37:
                testimLeftArrow.click();
                break;

            case 39:
                testimRightArrow.click();
                break;

            case 39:
                testimRightArrow.click();
                break;

            default:
                break;
        }
    })

    testim.addEventListener("touchstart", function(e) {
        touchStartPos = e.changedTouches[0].clientX;
    })

    testim.addEventListener("touchend", function(e) {
        touchEndPos = e.changedTouches[0].clientX;

        touchPosDiff = touchStartPos - touchEndPos;



        if (touchPosDiff > 0 + ignoreTouch) {
            testimLeftArrow.click();
        } else if (touchPosDiff < 0 - ignoreTouch) {
            testimRightArrow.click();
        } else {
            return;
        }

    })
}