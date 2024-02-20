import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";
import { createRandomId, parseJSON } from "../shared/Utils";



export async function postSpaces(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    const randomId = createRandomId();
    const item = parseJSON(event.body);

    const result = await ddbClient.send(new PutItemCommand({
        TableName: process.env.TABLE_NAME,
        Item: {
            id: {
                S: randomId
            },
            location: {
                S: item.location
            }
        }
    }));
    console.log(result);

    return {
        statusCode: 201,
        body: JSON.stringify({ id: randomId })
    }
}