export const saveLocalStorage = (data, key) => {
  const dataJson = JSON.stringify(data);
  localStorage.setItem(key, dataJson);
};

export const getLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};
