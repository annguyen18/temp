export const RESPONSE_STATUS = {
  SUCCESS: 200,
  FAIL: [
      401, // Unauthenticated
      403, // No permission
  ],
};

export const LOCAL_STORAGE_AUTH = 'AUTH';