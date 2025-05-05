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
  minSize: 'ביז ווי קליין מעגן די אותיות ווערן'
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
  sections.forEach(section => {
    const sectionDiv = document.createElement('div');
    sectionDiv.classList.add('section-div');
    sectionDiv.id = `${section}-section`;
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
function createCanvas(formData) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  const background = formData.get('templateUpload')
  if (background) {
    image = new Image();
    image.onload = function () {
      canvas.width = image.width
      canvas.height = image.height
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
    image.src = URL.createObjectURL(background);
  } else {
    image = null;
  }
}
generateContentInputs();
generateForm();
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