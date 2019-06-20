module.exports = {
  firstname: String,
  lastname: String,
  gender: { mongoDB: String, type: 'radio', values: ['Homme', 'Femme'] },
}
