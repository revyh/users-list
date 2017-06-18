let loadingPromise;

export default function waitPageLoad() {
  if (loadingPromise != null)
    return loadingPromise;

  loadingPromise = document.readyState === 'complete'
    ? Promise.resolve()
    : new Promise(resolve => global.addEventListener('load', resolve));

  return loadingPromise;
}
