// 📤 SUBIR FOTO
document.getElementById('archivo').addEventListener('change', async function(e) {
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
      document.getElementById('mensaje').textContent = '✅ ¡Foto subida con éxito!';
      document.getElementById('mensaje').style.color = 'green';
      cargarGaleria();
    } else {
      document.getElementById('mensaje').textContent = '❌ Error al subir la foto';
      document.getElementById('mensaje').style.color = 'red';
    }
  } catch (err) {
    document.getElementById('mensaje').textContent = '❌ Error: ' + err;
    document.getElementById('mensaje').style.color = 'red';
  }
});

// 📸 CARGAR GALERÍA
async function cargarGaleria() {
  const galeria = document.getElementById('galeria');
  galeria.innerHTML = '';

  try {
    const res = await fetch("/fotos");
    const fotos = await res.json();

    if (fotos.length === 0) {
      galeria.innerHTML = '<p class="vacio">Aún no hay fotos — ¡Sé el primero en subir! 📷</p>';
      return;
    }

    fotos.forEach(url => {
      const div = document.createElement('div');
      div.className = 'foto';
      div.innerHTML = `<img src="${url}" alt="foto">`;
      galeria.appendChild(div);
    });
  } catch {
    galeria.innerHTML = '<p class="vacio">❌ No se pudieron cargar las fotos.</p>';
  }
}

// 🔄 Recargar galería al inicio
window.onload = cargarGaleria;
