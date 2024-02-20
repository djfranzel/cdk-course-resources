import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { postSpaces } from "./PostSpaces";
import { getSpaces } from "./GetSpaces";
import { updateSpace } from "./UpdateSpace";
import { deleteSpace } from "./DeleteSpace";
import { JsonError, MissingFieldError } from "../shared/Validator";
import { addCorsHeader } from "../shared/Utils";
import { captureAWSv3Client, getSegment } from "aws-xray-sdk-core";

// using this below code will initite the trace for this whole call by wrapping the call
// it will cause the tests to fail though, probably related to not mocking the xray
// const ddbClient = captureAWSv3Client(new DynamoDBClient({}));
const ddbClient = new DynamoDBClient({});

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    let response: APIGatewayProxyResult;

    // this will manually create subsegments that xray can see and output for diving deeper into 
    // the timing of your API
    // const subSeg = getSegment().addNewSubsegment('MyLongCall');
    // await new Promise(resolve => { setTimeout(resolve, 3000) });
    // subSeg.close();

    // const subSeg2 = getSegment().addNewSubsegment('MyLongCall');
    // await new Promise(resolve => { setTimeout(resolve, 3000) });
    // subSeg2.close();

    try {
        switch (event.httpMethod) {
            case 'GET':
                const getResponse = await getSpaces(event, ddbClient);
                response = getResponse;
                break;
            case 'POST':
                const postResponse = await postSpaces(event, ddbClient);
                response = postResponse;
                break;
            case 'PUT':
                const putResponse = await updateSpace(event, ddbClient);
                response = putResponse
                break;
            case 'DELETE':
                const deleteResponse = await deleteSpace(event, ddbClient);
                response = deleteResponse;
                break;
            default:
                break;
        }
    } catch (error) {
        if (error instanceof MissingFieldError) {
            return {
                statusCode: 400,
                body: error.message
            }
        }
        if (error instanceof JsonError) {
            return {
                statusCode: 400,
                body: error.message
            }
        }
        return {
            statusCode: 500,
            body: JSON.stringify(error.message)
        }
    }


    addCorsHeader(response);

    return response;
}

export { handler }