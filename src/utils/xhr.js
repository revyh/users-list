function createError(url, request) {
  const error = new Error('Loading failed');

  error.url = url;
  error.status = request.status;
  error.statusText = request.statusText;

  return error;
}

export default function xhr(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.addEventListener(
      'load',
      () => {
        if (request.readyState === 4)
          if (request.status === 200)
            resolve(request.responseText);
          else
            reject(createError(url, request));
      },
    );

    request.addEventListener(
      'error',
      () => reject(createError(url, request)),
    );

    request.open('GET', url);
    request.send();
  });
}
