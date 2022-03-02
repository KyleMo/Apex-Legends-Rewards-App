const express = require('express');

app.get('/',function(req,res) {
  res.sendFile('/Users/kylemonstad/Desktop/GamingProject/views/pages/Homepage.html')
});
