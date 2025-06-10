const canvas = document.getElementById('templateCanvas');
const context = canvas.getContext('2d');
let image = null;
const sectionLabelNames = {
  when: 'ווען',
  where: 'ווי',
  address: 'אדרעס',
  name: 'נאמען',
  firstName: 'ערשטע נאמען',
  lastName: 'לעצטע נאמען',
  fathersName: 'טאטעס נאמען',
  fatherInlawsName: 'שווערס נאמען'
}

const labelNames = {
  content: 'ווערטער',
  y: 'ווי ווייט זאל עס זיין פון אויבן',
  x: 'ווי ווייט פון די לינקע זייט',
  centerOfPage: 'זאל עס זיין אינמיטען',
  font: 'פאנט',
  color: 'קאליר',
  initialSize: 'די סייז וואס די אותיות זאלן זיין',
  maxWidth: 'ביז ווי ברייט מעגן די ווערטער זיין',
  minSize: 'ביז ווי קליין מעגן די אותיות ווערן',
  textAlign: 'טעקסט פאזיציע',
  initialOneLine: 'לכתחילה זאלן זיי זיין איין שורה',
  splitWhenSmallerThan: 'צוטייל ווען סאיז קלענער ווי',
  skew:' שיף'
}
document.getElementById('template-upload').addEventListener('input', () => {
  createCanvas(new FormData(document.getElementById('form')));
});
const contents = {
  when: '',
  where: '',
  address: '',
  firstName: '',
  lastName: '',
  fathersName: '',
  fatherInlawsName: ''
}
const contentLabels = {
  when: 'ווען',
  where: 'ווי',
  address: 'אדרעס',
  firstName: 'ערשטע נאמען',
  lastName: 'לעצטע נאמען',
  fathersName: 'טאטעס נאמען',
  fatherInlawsName: 'שווערס נאמען'
}

const inputsTypesForMostSections = {
  y: 'number',
  x: 'number',
  centerOfPage: 'button',
  textAlign: 'select',
  font: 'text',
  color: 'color',
  shadowColor: 'color',
  shadowBlur: 'number',
  shadowOffsetX: 'number',
  shadowOffsetY: 'number',
  initialSize: 'number',
  maxWidth: 'number',
  minSize: 'number',
  skew: 'number' // Add skew input
}
const inputsTypesForNameSection = {
  initialOneLine: 'checkbox',
  splitWhenSmallerThan: 'number',
  y: 'number',
  x: 'number',
  centerOfPage: 'button',
  textAlign: 'select',
  font: 'text',
  color: 'color',
  shadowColor: 'color',
  shadowBlur: 'number',
  shadowOffsetX: 'number',
  shadowOffsetY: 'number',
  initialSize: 'number',
  maxWidth: 'number',
  minSize: 'number',
  skew: 'number' // Add skew input
}
const inputsTypesForNameSubSection = {
  initialSize: 'number',
  minSize: 'number',
  font: 'text',
  color: 'color',
  shadowColor: 'color',
  shadowBlur: 'number',
  shadowOffsetX: 'number',
  shadowOffsetY: 'number',
}
const inputsTypesForNameSubSections = {
  y: 'number',
  x: 'number',
  centerOfPage: 'button',
  textAlign: 'select',
  maxWidth: 'number',
  skew: 'number' // Add skew input
}
const sections = ['when', 'where', 'address', 'name', 'fathersName', 'fatherInlawsName'];
const templateInfo = {
  when: {
    y: 0,
    x: 0,
    textAlign: '',
    font: '',
    color: '',
   shadowColor: '',
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    initialSize: 0,
    maxWidth: 0,
    minSize: 0,
    skew: 0
  },
  where: {
    y: 0,
    x: 0,
    textAlign: '',
    font: '',
    color: '',
    shadowColor: '',
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    initialSize: 0,
    maxWidth: 0,
    minSize: 0,
    skew: 0
  },
  address: {
    y: 0,
    x: 0,
    textAlign: '',
    font: '',
    color: '',
    shadowColor: '',
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    initialSize: 0,
    maxWidth: 0,
    minSize: 0,
    skew: 0
  },
  name: {
    initialOneLine: true,
    splitWhenSmallerThan: 0,
    y: 0,
    x: 0,
    textAlign: '',
    font: '',
    color: '',
    shadowColor: '',
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    initialSize: 0,
    maxWidth: 0,
    minSize: 0,
    skew: 0,
    whenSplited: {
      font: '',
      color: '',
      shadowColor: '',
      shadowBlur: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      initialSize: 0,
      minSize: 0,
      firstName: {
        y: 0,
        textAlign: '',
        x: 0,
        maxWidth: 0,
        skew: 0
      },
      lastName: {
        y: 0,
        textAlign: '',
        x: 0,
        maxWidth: 0,
        skew: 0
      }
    }
  },
  fathersName: {
    y: 0,
    x: 0,
    textAlign: '',
    font: '',
    color: '',
    shadowColor: '',
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    initialSize: 0,
    maxWidth: 0,
    minSize: 0,
    skew: 0
  },
  fatherInlawsName: {
    y: 0,
    x: 0,
    textAlign: '',
    font: '',
    color: '',
    shadowColor: '',
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    initialSize: 0,
    maxWidth: 0,
    minSize: 0,
    skew: 0
  }
};

function generateForm() {
  const settingsDiv = document.getElementById('settings-form')
  sections.forEach((section, idx) => {
    const sectionDiv = document.createElement('div');
    sectionDiv.classList.add('section-div');
    sectionDiv.id = `${section}-section`;
    // Add navigation arrows at the top
    const navDiv = document.createElement('div');
    navDiv.className = 'section-nav-arrows';
    if (idx > 0) {
      const upBtn = document.createElement('button');
      upBtn.type = 'button';
      upBtn.className = 'nav-arrow nav-arrow-up';
      upBtn.title = 'Previous section';
      upBtn.innerHTML = '▲';
      upBtn.onclick = () => {
        document.getElementById(`${sections[idx - 1]}-section`).scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
      navDiv.appendChild(upBtn);
    }
    if (idx < sections.length - 1) {
      const downBtn = document.createElement('button');
      downBtn.type = 'button';
      downBtn.className = 'nav-arrow nav-arrow-down';
      downBtn.title = 'Next section';
      downBtn.innerHTML = '▼';
      downBtn.onclick = () => {
        document.getElementById(`${sections[idx + 1]}-section`).scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
      navDiv.appendChild(downBtn);
    }
    sectionDiv.appendChild(navDiv);
    // Section label after arrows
    const sectionLabel = document.createElement('h3');
    sectionLabel.classList.add('section-label');
    sectionLabel.textContent = sectionLabelNames[section] || section;
    sectionDiv.appendChild(sectionLabel);
    createInputs(sectionDiv, section);
    settingsDiv.appendChild(sectionDiv);
  });
}

function generateContentInputs() {
  for (const key in contents) {
    const input = document.createElement('input');
    input.type = 'text';
    input.name = key;
    input.id = key;
    input.dataset.for = key;
    const label = document.createElement('label');
    label.htmlFor = input.id;
    label.textContent = contentLabels[key] || key;
    document.getElementById('content').appendChild(label);
    document.getElementById('content').appendChild(input);
  }
}
function createInputs(sectionDiv, section) {
  if (section === 'name') {
    createNameSection(sectionDiv);
  } else {
    createInputsForMostSections(sectionDiv, section);
  }
}
function createInputsForMostSections(sectionDiv, section) {
  // Create a single shadow section for all shadow properties
  let shadowDiv = null;
  
  for (const key in inputsTypesForMostSections) {
    if (key === 'textAlign') {
      createTextAlignDropdown(sectionDiv, section);    
    } else {
      createInput(sectionDiv, inputsTypesForMostSections[key], key, section);
    }
  }
}
function createNameSection(sectionDiv) {

  createInputsForNameSection(sectionDiv);
  const whenSplitedDiv = document.createElement('div');
  whenSplitedDiv.classList.add('when-splited-section');
  whenSplitedDiv.id = 'when-splited';
  const whenSplitedLabel = document.createElement('h3');
  whenSplitedLabel.classList.add('section-label');
  whenSplitedLabel.textContent = 'אויב סאיז צוטיילט';
  whenSplitedDiv.appendChild(whenSplitedLabel);
  sectionDiv.appendChild(whenSplitedDiv);
  for (const key in inputsTypesForNameSubSection) {
    if (key === 'textAlign') {
      createTextAlignDropdown(whenSplitedDiv, 'split');
    } else {
      createInput(whenSplitedDiv, inputsTypesForNameSubSection[key], key, 'split');
    }
  }
  for (const name of ['firstName', 'lastName']) {
    const nameDiv = document.createElement('div');
    const nameLabel = document.createElement('h3');
    nameLabel.classList.add('section-label');
    nameLabel.textContent = sectionLabelNames[name] || name;
    nameDiv.appendChild(nameLabel);
    nameDiv.classList.add(`${name}-section`);
    nameDiv.id = `${name}-section`;
    whenSplitedDiv.appendChild(nameDiv);
    createInputsForNameSubSection(nameDiv, name);
  }
}
function createInputsForNameSection(nameSectionDiv) {
  for (const key in inputsTypesForNameSection) {
    if (key === 'textAlign') {
      createTextAlignDropdown(nameSectionDiv, 'name');
    }
    else {
      createInput(nameSectionDiv, inputsTypesForNameSection[key], key, 'name');
    }
  }
}
function createInputsForNameSubSection(nameSubSectionDiv, name) {
  for (const key in inputsTypesForNameSubSections) {
    if (key === 'textAlign') {
      createTextAlignDropdown(nameSubSectionDiv, name);
    } else {
      createInput(nameSubSectionDiv, inputsTypesForNameSubSections[key], key, name);
    }
  }
}

function createInput(sectionDiv, type, key, section) {
  if (!document.getElementById('font-list')) {
    const fontDatalist = document.createElement('datalist');
    fontDatalist.id = 'font-list';
    ['Arial', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana', 'Tahoma'].forEach(font => {
      const option = document.createElement('option');
      option.value = font;
      fontDatalist.appendChild(option);
    });
    document.body.appendChild(fontDatalist);
  }
  if (key === 'font') {
    const input = document.createElement('input');
    input.type = 'text';
    input.name = key;
    input.id = `${section}-${key}`;
    input.dataset.for = key;
    input.setAttribute('list', 'font-list');
    const label = document.createElement('label');
    label.htmlFor = input.id;
    label.textContent = labelNames[key] || key;
    sectionDiv.appendChild(label);
    sectionDiv.appendChild(input);
    return;
  }
  if (key === 'centerOfPage') {
    return; // Skip creating input for centerOfPage since we handle it separately
  }

  const input = document.createElement('input');
  input.type = type;
  input.name = key;
  input.id = `${section}-${key}`;
  input.dataset.for = key;

  const label = document.createElement('label');
  label.htmlFor = input.id;
  label.textContent = labelNames[key] || key;

  // If this is an x input, create special container with center button
  if (key === 'x') {
    const container = document.createElement('div');
    container.className = 'x-input-container';

    sectionDiv.appendChild(label);
    container.appendChild(input);

    const centerContainer = document.createElement('div');
    centerContainer.className = 'center-of-page-container';
    const centerButton = document.createElement('button');
    centerButton.type = 'button';
    centerButton.id = `${section}-centerOfPage`;
    centerButton.dataset.for = 'centerOfPage';
    centerButton.innerHTML = '✓';
    centerContainer.appendChild(centerButton);
    container.appendChild(centerContainer);
    sectionDiv.appendChild(container);

    centerButton.addEventListener('click', () => {
      const input = document.getElementById(`${section}-x`);
      if (input) {
        input.value = canvas.width / 2;
      }
    });
  } else {
    sectionDiv.appendChild(label);
    sectionDiv.appendChild(input);
  }
}

function createTextAlignDropdown(sectionDiv, section) {
  const select = document.createElement('select');
  select.name = `textAlign`;
  select.id = `${section}-textAlign`;
  const options = ['left', 'center', 'right'];
  options.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option;
    optionElement.textContent = option;
    if (option === 'center') {
      optionElement.selected = true;
    }
    select.appendChild(optionElement);
  });
  const label = document.createElement('label');
  label.htmlFor = select.id;
  label.textContent = labelNames.textAlign || 'text-align';
  sectionDiv.appendChild(label);
  sectionDiv.appendChild(select);
}



generateContentInputs();
generateForm();

const fontUploadInput = document.getElementById('font-upload');
fontUploadInput.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const fontName = file.name.replace(/\.[^/.]+$/, "");
  const fontData = await file.arrayBuffer();
  const font = new FontFace(fontName, fontData);
  try {
    await font.load();
    document.fonts.add(font);
    let fontDatalist = document.getElementById('font-list');
    if (!fontDatalist) {
      fontDatalist = document.createElement('datalist');
      fontDatalist.id = 'font-list';
      document.body.appendChild(fontDatalist);
    }
    if (!Array.from(fontDatalist.options).some(opt => opt.value === fontName)) {
      const option = document.createElement('option');
      option.value = fontName;
      fontDatalist.appendChild(option);
    }
    alert(`Font '${fontName}' registered! You can now use it in the font field.`);
    await document.fonts.ready;
    updateCanvas(canvas, image, templateInfo, contents);
  } catch (e) {
    alert('Failed to load font: ' + e);
  }
});

Object.keys(contents).forEach((key) => {
  const input = document.getElementById(key);
  if (input) {
    input.addEventListener('focus', () => {
      const sectionDiv = document.getElementById(`${key}-section`);
      if (sectionDiv) {
        sectionDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
});

function createCanvas(formData) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  const background = formData.get('templateUpload');
  if (background) {
    image = new Image();
    image.onload = function () {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
    image.src = URL.createObjectURL(background);
  } else {
    image = null;
  }
}