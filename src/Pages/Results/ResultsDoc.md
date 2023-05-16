# App Component

---

## **Aclaraciones:** 
1. *Un `hook` en React es una función que permite agregar características especiales a los componentes funcionales. useState es un hook específico que permite agregar y manejar estado en componentes funcionales de React.*
2. *La implementación de la app está sujeta a cambios posteriores debido a la próxima implementación de la API para la consulta de los datos y el servicio específico de las cards para traer la información.*

---



El componente `App.js` es el componente principal de la aplicación. Es responsable de renderizar la interfaz de la aplicación y manejar la lógica de búsqueda y paginación.

## Estructura de la Aplicación

La estructura de la aplicación se compone de los siguientes elementos:

- `SearchBar`: Un componente utilizado para realizar búsquedas de productos en tiempo real.
- `Card`: Un componente utilizado para renderizar las tarjetas de productos.
- `Footer`: Un componente utilizado para mostrar el pie de página.
- `data`: Un arreglo de objetos que contiene los datos de los productos (sujeto a cambios en el futuro con la implementación de la API y el servicio específico para esta vista).
- Estilos CSS para dar formato a la aplicación.

## Lógica de la Paginación

La paginación permite mostrar los productos en múltiples páginas. La lógica de la paginación se encuentra implementada en el componente `App` y se basa en los siguientes conceptos:

- `searchText`: Un estado que almacena el texto de búsqueda ingresado por el usuario.
- `filteredData`: Un estado que almacena los datos filtrados de acuerdo al texto de búsqueda.
- `cardsLimit`: Un estado que define la cantidad de tarjetas de productos que se mostrarán por página.
- `currentPage`: Un estado que indica la página actual que se está mostrando.

El flujo de funcionamiento de la paginación es el siguiente:

1. Dentro del componente App, se definen los estados `searchText`, `filteredData`, `cardsLimit` y `currentPage` utilizando el hook `useState`.

2. El usuario ingresa un texto de búsqueda en el componente `SearchBar`, lo cual desencadena la función `handleSearch`.

3. La función `handleSearch` actualiza el estado `searchText` con el texto de búsqueda ingresado y reinicia el estado `currentPage` a 1.

4. Se filtran los datos en base al texto de búsqueda ingresado utilizando el método `filter` sobre el arreglo `data`. Los datos filtrados se asignan al estado `filteredData`.

5. En la interfaz, se muestra la página actual de productos utilizando el método `slice` sobre `filteredData` y los estados `currentPage` y `cardsLimit`.

6. El usuario puede navegar entre las páginas utilizando los botones "Anterior" y "Siguiente". Al hacer clic en estos botones, se actualiza el estado `currentPage` de acuerdo a la página seleccionada y se muestra la nueva página de productos en la interfaz.

7. En la interfaz, se muestra:
   - El encabezado de la aplicación con botones de navegación(Están pendientes de linkear a otras vistas, se realizará en una reunión con el equipo de desarrollo).
   - El componente `SearchBar` para realizar búsquedas.
   - El contenedor de tarjetas de productos con la lógica de paginación utilizando el método `slice` sobre `filteredData` y los estados `currentPage` y `cardsLimit`.
   - Los controles de paginación para navegar entre las páginas de productos.

8. Finalmente, se muestra el componente `Footer` que contiene el pie de página de la aplicación. (Que aún está pendiente de información)


