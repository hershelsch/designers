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
  xStart: 'ווי ווייט פון די לינקע זייט',
  xEnd: 'ביז ווי',
  centerOfPage: 'זאל עס זיין אינמיטען',
  font: 'פאנט',
  color: 'קאליר',
  initialSize: 'די סייז וואס די אותיות זאלן זיין',
  maxWidth: 'ביז ווי ברייט מעגן די ווערטער זיין',
  minSize: 'ביז ווי קליין מעגן די אותיות ווערן',
  textAlign: 'טעקסט פאזיציע',
  initialOneLine: 'לכתחילה זאלן זיי זיין איין שורה',
  splitWhenSmallerThan: 'צוטייל ווען סאיז קלענער ווי',
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
  textAlign: 'select',
  xStart: 'number',
  xEnd: 'number',
  centerOfPage: 'checkbox',
  font: 'text',
  color: 'color',
  initialSize: 'number',
  maxWidth: 'number',
  minSize: 'number'
}
const inputsTypesForNameSection = {
  initialOneLine: 'checkbox',
  splitWhenSmallerThan: 'number',
  y: 'number',
  textAlign: 'select',
  xStart: 'number',
  xEnd: 'number',
  centerOfPage: 'checkbox',
  font: 'text',
  color: 'color',
  initialSize: 'number',
  maxWidth: 'number',
  minSize: 'number'
}
const inputsTypesForNameSubSections = {
  y: 'number',
  textAlign: 'select',
  xStart: 'number',
  xEnd: 'number',
  centerOfPage: 'checkbox',
  maxWidth: 'number'
  
}
const sections = ['when', 'where', 'address', 'name', 'fathersName', 'fatherInlawsName'];
const templateInfo = {
  when: {
    y: 0,
    textAlign: '',
    xStart: 0,
    xEnd: 0,
    font: '',
    color: '',
    initialSize: 0,
    maxWidth: 0,
    minSize: 0
  },
  where: {
    y: 0,
    textAlign: '',
    xStart: 0,
    xEnd: 0,
    font: '',
    color: '',
    initialSize: 0,
    maxWidth: 0,
    minSize: 0
  },
  address: {
    y: 0,
    textAlign: '',
    xStart: 0,
    xEnd: 0,
    font: '',
    color: '',
    initialSize: 0,
    maxWidth: 0,
    minSize: 0
  },
  name: {
    initialOneLine: true,
    splitWhenSmallerThan: 0,
    y: 0,
    textAlign: '',
    xStart: 0,
    xEnd: 0,
    font: '',
    color: '',
    initialSize: 0,
    maxWidth: 0,
    minSize: 0,
    firstName: {
      y: 0,
      textAlign: '',
      xStart: 0,
      xEnd: 0,
      maxWidth: 0
    },
    lastName: {
      y: 0,
      textAlign: '',
      xStart: 0,
      xEnd: 0,
      maxWidth: 0
    }
  },
  fathersName: {
    y: 0,
    textAlign: '',
    xStart: 0,
    xEnd: 0,
    font: '',
    color: '',
    initialSize: 0,
    maxWidth: 0,
    minSize: 0
  },
  fatherInlawsName: {
    y: 0,
    textAlign: '',
    xStart: 0,
    xEnd: 0,
    font: '',
    color: '',
    initialSize: 0,
    maxWidth: 0,
    minSize: 0
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
        document.getElementById(`${sections[idx-1]}-section`).scrollIntoView({behavior: 'smooth', block: 'start'});
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
        document.getElementById(`${sections[idx+1]}-section`).scrollIntoView({behavior: 'smooth', block: 'start'});
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
  const nameSubSectionDiv = document.createElement('div');
  nameSubSectionDiv.classList.add('name-sub-section');
  nameSubSectionDiv.id = 'name-sub';
  const nameSubSectionLabel = document.createElement('h3');
  nameSubSectionLabel.classList.add('section-label');
  nameSubSectionLabel.textContent = 'אויב סאיז צוטיילט';
  nameSubSectionDiv.appendChild(nameSubSectionLabel);
  sectionDiv.appendChild(nameSubSectionDiv);
  for (const name of ['firstName', 'lastName']) {
    const nameDiv = document.createElement('div');
    const nameLabel = document.createElement('h3');
    nameLabel.classList.add('section-label');
    nameLabel.textContent = sectionLabelNames[name] || name;
    nameDiv.appendChild(nameLabel);
    nameDiv.classList.add(`${name}-section`);
    nameDiv.id = `${name}-section`;
    nameSubSectionDiv.appendChild(nameDiv);
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
  // Add datalist for fonts if not present
  if (!document.getElementById('font-list')) {
    const fontDatalist = document.createElement('datalist');
    fontDatalist.id = 'font-list';
    // Add some common fonts
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
  const input = document.createElement('input');
  input.type = type;
  input.name = key;
  input.id = `${section}-${key}`;
  input.dataset.for = key;
  const label = document.createElement('label');
  label.htmlFor = input.id;
  label.textContent = labelNames[key] || key;
  sectionDiv.appendChild(label);
  sectionDiv.appendChild(input);
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

//change the function it should add and remove elements
document.querySelectorAll('select[name="textAlign"]').forEach((select) => {
  select.addEventListener('input', () => {
    const parentDiv = select.parentElement;
    const xEndElement = parentDiv.querySelector(`[data-for="xEnd"]`);
    const xendlabel = parentDiv.querySelector(`label[for="${xEndElement.id}"]`);
    const centerOfPageElement = parentDiv.querySelector(`[data-for="centerOfPage"]`);
    const centerOfPageLabel = parentDiv.querySelector(`label[for="${centerOfPageElement.id}"]`);

    switch (select.value) {
      case 'left':
      case 'right': {
        if (xEndElement) {
          xEndElement.style.display = 'none';
          xendlabel.style.display = 'none';
          centerOfPageElement.style.display = 'none';
          centerOfPageLabel.style.display = 'none';
        }

        break;
      }
      case 'center':
        if (xEndElement) {
          xEndElement.style.display = 'block';
          xendlabel.style.display = 'block';
          centerOfPageElement.style.display = 'block';
          centerOfPageLabel.style.display = 'block';
        }
        break;
      default:
        break;
    }
  });
});

generateContentInputs();
generateForm();


const form = document.getElementById('settings-form');
form.querySelectorAll('input[type="checkbox"][data-for="centerOfPage"]').forEach((input) => {
  input.addEventListener('input', () => {
    if (input.checked) {
      const parentDiv = input.parentElement; // Get the parent div containing the inputs
      const xStartElement = parentDiv.querySelector(`[data-for="xStart"]`);
      const xEndElement = parentDiv.querySelector(`[data-for="xEnd"]`);
      if (xStartElement) xStartElement.value = 0;
      if (xEndElement) xEndElement.value = canvas.width;
    }
  });
});



// Font upload and registration
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
    // Add the font to the datalist
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
    // Wait for font to be ready, then update canvas
    await document.fonts.ready;
    updateCanvas(canvas, image, templateInfo, contents);
  } catch (e) {
    alert('Failed to load font: ' + e);
  }
});

// Scroll to settings section when content input is focused
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