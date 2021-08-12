const AWS = require('aws-sdk');
const { v4 } = require('uuid');

const createTask = async event => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { title } = JSON.parse(event.body);

  const newTask = {
    title: title,
    id: v4(),
    createdAt: new Date().toISOString(),
    done: false
  };

  await dynamodb
    .put({
      TableName: 'TaskTable',
      Item: newTask
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify(newTask)
  };
};

module.exports = {
  createTask
};
