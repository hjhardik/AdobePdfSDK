(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    
    ga('create', 'UA-171409849-1', 'auto');
    ga('send', 'pageview');


    /* Control the default view mode */
const viewerConfig = {
    /* Allowed possible values are "FIT_PAGE", "FIT_WIDTH" or "" */
    defaultViewMode: "FIT_PAGE",
    showPageControls : true,
    showAnnotationTools: true,
    showDownloadPDF : true,
    showPrintPDF:true,
    dockPageControls:true,
    showLeftHandPanel:false
};

/* Wait for Adobe Document Cloud View SDK to be ready */
document.addEventListener("adobe_dc_view_sdk.ready", function () {
    /* Initialize the AdobeDC View object */
    var adobeDCView = new AdobeDC.View({
        /* Pass your registered client id */
        clientId: "806df4d950134825880c29bbec54c2fb",
        /* Pass the div id in which PDF should be rendered */
        divId: "adobe-dc-view",
    });

    /* Invoke the file preview API on Adobe DC View object */
    adobeDCView.previewFile({
        /* Pass information on how to access the file */
        content: {
            /* Location of file where it is hosted */
            location: {
                url: "../website.pdf",
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
                    eventAction: 'document_open'
                  });
                break;
                case 'PAGE_VIEW' : ga('send', {
                    hitType: 'event',
                    eventCategory: 'pdf',
                    eventAction: 'page_view'
                  });
                break;
                case 'DOCUMENT_DOWNLOAD': ga('send', {
                    hitType: 'event',
                    eventCategory: 'pdf',
                    eventAction: 'document_download'
                  });
                break;
                case 'TEXT_COPY' :  ga('send', {
                    hitType: 'event',
                    eventCategory: 'pdf',
                    eventAction: 'text_copy'
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
});


