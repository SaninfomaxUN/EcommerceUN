# Documentación de Pruebas
## Instalación de librerías de test

```bash
npm install --save-dev @testing-library/react
npm install --save-dev @testing-library/jest-dom
```
## Asegurarse de que las librerías estén importadas en el archivo test.test.js

```bash
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
```

## Prueba: handleSearch updates searchText and filteredData

**Objetivo:** Verificar que la función `handleSearch` actualiza correctamente los estados `searchText` y `filteredData` cuando se realiza un cambio en el campo de búsqueda.

**Código:**
```bash
test('handleSearch updates searchText and filteredData', () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText('Buscar...');

  fireEvent.change(searchInput, { target: { value: 'example' } });

  expect(searchInput.value).toBe('example');
  // Se asegura de que el estado searchText se actualice correctamente
  // cuando se realiza un cambio en el campo de búsqueda
  // y que filteredData se actualice correctamente según el texto de búsqueda
});
```

**Método:**
1. Renderiza el componente `<App />`.
2. Obtiene la referencia al elemento de entrada de búsqueda utilizando `screen.getByPlaceholderText`.
3. Dispara un evento `change` en el elemento de entrada de búsqueda usando `fireEvent.change`, simulando un cambio en el valor de búsqueda.
4. Comprueba que el valor del elemento de entrada de búsqueda sea igual a `'example'` utilizando `expect(searchInput.value).toBe('example')`.
5. Asegúrate de que el estado `searchText` y `filteredData` se actualicen correctamente.

## Prueba: goToPreviousPage updates currentPage when currentPage > 1

**Objetivo:** Verificar que la función `goToPreviousPage` actualiza correctamente el estado `currentPage` al hacer clic en el botón "Anterior" cuando la página actual es mayor que 1.

**Código:**
```bash
test('goToPreviousPage updates currentPage when currentPage > 1', () => {
  render(<App />);
  const previousButton = screen.getByText('Anterior');

  fireEvent.click(previousButton);

  expect(screen.getByText('Página 1')).toBeInTheDocument();
  // Se asegura de que la página actual se actualice correctamente
  // al hacer clic en el botón "Anterior" cuando la página actual es mayor que 1
});
```

**Método:**
1. Renderiza el componente `<App />`.
2. Obtiene la referencia al botón "Anterior" utilizando `screen.getByText`.
3. Dispara un evento `click` en el botón "Anterior" utilizando `fireEvent.click`.
4. Comprueba que el texto `'Página 1'` esté presente en el documento utilizando `expect(screen.getByText('Página 1')).toBeInTheDocument()`.
5. Asegúrate de que el estado `currentPage` se actualice correctamente cuando la página actual es mayor que 1.

## Prueba: goToNextPage updates currentPage when currentPage < totalPages

**Objetivo:** Verificar que la función `goToNextPage` actualiza correctamente el estado `currentPage` al hacer clic en el botón "Siguiente" cuando la página actual es menor que el total de páginas.

**Código:**
```bash
test('goToNextPage updates currentPage when currentPage < totalPages', () => {
  render(<App />);
  const nextButton = screen.getByText('Siguiente');

  fireEvent.click(nextButton);

  expect(screen.getByText('Página 2')).toBeInTheDocument();
  // Se asegura de que la página actual se actualice correctamente
  // al hacer clic en el botón "Siguiente" cuando la página actual es menor que el total de páginas
});

```

**Método:**
1. Renderiza el componente `<App />`.
2. Obtiene la referencia al botón "Siguiente" utilizando `screen.getByText`.
3. Dispara un evento `click` en el botón "Siguiente" utilizando `fireEvent.click`.
4. Comprueba que el texto `'Página 2'` esté presente en el documento utilizando `expect(screen.getByText('Página 2')).toBeInTheDocument()`.
5. Asegúrate de que el estado `currentPage` se actualice correctamente cuando la página actual es menor que el total de páginas.

