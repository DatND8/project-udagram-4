import * as AWS from 'aws-sdk'

const bucketName = process.env.ATTACHMENT_S3_BUCKET
const urlExpiration = process.env.SIGNED_URL_EXPIRATION

const s3 = new AWS.S3({
    signatureVersion: 'v4'
})


// TODO: Implement the fileStogare logic
export function getUploadUrl(imageId) {
    return s3.getSignedUrl('putObject', { // The URL will allow to perform the PUT operation
        Bucket: bucketName, // Name of an S3 bucket
        Key: imageId, // id of an object this URL allows access to
        Expires: urlExpiration  // A URL is only valid for 5 minutes
    })
}