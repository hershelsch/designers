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
        drawText(context, firstName, { ...textConfig.name.firstName, color: textConfig.name.color, font: textConfig.name.font, shadowColor: textConfig.name.shadowColor, shadowBlur: textConfig.name.shadowBlur, shadowOffsetX: textConfig.name.shadowOffsetX, shadowOffsetY: textConfig.name.shadowOffsetY }, fontSize);
        drawText(context, lastName, { ...textConfig.name.lastName, color: textConfig.name.color, font: textConfig.name.font, shadowColor: textConfig.name.shadowColor, shadowBlur: textConfig.name.shadowBlur, shadowOffsetX: textConfig.name.shadowOffsetX, shadowOffsetY: textConfig.name.shadowOffsetY }, fontSize);
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

function fitText(context, text, { initialSize, minSize, maxWidth, font, parenthesesScale }) {
    // Ensure all values are numbers
    let fontSize = parseFloat(initialSize);
    const minFontSize = parseFloat(minSize);
    const maxTextWidth = parseFloat(maxWidth);
    
    while (fontSize > minFontSize) {
        // Split text into parts to handle parentheses
        const parts = text.split(/(\([^)]+\))/g);
        let totalWidth = 0;
        
        // Calculate total width with different sizes for parentheses
        for (const part of parts) {
            if (part.startsWith('(') && part.endsWith(')')) {
                context.font = `${fontSize * parenthesesScale}px ${font}`;
            } else {
                context.font = `${fontSize}px ${font}`;
            }
            totalWidth += context.measureText(part).width;
        }
        
        if (totalWidth <= maxWidth) return fontSize;
        fontSize -= 0.5; // Slightly larger decrement for faster resizing
    }
    
    return fontSize;
}
function drawText(context, text, textConfig, fontSize) {
    const { x, y, textAlign, color, font, shadowColor, shadowBlur, shadowOffsetX, shadowOffsetY } = textConfig;
    if (text === '') {
        return;
    }
   fontSize = fontSize || fitText(context, text, textConfig);
    const textParts = text.split(/(\([^)]+\))/g).filter(part => part !== '');
    
    if (textParts.length > 1) {
        drawTextWithParentheses(context, text, textConfig, fontSize);
    } else {
        context.font = `${fontSize}px ${font}`;
        context.fillStyle = color;
        context.textAlign = textAlign;
        
        // Apply shadow if configured
        if (shadowColor) {
            context.shadowColor = shadowColor;
            context.shadowBlur = shadowBlur;
            context.shadowOffsetX = shadowOffsetX;
            context.shadowOffsetY = shadowOffsetY;
        }
        
        context.fillText(text, x, y);
        
        // Reset shadow after drawing to prevent affecting other elements
        context.shadowColor = 'transparent';
        context.shadowBlur = 0;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
    }
}
function drawTextWithParentheses(context, text, textConfig, fontSize) {
    const { x, y, textAlign, color, font, shadowColor, shadowBlur, shadowOffsetX, shadowOffsetY } = textConfig;
    // Split text into parts, capturing both regular text and parenthesized parts
    const textParts = text.split(/(\([^)]+\))/g).filter(part => part !== '');
    let totalWidth = 0;
    
    // First pass: calculate total width
    for (const part of textParts) {
        if (part.startsWith('(') && part.endsWith(')')) {
            context.font = `${fontSize * textConfig.parenthesesScale}px ${font}`;
        } else {
            context.font = `${fontSize}px ${font}`;
        }
        const partWidth = context.measureText(part).width;
        totalWidth += partWidth;
    }
    
    // Determine starting position based on text alignment
    let currentX = x;
    if (textAlign === 'center') {
        currentX -= totalWidth / 2;
    } else if (textAlign === 'right') {
        currentX -= totalWidth;
    }
    
    // Apply shadow if configured
    if (shadowColor) {
        context.shadowColor = shadowColor;
        context.shadowBlur = shadowBlur;
        context.shadowOffsetX = shadowOffsetX;
        context.shadowOffsetY = shadowOffsetY;
    }
    
    context.fillStyle = color;
    context.textAlign = 'left';  // Force left alignment for individual parts
    
    // Draw each part with appropriate font size
    for (const part of textParts) {
        if (part.startsWith('(') && part.endsWith(')')) {
            context.font = `${fontSize * textConfig.parenthesesScale}px ${font}`;
        } else {
            context.font = `${fontSize}px ${font}`;
        }
        context.fillText(part, currentX, y);
        currentX += context.measureText(part).width;
    }
    
    // Reset shadow and text alignment
    context.shadowColor = 'transparent';
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.textAlign = textAlign;  // Restore original text alignment
}