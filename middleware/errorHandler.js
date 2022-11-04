function handleErrors(err, req, res, next) {
  let error = {
    statusCode: err.statusCode || 500,
    msg: err.msg || 'Something went wrong',
  };



  if (err.code && err.code === 11000) {
    error.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )}. Please choose another value`;
    error.statusCode = 400;
  }
  if (err.name === 'ValidationError') {
    error.msg = Object.values(err.errors)
      .map((err) => err.message)
      .join(', ');
    error.statusCode = 400;
  }
  if (err.name === 'CastError') {
    error.msg = `No item found with Id : ${err.value}`;
    error.statusCode = 404;
  }


  return res.status(error.statusCode).json({ msg: error.msg });
}

module.exports = handleErrors;
