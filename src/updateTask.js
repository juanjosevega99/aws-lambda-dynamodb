const AWS = require('aws-sdk');

const updateTask = async event => {
  const dynamodb = AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  const { done } = JSON.parse(event.body);

  try {
    await dynamodb.get({
      TableName: 'TaskTable',
      Key: {
        id
      },
      UpdateExpression: 'set done = :done',
      ExpressionAttributeValues: {
        ':done': done
      },
      RETURN_VALUES: 'ALL_NEW'
    });
  } catch (error) {
    console.log(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Task updated' })
  };
};

module.exports = {
  updateTask
};
