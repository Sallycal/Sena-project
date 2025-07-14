# 📚 ConectaLibros

*ConectaLibros* es una aplicación web de biblioteca virtual que permite explorar, visualizar y administrar libros de forma organizada. Su objetivo es promover el acceso libre y controlado a contenidos literarios mediante una experiencia de usuario simple y moderna.

---

## 🚀 Tecnologías utilizadas

### Backend
- *Laravel 12* – Framework PHP para construcción de APIs RESTful.
- *MySQL* – Base de datos relacional para almacenar usuarios y libros.
- *Sanctum* – Para autenticación de usuarios vía tokens API.
- *PHP >= 8.1*
- *Composer* – Gestión de dependencias.

### Frontend
- *HTML, CSS, JavaScript Vanilla*
- *Vite* – Empaquetador rápido para entorno frontend moderno.
- *Postman* – Para testeo y validación de endpoints durante el desarrollo.

---

## 🔐 Funcionalidades principales

### 👥 Usuarios
- Registro y login de usuarios.
- Restricción de acceso a libros según autenticación.
- Vista de perfil con datos del usuario logueado.

### 📚 Libros
- Vista pública de todos los libros disponibles (50 por página).
- Vista privada para ver detalles completos de cada libro (requiere login).
- Visualización de libros por categorías.
- Administración de libros (crear, editar, eliminar) disponible solo para usuarios con rol *admin*.

### 🔒 Seguridad
- Middleware para proteger rutas privadas.
- Autenticación mediante Laravel Sanctum.
- Roles diferenciados para usuarios normales y administradores.

### ✅ Próximas mejoras
- Gamificación - sistema de puntuación por estrellas.
- Implementación de sistema de favoritos por usuario.
- Componente de comentarios y reseñas por libro.
- Blog integrado con contenidos literarios y culturales.

### Desarrollado por Sally Calderón Orozco — Desarrolladora en formación apasionada por la tecnología, la educación y los libro.
