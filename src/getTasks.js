const AWS = require('aws-sdk');

const getTasks = async event => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  let tasks;

  try {
    const result = await dynamodb.scan().promise;
    tasks = result.Items;
  } catch (error) {
    console.log(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(tasks)
  };
};

module.exports = {
  getTasks
};
