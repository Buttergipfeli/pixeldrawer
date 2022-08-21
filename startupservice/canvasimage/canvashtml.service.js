function canvasInHtml(pixels) {
    const separatedPixels = JSON.stringify(declarePixels(pixels));

    return `
        <html>

        <head>
            <style>
                body {
                    width: 1010px;
                    height: 723px;
                    padding-left: 2px;
                    padding-top: 2px;
                }

                .canvasBoard::-webkit-scrollbar {
                    display: none;
                }

                .canvasBoard {
                    width: 992px;
                    height: 705px;
                    background-color: #ffffff;
                    overflow: scroll;
                    border: 8px solid #514e4e;
                    outline: 2px solid #000000;
                    box-shadow: 3px 8px 10px rgba(0, 0, 0, 0.25);
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }

                .canvas {
                    display: table;
                }

                .canvasLayout {
                    display: table-cell;
                    vertical-align: middle;
                }

                .canvasPixels {
                    width: 986px;
                    min-width: 986px;
                    height: 700px;
                    min-height: 700px;
                    border: 2px solid;
                    border-color: #000000;
                    display: table;
                    margin: auto;
                    padding-right: 2px;
                    padding-bottom: 1.5px;
                }

                .tableRow {
                    display: table-row;
                }

                .tableCell {
                    display: table-cell;
                    z-index: 1;
                }

                .canvasPixel {
                    margin: 0 !important;
                    width: 20px;
                    height: 20px;
                }
            </style>
        </head>

        <body id="BodyTest">
            <div class="canvasBoard">
                <div class="canvas">
                    <div class="canvasLayout">
                        <div class="canvasPixels" id="canvasPixels"></div>
                    </div>
                </div>
            </div>
        </body>

        <script type="text/javascript">
            const y = Array.from(Array(34).keys());
            const x = JSON.parse('${separatedPixels}');

            for (let yIndex = 0; yIndex < y.length; yIndex++) {
                const parent = document.querySelector('#canvasPixels');

                const childY = document.createElement('div');
                childY.setAttribute('class', 'tableRow');
                childY.setAttribute('id', 'y' + yIndex);
                parent.appendChild(childY);

                for (let xIndex = 0; xIndex < x[yIndex].length; xIndex++) {
                    const parentY = document.querySelector('#y' + yIndex);

                    const childX = document.createElement('div');
                    childX.setAttribute('class', 'tableCell');
                    childX.setAttribute('id', 'x' + xIndex);
                    childX.setAttribute('style', 'background-color: ' + x[yIndex][xIndex].color.color);

                    const childPixel = document.createElement('div');
                    childPixel.setAttribute('class', 'canvasPixel');
                    childX.appendChild(childPixel);

                    parentY.appendChild(childX);
                }
            }
        </script>

        </html>
`
}

function convertPixels(pixels) {
    let pixelX = [];
    let pixelXContents = [];

    pixels.map((p, index) => {
        ((index + 1) % 49 === 0
            ?
            pixelXContents.push(p) &&
            pixelX.push(pixelXContents) &&
            (pixelXContents = [])
            :
            pixelXContents.push(p)
        )
    });

    if (pixelX.length < 1) {
        return { pixelX: pixelX, loading: true };
    }
    return { pixelX: pixelX, loading: false };
}

function declarePixels(pixels) {
    return convertPixels(pixels).pixelX;
}

module.exports = {
    canvasInHtml
}