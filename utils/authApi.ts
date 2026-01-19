// Minimal stub implementations for local development and to satisfy imports.
export const createDelivery = async (payload: any) => {
  // If FormData, return a mocked delivery id
  const id = `del_${Date.now()}`;
  return { deliveryId: id, id, data: { id } };
};

export const isAuthenticated = () => {
  // Default to true for local dev; real app should implement proper auth check
  try {
    return Boolean(typeof window !== 'undefined' && window.localStorage && window.localStorage.getItem('auth_token'));
  } catch (e) {
    return false;
  }
};

export const cancelDelivery = async (id: string, opts?: any) => {
  // no-op stub
  return { success: true };
};

export default { createDelivery, isAuthenticated, cancelDelivery };
