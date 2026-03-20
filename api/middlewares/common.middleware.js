export function validateId(req, res, next) {
  const id = parseInt(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }
  next();
}

export function errorHandler(err, req, res, next) {
  res.status(500).json({
    error: true,
    message: err.message,
    details: err.stack,
  });
  next();
}
