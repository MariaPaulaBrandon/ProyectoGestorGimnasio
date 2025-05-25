# Proyecto final UTN - Gestor de Gimnasio

Este proyecto contiene un backend desarrollado en Laravel (PHP) y un frontend en React con Vite.

## Requisitos Previos

Antes de comenzar, tener instalado:

- **Composer** (para dependencias de PHP)
- **Node.js y npm** (para dependencias de JavaScript)
- **XAMPP** (para Apache y MySQL)

## Instrucciones de Instalación

### 1. Clonar el Repositorio

```bash
git clone [URL_DEL_REPOSITORIO]
cd [NOMBRE_DEL_PROYECTO]
```

### 2. Configurar Base de Datos

1. **Iniciar XAMPP:**

   - Abrir XAMPP Control Panel
   - Iniciar los servicios **Apache** y **MySQL**

2. **Configurar PHPMyAdmin:**

   - Navegar a la carpeta de PHPMyAdmin en tu instalación de XAMPP
   - Localizar el archivo `config.inc.php`
   - Reemplazar el contenido con la configuración de la base de datos remota del proyecto

3. **Configurar variables de entorno del backend:**
   - En la carpeta del backend, verificar que el archivo `.env` contenga las credenciales correctas de la base de datos
   - Asegurarse de que coincidan con la configuración de PHPMyAdmin

### 3. Configurar Backend (Laravel)

```bash
# Navegar a la carpeta del backend
cd [NOMBRE_CARPETA_BACKEND]

# Instalar dependencias de PHP
composer install

# Iniciar el servidor de desarrollo
composer serve8080
```

El backend estará disponible en `http://localhost:8080`

### 4. Configurar Frontend (React)

```bash
# Navegar a la carpeta del frontend
cd [NOMBRE_CARPETA_FRONTEND]

# Instalar dependencias de Node.js
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:3000` (o el puerto que indique Vite)

## Verificación

Una vez completados todos los pasos:

1. ✅ XAMPP con Apache y MySQL ejecutándose
2. ✅ Backend Laravel corriendo en puerto 8080
3. ✅ Frontend React corriendo en el puerto de Vite
4. ✅ Base de datos configurada y accesible

## Estructura del Proyecto

```
proyecto/
├── gestor-gimnasio-back/     # Código Laravel
├── gestor-gimnasio-app/    # Código React
└── README.md              # Este archivo
```
