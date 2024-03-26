// Function to fetch recorded audio messages data from JSON file
async function fetchRecordingsData() {
    try {
        const response = await fetch("recordings.json");
        if (!response.ok) {
            throw new Error("Failed to fetch recordings data.");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching recordings data:", error);
        return []; // Return an empty array if fetching fails
    }
}

// Function to generate HTML for each recording
function generateRecordingHTML(recording) {
    const recordingDate = `${recording.month} ${recording.day}, ${recording.year}`;
    return `
    <div class="recording">
    <div class="recording-info">
      <h2> ${recording.title}</h2>
      <p>${recordingDate}</p>
    </div>
    <button class="downloadBtn" data-link="${recording.link}">Download</button>
  </div>
    `;
}

// Function to populate the recordings container with recordings
async function populateRecordingsContainer() {
    const recordingsContainer = document.getElementById("recordingsContainer");
    try {
        const recordings = await fetchRecordingsData();
        // Clear previous content
        recordingsContainer.innerHTML = "";

        // Generate HTML for each recording and append to container
        recordings.forEach(recording => {
            const recordingHTML = generateRecordingHTML(recording);
            recordingsContainer.innerHTML += recordingHTML;
        });

        // Add event listeners to download buttons
        const downloadButtons = document.querySelectorAll(".downloadBtn");
        downloadButtons.forEach(button => {
            button.addEventListener("click", function () {
                const link = button.getAttribute("data-link");
                // Logic to download the recording using the link
                window.location.href = link;
            });
        });
    } catch (error) {
        console.error("Error populating recordings container:", error);
    }
}

// Populate recordings container
populateRecordingsContainer();


// Function to populate years from 2022 to current year
function populateYears() {
    const currentYear = new Date().getFullYear();
    const yearSelect = document.getElementById('year');

    // Clear existing options
    yearSelect.innerHTML = '';

    // Add options from 2022 to current year
    for (let year = 2022; year <= currentYear; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }

    // Set default value to current year
    yearSelect.value = currentYear;
}

// Call the function to populate years
populateYears();

document.getElementById('searchBtn').addEventListener('click', async function () {
    const recordingsContainer = document.getElementById("recordingsContainer");
    try {
        const recordings = await fetchRecordingsData();
        // Clear previous content
        recordingsContainer.innerHTML = "";

        // Get the selected month and year
        const selectedMonth = document.getElementById('month').value;
        const selectedYear = document.getElementById('year').value;

        // Filter recordings based on selected month and year
        const filteredRecordings = recordings.filter(recording => {
            return recording.month === selectedMonth && recording.year.toString() === selectedYear;
        });

        // Check if there are no results
        if (filteredRecordings.length === 0) {
            // Display "No results found" message
            recordingsContainer.innerHTML = "<span>No results found</span>";
        } else {
            // Generate HTML for each recording and append to container
            filteredRecordings.forEach(recording => {
                const recordingHTML = generateRecordingHTML(recording);
                recordingsContainer.innerHTML += recordingHTML;
            });

            // Add event listeners to download buttons
            const downloadButtons = document.querySelectorAll(".downloadBtn");
            downloadButtons.forEach(button => {
                button.addEventListener("click", function () {
                    const link = button.getAttribute("data-link");
                    // Logic to download the recording using the link
                    window.location.href = link;
                });
            });
        }
    } catch (error) {
        console.error("Error populating recordings container:", error);
    }
});
document.getElementById('showAllBtn').addEventListener('click', function () {
    populateRecordingsContainer();
});