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
        const whenSplitedConfig = textConfig['name']['whenSplited'];
        const firstNameConfig = getSplitNameConfig(whenSplitedConfig, whenSplitedConfig['firstName']);
        const lastNameConfig = getSplitNameConfig(whenSplitedConfig, whenSplitedConfig['lastName']);
        // Draw first name and last name separately
        drawText(context, firstName, firstNameConfig, fontSize);
        drawText(context, lastName, lastNameConfig, fontSize);
    } else {
        drawText(context, `${firstName} ${lastName}`, textConfig.name, fontSize);
    }
}

function getSplitNameConfig(baseConfig, partConfig) {
    return {
        ...partConfig,
        font: baseConfig.font,
        color: baseConfig.color,
        shadowColor: baseConfig.shadowColor,
        shadowBlur: baseConfig.shadowBlur,
        shadowOffsetX: baseConfig.shadowOffsetX,
        shadowOffsetY: baseConfig.shadowOffsetY
    };
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
    const firstNameFontSize = fitText(context, firstName, { ...textConfig });
    const lastNameFontSize = fitText(context, lastName, { ...textConfig });
    return Math.min(firstNameFontSize, lastNameFontSize);
}

function fitText(context, text, { initialSize, minSize, maxWidth, font }) {
    // Ensure all values are numbers
    let fontSize = parseFloat(initialSize);
    const minFontSize = parseFloat(minSize);
    const maxTextWidth = parseFloat(maxWidth);
    
     
    while (fontSize > minFontSize) {
        context.font = `${fontSize}px ${font}`;
        const textWidth = context.measureText(text).width;
        console.log(`Text width at ${fontSize}px: ${textWidth}`);
        
        if (textWidth <= maxTextWidth) return fontSize;
        fontSize -= 0.5; // Slightly larger decrement for faster resizing
    }
    
    return fontSize;
}
function drawText(context, text, textConfig, fontSize) {
    const { x, y, textAlign, color, font, shadowColor, shadowBlur, shadowOffsetX, shadowOffsetY, skew } = textConfig;
    if (text === '') {
        return;
    }
    context.save();
    context.font = `${fontSize || fitText(context, text, textConfig)}px ${font}`;
    context.fillStyle = color;
    context.textAlign = textAlign;
    // Apply baseline skew (right side higher)
    if (typeof skew === 'number' && !isNaN(skew) && skew !== 0) {
        const skewRad = skew * Math.PI / 180;
        context.translate(x, y);
        context.rotate(-skewRad); // negative for right side higher
        // Draw at (0,0) after transform
        if (shadowColor) {
            context.shadowColor = shadowColor;
            context.shadowBlur = shadowBlur;
            context.shadowOffsetX = shadowOffsetX;
            context.shadowOffsetY = shadowOffsetY;
        }
        context.fillText(text, 0, 0);
        context.restore();
        return;
    }
    // Apply shadow if configured (no skew)
    if (shadowColor) {
        context.shadowColor = shadowColor;
        context.shadowBlur = shadowBlur;
        context.shadowOffsetX = shadowOffsetX;
        context.shadowOffsetY = shadowOffsetY;
    }
    context.fillText(text, x, y);
    context.restore();
}
