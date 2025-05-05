//give better names
function updateCanvas(templateInfo, contents) {
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  const { firstName, lastName, ...rest } = contents
  for (const content in rest) {
    const sectionInfo = templateInfo[content];
    const contentText = rest[content];
    drawText(context, sectionInfo, contentText);
  }
  drawNameText(context, templateInfo.name, firstName, lastName);
}
/**
 * 
 * @param {CanvasRenderingContext2D} context 
 * @param {Object} sectionInfo 
 * @param {string} content 
 */
function drawText(context, sectionInfo, content) {
  let xStart = sectionInfo.xStart
  let xEnd = sectionInfo.xEnd
  let x
  if (sectionInfo.textAlign == 'center') {
    x = xStart + xEnd / 2
  } else {
    x = xStart
  }
  context.font = `${fitText(context, content, sectionInfo)}px ${sectionInfo.font}`;
  context.fillStyle = sectionInfo.color;
  context.textAlign = sectionInfo.textAlign;
  context.fillText(content, x, sectionInfo.y);
}


function drawNameText(context, sectionInfo, firstName, lastName) {
  fitNameText(context, sectionInfo.initialSize, sectionInfo.minSize, sectionInfo.maxWidth, sectionInfo.font, sectionInfo.firstName, sectionInfo.lastName);
}

function fitText(context, text, { initialSize, minSize, maxWidth, font }) {
  let fontSize = initialSize;
  while (fontSize > minSize) {
    context.font = `${fontSize}px ${font}`;
    const textWidth = context.measureText(text).width;
    if (textWidth <= maxWidth) return fontSize;
    fontSize -= 0.1;
  }
  return fontSize;
}

function fitNameText(context, initialFontSize, minFontSize, maxWidth, fontFamily, firstName, lastName, splitWhenSmallerThan) {
  let fontSize = fitText(context, firstName + ' ' + lastName, { initialFontSize, minFontSize, maxWidth, fontFamily });
  if (fontSize < splitWhenSmallerThan) {
    fontSize = calculateSplitFontSize(context, firstName, lastName, initialFontSize, minFontSize, firstName, lastName, fontFamily);
  }
  return { fontSize, shouldSplit };
}
function calculateSplitFontSize(context, first, last, initialFontSize, minFontSize, firstNameInfo, lastNameInfo, fontFamily) {
  let firstNameFontSize = fitText(context, first, initialFontSize, minFontSize, firstNameInfo.maxWidth, fontFamily);
  let lastNameFontSize = fitText(context, last, initialFontSize, minFontSize, lastNameInfo.maxWidth, fontFamily);
  return Math.min(firstNameFontSize, lastNameFontSize);
}
