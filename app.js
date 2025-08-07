function performSearch() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const allPlaces = document.querySelectorAll(".place-card");

    allPlaces.forEach(place => {
        const title = place.querySelector("h3").textContent.toLowerCase();
        if (title.includes(query)) {
            place.style.display = "block";
        } else {
            place.style.display = "none";
        }
    });
}
