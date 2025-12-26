const STORAGE_KEY = "data";
const TEST_KEY = "__storage_test__";

// Check if localStorage is available and usable
const storageAvailable = () => {
  try {
    localStorage.setItem(TEST_KEY, TEST_KEY);
    localStorage.removeItem(TEST_KEY);
    return true;
    
  } catch (e) {
    return !(e instanceof DOMException && e.name === "QuotaExceededError");
  }
};

// Safely parse JSON
const safeParse = (raw) => {
  try { return JSON.parse(raw); }
  catch { return {}; }
};

// Retrieve parsed storage data safely
const getStorageData = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? safeParse(raw) : {};
};

// Save structured data into storage
const setStorageData = (data) => {
  if ( !storageAvailable() ) {
    console.warn("localStorage is not available");
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save data to localStorage:", e);
  }
};

export { getStorageData, setStorageData };