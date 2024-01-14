document.addEventListener("DOMContentLoaded", function () {
    const galleryContainer = document.getElementById("gallery");

    // Ruta de la carpeta de imágenes
    const imgFolder = "img/";

    // Obtener todas las imágenes en la carpeta
    fetch(imgFolder)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const images = Array.from(doc.querySelectorAll('a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"], a[href$=".gif"]'));

            // Crear elementos de imagen y agregar al contenedor
            images.forEach(image => {
                const imgSrc = imgFolder + image.getAttribute('href');
                const imgContainer = createImageContainer(imgSrc);
                galleryContainer.appendChild(imgContainer);
            });
        });

    // Función para crear un contenedor de imagen con superposición
    function createImageContainer(src) {
        const imgContainer = document.createElement("div");
        imgContainer.className = "img-container";

        const img = document.createElement("img");
        img.src = src;

        const overlay = document.createElement("div");
        overlay.className = "overlay";

        const overlayImg = document.createElement("img");
        overlayImg.src = src;

        overlay.appendChild(overlayImg);
        imgContainer.appendChild(img);
        imgContainer.appendChild(overlay);

        // Agregar evento de clic para ampliar/minimizar la imagen
        imgContainer.addEventListener("click", function () {
            toggleFullscreen(imgContainer);
        });

        return imgContainer;
    }

    // Función para alternar entre ocupar toda la pantalla y tamaño original
    function toggleFullscreen(imgContainer) {
        imgContainer.classList.toggle("fullscreen");
    }
});
