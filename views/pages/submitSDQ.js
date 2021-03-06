const submitSDQ = async function () {

  let count = 0;
  let qArray = [];
  let selectedValue = "";

  while (count < 26) {

    //getting reference to all radio buttons with the value of count
    const radioBtns = document.querySelectorAll('input[name="' + count + '"]');

    //checking what button  is checked in the current group
    for (const radioBtn of radioBtns) {
      if (radioBtn.checked) {
        selectedValue = radioBtn.value;
        qArray.push(selectedValue);
        break;
      }
    }

    count++;
  } // end while loop

  //Testing 
  //alert(qArray.toString());

  //Assigning values
  let val = 0;
  let aArray = [];
  while (val < 26) {

    //Checking for questions with values calculated differently
    if (val == 6 || val == 10 || val == 13 || val == 20 || val == 24) {
      switch (qArray[val]) {
        case 'never':
          aArray.push(2)
          break;
        case 'sometimes':
          aArray.push(1)
          break;
        case 'always':
          aArray.push(0)
          break;
        case 'none':
          aArray.push(0)
          break;
        default:
          break;
      }
      //Assigning every other questions value
    } else {
      switch (qArray[val]) {
        case 'never':
          aArray.push(0)
          break;
        case 'sometimes':
          aArray.push(1)
          break;
        case 'always':
          aArray.push(2)
          break;
        case 'none':
          aArray.push(0)
          break;
        default:
          break;
      }
    }

    val++;

  } //end while loop

  let q1;
  let q2;
  let q3;
  let q4;
  let q5;
  let q6;
  let q7;
  let q8;
  let q9;
  let q10;
  let q11;
  let q12;
  let q13;
  let q14;
  let q15;
  let q16;
  let q17;
  let q18;
  let q19;
  let q20;
  let q21;
  let q22;
  let q23;
  let q24;
  let q25;

  [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20, q21, q22, q23, q24, q25] = aArray;

  //Assign actual scores
  let epScore = q3 + q8 + q13 + q16 + q24;
  let cpScore = q5 + q7 + q12 + q18 + q22;
  let haScore = q2 + q10 + q15 + q21 + q25;
  let ppScore = q6 + q11 + q14 + q19 + q23;
  let prScore = q1 + q4 + q9 + q17 + q20;
  let tdScore = epScore + cpScore + haScore + ppScore + prScore;

  // Getting values from text and date boxes
  let expires = document.getElementById('date').value;
  let child = document.getElementById('name').value;
  let birthDate = document.getElementById('dob').value;
  let compBy = document.getElementById('completed').value;
  /* let role = "";
  
  if (document.getElementById('teacher').checked == true) {
    let role = "Teacher";
  }

  if (document.getElementById('parent').checked == true) {
    let role = "Parent";
  }  */

  const response = await fetch('/log', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      child: child,
      dob: birthDate,
      total: tdScore,
      emotional: epScore,
      conduct: cpScore,
      hyperactivity: haScore,
      peer: ppScore,
      prosocial: prScore,
      impact: 10,
      completed: compBy,
      role: "Teacher",
      expires: expires
    })

  });

  const result = await response.json();

};