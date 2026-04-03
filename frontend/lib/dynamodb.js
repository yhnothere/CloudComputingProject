import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand , ScanCommand } from  "@aws-sdk/lib-dynamodb";

function createDocClient() {

    const accessKeyId = process.env.DYNAMO_ACCESS_KEY;
    const secretAccessKey = process.env.DYNAMO_SECRET_KEY;
    const sessionToken = process.env.DYNAMO_SESSION_TOKEN;
    const region = process.env.DYNAMO_REGION;

    if (!region)            throw new Error("Missing/Wrong env var: DYNAMO_REGION");
    if (!accessKeyId)       throw new Error("Missing/Wrong env var: DYNAMO_ACCESS_KEY");
    if (!secretAccessKey)   throw new Error("Missing/Wrong env var: DYNAMO_SECRET_KEY");
    if (!sessionToken)      throw new Error("Missing/Wrong env var: DYNAMO_SESSION_TOKEN");

    const client = new DynamoDBClient({
        region,
        credentials: {
        accessKeyId,
        secretAccessKey,
        sessionToken,
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
    //console.log(result.Item);
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