const { parse } = require('csv-parse');
const fs = require('fs');

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  );
}

fs.createReadStream('kepler_data.csv')
  .pipe(
    parse({
      comment: '#',
      columns: true,
    })
  )
  .on('data', (data) => {
    if (isHabitablePlanet(data)) habitablePlanets.push(data);
  })
  .on('error', (err) => {
    console.log(err);
  })
  .on('end', () => {
    console.log(
      `${habitablePlanets.length} is the amount of habitable planets`
    );
  });

//con el modulo fs genero events, en el on "data" pusheo la data al array de resultados
//pero esto me devuelva la info en bytes, por lo que necesito la func parse para
//hacer legible la info, esta funcion se pasa como parametro de pipe
//el flujo seria, leo el archivo.csv con el createReadStream y a traves de la pipe uso el parser
//dentro del parametro del parse le podes pasar un objeto para filtrar los objetos a parsear
//tip: para que sean objetos pasarle columns:true, si no devuelve un array de arrays
