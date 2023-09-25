var layout = {
    autosize: true,
    height: 280,
    margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 35,
        pad: 4
    },
    paper_bgcolor: 'rgba(2, 26, 30, 0.6)',
    plot_bgcolor: 'rgba(2, 26, 30, 0.6)',
    showlegend: true,
    legend: {"orientation": "h"}
};

var graphInfectes = {
    x: [],
    y: [],
    name: "Nombre d'infectés",
    type: 'scatter'
};

var graphMorts = {
    x: [],
    y: [],
    name: "Nombre de morts",
    type: 'scatter',
    marker: {
        color: 'rgb(133, 51, 51)'
    }
};

var graphFond = [{
    x: [],
    y: [],
    name: "Fonds monétaire",
    type: 'scatter',
    marker: {
        color: 'rgb(133, 51, 51)'
    }
}];

var donnees = [graphInfectes, graphMorts];
var compteur = 0;

function updateChart() {
    // Nombre d'infectés
    donnees[0].y.push(pays.nbInfecte);
    donnees[0].x.push(compteur);

    // Nombre de morts
    donnees[1].y.push(pays.nbMort);
    donnees[1].x.push(compteur);

    // Fond monétaire
    graphFond[0].y.push(pays.fond);
    graphFond[0].x.push(compteur);

    // garde la taille du tableau à 20
    if (donnees[0].x.length > 19) {
        donnees[0].x.shift();
        donnees[0].y.shift();
        donnees[1].x.shift();
        donnees[1].y.shift();
        graphFond[0].x.shift();
        graphFond[0].y.shift();
    }
    
    compteur++;
    Plotly.newPlot('myDiv', donnees, layout, {displayModeBar: false}); // infections
    Plotly.newPlot('myDiv2', graphFond, layout, {displayModeBar: false}); // fonds
};