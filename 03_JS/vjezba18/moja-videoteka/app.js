// Popis polaznika i njihovih videa
const polaznici = [
    { name: "Andreas Sklizović", videoSrc: "../EdunovaVideoteka/video/andreas.webm", description: "Meister" },
    { name: "Ivica Jelošek", videoSrc: "../EdunovaVideoteka/video/ivicaj.webm", description: "Brko" },
    { name: "Olha Đerek", videoSrc: "../EdunovaVideoteka/video/Olha.webm", description: "Jedina" },
    { name: "Sean Kušec", videoSrc: "../EdunovaVideoteka/video/SeanKusec.webm", description: "Manga" },
    { name: "Tomislav Jakopec", videoSrc: "../EdunovaVideoteka/video/TomislavJakopec.webm", description: "Prof" },
    { name: "Tomislav Jurčević", videoSrc: "../EdunovaVideoteka/video/TomislavJurcevic.webm", description: "Šaljivdžija" }
];

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("video-grid");

    polaznici.forEach(polaznik => {
        const card = document.createElement("div");
        card.className = "video-card";

        card.innerHTML = `
            <div class="video-wrapper">
                <video controls preload="metadata">
                    <source src="${polaznik.videoSrc}" type="video/mp4">
                    Vaš preglednik ne podržava prikaz videa.
                </video>
            </div>
            <div class="card-info">
                <h3 class="student-name">${polaznik.name}</h3>
                <span class="video-badge">${polaznik.description}</span>
            </div>
        `;

        grid.appendChild(card);
    });
});