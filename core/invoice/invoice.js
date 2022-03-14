


function Invoice () {
    

    this.init = function () {

        var fileName = './src/facture.pdf';
        var stream = fs.createWriteStream(fileName)
        doc.pipe(stream);
        doc
            .font('./font/Syne-Regular.ttf')
            .fontSize(25)
            .text('Some text with an embedded font!', 100, 100);

            // Add an image, constrain it to a given size, and center it vertically and horizontally
        doc.image('./src/logo.png', {
            fit: [250, 300],
            align: 'center',
            valign: 'center'
            });

        // Add another page
        

        // Draw a triangle
        doc
        .save()
        .moveTo(100, 150)
        .lineTo(100, 250)
        .lineTo(200, 250)
        .fill('#FF3300');

        // Apply some transforms and render an SVG path with the 'even-odd' fill rule
        doc
        .scale(0.6)
        .translate(470, -380)
        .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
        .fill('red', 'even-odd')
        .restore();

        // Finalize PDF file
        doc.end();

        setTimeout(() => {
            
            stream.end();
            console.log('end stream')
        }, 1000);

    

    }

 
}

var $invoice = new Invoice();
$invoice.init();