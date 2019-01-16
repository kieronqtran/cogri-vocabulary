const setup = require('./starter-kit/setup');

const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

exports.handler = async (event, context) => {
  // For keeping the browser launch
  context.callbackWaitsForEmptyEventLoop = false;
  const browser = await setup.getBrowser();
  try {
    console.log('context', context);
    console.log('event', event);
    const result = await exports.run(browser, event);
    return result;
  } catch (e) {
    throw e;
  }
};

exports.run = async (browser, context) => {
  let pageOne;
  try {
    // const word = context.word;
    const word = "microsoft";

    // PAGE 1
    pageOne = await browser.newPage();
    await pageOne.goto('https://dictionary.cambridge.org/dictionary/english-vietnamese',
      {waitUntil: ['domcontentloaded']}
    );

    await pageOne.type('#cdo-search-input', word);

    // await pageOne.click('.cdo-search__button');
    await pageOne.keyboard.press('Enter');
    // await pageOne.evaluate(() => {
    //   // this code works fine as well.
    //   const element = document.querySelector('.cdo-search__button');
    //   console.log(element);
    //   // I can click on the button with the following line.
    //   element.click();
    //   return true;
    // });
    await Promise.all([
      pageOne.waitForNavigation(),
    ]);

    await pageOne.waitFor('span.trans')
      .catch(err => {});
    const elementsOne = await pageOne.$$('span.def-body')
      .catch(err => {});

    let samples = [];
    let vietnameseMeaning = '';

    if (elementsOne != null){
      if (elementsOne[0] != null){
        const firstElementOne = elementsOne[0];

        const transOne = await firstElementOne
          .$eval('span.trans', (element) => element.innerHTML)
          .catch(err => console.log(err));

        if (transOne != null){
          vietnameseMeaning = transOne.trim();
        }

        const rawExampleOne = await firstElementOne
          .$eval('div.examp.emphasized > span.eg',
            (element) => element.innerHTML)
          .catch(err => console.log(err));

        let sampleSentenceOne = '';
        if (rawExampleOne != null){
          sampleSentenceOne = rawExampleOne.replace(/<\/?[^>]+(>|$)/g, '');
          samples.push(sampleSentenceOne);
        }
      }

      if (elementsOne[1] != null){
        const secondElementOne = elementsOne[1];

        const rawExampleTwo = await secondElementOne
          .$eval('div.examp.emphasized > span.eg',
            (element) => element.innerHTML)
          .catch(err => console.log(err));

        let sampleSentenceTwo = '';
        if (rawExampleTwo != null){
          sampleSentenceTwo = rawExampleTwo
            .replace(/<\/?[^>]+(>|$)/g, '');
          samples.push(sampleSentenceTwo);
        }
      }
    }


    // console.log(firstElementOne);
    // debugger;
    // const document = element[0];
    // const data = document.innerHTML.trim();
    /* screenshot
      await page.screenshot({path: '/tmp/screenshot.png'});
      const aws = require('aws-sdk');
      const s3 = new aws.S3({apiVersion: '2006-03-01'});
      const fs = require('fs');
      const screenshot = await new Promise((resolve, reject) => {
        fs.readFile('/tmp/screenshot.png', (err, data) => {
          if (err) return reject(err);
          resolve(data);
        });
      });
      await s3.putObject({
        Bucket: '<bucket name>',
        Key: 'screenshot.png',
        Body: screenshot,
      }).promise();
    */

    // cookie and localStorage
    // await page.setCookie({name: 'name', value: 'cookieValue'});
    // console.log(await page.cookies());
    // console.log(await page.evaluate(() => {
    //   localStorage.setItem('name', 'localStorageValue');
    //   return localStorage.getItem('name');
    // }));
    // console.log(data);
    // await pageOne.close();

    // PAGE 2
    const pageTwo = await browser.newPage();
    await pageTwo.goto('http://www.synonym-finder.com',
      {waitUntil: ['domcontentloaded']}
    );

    await pageTwo.type('#edit-name', word);
    await pageTwo.keyboard.press('Enter');
    await Promise.all([
      pageTwo.waitForNavigation(),
    ]);

    let similar = [];

    // await pageTwo.screenshot({path: '/tmp/screenshot.png'});
    const found = await pageTwo.waitFor('span.hypernym-lemmas')
      .catch(error => {});

    if (found != null){
      const elementsTwo = await pageTwo.$$('span.hypernym-lemmas')
        .catch(error => {});

      if (elementsTwo != null){
        const firstElementTwo = elementsTwo[0];
        const synonym = await firstElementTwo
          .$eval('a', (element) => element.innerHTML)
          .catch(error => {});

        if (synonym != null){
          similar.push(synonym);
        }

      }

    }

    // await pageTwo.close();

    const result = {
      'word': word,
      'vietnameseMeaning': vietnameseMeaning,
      'similarWords': similar,
      'examples': samples,
    };

    const str = JSON.stringify(result);
    console.log(str);

    const params = {
      DelaySeconds: 0,
      MessageAttributes: {
        'Title': {
          DataType: 'String',
          StringValue: 'Add New Word',
        },
        'Value': {
          DataType: 'String',
          StringValue: ${str},
        },
      },
      MessageDeduplicationId: word,
      MessageGroupId: 'Crawling',
      MessageBody: 'New Word Added',
      QueueUrl: 'https://sqs.us-east-1.amazonaws.com/553559550642/insert-word.fifo',
    };

    if (vietnameseMeaning != ''){
      const response = await sqs.sendMessage(params).promise();
      return response;
    }
    else {
      return 'Cannot find word';
    }

  } catch (e) {
    console.error(e);

    await pageOne.screenshot({path: '/tmp/screenshot.png'});
    const aws = require('aws-sdk');
    const s3 = new aws.S3({apiVersion: '2006-03-01'});
    const fs = require('fs');
    const screenshot = await new Promise((resolve, reject) => {
      fs.readFile('/tmp/screenshot.png', (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
    await s3.putObject({
      Bucket: 'cloud-computing-asm3/error',
      Key: 'screenshot.png',
      Body: screenshot,
    }).promise();

    const dumpHtml = await pageOne.content();

    await s3.putObject({
      Bucket: 'cloud-computing-asm3/error',
      Key: 'screenshot.png',
      Body: screenshot,
      ContentType: 'image/png',
    }).promise();

    await s3.putObject({
      Bucket: 'cloud-computing-asm3/error',
      Key: 'dump.html',
      Body: dumpHtml,
      ContentType: 'text/html charset=utf-8',
    }).promise();

    throw e;
  }
};
