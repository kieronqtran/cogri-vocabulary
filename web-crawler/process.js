const fs = require('fs');
const jsonStream = require('JSONStream');
const writeStream = fs.createWriteStream('doneList.json',)

writeStream
  .pipe(jsonStream.stringify())

modules.export = async (job) => {
  const data = job.data;
  const response = await fetch(url, {
    method: 'post',
    body:    JSON.stringify({word: data}),
    headers: { 'Content-Type': 'application/json' }
  });
  const body = await response.json()
  console.log(body);
  console.log(`Crawling ${data} successful`);
  writeStream.write(data);
};
