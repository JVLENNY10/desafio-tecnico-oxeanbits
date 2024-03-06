import React from 'react';
import 'intersection-observer';
import Feed from './components/Feed';
import { act } from 'react-dom/test-utils';
import * as getFilmsService from './services/get';
import { render, screen, waitFor } from '@testing-library/react';

// Mock do módulo de serviço que faz a chamada da API
jest.mock('./services/get', () => ({
  getFilms: jest.fn(),
}));

beforeEach(() => {
  global.IntersectionObserver = class IntersectionObserver {
    constructor(callback) { this.callback = callback; }
    observe() { this.callback([{ isIntersecting: true }], this); }
    disconnect() { }
  };

  jest.clearAllMocks(); // Limpa os mocks antes de cada teste
});

afterEach(() => {
  global.IntersectionObserver = undefined;
});

describe('Feed Component', () => {
  it('Deve renderizar sem erros', async () => {
    getFilmsService.getFilms.mockResolvedValueOnce({ results: [] });

    await act(async () => {
      render(<Feed />);
    });

    await waitFor(() => expect(getFilmsService.getFilms).toHaveBeenCalledTimes(1));
  });

  it('Deve chamar getFilms na montagem', async () => {
    getFilmsService.getFilms.mockResolvedValueOnce({ results: [] });

    await act(async () => {
      render(<Feed />);
    });

    await waitFor(() => expect(getFilmsService.getFilms).toHaveBeenCalledTimes(1));
  });

  it('Deve exibir filmes após chamada de API bem-sucedida', async () => {
    const mockFilms = [{ title: 'Filme 1', poster_path: 'url1', adult: false, release_date: '2020-01-01' }];
    getFilmsService.getFilms.mockResolvedValueOnce({ results: mockFilms });

    await act(async () => {
      render(<Feed />);
    });

    await waitFor(() => expect(screen.getByText('Filme 1')).toBeInTheDocument());
  });
});
