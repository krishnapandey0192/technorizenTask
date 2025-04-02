export const sendResponse = (res, isSuccess, statusCode, message, data) => {
    res.status(statusCode).json({
      isSuccess,
      message,
      data,
    });
  };
  