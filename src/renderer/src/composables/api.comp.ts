import type { ElectronUserAPI } from '../../../shared/types';

export function useElectronAPI (): ElectronUserAPI {
  const api = window.api as ElectronUserAPI;

  return {
    ...api
  };
}
