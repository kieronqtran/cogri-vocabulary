const fs = require('fs');
// const Queue = require('bull')
const fetch = require('node-fetch')
const axios = require('axios');
// const cluster = require('cluster')
//
// const jsonStream = require('JSONStream');
// const writeStream = fs.createWriteStream('doneList.json',)
//
// const bull = new Queue('WordCrawler');
//
// const process = 1;
//
// const url = 'https://jt7rncob6h.execute-api.us-east-1.amazonaws.com/2ndDeploy/crawler';
//
// if(cluster.isMaster){
//
//   const wordListtxt = fs.readFileSync('word-list.txt', { encoding: 'utf8'});
//   const wordList = wordListtxt.split('\n');
//   console.log('word list length: ', wordList.length);
//
//   for (var i = 0; i < process; i++) {
//     cluster.fork();
//   }
//
//   for (const id in cluster.workers) {
//
//     cluster.workers[id].on('message', (msg) => {
//       console.log(msg);
//     });
//   }
//
//   cluster.on('online', function(worker) {
//     // Lets create a few jobs for the queue workers
//     console.log('Word');
//     bull.add(wordList[0]).then((data) => {
//
//       writeStream.write(data + '\n');
//     });
//   });
//
//   bull.on('error', (err)=> {
//     console.error(err);
//   })
//
//   cluster.on('exit', function(worker, code, signal) {
//     console.log('worker ' + worker.process.pid + ' died');
//   });
// }else{
//   bull.process(async function(job){
//     const data = job.data;
//     process.send('Working on ' + data);
//     process.send("Job done by worker" + cluster.worker.id + job.id);
//     const response = await fetch(url, {
//       method: 'post',
//       body:    JSON.stringify({word: data}),
//       headers: { 'Content-Type': 'application/json' }
//     });
//     const body = await response.json()
//     process.send(body);
//     process.send(`Crawling ${data} successful`);
//     return job.data;
//   });
// }
var
  Queue = require('bull'),
  cluster = require('cluster');

var numWorkers = 20;
var queue = new Queue("test concurrent queue", { });

const url = 'https://jt7rncob6h.execute-api.us-east-1.amazonaws.com/2ndDeploy/crawler';

queue.process( async function(job){
  console.log('jobdata', job.data);
  return axios.post(url,{
    "word": job.data.value
  },{

    headers: {'Content-Type': 'application/json'},
  }).then(res => {
    console.log(res.data);
    return job.data;
  });
});

if(cluster.isMaster){

  const wordListtxt = fs.readFileSync('part3.txt', { encoding: 'utf8'});
  const wordList = wordListtxt.split('\n');
  // console.log('word list length: ', wordList);

  for (var i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  queue.on('completed', (job) => {
    console.log('completed',job);
  })
  cluster.on('online', function(worker) {
    // Lets create a few jobs for the queue workers
  });

  wordList.forEach(e => {
    const word = { value: e };
    queue.add(word, { removeOnComplete: true }).catch(err => console.error(err));
  })

    // queue.add({value: 'tree'}, { removeOnComplete: true }).catch(err => console.error(err));
  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
}

