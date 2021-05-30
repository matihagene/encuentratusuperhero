$(document).ready(function(){

    $("form").submit(function(e){
        e.preventDefault();
        let numeroDeSuperHero = $("#numeroDeSuperHero").val();

        validacion = /[a-zA-Z]/gim;

        if (numeroDeSuperHero.match(validacion) || numeroDeSuperHero > 732) {
            alert("Debes Ingresar un Número o un Valor Menor a 733"); 
        } else {
            $.ajax({
                url: "https://www.superheroapi.com/api.php/10223882662909856/" + numeroDeSuperHero,
                success: function(data) {
    
                    /* Datos Generales del SuperHero */
    
                    let {name: nombre} = data;
                    let {url: imageURL} = data.image;
                    let {'group-affiliation': conexiones} = data.connections;
                    let {'publisher': publicadoPor} = data.biography;
                    let {'occupation': ocupacion} = data.work;
                    let {'first-appearance': primeraAparicion} = data.biography;
                    let {height: altura} = data.appearance;
                    let alturaJoin = altura.join(" - ")
                    let {weight: peso} = data.appearance;
                    let pesoJoin = peso.join(" - ")
                    let {aliases: alianzas} = data.biography;
                    let alianzasJoin = alianzas.join(", ");
                    
                    /* Stats del SuperHero */
    
                    let {'intelligence': inteligencia} = data.powerstats;
                    let {'strength': fuerza} = data.powerstats;
                    let {'speed': velocidad} = data.powerstats;
                    let {'durability': durabilidad} = data.powerstats;
                    let {'power': poder} = data.powerstats;
                    let {'combat': combate} = data.powerstats;
    
                    $("#generalData").html(`
                    <h3 class="text-center mb-3">SuperHero encontrado</h3>
                    <div class="card mb-3">
                        <div class="row no-gutters">
                          <div class="col-md-5">
                            <img class="card-img-top" src="${imageURL}">
                          </div>
                          <div class="col-md-7">
                            <div class="card-body">
                              <h4 class="card-title text-center"><strong>${nombre}</strong></h4>
                              <p class="card-text"><strong>Conexiones:</strong></br>
                              ${conexiones}
                              </p>
                              <ul class="list-group list-group-flush">
                                <li class="list-group-item">Ocupación: ${ocupacion}</li>
                                <li class="list-group-item">Primera Aparición: ${primeraAparicion}</li>
                                <li class="list-group-item">Altura: ${alturaJoin}</li>
                                <li class="list-group-item">Peso: ${pesoJoin}</li>
                                <li class="list-group-item">Alianzas: ${alianzasJoin}</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div class="card-footer text-right">
                            Publicado por: ${publicadoPor}
                        </div>
                    </div>
                    `)
    
                    let config = {
                        animationEnabled: true,
                        title: {
                            text: `Estadísticas de poder para: ${nombre}`
                        },
                        data: [
                            {
                                type: 'pie',
                                sstartAngle: 25,
                                toolTipContent: "<b>{label}</b>: ({y})",
                                showInLegend: "true",
                                legendText: "{label}",
                                indexLabelFontSize: 16,
                                indexLabel: "{label} - ({y})",
                                dataPoints: [
                                    {y: inteligencia, label: "Inteligencia"},
                                    {y: fuerza, label: "Fuerza"},
                                    {y: velocidad, label: "Velocidad"},
                                    {y: durabilidad, label: "Durabilidad"},
                                    {y: poder, label: "Poder"},
                                    {y: combate, label: "Combate"},
                                ],
                            },
                        ],
                    };
                    let chart = new CanvasJS.Chart("grafico", config);
                    chart.render();
                    
                }
            })
        }

    })

})