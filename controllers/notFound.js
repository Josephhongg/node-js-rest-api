/**
 * this file handles the
 * response when no REST API
 * data is returned
 */
const BASE_URL = "api";
const notFound = async (req, res) =>
  res.status(404).json({ 
    success: false, 
    msg: `${BASE_URL} is not found` 
});

export { notFound };