
import { PrdResponse, SavedPrd } from '../types';

const STORAGE_KEY = 'prd_history';
const PRD_TO_VIEW_KEY = 'prd_to_view';

export const savePrd = (prd: PrdResponse, parentId?: string): SavedPrd => {
  const history = getPrds();
  const now = new Date().toISOString();
  
  // If it's an update to an existing PRD, increment version
  let version = 1;
  if (parentId) {
    const parent = getPrdById(parentId);
    if (parent) {
      version = parent.version + 1;
    }
  }
  
  const newPrd: SavedPrd = {
    ...prd,
    id: now,
    createdAt: parentId ? (getPrdById(parentId)?.createdAt || now) : now,
    updatedAt: now,
    version,
    parentId,
    tags: [],
  };
  history.unshift(newPrd);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  return newPrd;
};

export const getPrds = (): SavedPrd[] => {
  const storedHistory = localStorage.getItem(STORAGE_KEY);
  return storedHistory ? JSON.parse(storedHistory) : [];
};

export const getPrdById = (id: string): SavedPrd | undefined => {
  const history = getPrds();
  return history.find(p => p.id === id);
}

export const setPrdForViewing = (id: string) => {
  localStorage.setItem(PRD_TO_VIEW_KEY, id);
};

export const getPrdForViewing = (): SavedPrd | undefined => {
  const id = localStorage.getItem(PRD_TO_VIEW_KEY);
  if (!id) return undefined;

  const prd = getPrdById(id);
  localStorage.removeItem(PRD_TO_VIEW_KEY); // Clear after reading
  return prd;
};
