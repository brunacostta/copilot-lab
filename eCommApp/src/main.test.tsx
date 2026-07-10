import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockRender = vi.fn();
const mockCreateRoot = vi.fn();

vi.mock('react-dom/client', () => ({
  default: {
    createRoot: mockCreateRoot,
  },
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

vi.mock('./App.tsx', () => ({
  default: () => <div>App Component</div>,
}));

describe('main', () => {
  beforeEach(() => {
    mockCreateRoot.mockReset();
    mockRender.mockReset();
    document.body.innerHTML = '<div id="root"></div>';
  });

  it('renders the app into the root element', async () => {
    mockCreateRoot.mockReturnValue({ render: mockRender });

    await import('./main');

    expect(mockCreateRoot).toHaveBeenCalledWith(document.getElementById('root'));
    expect(mockRender).toHaveBeenCalled();
  });
});
