const listYear = () => {
  const date = new Date()
  const dates = []
  for (let i = 0; i < 100; i++) {
    dates.push(date.getFullYear() - i)
  }
  return dates
}

module.exports = {
  firstname: String,
  lastname: String,
  gender: { mongoDB: String, type: 'radio', values: ['Homme', 'Femme'] },
  day: String,
  month: { mongoDB: String, type: 'select', values: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'] },
  year: { mongoDB: String, type: 'select', values: listYear() },
}
