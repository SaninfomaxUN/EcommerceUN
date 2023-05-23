const data = [
  {
    id: 1,
    nombre: "Mouse gamer Logitech g203",
    precio: 10.99,
    foto: "https://http2.mlstatic.com/D_NQ_NP_998265-MCO42038100864_062020-O.webp",
    descripcion: "El mouse gamer Logitech g203 es perfecto para aquellos que buscan precisión y velocidad en sus juegos. Con una velocidad de seguimiento de hasta 8,000 DPI y una tasa de informe de 1,000 Hz, este mouse te permitirá llevar tu juego al siguiente nivel."
  },
  {
    id: 2,
    nombre: "Mouse Redragon Storm",
    precio: 19.99,
    foto: "https://http2.mlstatic.com/D_NQ_NP_818240-MPE50012400045_052022-O.jpg",
    descripcion: "Producto 2 es una excelente opción para aquellos que buscan calidad y durabilidad. Con una construcción resistente y materiales de alta calidad, este producto durará por mucho tiempo."
  },
  {
    id: 3,
    nombre: "Producto 3",
    precio: 10.99,
    foto: "https://http2.mlstatic.com/D_NQ_NP_2X_615158-MLA46232793009_062021-V.webp",
    descripcion: "Producto 3 es perfecto para aquellos que buscan una solución económica y funcional. Con un diseño simple pero eficiente, este producto te ayudará a resolver tus necesidades sin tener que gastar demasiado."
  },
  {
    id: 4,
    nombre: "Producto 4",
    precio: 19.99,
    foto: "https://dobleclicknet.com/wp-content/uploads/2022/02/lieutenant-2.png",
    descripcion: "Producto 4 es una excelente opción para aquellos que buscan rendimiento y estilo. Con un diseño elegante y moderno, este producto te permitirá destacar entre la multitud mientras realizas tus actividades diarias."
  },
  {
    id: 5,
    nombre: "Producto 5",
    precio: 10.99,
    foto: "https://falabella.scene7.com/is/image/FalabellaCO/7590681_1?wid=800&hei=800&qlt=70",
    descripcion: "Producto 5 es una excelente opción para aquellos que buscan una solución práctica y funcional. Con un diseño ergonómico y materiales de alta calidad, este producto te permitirá realizar tus actividades diarias con mayor comodidad."
  },
  {
    id: 6,
    nombre: "Producto 6",
    precio: 19.99,
    foto: "https://www.alcarrito.com/media/catalog/product/1023/M-W-CW905-BL/ONIKUMA-CW905-6400-DPI-Wired-Gaming-Mouse-USB-yythk-1.png?width=600&height=600&canvas=600,600&optimize=medium&bg-color=255,255,255&fit=bounds&format=jpeg",
    descripcion: "Producto 6 es perfecto para aquellos que buscan una experiencia de juego inmersiva y emocionante. Con una resolución de hasta 6,400 DPI y botones programables, este mouse tepermitirá personalizar tu configuración de juego y obtener el máximo rendimiento en cada partida."

  },
  {
  id: 7,
  nombre: "Producto 7",
  precio: 10.99,
  foto: "https://jyrtechnology.com.co/wp-content/uploads/2020/10/MGJR-033-1.png",
  descripcion: "Producto 7 es una opción versátil y funcional para aquellos que buscan un producto multiusos. Con características innovadoras y un diseño compacto, este producto te ayudará a simplificar tus tareas diarias y optimizar tu productividad."
  },
  {
  id: 8,
  nombre: "Producto 8",
  precio: 19.99,
  foto: "https://teknopolis.vtexassets.com/arquivos/ids/181286/Imagen-1.jpg?v=636857755012570000",
  descripcion: "Producto 8 es una elección ideal para aquellos que buscan rendimiento y eficiencia. Con una velocidad de procesamiento rápida y un diseño elegante, este producto te permitirá realizar tus tareas con fluidez y estilo."
  },
  {
  id: 11,
  nombre: "Mouse gamer Logitech g203",
  precio: 10.99,
  foto: "https://http2.mlstatic.com/D_NQ_NP_998265-MCO42038100864_062020-O.webp",
  descripcion: "El mouse gamer Logitech g203 es perfecto para aquellos que buscan precisión y velocidad en sus juegos. Con una velocidad de seguimiento de hasta 8,000 DPI y una tasa de informe de 1,000 Hz, este mouse te permitirá llevar tu juego al siguiente nivel."
  },
  {
  id: 21,
  nombre: "Producto 2",
  precio: 19.99,
  foto: "https://http2.mlstatic.com/D_NQ_NP_818240-MPE50012400045_052022-O.jpg",
  descripcion: "Producto 2 es una excelente opción para aquellos que buscan calidad y durabilidad. Con una construcción resistente y materiales de alta calidad, este producto durará por mucho tiempo."
  },
  {
  id: 31,
  nombre: "Producto 3",
  precio: 10.99,
  foto: "https://http2.mlstatic.com/D_NQ_NP_2X_615158-MLA46232793009_062021-V.webp",
  descripcion: "Producto 3 es perfecto para aquellos que buscan una solución económica y funcional. Con un diseño simple pero eficiente, este producto te ayudará a resolver tus necesidades sin tener que gastar demasiado."
  },
  {
  id: 42,
  nombre: "Producto 4",
  precio: 19.99,
  foto: "https://dobleclicknet.com/wp-content/uploads/2022/02/lieutenant-2.png",
  descripcion: "Producto 4 es una excelente opción para aquellos que buscan rendimiento y estilo. Con un diseño elegante y moderno, este producto te permitirá destacar entre la multitud mientras realizas tus actividades diarias."
  },
  {
  id: 52,
  nombre: "Producto 5",
  precio: 10.99,
  foto: "https://falabella.scene7.com/is/image/FalabellaCO/7590681_1?wid=800&hei=800&qlt=70",
  descripcion: "Producto 5 es una excelente opción para aquellosque buscan una solución práctica y funcional. Con un diseño ergonómico y materiales de alta calidad, este producto te permitirá realizar tus actividades diarias con mayor comodidad."

},
{
id: 62,
nombre: "Producto 6",
precio: 19.99,
foto: "https://www.alcarrito.com/media/catalog/product/1023/M-W-CW905-BL/ONIKUMA-CW905-6400-DPI-Wired-Gaming-Mouse-USB-yythk-1.png?width=600&height=600&canvas=600,600&optimize=medium&bg-color=255,255,255&fit=bounds&format=jpeg",
descripcion: "Producto 6 es perfecto para aquellos que buscan una experiencia de juego inmersiva y emocionante. Con una resolución de hasta 6,400 DPI y botones programables, este mouse te permitirá personalizar tu configuración de juego y obtener el máximo rendimiento en cada partida."
},
{
id: 72,
nombre: "Producto 7",
precio: 10.99,
foto: "https://jyrtechnology.com.co/wp-content/uploads/2020/10/MGJR-033-1.png",
descripcion: "Producto 7 es una opción versátil y funcional para aquellos que buscan un producto multiusos. Con características innovadoras y un diseño compacto, este producto te ayudará a simplificar tus tareas diarias y optimizar tu productividad."
},
{
id: 82,
nombre: "Producto 8",
precio: 19.99,
foto: "https://teknopolis.vtexassets.com/arquivos/ids/181286/Imagen-1.jpg?v=636857755012570000",
descripcion: "Producto 8 es una elección ideal para aquellos que buscan rendimiento y eficiencia. Con una velocidad de procesamiento rápida y un diseño elegante, este producto te permitirá realizar tus tareas con fluidez y estilo."
},
];

export default data;
