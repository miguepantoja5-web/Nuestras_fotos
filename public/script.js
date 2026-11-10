// 📤 SUBIR FOTO

document.getElementById('archivo').addEventListener('change', async function (e) {

    const archivo = e.target.files[0];

    if (!archivo) return;

    const formData = new FormData();

    formData.append("foto", archivo);

    try {

        const res = await fetch("/upload", {
            method: "POST",
            body: formData
        });

        if (res.ok) {

            document.getElementById('mensaje').textContent =
                '✅ ¡Foto subida con éxito!';

            document.getElementById('mensaje').style.color =
                '#7dff97';

            cargarGaleria();

        } else {

            document.getElementById('mensaje').textContent =
                '❌ Error al subir la foto';

            document.getElementById('mensaje').style.color =
                '#ff8c8c';
        }

    } catch (err) {

        document.getElementById('mensaje').textContent =
            '❌ Error: ' + err;

        document.getElementById('mensaje').style.color =
            '#ff8c8c';
    }

});


// 📸 CARGAR GALERÍA

async function cargarGaleria() {

    const galeria = document.getElementById('galeria');

    galeria.innerHTML = '';

    try {

        const res = await fetch('/fotos');

        const fotos = await res.json();

        if (fotos.length === 0) {

            galeria.innerHTML =
                '<p class="vacio">Aún no hay fotografías.</p>';

            return;
        }

        fotos.forEach(url => {

            const div = document.createElement('div');

            div.className = 'foto';

            const img = document.createElement('img');

            img.src = url;

            img.alt = 'Foto';

            img.addEventListener('click', () => {

                document.getElementById('visor').style.display = 'flex';

                document.getElementById('imagenGrande').src = url;

            });

            div.appendChild(img);

            galeria.appendChild(div);

        });

    } catch (error) {

        galeria.innerHTML =
            '<p class="vacio">❌ No se pudieron cargar las fotos.</p>';

    }

}


// ❌ CERRAR VISOR

document.getElementById('cerrarVisor')
.addEventListener('click', () => {

    document.getElementById('visor').style.display = 'none';

});


// ❌ CERRAR AL HACER CLICK AFUERA

document.getElementById('visor')
.addEventListener('click', (e) => {

    if (e.target.id === 'visor') {

        document.getElementById('visor').style.display = 'none';

    }

});


// 🚀 INICIO

window.onload = () => {

    cargarGaleria();

    setInterval(() => {

        cargarGaleria();

    }, 10000);

};