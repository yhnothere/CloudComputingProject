import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand , ScanCommand } from  "@aws-sdk/lib-dynamodb";

function createDocClient() {
  const client = new DynamoDBClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.DYNAMO_ACCESS_KEY,
      secretAccessKey: process.env.DYNAMO_SECRET_KEY,
      sessionToken: process.env.DYNAMO_SESSION_TOKEN,
    },
  });

  return DynamoDBDocumentClient.from(client);
}

export async function getBean(bean_id) {
    const docClient = createDocClient();
    
    const result = await docClient.send(
        new GetCommand({
        TableName: "BeansDatabase",
        Key: { bean_id },
        })
    );
    console.log(result.Item);
    return result.Item;
}

export async function getAllBeans() {
    const docClient = createDocClient();

    let items = [];
    let lastKey = undefined;

    do {
        const result = await docClient.send(
        new ScanCommand({
            TableName: "BeansDatabase",
            ExclusiveStartKey: lastKey,
        })
        );

        items = items.concat(result.Items || []);
        lastKey = result.LastEvaluatedKey;
    } while (lastKey);

    return items;
}