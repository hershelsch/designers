function updateCanvas(canvas, image, textConfig, contents) {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (image) {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
    } else {
        context.fillStyle = '#FFFFFF';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
    const { firstName, lastName, ...rest } = contents;
    for (const content in rest) {

        drawText(context, rest[content], textConfig[content]);
    }
    const { fontSize, shouldSplit } = determineNameTextLayout(context, textConfig['name'], firstName, lastName);
    if (shouldSplit) {
        drawText(context, firstName, { ...textConfig.name.firstName, color: textConfig.name.color, font: textConfig.name.font }, fontSize);
        drawText(context, lastName, { ...textConfig.name.lastName, color: textConfig.name.color, font: textConfig.name.font }, fontSize);
    } else {
        drawText(context, `${firstName} ${lastName}`, textConfig.name, fontSize);
    }
}

function determineNameTextLayout(context, textConfig, firstName, lastName) {
    const { initialSize, minSize, maxWidth, font, initialOneLine, splitWhenSmallerThan } = textConfig;
    let fontSize = initialSize;
    if (initialOneLine) {
        fontSize = fitText(context, `${firstName} ${lastName}`, textConfig);
        if (fontSize >= splitWhenSmallerThan) {
            return { fontSize, shouldSplit: false };
        }
    }

    fontSize = calculateSplitFontSize(context, firstName, lastName, textConfig);
    return { fontSize, shouldSplit: true };
}

function calculateSplitFontSize(context, firstName, lastName, textConfig) {
    const firstNameFontSize = fitText(context, firstName, { ...textConfig, maxWidth: textConfig.firstName.maxWidth });
    const lastNameFontSize = fitText(context, lastName, { ...textConfig, maxWidth: textConfig.lastName.maxWidth });
    return Math.min(firstNameFontSize, lastNameFontSize);
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
function drawText(context, text, textConfig, fontSize) {
    const { x, y, textAlign, color, font } = textConfig;
    if (text === '') {
        return;
    }
    context.font = `${fontSize || fitText(context, text, textConfig)}px ${font}`;
    context.fillStyle = color;
    context.textAlign = textAlign;
    context.fillText(text, x, y);
}
