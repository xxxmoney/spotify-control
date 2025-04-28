import type { IElectronAPI } from '../../../shared/types';

export function useElectronAPI (): IElectronAPI {
  const api = window.api as IElectronAPI;

  return {
    ...api
  };
}
