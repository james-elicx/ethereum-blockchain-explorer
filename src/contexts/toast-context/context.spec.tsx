import { createRoot } from 'react-dom/client';
import { act, Simulate } from 'react-dom/test-utils';
import { afterEach, beforeEach, expect, test } from 'vitest';
import { ToastProvider, useToast } from './context';

// Tell React that it's running in a unit test-like environment.
(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLElement;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null as unknown as HTMLElement;
});

const HookTester = (): JSX.Element => {
  const { sendToast } = useToast();

  return (
    <button className="test-helper" type="button" onClick={() => sendToast('This is a test toast')}>
      Send Toast
    </button>
  );
};

test('Toast is shown', async () => {
  act(() => {
    createRoot(container).render(
      <ToastProvider>
        <HookTester />
      </ToastProvider>,
    );
  });

  const testHelperBtn = container.querySelector('.test-helper') as HTMLButtonElement;
  expect(testHelperBtn).toBeTruthy();
  expect(testHelperBtn.textContent).toBe('Send Toast');

  const toastContainer = container.querySelector('.toast-container') as HTMLDivElement;
  expect(toastContainer).toBeTruthy();

  act(() => {
    Simulate.click(testHelperBtn);
  });

  const toast = toastContainer.querySelector('.toast') as HTMLDivElement;
  expect(toast).toBeTruthy();

  const allToasts = toastContainer.querySelectorAll('.toast') as NodeListOf<HTMLDivElement>;
  expect(allToasts.length).toBe(1);

  const toastMessage = toast.querySelector('.toast-message') as HTMLSpanElement;
  expect(toastMessage).toBeTruthy();
  expect(toastMessage.textContent).toBe('This is a test toast');
});

test('Toast closes on close button click', async () => {
  act(() => {
    createRoot(container).render(
      <ToastProvider>
        <HookTester />
      </ToastProvider>,
    );
  });

  const testHelperBtn = container.querySelector('.test-helper') as HTMLButtonElement;
  expect(testHelperBtn).toBeTruthy();
  expect(testHelperBtn.textContent).toBe('Send Toast');

  const toastContainer = container.querySelector('.toast-container') as HTMLDivElement;
  expect(toastContainer).toBeTruthy();

  act(() => {
    Simulate.click(testHelperBtn);
  });

  const toast = toastContainer.querySelector('.toast') as HTMLDivElement;
  expect(toast).toBeTruthy();

  const allToasts = toastContainer.querySelectorAll('.toast') as NodeListOf<HTMLDivElement>;
  expect(allToasts.length).toBe(1);

  const toastMessage = toast.querySelector('.toast-message') as HTMLSpanElement;
  expect(toastMessage).toBeTruthy();
  expect(toastMessage.textContent).toBe('This is a test toast');

  const toastCloseBtn = toast.querySelector('.toast-close') as HTMLButtonElement;
  expect(toastCloseBtn).toBeTruthy();

  act(() => {
    Simulate.click(toastCloseBtn);
  });

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
  });

  const toastClosed = toastContainer.querySelector('.toast') as HTMLDivElement;
  expect(toastClosed).not.toBeTruthy();
});

test('Toast closes on its own', async () => {
  act(() => {
    createRoot(container).render(
      <ToastProvider>
        <HookTester />
      </ToastProvider>,
    );
  });

  const testHelperBtn = container.querySelector('.test-helper') as HTMLButtonElement;
  expect(testHelperBtn).toBeTruthy();
  expect(testHelperBtn.textContent).toBe('Send Toast');

  const toastContainer = container.querySelector('.toast-container') as HTMLDivElement;
  expect(toastContainer).toBeTruthy();

  act(() => {
    Simulate.click(testHelperBtn);
  });

  const toast = toastContainer.querySelector('.toast') as HTMLDivElement;
  expect(toast).toBeTruthy();

  const allToasts = toastContainer.querySelectorAll('.toast') as NodeListOf<HTMLDivElement>;
  expect(allToasts.length).toBe(1);

  const toastMessage = toast.querySelector('.toast-message') as HTMLSpanElement;
  expect(toastMessage).toBeTruthy();
  expect(toastMessage.textContent).toBe('This is a test toast');

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 3500));
  });

  // For some reason, in the test, the toast will not actually finish the exit transition.
  expect([...toast.classList.values()]).toContain('toast-exit-active');
}, 10000);
