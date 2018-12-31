const width = 500;
const height = 600;
const numRows = 10;
const latestLegend = [];

let svg = d3.select('#waffle')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', '0 0 ' + Math.min(width, height) + ' ' + Math.min(width, height))
    .attr('preserveAspectRatio', 'xMinYMin')
    .append('g');

const div = d3.select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

// Render simple majority line
let majority = [
    { 'x': 0, 'y': ((height / 2) + 22) },
    { 'x': 52, 'y': ((height / 2) + 22) },
    { 'x': 52, 'y': (height / 2) },
    { 'x': 300, 'y': (height / 2) },
]

let lineFunction = d3.line()
    .x(d => d.x)
    .y(d => d.y);

let majorityLine = d3.select('g')
    .append('path')
    .attr('d', lineFunction(majority))
    .attr('stroke', '#333333')
    .attr('fill', 'none')
    .attr('stroke-dasharray', '3,3');

let majorityText = d3.select('g')
    .append('text')
    .append('tspan')
    .style('fill', '#333333')
    .attr('x', 240)
    .attr('y', (height / 2) - 6)
    .attr('font-size', '0.8em')
    .text('112 seats')
    .append('tspan')
    .attr('x', 240)
    .attr('dy', '1.5em')
    .text('Simple')
    .append('tspan')
    .attr('x', 240)
    .attr('dy', '1em')
    .text('majority');

// Render two-thirds majority line
let twoThirds = [
    { 'x': 0, 'y': ((height / 2) + 110) },
    { 'x': 206, 'y': ((height / 2) + 110) },
    { 'x': 206, 'y': ((height / 2) + 88) },
    { 'x': 300, 'y': ((height / 2) + 88) }
]

let twoThirdsLine = d3.select('g')
    .append('path')
    .attr('d', lineFunction(twoThirds))
    .attr('stroke', '#333333')
    .attr('fill', 'none')
    .attr('stroke-dasharray', '3,3');

let twoThirdsText = d3.select('g')
    .append('text')
    .append('tspan')
    .style('fill', '#333333')
    .attr('x', 240)
    .attr('y', (height / 2) + 82)
    .attr('font-size', '0.8em')
    .text('149 seats')
    .append('tspan')
    .attr('x', 240)
    .attr('dy', '1.5em')
    .text('Two-thirds')
    .append('tspan')
    .attr('x', 240)
    .attr('dy', '1em')
    .text('majority');

// legend

const campLegend = ['Harapan', 'Warisan', 'Upko', 'GPS', 'GBS', 'PAS', 'BN', 'Ind']
const legendBox = d3.select('g')
    .append('svg')
    .attr('class', 'legend')
    .attr('width', 200)
    .attr('height', 200)
    .attr('x', 250)
    .attr('y', 82)
    .selectAll('.legend')
    .data(campLegend)
    .enter()
    .append('g')
    .attr('transform', (d, i) => {
        return `translate(0, ${i * 22})`;
    })

legendBox
    .append('rect')
    .attr('width', 18)
    .attr('height', 18)
    .style('fill', (d) => {
        if (d === 'Harapan') {
            return 'rgba(237,28,36,1)'
        } else if (d === 'BN') {
            return 'rgba(0,0,128,1)'
        } else if (d === 'PAS') {
            return 'rgba(0,144,0,1)'
        } else if (d === 'GPS') {
            return 'rgba(254,223,0,1)'
        } else if (d === 'GBS') {
            return 'rgba(26,26,26,1)'
        } else if (d === 'Warisan') {
            return 'rgba(237,28,36,0.67)'
        } else if (d === 'Upko') {
            return 'rgba(237,28,36,0.33)'
        } else {
            return 'rgba(230,230,230,1)';
        }
    })
    .attr('transform', 'translate(50,0)');

legendBox
    .append('text')
    .attr('x', 0)
    .attr('y', 9)
    .attr('dy', '.35em')
    .style('font-size', '.8em')
    .text(d => d);




function rectMouseover(d) {
    div.transition()
    .duration(100)
    .style('opacity', 1);

    d3.select(this).style('fill', '#3d3');

    div.html("<span style = 'font-weight: bold'>" + d.par_code + " " + d.ge14_constituency + "</span>" + "<br>" + "<span style = 'font-style: italic'>" + d.mp_name + " " + "(" + d.dec_2018_party + ")" + "</span>")
    .style('font-family', 'Helvetica')

  div.style('visibility', 'visible')
    .style('left', (d3.event.pageX - 20) + 'px')    
    .style('top', (d3.event.pageY - 35) + 'px')
}

function rectMouseout(d) {
  div.transition()
      .duration(500)
      div.style('visibility', 'hidden')
      var element = d3.select(this)
      element.style('fill', campColor)
}

function rectMousemove(d) {
    div.style("left", (d3.event.pageX - 20) + "px")    
      .style("top", (d3.event.pageY - 65) + "px")
}

function campColor(d) {
    let color = '';
    if (d.dec_2018_camp === 'Harapan') {
        color = 'rgba(237,28,36,1)';
    } else if (d.dec_2018_camp === 'BN') {
        color = 'rgba(0,0,128,1)';
    } else if (d.dec_2018_camp === 'PAS') {
        color = 'rgba(0,144,0,1)';
    } else if (d.dec_2018_camp === 'GPS') {
        color = 'rgba(254,223,0,1)';
    } else if (d.dec_2018_camp === 'GBS') {
        color = 'rgba(26,26,26,1)';
    } else if (d.dec_2018_camp === 'Warisan') {
        color = 'rgba(237,28,36,0.67)';
    } else if (d.dec_2018_camp === 'Upko') {
        color = 'rgba(237,28,36,0.33)';
    } else {
        color = 'rgba(230,230,230,1)';
    }
    console.log(`%c ${d.dec_2018_camp}`, `background: ${color}`);
    return color;
}

function changeColor(d) {
    let color = '';
    if (d === 'Harapan') {
        color = 'rgba(237,28,36,1)';
    } else if (d === 'BN') {
        color = 'rgba(0,0,128,1)';
    } else if (d === 'PAS') {
        color = 'rgba(0,144,0,1)';
    } else if (d === 'GPS') {
        color = 'rgba(254,223,0,1)';
    } else if (d === 'GBS') {
        color = 'rgba(26,26,26,1)';
    } else if (d === 'Warisan') {
        color = 'rgba(237,28,36,0.67)';
    } else if (d === 'Upko') {
        color = 'rgba(237,28,36,0.33)';
    } else {
        color = 'rgba(230,230,230,1)';
    }
    console.log(`%c color`, `background: ${color};`);
    return color;
}

d3.csv('data/tracker.csv')
    .then(data => {

        // filter data
        // Determine latest seat number for each camp
        let latestBN = data.filter(d => d.dec_2018_camp == 'BN');
        let latestBNSeat = latestBN.length;

        let latestHarapan = data.filter(d => d.dec_2018_camp == 'Harapan');
        let latestHarapanSeat = latestHarapan.length;

        let latestGBS = data.filter(d => d.dec_2018_camp == 'GBS');
        let latestGBSSeat = latestGBS.length;

        let latestGPS = data.filter(d => d.dec_2018_camp == 'GPS');
        let latestGPSSeat = latestGPS.length;

        let latestWarisan = data.filter(d => d.dec_2018_party == 'Warisan')
        let latestWarisanSeat = latestWarisan.length;

        let latestPAS = data.filter(d => d.dec_2018_party == 'PAS');
        let latestPASSeat = latestPAS.length;

        let latestUpko = data.filter(d => d.dec_2018_camp == 'Upko');
        let latestUpkoSeat = latestUpko.length;

        let latestIndependent = data.filter(d => d.dec_2018_party == 'Independent');
        let latestIndependentSeat = latestIndependent.length;

        // Determine seat number in end of May for each camp
        let oldestBN = data.filter(d => d.may_2018_camp == 'BN');
        let oldestBNSeat = oldestBN.length;

        let oldestHarapan = data.filter(d => d.may_2018_camp == 'Harapan');
        let oldestHarapanSeat = oldestHarapan.length;

        let oldestGBS = data.filter(d => d.may_2018_camp == 'GBS');
        let oldestGBSSeat = oldestGBS.length;

        let oldestGPS = data.filter(d => d.may_2018_camp == 'GPS');
        let oldestGPSSeat = oldestGPS.length;

        let oldestWarisan = data.filter(d => d.may_2018_party == 'Warisan')
        let oldestWarisanSeat = oldestWarisan.length;

        let oldestPAS = data.filter(d => d.may_2018_party == 'PAS');
        let oldestPASSeat = oldestPAS.length;

        let oldestIndependent = data.filter(d => d.may_2018_party == 'Independent');
        let oldestIndependentSeat = oldestIndependent.length;

        let oldestUpko = data.filter(d => d.may_2018_camp == 'Upko');
        let oldestUpkoSeat = oldestUpko.length;

        let oldestSTAR = data.filter(d => d.may_2018_party == 'STAR');
        let oldestSTARSeat = oldestSTAR.length;

        // Determine latest seat number for each party
        let latestUmno = data.filter(d => d.dec_2018_party == 'Umno');
        let latestUmnoSeat = latestUmno.length;

        let latestMCA = data.filter(d => d.dec_2018_party == 'MCA');
        let latestMCASeat = latestMCA.length;

        let latestMIC = data.filter(d => d.dec_2018_party == 'MIC');
        let latestMICSeat = latestMIC.length;

        let latestBersatu = data.filter(d => d.dec_2018_party == 'Bersatu');
        let latestBersatuSeat = latestBersatu.length;

        let latestPKR = data.filter(d => d.dec_2018_party == 'PKR');

        let latestDAP = data.filter(d => d.dec_2018_party == 'DAP');

        let latestAmanah = data.filter(d => d.dec_2018_party == 'Amanah');

        let latestPBS = data.filter(d => d.dec_2018_party == 'PBS');
        let latestPBSSeat = latestPBS.length;

        let latestPBRS = data.filter(d => d.dec_2018_party == 'PBRS');
        let latestPBRSSeat = latestPBRS.length;

        let latestSTAR = data.filter(d => d.dec_2018_party == 'STAR');
        let latestSTARSeat = latestSTAR.length;

        let latestPRS = data.filter(d => d.dec_2018_party == 'PRS');
        let latestPRSSeat = latestPRS.length;

        let latestPBB = data.filter(d => d.dec_2018_party == "PBB");
        let latestPBBSeat = latestPBB.length;

        let latestSUPP = data.filter(d => d.dec_2018_party == 'SUPP');
        let latestSUPPSeat = latestSUPP.length;

        let latestPDP = data.filter(d => d.dec_2018_party == 'PDP');
        let latestPDPSeat = latestPDP.length;

        let latestSeat = latestHarapan
            .concat(latestWarisan)
            .concat(latestUpko)
            .concat(latestIndependent)
            .concat(latestGPS)
            .concat(latestGBS)
            .concat(latestPAS)
            .concat(latestBN);

        let oldestSeat = oldestHarapan
            .concat(oldestWarisan)
            .concat(oldestIndependent)
            .concat(oldestSTAR)
            .concat(oldestUpko)
            .concat(oldestPAS)
            .concat(oldestBN);

        const chart = svg.selectAll('.rect')
            .data(latestSeat)
            .enter()
            .append('rect')
            .attr('width', 18)
            .attr('height', 18)
            .attr('x', (d, i) => {
                let rowIndex = i % numRows
                return (rowIndex * 22)
            })
            .attr('y', (d, i) => {
                let colIndex = Math.floor(i / numRows)
                return (colIndex * 22)
            })
            .attr('transform', 'translate(10, 82)')
            .style('fill', (d) => {
                return campColor(d);
            })
            .on('mouseover', rectMouseover)
            .on('mousemove', rectMousemove)
            .on('mouseout', rectMouseout)

        // chart.on('mouseover', (d) => {
        //     showInfo.call(this, d);
        // })
        //     .on('mouseout', () => {
        //         removeInfo()
        //     });


        // function renderChart(data, camp, party) {

        //     const chart = svg.selectAll('.rect')
        //         .data(data)
        //         .enter()
        //         .append('rect')
        //         .attr('width', 18)
        //         .attr('height', 18)
        //         .attr('x', (d, i) => {
        //             let rowIndex = i % numRows
        //             return (rowIndex * 22)
        //         })
        //         .attr('y', (d, i) => {
        //             let colIndex = Math.floor(i / numRows)
        //             return (colIndex * 22)
        //         })
        //         .attr('transform', 'translate(10, 82)')
        //         .style('fill', campColor)
        //         .on('mouseover', function (d) {
        //             div.transition()
        //                 .duration(100)
        //                 .style("opacity", 1)

        //             let element = d3.select(this);

        //             element.style("fill", "Black")
        //             div.html("<span style = 'font-weight: bold'>" + d.par_code + " " + d.ge14_constituency + "</span>" + "<br>" + "<span style = 'font-style: italic'>" + d.mp_name + " " + "(" + d[party] + ")" + "</span>")
        //                 .style("font-family", "Helvetica")

        //             div.style("visibility", "visible")
        //                 .style("left", (d3.event.pageX - 20) + "px")
        //                 .style("top", (d3.event.pageY - 35) + "px");

        //             chart.on("mousemove", function () {
        //                 div.style("left", (d3.event.pageX - 20) + "px")
        //                     .style("top", (d3.event.pageY - 65) + "px")
        //             })

        //         })
        //         .on("mouseout", function () {
        //             div.transition()
        //                 .duration(500);

        //             div.style("visibility", "hidden")
        //             let element = d3.select(this);

        //             element.style('fill', campColor)
        //         });

        // }


        // document.querySelector('#latest').addEventListener('click', () => {
        //     changeChart(latestSeat, 'dec_2018_camp');
        //     console.log('check1');
        // });
        // document.querySelector('#oldest').addEventListener('click', () => {
        //     changeChart(oldestSeat, 'may_2018_camp');
        //     console.log('checke2');
        // });
        function changeChart(data, camp, party) {
            chart.data(data)
                .transition()
                .style('fill', (d) => {
                    return changeColor(d[camp]);
                })
                .on('mouseover', function(d) {
                    div.transition()
                        .duration(100)
                        .style("opacity", 1)

                    let element = d3.select(this);

                    element.style("fill", "Black")
                    div.html("<span style = 'font-weight: bold'>" + d.par_code + " " + d.ge14_constituency + "</span>" + "<br>" + "<span style = 'font-style: italic'>" + d.mp_name + " " + "(" + d[party] + ")" + "</span>")
                        .style("font-family", "Helvetica")

                    div.style("visibility", "visible")
                        .style("left", (d3.event.pageX - 20) + "px")
                        .style("top", (d3.event.pageY - 35) + "px");

                    chart.on('mousemove', () => {
                        div.style('left', (d3.event.pageX - 20))
                            .style('top', (d3.event.pageY - 65))
                    })

                })
                .on("mouseout", () => {
                    div.transition()
                        .duration(500);

                    div.style("visibility", "hidden")
                    let element = d3.select(this);

                    element.style('fill', (d) => {
                        return changeColor(d[camp]);
                    })
                });
        }


        d3.select('#latest').on('click', () => {
            changeChart(latestSeat, 'dec_2018_camp', 'dec_2018_party')
        });
        d3.select('#oldest').on('click', () => {
            changeChart(oldestSeat, 'may_2018_camp', 'may_2018_party')
        });
    });