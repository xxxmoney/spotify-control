import type { IElectronAPI } from './sharedTypes';

export function useElectronAPI (): IElectronAPI {
  const api = window.api as IElectronAPI;

  return {
    ...api
  };
}
