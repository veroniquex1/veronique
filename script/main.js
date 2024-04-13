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
