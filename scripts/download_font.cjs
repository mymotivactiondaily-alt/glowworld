const https = require('https');
const fs = require('fs');

const file = fs.createWriteStream("scripts/DejaVuSans.ttf");
https.get("https://github.com/dejavu-fonts/dejavu-fonts/raw/master/ttf/DejaVuSans.ttf", function(response) {
  if (response.statusCode === 301 || response.statusCode === 302) {
    https.get(response.headers.location, function(redirectRes) {
      redirectRes.pipe(file);
      file.on('finish', function() {
        file.close();
        console.log("Downloaded");
      });
    });
  } else {
    response.pipe(file);
    file.on('finish', function() {
      file.close();
      console.log("Downloaded");
    });
  }
});
