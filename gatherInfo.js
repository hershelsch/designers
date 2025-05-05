
function gatherInfo(templateInfo) {
  console.log(JSON.parse(JSON.stringify(templateInfo)));
  for (const section in templateInfo) {
    const sectionDiv = document.getElementById(`${section}-section`);
    const sectionInfo = templateInfo[section];

    getInputsValue(sectionInfo, sectionDiv);
    if (section == 'name') {

      const nameSubSectionDiv = document.getElementById('name-sub');
      const nameSubSectionInfo = templateInfo['name'];

      for (const name of ['firstName', 'lastName']) {
        const div = nameSubSectionDiv.querySelector(`.${name}-section`);
        getInputsValue(nameSubSectionInfo[name], div);
      }
    }
  }
  console.log(templateInfo)
}

function getInputsValue(section, sectionDiv) {
  for (const field in section) {
    const input = sectionDiv.querySelector(`:scope > [name="${field}"]`);
    if (input) {
      if (input.type == 'checkbox') {
        section[field] = input.checked;
      } else {
        section[field] = input.value;
      }
      if(field == 'x'){
        if(section.textAlign == 'center'){
          let xStart = input
          section[field] = input.value 
        }
      }
    }
  }
}


document.querySelectorAll('input').forEach((input) => {
  input.addEventListener('input', () => {
    gatherInfo(templateInfo);
  });
});