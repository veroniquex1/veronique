// experience page

// Get all elements with class "step"
var steps = document.querySelectorAll(".step");

// Loop through each step element and attach a click event listener
steps.forEach(function(step) {
    step.addEventListener("click", function() {
        // Add "active" class to clicked step and all previous steps
        this.classList.add("active");
        var previousSteps = Array.from(this.previousElementSibling);
        previousSteps.forEach(function(prevStep) {
            prevStep.classList.add("active");
        });

        // Remove "active" class from all subsequent steps
        var nextSteps = Array.from(this.nextElementSibling);
        nextSteps.forEach(function(nextStep) {
            nextStep.classList.remove("active");
        });

        // Adjust the width of the progress bar based on the clicked step
        var stepClass = this.classList[1]; // Get the second class of the clicked step element
        var progressBar = document.getElementById("line-progress");
        switch (stepClass) {
            case "step01":
                progressBar.style.width = "3%";
                break;
            case "step02":
                progressBar.style.width = "25%";
                break;
            case "step03":
                progressBar.style.width = "50%";
                break;
            case "step04":
                progressBar.style.width = "75%";
                break;
            case "step05":
                progressBar.style.width = "100%";
                break;
            default:
                progressBar.style.width = "0%";
        }

        // Show the corresponding content for the clicked step
        var contentClass = stepClass.replace("step", "");
        var contentToShow = document.querySelector("." + contentClass);
        var allContents = document.querySelectorAll(".content");
        allContents.forEach(function(content) {
            content.classList.remove("active");
        });
        contentToShow.classList.add("active");
    });
});



// skills slider

const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    // showing and hiding prev/next icon according to carousel scroll left value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
});

const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);
