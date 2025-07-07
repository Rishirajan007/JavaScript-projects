const checkBoxList = document.querySelectorAll(".custom-checkbox")
const showError = document.querySelectorAll('.error-lebal')
const progressBar = document.querySelector('.progress-bar')
const progressLebel = document.querySelector('.progress-lebel')
const progressValue = document.querySelector('.progress-value')
const inputFields = document.querySelectorAll('.goal-input')

const allQoutes = [
    'Raise thr  bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going',
    ' Whoa! You just completed all the goals, time for chill :D',
]


    


const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
    first:{
        name:'',
        completed:false,
    },
    second:{
        name:'',
        completed:false,
    },
    third:{
        name:'',
        completed:false,
    }
}
let completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length
  progressValue.style.width = `${completedGoalsCount/3 * 100}%`
  progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`
  progressLebel.innerText = allQoutes[completedGoalsCount];


checkBoxList.forEach((checkbox) => {
   checkbox.addEventListener('click', (e) =>{
    const allGoalsAdded = [...inputFields].every(function(input) {
        return input.value
    })
    if(allGoalsAdded){

      checkbox.parentElement.classList.toggle('completed')
      const inputId = checkbox.nextElementSibling.id
      allGoals[inputId].completed = !allGoals[inputId].completed
      completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length
        progressValue.style.width = `${completedGoalsCount/3 * 100}%`
        progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`
        progressLebel.innerText = allQoutes[completedGoalsCount];
      localStorage.setItem('allGoals', JSON.stringify(allGoals) )

    }else{
        progressBar.classList.add('show-error')
    }

   })
})

inputFields.forEach((input) => {

    input.value = allGoals[input.id].name

    if(allGoals[input.id].completed){
        input.parentElement.classList.add('completed')
    }

    input.addEventListener('focus',() => {
        progressBar.classList.remove('  show-error')
    })

    input.addEventListener('input', (e) => {
      
        if(allGoals[input.id].completed){
            input.value = allGoals[input.id].name
            return
        }
        allGoals[input.id] = {

            name:input.value,
            completed: false,
        }

        localStorage.setItem('allGoals', JSON.stringify(allGoals) )

    })
})


