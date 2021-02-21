 var personagensContador = document.getElementById("personagens")
 var luasContador = document.getElementById('luas')
 var planetasContador = document.getElementById('planetas')
 var navesContador = document.getElementById('naves')

 preencherContadores()
 preencherTabela()


 google.charts.load('current', { 'packages': ['corechart'] });
 google.charts.setOnLoadCallback(preencherGrafico);

 async function preencherGrafico() {
     const response = await swapiGet("vehicles/")
     const vehiclesArray = response.data.results
     const dataArray = []

     dataArray.push(['Veiculos', 'Passageiros'])
     vehiclesArray.forEach(vehicle => {
         dataArray.push([vehicle.name, Number(vehicle.passengers)])
     })

     console.log(dataArray)

     var data = google.visualization.arrayToDataTable(dataArray);

     var options = {
         title: 'Maiores Veículos'
     };

     var chart = new google.visualization.PieChart(document.getElementById('piechart'));

     chart.draw(data, options);
 }




 async function preencherTabela() {
     const response = await swapiGet('films/')
     const tableData = response.data.results
     tableData.forEach(film => {
         var table = document.getElementById("tbody")
         var title = document.createElement("td").appendChild(document.createTextNode(film.title))
         var realeseDate = document.createElement("td").appendChild(document.createTextNode(moment(film.release_date).format('DD/MM/YYYY')))
         var director = document.createElement("td").appendChild(document.createTextNode(film.director))
         var episode = document.createElement("td").appendChild(document.createTextNode(film.episode_id))
         var row = table.insertRow()
         row.insertCell(0).appendChild(title)
         row.insertCell(1).appendChild(realeseDate)
         row.insertCell(2).appendChild(director)
         row.insertCell(3).appendChild(episode)
     });
 }



 function preencherContadores() {
     Promise.all([swapiGet("people/"),
             swapiGet("planets/"),
             swapiGet("vehicles/"),
             swapiGet("starships/")
         ])
         .then(function(results) {
             personagensContador.innerHTML = results[0].data.count;
             luasContador.innerHTML = results[2].data.count
             planetasContador.innerHTML = results[1].data.count;
             navesContador.innerHTML = results[3].data.count;
         })
         .catch(function(error) {
             alert("url não encontrada (FALHA)");
         });
 }

 function swapiGet(parametro) {
     return axios.get(`https://swapi.dev/api/${parametro}`)
 }