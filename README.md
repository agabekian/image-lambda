# image-lambda 
#### (Lab17 | 5.21.24)
App:
https://github.com/agabekian/image-lambda/blob/main  
link to `images.json`
>https://us-west-2.console.aws.amazon.com/s3/buckets/images401?region=us-west-2&bucketTyp
(If given Acces error, please download the json file.)
#### HOW TO USE:
**Uploading image to AWS will trigger update (PUT) of images.json file with selected image metadata.**    
#### NOTES:
#### AWS permissions all around caused 80% of my problems today.  
   Roles are roles but permissione are tied to everything on AWS!

  - Had to use "unique global namespace" 'images401'.
  - Creating buckets, had an issue deleting it - buckets have their own permissions!
  - Their associated events  are 'stuck' to them (previous trigger properties like .jpg persist causing error if reusing for new functions)  even when I deleted linked lambda func.
  - lambda f would not write (403 auth) to json. FInally, only locally downloading json was the correct way  to confirm it was filled. 
  - Link to json via AWS would have access error.

#### REQUIREMENTS
- [x] Create an S3 Bucket with “open” read permissions, so that anyone can see the images/files in their browser.

A user should be able to upload an image at any size, and update a **dictionary** (json) of all images that have been uploaded so far.
When an image is uploaded to your S3 bucket, it should trigger a Lambda function which must:

- [x] Download a file called “images.json” from the S3 Bucket if it exists.
The images.json should be an array of objects, each representing an image. Create an empty array if this file is not present.
- [x]Create a metadata object describing the image.
Name, Size, Type, etc.
Append the data for this image to the array.
Note: If the image is a duplicate name, update the object in the array, don’t just add it.
- [x] Upload the images.json file back to the S3 bucket.

#### Proposed File Structure
If uploading a zipped directory to Lambda, **only the index.js and package.json** should be zipped.

    ├── .github
    │   ├── workflows
    │   │   └── publish-lambda.yml (stretch goal)
    ├── .eslintrc.json
    ├── .gitignore
    ├── index.js
    ├── lambda.test.js
    ├── package.json
    └── README.md
**NOTE** - If you setup your S3 Bucket to trigger your Lambda function on every file uploaded or modified, it will run that Lambda function every time that .json file is re-uploaded, putting you into an infinite loop. Be sure and set the event trigger to only run on files with image extensions as shown below.

![img.png](img.png)Lambda Settings

Documentation
In your README.md include:
a description of how to use your lambda.
a description of any issues you encountered during deployment of this lambda.
a link to your images.json file.
Stretch Goal
Automatically deploy your function on check-ins to your main branch using a github action.
HINT: Explore the GitHub marketplace.
  Submission Instructions
Create a new repository for your lambda function, called ‘image-lambda’.
Work on a non-main branch and make commits appropriately.
Update your README.md file with the required documentation above.

https://us-west-2.console.aws.amazon.com/s3/buckets/images401?region=us-west-2&bucketType=general&tab=objects