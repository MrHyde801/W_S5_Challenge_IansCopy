async function sprintChallenge5() { // Note the async keyword so you can use `await` inside sprintChallenge5
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇

  // 👇 ==================== TASK 1 START ==================== 👇

  // 🧠 Use Axios to GET learners and mentors.
  // ❗ Use the variables `mentors` and `learners` to store the data.
  // ❗ Use the await keyword when using axios.
  endPointAxURL = "http://localhost:3003/api/learners";
  endPointBxURL = 'http://localhost:3003/api/mentors'
  let mentors = [] // fix this
  let learners = [] // fix this
  
  async function getLearnersAndMentors() {
    try {
      //EndPointA
      const responseA = await axios.get(endPointAxURL)
      learners = responseA.data
      // console.log(learners)

      //EndpoindB
      const responseB = await axios.get(endPointBxURL)
      mentors = responseB.data
      // console.log(mentors)

    } catch(error) {
      console.log(`There is something wrong: ${error.message}`)
    }
  }
  

  // 👆 ==================== TASK 1 END ====================== 👆

  // 👇 ==================== TASK 2 START ==================== 👇

  // 🧠 Combine learners and mentors.
  // ❗ At this point the learner objects only have the mentors' IDs.
  // ❗ Fix the `learners` array so that each learner ends up with this exact structure:
  // {
  //   id: 6,
  //   fullName: "Bob Johnson",
  //   email: "bob.johnson@example.com",
  //   mentors: [
  //     "Bill Gates",
  //     "Grace Hopper"
  //   ]`
  // }
  
  async function run() {
    await getLearnersAndMentors();
    learners = mergeMentors(learners, mentors)
    
  }

  function mergeMentors(learners, mentors) {
    let mentorFullNamesObj = {} ;
    mentors.forEach(mentor => {
      let fullname = `${mentor.firstName} ${mentor.lastName}`
      mentorFullNamesObj[mentor.id] = fullname
    })
    
    // console.log(mentorFullNamesObj)
   
    const mergedArrays = learners.map(learner => {
    let changeIdsToNames = learner.mentors.map(id => mentorFullNamesObj[id])
    // console.log(changeIdsToNames)
    return {...learner, mentors: changeIdsToNames}
    })
    return mergedArrays
  }
  

  // 👆 ==================== TASK 2 END ====================== 👆

  const cardsContainer = document.querySelector('.cards')
  const info = document.querySelector('.info')
  info.textContent = 'No learner is selected'


  // 👇 ==================== TASK 3 START ==================== 👇

  await run()

  for (let learner of learners) { // looping over each learner object
    
    
    // 🧠 Flesh out the elements that describe each learner
    // ❗ Give the elements below their (initial) classes, textContent and proper nesting.
    // ❗ Do not change the variable names, as the code that follows depends on those names.
    // ❗ Also, loop over the mentors inside the learner object, creating an <li> element for each mentor.
    // ❗ Fill each <li> with a mentor name, and append it to the <ul> mentorList.
    // ❗ Inspect the mock site closely to understand what the initial texts and classes look like!

    const card = document.createElement('div')
    const heading = document.createElement('h3')
    const email = document.createElement('div')
    const mentorsHeading = document.createElement('h4')
    const mentorsList = document.createElement('ul')

    card.classList.add('card');
    mentorsHeading.classList.add('closed')

    heading.textContent = `${learner.fullName}`;
    email.textContent = `${learner.email}`;
    mentorsHeading.textContent = 'Mentors';

    card.appendChild(heading)
    card.appendChild(email)
    card.appendChild(mentorsHeading)

    let mentorList = learner.mentors;
    mentorList.forEach(mentor => {
      const mentorItem = document.createElement('li');
      mentorItem.textContent = `${mentor}`
      mentorsList.appendChild(mentorItem)
    })


    //html Card Template
    //div card
    //h3 name and ID
    //email
    //h4 closed
    //ul
      //li with each mentor name
   
    // 👆 ==================== TASK 3 END ====================== 👆

    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    card.appendChild(mentorsList)
    card.dataset.fullName = learner.fullName
    cardsContainer.appendChild(card)

    card.addEventListener('click', evt => {
      const mentorsHeading = card.querySelector('h4')
      // critical booleans
      const didClickTheMentors = evt.target === mentorsHeading
      const isCardSelected = card.classList.contains('selected')
      // do a reset of all learner names, selected statuses, info message
      document.querySelectorAll('.card').forEach(crd => {
        crd.classList.remove('selected')
        crd.querySelector('h3').textContent = crd.dataset.fullName
      })
      info.textContent = 'No learner is selected'
      // conditional logic
      if (!didClickTheMentors) {
        // easy case, no mentor involvement
        if (!isCardSelected) {
          // selecting the card:
          card.classList.add('selected')
          heading.textContent += `, ID ${learner.id}`
          info.textContent = `The selected learner is ${learner.fullName}`
        }
      } else {
        // clicked on mentors, we toggle and select no matter what
        card.classList.add('selected')
        if (mentorsHeading.classList.contains('open')) {
          mentorsHeading.classList.replace('open', 'closed')
        } else {
          mentorsHeading.classList.replace('closed', 'open')
        }
        if (!isCardSelected) {
          // if card was not selected adjust texts
          heading.textContent += `, ID ${learner.id}`
          info.textContent = `The selected learner is ${learner.fullName}`
        }
      }
    })
  }

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`
}

// ❗ DO NOT CHANGE THIS CODE. WORK ONLY INSIDE TASKS 1, 2, 3
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
