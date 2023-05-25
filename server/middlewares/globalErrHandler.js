const globalErrHandler = (err, req, res, next) => {
    console.log(err);
    const stack = err.stack;
    const message = err.message;
    const stutus = err.stutus ? err.stutus : "Failed";
    const stutusCode = err.stutusCode ? err.stutusCode : 500;
    res.status(stutusCode).json({
      stutus,
      message,
      stutusCode,
    //   stack,
    })
  };

//   not Found 
const notFoundErr = (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on the server`)
    next(err)
}

  module.exports = {globalErrHandler, notFoundErr}