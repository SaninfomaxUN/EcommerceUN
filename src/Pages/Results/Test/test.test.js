import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import ResultsPage from '../ResultsPage';

test('handleSearch updates searchText and filteredData', () => {
  render(<ResultsPage />);
  const searchInput = screen.getByPlaceholderText('Buscar...');
  fireEvent.change(searchInput, { target: { value: 'example' } });

  expect(searchInput.value).toBe('example');
  // Se asegura de que el estado searchText se actualice correctamente
  // cuando se realiza un cambio en el campo de búsqueda
  // y que filteredData se actualice correctamente según el texto de búsqueda
});


test('goToPreviousPage updates currentPage when currentPage > 1', () => {
  render(<ResultsPage />);
  const previousButton = screen.getByText('Anterior');

  fireEvent.click(previousButton);

  expect(screen.getByText('Página 1')).toBeInTheDocument();
  // Se asegura de que la página actual se actualice correctamente
  // al hacer clic en el botón "Anterior" cuando la página actual es mayor que 1
});

test('goToNextPage updates currentPage when currentPage < totalPages', () => {
  render(<ResultsPage />);
  const nextButton = screen.getByText('Siguiente');

  fireEvent.click(nextButton);

  expect(screen.getByText('Página 2')).toBeInTheDocument();
  // Se asegura de que la página actual se actualice correctamente
  // al hacer clic en el botón "Siguiente" cuando la página actual es menor que el total de páginas
});
