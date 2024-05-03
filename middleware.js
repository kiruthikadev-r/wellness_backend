const express = require('express');

function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
}

function requestLogger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

module.exports = { errorHandler, requestLogger };
