# STREAM593 RP — Web + Mercado

## Qué incluye
- Inicio de STREAM593 RP.
- Tarjetas clicables: Vehículos, Casas, Negocios y Otros.
- Catálogo con filtros.
- Páginas/secciones independientes por categoría.
- Cada publicación puede tener foto, nombre, precio, información y descripción.
- Discord y conexión FiveM configurados.

## Cómo agregar fotos y publicaciones

La web está en GitHub Pages, por lo que una foto no puede quedar guardada permanentemente desde un formulario del navegador sin un backend.
La forma segura y gratuita es:

1. Sube las fotos a `assets/catalogo/` en GitHub.
2. Abre `catalogo.js`.
3. Agrega una publicación como esta:

{
  id: "bmw-m4",
  categoria: "vehiculos",
  nombre: "BMW M4",
  precio: "$85.000",
  meta: "2026 · Disponible",
  imagen: "assets/catalogo/bmw-m4.jpg",
  descripcion: "Vehículo deportivo, interior premium y excelente estado."
}

Categorías permitidas:
- vehiculos
- casas
- negocios
- otros

4. Guarda/commit los cambios. GitHub Pages actualizará la web.

## Importante
La versión actual muestra publicaciones de ejemplo. Cambia sus datos antes de publicar el catálogo definitivo.
