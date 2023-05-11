# EcommerceUN
Se requiere instalar NodeJS y Npm. Ademas, tambien se requiere un servidor MySQL local.

Pasos para la configuración del proyecto.
1. Se debe crear una carpeta llamada node-modules en la raiz.
2. Ejecutar (desde la raiz): npm i --legacy-peer-deps (para descargar los módulos).
3. Se debe crear un schema llamdado "ecommerce", con configuración "uft8" y "uft8_spanish_ci".
4. Se debe correr el siguiente SQL script para que se cree la estructura del proyecto (Drive: https://drive.google.com/file/d/1_qWTvJy4gxoEM0w-tL9XqBeOwPaNNYa_/view?usp=share_link).
5. Listo!

Ejecutar el proyecto:
1. Correr el servidor de Front: "npm start"
2. Correr el servidor del back: "cd server/App". Luego: "node App.js" 

IMPORTANTE: Por favor trabajar por ramas independientes.
