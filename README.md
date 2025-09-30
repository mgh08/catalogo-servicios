

# 💆‍♀️ Catálogo de Servicios (estático)

Portafolio **solo lectura** hecho con **HTML + CSS + JS** (sin backend, sin bases de datos).
Ideal para publicar en **GitHub Pages** y mantenerlo editando dos archivos JSON.

[![Static](https://img.shields.io/badge/site-static-068B99)](#)
[![No backend](https://img.shields.io/badge/backend-none-002D4D)](#)
[![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-E55B6C)](#)

> **Demo:** (agrega aquí tu URL cuando actives Pages)

---

## ✨ Características

* 🔎 **Búsqueda** por texto + **filtros por categoría**
* ⚡ **Rápido** (100% estático, CDN de GitHub Pages)
* 🧩 **Editable sin código**: solo cambias `config.json` y `services.json`
* 🎨 **Paleta personalizada**:

  * `#002D4D` (navy) · `#068B99` (teal) · `#D3C2AD` (beige)
  * `#F4DEBB` (sand) · `#E55B6C` (coral) · `#965B83` (plum)
* 📱 **Responsive** (móvil / tablet / desktop)

---

## 🚀 Deploy en GitHub Pages

1. Crea el repo (ej. `catalogo-servicios`) y sube estos archivos a la rama `main`.
2. Ve a **Settings → Pages**

   * **Source:** *Deploy from a branch*
   * **Branch:** `main` / `/ (root)` → **Save**
3. Abre la URL que te genera GitHub.

> Si prefieres subir desde consola:
>
> ```bash
> git init
> git add .
> git commit -m "Init catálogo estático"
> git branch -M main
> git remote add origin https://github.com/TU_USUARIO/catalogo-servicios.git
> git push -u origin main
> ```

---

## 🛠️ Cómo editar el contenido

### 1) Marca y enlaces — `config.json`

```json
{
  "title": "Tu Spa & Bienestar",
  "tagline": "Masajes y terapias para cuerpo y mente.",
  "whatsapp": "+57 300 123 4567",
  "whatsapp_msg": "Hola, quiero información sobre un servicio del catálogo.",
  "instagram": "https://instagram.com/tu_spa"
}
```

* `whatsapp` se convierte en un enlace `wa.me`.
* Si no quieres un botón, deja el campo vacío.

### 2) Servicios — `services.json`

**Esquema de cada servicio:**

```json
{
  "id": 1,
  "name": "Masaje relajante",
  "description": "Texto breve del servicio.",
  "price": 90000,
  "duration": "60 min",
  "category": "Relajación",
  "image": "https://tu-imagen.jpg"
}
```

* `price` se formatea a **COP** automáticamente.
* `category` alimenta los **filtros** (chips) arriba del catálogo.
* `image` puede ser URL absoluta (Unsplash/Cloudinary/etc).

Guarda cambios → commit → Pages se actualiza solo.

---

## 🧩 Estructura de carpetas

```
/
├─ index.html      # maquetado del sitio
├─ styles.css      # estilos (usa la paleta de colores)
├─ script.js       # lógica: carga JSON, filtros y búsqueda
├─ config.json     # título, tagline, WhatsApp, Instagram
├─ services.json   # tus servicios
└─ assets/
   ├─ logo.svg
   └─ favicon.svg
```

> Puedes reemplazar `assets/logo.svg` y `assets/favicon.svg` por tus propios íconos.

---

## 🎨 Colores y estilos

* Edita variables en `styles.css` (bloque `:root`):

```css
:root{
  --navy:#002D4D;
  --teal:#068B99;
  --beige:#D3C2AD;
  --sand:#F4DEBB;
  --coral:#E55B6C;
  --plum:#965B83;
}
```

---

## 🔍 SEO y accesibilidad (tips rápidos)

* Completa `<title>` y `<meta name="description">` en `index.html`.
* Usa **nombres descriptivos** en `name` y buenas descripciones.
* Mantén **alt** en imágenes (ya se toma de `name`).

---

## 🧯 Troubleshooting

* **No se ven las tarjetas:** revisa que `services.json` tenga un **array** válido y que el archivo esté en la **raíz**.
* **Botón de WhatsApp no aparece:** deja `whatsapp` vacío para ocultarlo, o pon un número válido.
* **Cache vieja:** GitHub Pages a veces cachea. Ya usamos `cache: 'no-store'`, refresca con `Ctrl + F5`.

---

## 📝 Licencia

Este proyecto puede usarse libremente en catálogos personales o comerciales.
Si lo publicas como open source, te recomiendo licencia **MIT**.


