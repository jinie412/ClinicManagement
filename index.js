const express = require('express');
const path = require('path');
const app = express();
const indexRouter = require('./app/routers/routerMain');

app.use('/public', express.static(path.join(__dirname, 'public')));

// Sử dụng router cho các yêu cầu đến '/'
app.use('/', indexRouter);

// Thiết lập cổng và khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});