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
    // Ensure all values are numbers
    let fontSize = parseFloat(initialSize);
    const minFontSize = parseFloat(minSize);
    const maxTextWidth = parseFloat(maxWidth);
    
    // Add debugging to help diagnose issues
    console.log(`fitText called with: initialSize=${fontSize}, minSize=${minFontSize}, maxWidth=${maxTextWidth}`);
    
    while (fontSize > minFontSize) {
        context.font = `${fontSize}px ${font}`;
        const textWidth = context.measureText(text).width;
        console.log(`Text width at ${fontSize}px: ${textWidth}`);
        
        if (textWidth <= maxTextWidth) return fontSize;
        fontSize -= 0.5; // Slightly larger decrement for faster resizing
    }
    
    console.log(`Reached minimum font size: ${fontSize}`);
    return fontSize;
}
function drawText(context, text, textConfig, fontSize) {
    const { x, y, textAlign, color, font, shadow } = textConfig;
    if (text === '') {
        return;
    }
    context.font = `${fontSize || fitText(context, text, textConfig)}px ${font}`;
    context.fillStyle = color;
    context.textAlign = textAlign;
    
    // Apply shadow if configured
    if (shadow) {
        context.shadowColor = shadow.color || 'rgba(0, 0, 0, 0.5)';
        context.shadowBlur = shadow.blur || 4;
        context.shadowOffsetX = shadow.offsetX || 2;
        context.shadowOffsetY = shadow.offsetY || 2;
    }
    context.fillText(text, x, y);
    
    // Reset shadow after drawing to prevent affecting other elements
    context.shadowColor = 'transparent';
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
}
