(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    
    ga('create', 'UA-171409849-1', 'auto');
    ga('send', 'pageview');

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
                url: "../website.pdf",
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
            fileName: "file.pdf"
        }
    }, viewerConfig);

    adobeDCView.registerCallback(
        /* Type of call back */
        AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
        /* call back function */
        function (event) {
           switch(event.type){
                case 'DOCUMENT_OPEN': ga('send', {
                    hitType: 'event',
                    eventCategory: 'pdf',
                    eventAction: 'document_open',
                    eventValue:event.data.fileName
                  });
                break;
                case 'PAGE_VIEW' : ga('send', {
                    hitType: 'event',
                    eventCategory: 'pdf',
                    eventAction: 'page_view',
                    eventValue:`${event.data.pageNumber},${event.data.fileName}`
                  });
                break;
                case 'DOCUMENT_DOWNLOAD': ga('send', {
                    hitType: 'event',
                    eventCategory: 'pdf',
                    eventAction: 'document_download',
                    eventValue:event.data.fileName
                  });
                break;
                case 'TEXT_COPY' :  ga('send', {
                    hitType: 'event',
                    eventCategory: 'pdf',
                    eventAction: 'text_copy',
                    eventValue:`${event.data.copiedText},${event.data.fileName}`
                  });
                break;
                default: ;
            }
        },
        /* options to control the callback execution */
        {
            /* Enable PDF analytics events on user interaction. */
            enablePDFAnalytics: true,
        }
    );
};
