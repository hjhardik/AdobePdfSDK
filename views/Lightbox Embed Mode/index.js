
/* Pass the embed mode option here */
const viewerConfig = {
    defaultViewMode: "FIT_PAGE",
    embedMode: "LIGHT_BOX"
};

function previewFile()
{
    /* Initialize the AdobeDC View object */
    var adobeDCView = new AdobeDC.View({
        /* Pass your registered client id */
        clientId: "806df4d950134825880c29bbec54c2fb"
    });

    /* Invoke the file preview API on Adobe DC View object */
    adobeDCView.previewFile({
        /* Pass information on how to access the file */
        content: {
            /* Location of file where it is hosted */
            location: {
                url: "../HardikJoshi.pdf",
                /*
                If the file URL requires some additional headers, then it can be passed as follows:-
                header: [
                    {
                        key: "<HEADER_KEY>",
                        value: "<HEADER_VALUE>",
                    }
                ]
                */
            },
        },
        /* Pass meta data of file */
        metaData: {
            /* file name */
            fileName: "Bodea Brochure.pdf"
        }
    }, viewerConfig);

    adobeDCView.registerCallback(
        /* Type of call back */
        AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
        /* call back function */
        function (event) {
            console.log(event);
        },
        /* options to control the callback execution */
        {
            /* Enable PDF analytics events on user interaction. */
            enablePDFAnalytics: true,
        }
    );
};
