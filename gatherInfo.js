function gatherInfo(templateInfo) {
  for (const section in templateInfo) {
    const sectionDiv = document.getElementById(`${section}-section`);
    if (!sectionDiv){
      continue;
    }
    const sectionInfo = templateInfo[section];

    getInputsValue(sectionInfo, sectionDiv);
    if (section == 'name') {

      const whenSplitedDiv = document.getElementById('when-splited');
      const whenSplitedInfo = sectionInfo['whenSplited'];
//also get the whenSplited section
      getInputsValue(whenSplitedInfo, whenSplitedDiv);
      for (const name of ['firstName', 'lastName']) {
        const div = whenSplitedDiv.querySelector(`.${name}-section`);
        getInputsValue(whenSplitedInfo[name], div);
      }
    }
  }
}

function getInputsValue(section, sectionDiv) {
  for (const field in section) {
    // Look for inputs either directly in the section or in the x-input-container
    const input = sectionDiv.querySelector(`:scope > [name="${field}"], :scope > .x-input-container > [name="${field}"]`);
    if (input) {
      if (input.type == 'checkbox') {
        section[field] = input.checked;
      } else if (input.type == 'number') {
        section[field] = parseFloat(input.value);
      } else {
        section[field] = input.value;
      }
    }
  }
}

function gatherInfoForContents(contents) {  
  for (const field in contents) {
    const input = document.getElementById(field);
    if (input) {
      if (input.type == 'checkbox') {
        contents[field] = input.checked;
      } else if (input.type == 'number') {
        contents[field] = parseFloat(input.value);
      } else {
        contents[field] = input.value;
      }
    }
  }
}

function gatherInfoAndUpdateCanvas(inputElement) {
  const settingsDiv = document.getElementById('settings-form');
  const contentDiv = document.getElementById('content');
  if (settingsDiv.contains(inputElement)) {
     gatherInfo(templateInfo);
 
  } else if (contentDiv.contains(inputElement)) {
    gatherInfoForContents(contents);
  }
  updateCanvas(canvas, image, templateInfo, contents);
}

// Attach input listeners to all inputs and selects
document.querySelectorAll('input, select').forEach((input) => {
  input.addEventListener('input', (event) => {
    gatherInfoAndUpdateCanvas(event.target);
  });
});