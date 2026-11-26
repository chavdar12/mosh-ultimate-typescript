import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

function mockFetch() {
  const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
    if (init?.method === 'POST') {
      return new Response(JSON.stringify({ id: 201, ...JSON.parse(init.body as string) }), {
        status: 201,
      });
    }
    if (init?.method === 'DELETE') return new Response('{}');
    return new Response(
      JSON.stringify([
        { id: 1, title: 'Buy milk' },
        { id: 2, title: 'Call mom' },
      ]),
    );
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

describe('Reminders app', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('loads reminders from the backend', async () => {
    mockFetch();
    render(<App />);
    expect(await screen.findByText('Buy milk')).toBeTruthy();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('adds a reminder through the form', async () => {
    const fetchMock = mockFetch();
    render(<App />);
    await screen.findByText('Buy milk');
    await userEvent.type(screen.getByLabelText('Title'), 'Walk the dog');
    await userEvent.click(screen.getByRole('button', { name: 'Add Reminder' }));
    expect(await screen.findByText('Walk the dog')).toBeTruthy();
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/todos'),
      expect.objectContaining({ method: 'POST' }),
    );
    expect((screen.getByLabelText('Title') as HTMLInputElement).value).toBe('');
  });

  it('removes a reminder', async () => {
    const fetchMock = mockFetch();
    render(<App />);
    await screen.findByText('Buy milk');
    await userEvent.click(screen.getAllByRole('button', { name: 'Delete' })[0]);
    expect(screen.queryByText('Buy milk')).toBeNull();
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('/todos/1'), {
      method: 'DELETE',
    });
  });

  it('shows an error when loading fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response('', { status: 500 })),
    );
    render(<App />);
    expect(await screen.findByText('Loading reminders failed: 500')).toBeTruthy();
  });
});
