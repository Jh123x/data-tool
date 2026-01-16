import { vi } from "vitest";

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
  }))
});

class stubResizeObserver {
  observe() { }
  unobserve() { }
  disconnect() { }
}

vi.stubGlobal("ResizeObserver", stubResizeObserver);

