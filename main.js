let selectedGender
let hasSkinFoldSelected = false
let selectedSkinFold = ''
const genderSelector = document.getElementById('gender')
const skinFoldsSelector = document.getElementById('skinfold-selector')
const maleWrapper = document.getElementById('male-wrapper')
const femaleWrapper = document.getElementById('female-wrapper')
const muscleListSelectors = document.querySelectorAll('.muscle-list input')

const muscles = [
  'pectoralis-major',
  'rectus-abdominis',
  'gluteus-maximus',
  'latissimus-dorsi',
  'obliques',
  'biceps',
  'quadriceps',
  'calf',
  'deltoid',
  'trapezius',
  'hamstrings',
  'triceps',
]

const skinFolds = {
  jp3: {
    male: ['pectoralis-major', 'rectus-abdominis', 'quadriceps'],
    female: ['triceps', 'obliques', 'quadriceps'],
  },
  gu3: {
    male: ['pectoralis-major', 'rectus-abdominis', 'quadriceps'],
    female: ['triceps', 'obliques', 'quadriceps'],
  },
  dw4: {
    male: ['triceps', 'biceps', 'obliques', 'latissimus-dorsi'],
    female: ['triceps', 'biceps', 'obliques', 'latissimus-dorsi'],
  },
  pt4: {
    male: ['pectoralis-major', 'latissimus-dorsi', 'obliques', 'quadriceps'],
    female: ['triceps', 'latissimus-dorsi', 'obliques', 'quadriceps'],
  },
  jp7: {
    male: [
      'pectoralis-major',
      'rectus-abdominis',
      'latissimus-dorsi',
      'triceps',
      'quadriceps',
      'obliques',
      'deltoid',
    ],
    female: [
      'pectoralis-major',
      'rectus-abdominis',
      'latissimus-dorsi',
      'triceps',
      'quadriceps',
      'obliques',
      'deltoid',
    ],
  },
}

const toggleWrapper = (selected) => {
  switch (selected) {
    case 'male':
      maleWrapper.classList.toggle('toggle')
      femaleWrapper.classList.remove('toggle')
      break
    case 'female':
      femaleWrapper.classList.toggle('toggle')
      maleWrapper.classList.remove('toggle')
      break

    default:
      femaleWrapper.classList.remove('toggle')
      maleWrapper.classList.remove('toggle')
      break
  }

  deactivateMuscle()
  if (hasSkinFoldSelected) {
    handleSkinFold()
  }
}

const deactivateMuscle = () => {
  muscles.map((muscle) => {
    document.querySelectorAll(`#${muscle}`).forEach((muscle, index) => {
      muscle.classList.remove('toggle-muscle')
    })
  })
  deactivateAllMusclesInput()
}

const toggleMuscle = (selected) => {
  document.querySelectorAll(`#${selected}`).forEach((muscle, index) => {
    muscle.classList.toggle('toggle-muscle')
  })
}

const handleSkinFold = () => {
  deactivateMuscle()
  selectedSkinFold[selectedGender].map((muscle) => {
    toggleMuscle(muscle)
    handleMuscleInput(muscle)
  })
}

const deactivateAllMusclesInput = () => {
  muscleListSelectors.forEach((muscleSelector, index) => {
    muscleSelector.checked = false
  })
}

const handleMuscleInput = (selected) => {
  document.querySelector(`input[value="${selected}"]`).checked = true
}

window.addEventListener('load', (ev) => {
  selectedGender = genderSelector.value
  toggleWrapper(genderSelector.value)
})

genderSelector.addEventListener('change', (ev) => {
  selectedGender = genderSelector.value
  toggleWrapper(genderSelector.value)
})

muscleListSelectors.forEach((muscleSelector, index) => {
  muscleSelector.addEventListener('change', (ev) => {
    toggleMuscle(ev.target.value)
  })
})

skinFoldsSelector.addEventListener('change', (ev) => {
  hasSkinFoldSelected = true
  deactivateMuscle()
  if (ev.target.value != '') {
    selectedSkinFold = skinFolds[ev.target.value]
    handleSkinFold()
  }
})
