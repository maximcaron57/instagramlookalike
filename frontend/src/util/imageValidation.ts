export const validateBase64Image = (value) => {
  let error;

  if (!value) return error;

  if (
    !/^data:image\/(?:png|jpeg)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/.test(
      value.substring(0, 50)
    )
  ) {
    error = 'Invalid avatar (PNG or JPG only)';
  } else if (value.length > 5872026) {
    error = 'File too large (4MB max)';
  }

  return error;
};
