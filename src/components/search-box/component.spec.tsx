import { createRoot } from 'react-dom/client';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { act, Simulate } from 'react-dom/test-utils';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { ToastProvider } from '../../contexts';
import { SearchBox } from './component';

// Tell React that it's running in a unit test-like environment.
(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLElement;

const navigateMock = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: () => navigateMock,
}));

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null as unknown as HTMLElement;
  vi.clearAllMocks();
});

test('Can input into the search box', () => {
  act(() => {
    createRoot(container).render(
      <ToastProvider>
        <SearchBox />
      </ToastProvider>,
    );
  });

  const searchBox = container.querySelector('.search-box-input') as HTMLInputElement;
  expect(searchBox).toBeTruthy();
  expect(searchBox.textContent).toBe('');

  act(() => {
    searchBox.value = '1243282';
    Simulate.change(searchBox);
  });

  expect(searchBox.value).toBe('1243282');
});

test('Invalid input displays a toast', () => {
  act(() => {
    createRoot(container).render(
      <ToastProvider>
        <SearchBox />
      </ToastProvider>,
    );
  });

  const searchBox = container.querySelector('.search-box-input') as HTMLInputElement;
  expect(searchBox).toBeTruthy();
  expect(searchBox.textContent).toBe('');

  act(() => {
    searchBox.value = 'not_a_valid_input';
    Simulate.change(searchBox);
  });

  expect(searchBox.value).toBe('not_a_valid_input');

  const searchBtn = container.querySelector('.search-box-btn') as HTMLButtonElement;

  act(() => {
    Simulate.click(searchBtn);
  });

  const toast = document.querySelector('.toast') as HTMLDivElement;
  expect(toast).toBeTruthy();

  const toastMsg = document.querySelector('.toast-message') as HTMLDivElement;
  expect(toastMsg).toBeTruthy();
  expect(toastMsg.textContent).toBe('Invalid search term.');
});

test('Searching for a valid transaction triggers a redirects', () => {
  act(() => {
    createRoot(container).render(
      <ToastProvider>
        <SearchBox />
      </ToastProvider>,
    );
  });

  const searchBox = container.querySelector('.search-box-input') as HTMLInputElement;
  expect(searchBox).toBeTruthy();
  expect(searchBox.textContent).toBe('');

  const tx = '0x0285d863dca44545e4c0938b739e50b3c028960183946ae6881e69b317ed56a0';

  act(() => {
    searchBox.value = tx;
    Simulate.change(searchBox);
  });

  expect(searchBox.value).toBe(tx);

  const searchBtn = container.querySelector('.search-box-btn') as HTMLButtonElement;

  act(() => {
    Simulate.click(searchBtn);
  });

  expect(navigateMock).toBeCalled();
  expect(navigateMock).lastCalledWith(`/tx/${tx}`);
});

test('Searching for a valid address triggers a redirects', () => {
  act(() => {
    createRoot(container).render(
      <ToastProvider>
        <SearchBox />
      </ToastProvider>,
    );
  });

  const searchBox = container.querySelector('.search-box-input') as HTMLInputElement;
  expect(searchBox).toBeTruthy();
  expect(searchBox.textContent).toBe('');

  const address = '0x52120cc1db2d69d235556ad0ebafe1dab99a2913';

  act(() => {
    searchBox.value = address;
    Simulate.change(searchBox);
  });

  expect(searchBox.value).toBe(address);

  const searchBtn = container.querySelector('.search-box-btn') as HTMLButtonElement;

  act(() => {
    Simulate.click(searchBtn);
  });

  expect(navigateMock).toBeCalled();
  expect(navigateMock).lastCalledWith(`/address/${address}`);
});

test('Searching for a valid block triggers a redirects', () => {
  act(() => {
    createRoot(container).render(
      <ToastProvider>
        <SearchBox />
      </ToastProvider>,
    );
  });

  const searchBox = container.querySelector('.search-box-input') as HTMLInputElement;
  expect(searchBox).toBeTruthy();
  expect(searchBox.textContent).toBe('');

  const block = '14308056';

  act(() => {
    searchBox.value = block;
    Simulate.change(searchBox);
  });

  expect(searchBox.value).toBe(block);

  const searchBtn = container.querySelector('.search-box-btn') as HTMLButtonElement;

  act(() => {
    Simulate.click(searchBtn);
  });

  expect(navigateMock).toBeCalled();
  expect(navigateMock).lastCalledWith(`/block/${block}`);
});
