const validatelogin = (values, file) => {
  const errors = {};

  if (!values.title) {
    errors.title = "Title is required";
  } else if (values.title.length < 10) {
    errors.title = "Title must be at least 10 characters";
  }

  if (!values.description) {
    errors.description = "Description is required";
  }

  return errors;
};

export default validatelogin;
