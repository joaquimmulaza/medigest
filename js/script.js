document.addEventListener('DOMContentLoaded', function() {
    var collapsibles = document.querySelectorAll('.collapsible');
    collapsibles.forEach(function(collapsible) {
        collapsible.addEventListener('click', function() {
            this.classList.toggle('active');
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    });

    // Geolocalización con país predeterminado a España
    const locationElement = document.getElementById('location');
    locationElement.textContent = "Ubicación: España";

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            fetch(`https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?geoit=json`)
                .then(response => response.json())
                .then(data => {
                    if (data && data.country) {
                        locationElement.textContent = `Ubicación: ${data.country}`;
                    }
                })
                .catch(() => {
                    locationElement.textContent = "Ubicación: España";
                });
        }, function() {
            locationElement.textContent = "Ubicación: España";
        });
    }

    // Control de notificaciones
    document.getElementById('notification-icon').addEventListener('click', function() {
        if (confirm('¿Permitir notificaciones del sitio?')) {
            alert('Notificaciones permitidas');
        } else {
            alert('Notificaciones bloqueadas');
        }
    });
});

function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'es'}, 'google_translate_element');
}