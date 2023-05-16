# SearchBar Component

El componente `SearchBar` es un componente utilizado para implementar una barra de búsqueda en la aplicación, con la caracteristica especial de que la barra realiza la busqueda en tiempo real.

## Propiedades

- `onSearch` (función, requerida): La función de búsqueda que se llamará cuando se realice un cambio en el campo de búsqueda. Recibe el texto de búsqueda como argumento.

## Implementación

El componente `SearchBar` utiliza el estado local para mantener el texto de búsqueda actual. Cuando se produce un cambio en el campo de búsqueda, se actualiza el estado y se llama a la función `onSearch` pasando el texto actualizado como argumento.
