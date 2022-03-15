import { getByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { servicesVersion } from 'typescript';
import ItemCount from './ItemCount';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => jest.fn(),
}));

test('Item count: adding items, checking amounts and buttons enabled', () => {
  render(<ItemCount stock={5} initial={1} onAdd={() => {}} />);
  const remove = screen.getByRole('button', { name: '-' });
  const add = screen.getByRole('button', { name: '+' });

  expect(screen.getByText('1')).toBeInTheDocument();
  expect(remove).toBeDisabled();
  expect(add).toBeEnabled();

  userEvent.click(add);
  expect(screen.getByText('2')).toBeInTheDocument();
  expect(remove).toBeEnabled();
  expect(add).toBeEnabled();

  userEvent.click(add);
  userEvent.click(add);
  userEvent.click(add);
  expect(screen.getByText('5')).toBeInTheDocument();
  expect(remove).toBeEnabled();
  expect(add).toBeDisabled();
});

test('testing no stock', () => {
  render(<ItemCount stock={0} initial={1} onAdd={() => {}} />);
  expect(screen.getByText('Sin Stock')).toBeInTheDocument();
});

test('with buy in the document', () => {
  render(<ItemCount stock={5} initial={1} onAdd={() => {}} withBuyNow />);
  expect(
    screen.getByRole('button', { name: /comprar ahora/i })
  ).toBeInTheDocument();
});

test('not buy now in the document', () => {
  render(<ItemCount stock={5} initial={1} onAdd={() => {}} />);
  expect(screen.queryByText(/comprar ahora/i)).not.toBeInTheDocument();
});
