import {S3Client, GetObjectCommand, PutObjectCommand} from '@aws-sdk/client-s3';

const BUCKET_NAME = 'images401'; // Replace with your bucket name
const REGION = 'us-west-2'; // Replace with your region
const IMAGES_JSON_KEY = 'images.json';
const customResponse = {
    statusCode: 200,
    body: `Uploaded an image and updated images.json!`
};

const s3Client = new S3Client({region: REGION});

export const handler = async (event) => {
    //extract from event
    let name = event.Records[0].s3.object.key;
    let size = event.Records[0].s3.object.size;
    let type = '.jpg';
    let newImageDetails = {name, size, type}
    let imgDetails;

    const bucketArgs = {
        Bucket: BUCKET_NAME,
        Key: IMAGES_JSON_KEY,
    }

    try {
        const command = new GetObjectCommand(bucketArgs);//init new com
        const result = await s3Client.send(command); //send
        let response = new Response(result.Body) // satisfies the results "promise"-more info
        imgDetails = await response.json() // usable array,at this point we have the array if json exists
    } catch
        (error) {
        if (error.name === 'NoSuchKey') {
            return [];
        }
        throw error;
    }

    imgDetails.push(newImageDetails);

    let stringifiedDetails = JSON.stringify(
        imgDetails, undefined, '  '
    );

    let putInput = {
        ...bucketArgs,
        Body: stringifiedDetails,
        ContentType: 'application/json' //For JSON, it's always such :)
    }
    console.log('put input object', putInput);

    try {
        await s3Client.send(new PutObjectCommand(putInput));
    } catch (e) {
        console.warn('failed to put', e)
    }

    return customResponse;
};

