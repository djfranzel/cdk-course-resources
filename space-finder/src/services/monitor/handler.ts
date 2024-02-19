import { SNSEvent } from "aws-lambda";

const webHookUrl = 'https://hooks.slack.com/services/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';

async function handler(event: SNSEvent, context) {
    
    for (const record of event.Records) {
        await fetch(webHookUrl, {
            method: 'POST',
            body: JSON.stringify({
                "text": `Houston, we have a problem: ${record.Sns.Message}`
            })
        });
    }
}

export { handler }