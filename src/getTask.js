const AWS = require('aws-sdk');

const getTask = async event => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  let task;

  try {
    const result = await dynamodb.get({ id }).promise();
    task = result.Item;
  } catch (error) {
    console.log(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(task)
  };
};

module.exports = {
  getTask
};
