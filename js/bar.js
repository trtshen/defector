const data = "data/defectors.json";

const init = () => {
    function reqListener() {
        renderBarchart(this.responseText)
    }
    
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", data);
    oReq.send();
}

let parties = [], camp = [];

const renderBarchart = (data) => {
    
    let options = {
        chart: {
            renderTo: 'barchart',
            type: 'column'
        },
        title: {
            text: 'Malaysian Parliament'
        },
        xAxis: {
            categories: []
        },
        yAxis: {
            title: {
                text: 'Number of MPs'
            }
        },
        series:[{}]
    };

    data = JSON.parse(data);

    console.log(data);

    // options.series[0].data = data;
    
    let seatNum = data.length;
    
    // Determine latest seat number for each camp
    let latestBN = data.filter(d => d.dec_2018_camp == "BN");
    let latestBNSeat = latestBN.length;
    
    let latestHarapan = data.filter(d => d.dec_2018_camp == "Harapan");
    let latestHarapanSeat = latestHarapan.length;
    
    let latestGBS = data.filter(d => d.dec_2018_camp == "GBS");
    let latestGBSSeat = latestGBS.length;

    let latestGPS = data.filter(d => d.dec_2018_camp == "GPS");
    let latestGPSSeat = latestGPS.length;

    // Determine latest seat number for each party
    let latestUmno = data.filter(d => d.dec_2018_party == "Umno");
    let latestUmnoSeat = latestUmno.length;

    let latestMCA = data.filter(d => d.dec_2018_party == "MCA");
    let latestMCASeat = latestMCA.length;

    let latestMIC = data.filter(d => d.dec_2018_party == "MIC");
    let latestMICSeat = latestMIC.length;

    let latestBersatu = data.filter(d => d.dec_2018_party == "Bersatu");
    let latestBersatuSeat = latestBersatu.length;

    let latestPKR = data.filter(d => d.dec_2018_party == "PKR");

    let latestDAP = data.filter(d => d.dec_2018_party == "DAP");
    let latestAmanah = data.filter(d => d.dec_2018_party == "Amanah");

    let latestPAS = data.filter(d => d.dec_2018_party == "PAS");
    let latestPASSeat = latestPAS.length;

    let latestPBS = data.filter(d => d.dec_2018_party == "PBS");
    let latestPBSSeat = latestPBS.length;

    let latestPBRS = data.filter(d => d.dec_2018_party == "PBRS");
    let latestPBRSSeat = latestPBRS.length;

    let latestSTAR = data.filter(d => d.dec_2018_party == "STAR");
    let latestSTARSeat = latestSTAR.length;

    let latestPRS = data.filter(d => d.dec_2018_party == "PRS");
    let latestPRSSeat = latestPRS.length;

    let latestPBB = data.filter(d => d.dec_2018_party == "PBB");
    let latestPBBSeat = latestPBB.length;

    let latestSUPP = data.filter(d => d.dec_2018_party == "SUPP");
    let latestSUPPSeat = latestSUPP.length;

    let latestPDP = data.filter(d => d.dec_2018_party == "PDP");
    let latestPDPSeat = latestPDP.length;

    let latestUpko = data.filter(d => d.dec_2018_party == "Upko");
    let latestUpkoSeat = latestUpko.length;

    let latestIndependent = data.filter(d => d.dec_2018_party == "");
    let latestIndependentSeat = latestIndependent.length;

    let totalSeat = [latestUmnoSeat, latestMCASeat, latestMICSeat, latestBersatuSeat, latestPKRSeat, latestAmanahSeat, latestDAPtSeat, latestPAStSeat, latestUpkoSeat, latestPBBSeat, latestSUPPSeat, latestPDPSeat, latestPBSSeat, ];
    console.log(`Check total seat: ${totalSeat}`);

    

    // totalSeat.forEach(party => {
    //     options.series.push(party)
    // })

    // console.log(data.dec_2018_camp);
    
    // data.forEach(d => {
    //         if (data.indexOf(d.dec_2018_camp) == -1) {
    //             options.xAxis.categories.push(d.dec_2018_camp);
    //         }        
    // })

    // options.xAxis.categories.push(totalSeat);

    // console.log(options.xAxis.categories);



    let chart = new Highcharts.Chart(options);
}

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
    init()
} else {
    document.addEventListener("DOMContentLoaded", init);
}