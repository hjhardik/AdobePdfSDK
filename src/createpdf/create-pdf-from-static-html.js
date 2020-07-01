#!/usr/bin/env node     ///line tell the System that the script should be executed with the first executable named node that’s found in your current PATH. /bin/env is standard Unix utility that looks at your current environment.
const DCServicesSdk = require('@adobe/dc-services-node-sdk');

var myArgs = process.argv.slice(2);  ///used for arguments passed thorough command line
/////slice(2) cuts outs the first two arguments which are passed through cmd (that are "node" and thisfile'address)

const sourceZipLoc = myArgs[0];  //source ZIP
const outputPdfLoc = myArgs[1];  //output pdf



const setCustomOptions = (htmlToPDFOperation) => {
    // Define the page layout, in this case an 8 x 11.5 inch page (effectively portrait orientation).
    const pageLayout = new DCServicesSdk.CreatePDF.options.PageLayout();
    pageLayout.setPageSize(8, 11.5);

    // Set the desired HTML-to-PDF conversion options.
    const htmlToPdfOptions = new DCServicesSdk.CreatePDF.options.html.CreatePDFFromHtmlOptions.Builder()
        .includesHeaderFooter(true)
        .withPageLayout(pageLayout)
        .build();
    htmlToPDFOperation.setOptions(htmlToPdfOptions);
};


try {
    // Initial setup, create credentials instance.
    const credentials =  DCServicesSdk.Credentials
        .serviceAccountCredentialsBuilder()
        .fromFile("dc-services-sdk-credentials.json")
        .build();

    // Create an ExecutionContext using credentials and create a new operation instance.
    const executionContext = DCServicesSdk.ExecutionContext.create(credentials),
        htmlToPDFOperation = DCServicesSdk.CreatePDF.Operation.createNew();

    // Set operation input from a source file.
    const input = DCServicesSdk.FileRef.createFromLocalFile(sourceZipLoc);
    htmlToPDFOperation.setInput(input);

    // Provide any custom configuration options for the operation.
    setCustomOptions(htmlToPDFOperation);

    // Execute the operation and Save the result to the specified location.
    htmlToPDFOperation.execute(executionContext)
        .then(result => result.saveAsFile(outputPdfLoc))
        .catch(err => {
            if(err instanceof DCServicesSdk.Error.ServiceApiError
                || err instanceof DCServicesSdk.Error.ServiceUsageError) {
                console.log('Exception encountered while executing operation', err);
            } else {
                console.log('Exception encountered while executing operation', err);
            }
        });
} catch (err) {
    console.log('Exception encountered while executing operation', err);
}
