const generate = require('csv-generate')

const { Transform } = require('stream');

const reportProgress = new Transform({
  transform(chunk, encoding, callback) {
    process.stdout.write(chunk.toString());
    process.stdout.write('\n');
    callback(null, chunk);
  }
});

generate({
  columns: ['int', 'bool'],
  length: 2
})
.pipe(reportProgress)
.pipe(process.stdout);


