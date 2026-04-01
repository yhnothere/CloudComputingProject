import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand , ScanCommand } from  "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.DYNAMO_ACCESS_KEY,
    secretAccessKey: process.env.DYNAMO_SECRET_KEY,
    sessionToken: process.env.DYNAMO_SESSION_TOKEN,
  },
});

const docClient = DynamoDBDocumentClient.from(client);

export async function getBean(bean_id) {
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