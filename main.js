// NASA APOD API base URL
const apiBaseUrl = "https://api.nasa.gov/planetary/apod";

// NASA API key 
const apiKey = "tCVsaYVegAsgAAfF1Hj8woNClz2fO8LQFJ9IHxft";

function getAPOD() {
    const dateInput = document.getElementById("dateInput").value;
    const apodContent = document.getElementById("apodContent");

    fetch(`${apiBaseUrl}?api_key=${apiKey}&date=${dateInput}`)
        .then(response => response.json())
        .then(data => {
            const apodDate = document.getElementById("apodDate");
            const apodImage = document.getElementById("apodImage");
            const apodDescription = document.getElementById("apodDescription");

            apodDate.textContent = `Date: ${data.date}`;
            apodImage.src = data.url;
            apodDescription.textContent = data.explanation;

            // If the media type is video, creating an iframe for it
            if (data.media_type === "video") {
                apodImage.style.display = "none";
                const videoIframe = document.createElement("iframe");
                videoIframe.src = data.url;
                videoIframe.width = "640";
                videoIframe.height = "360";
                apodContent.appendChild(videoIframe);
            } else {
                apodImage.style.display = "block";
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            apodContent.innerHTML = "<p>Failed to fetch data. Please try again.</p>";
        });
}

// Initial load with today's date
document.addEventListener("DOMContentLoaded", () => {
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("dateInput").value = today;
    getAPOD();
});
