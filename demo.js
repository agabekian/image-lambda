/*
  In express, this happens
  app.get('/something', handler);

  In socket apps, this happens
  socket.on('alert', handler)

  At AWS, this happens:
  aws.on('S3 upload', handler);
  aws.on('EB deploy success', handler)

*/