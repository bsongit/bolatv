const express = require('express');
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

async function fetchData(url){
    let response = await axios(url).catch((err) => console.log(err));
    if(response.status !== 200){
        console.log(url)
        console.log("Error occurred while fetching data");
        return;
    }
    return response;
}

async function getPageSource(url){
    try {
        const response = await fetchData(url);
        const html = response.data;
        return html;
    } catch (error) {
        console.log(error)
    }

}

router.post('/categoria/', async (req, res) => {
    try {
        var response = []
        const url = req.body.url;
        getPageSource(url).then(result => {
            const $ = cheerio.load(result);
            $('.title-item').each(function(index) {
                let res = $(this).text();
                const timeA = res.replace("Assistir ", "").split(" x ")[0];
                const timeB = res.replace("Assistir ", "").split(" x ")[1].split(" ao ")[0];
                response.push({ 
                    titulo : res, 
                    timeA: timeA,
                    timeB: timeB, 
                    dataHorario: "", 
                    emblemaTimeA: normalizarTimeLogo(timeA), 
                    emblemaTimeB: normalizarTimeLogo(timeB)
                });
            });
            $('.item-footer > div').each(function(index) {
                let res = $(this).text();
                response[index].dataHorario= new Date(res.replace(" ",""));
            });
            res.json(response.slice(0,10));
        });
    } catch (err) {
        res.send({ error: err.message });
    }
});

router.get('/side-bar', async (req, res) => {
    try {
        var response = []
        const url = "https://futemax.app";
        getPageSource(url).then(result => {
            const $ = cheerio.load(result);
            $('ul > li > a').each(function(index) {
                let res = $(this).text();
                response.push({label: res, href: ""});
            });
            $('ul > li').each(function(index) {
                let res = $(this).children()[0].attribs.href;
                response[index].href = res;
            });
            res.json(response);
        });
    } catch (err) {
        res.send({ error: err.message });
    }
});



function normalizarTimeLogo(time) {
    time = time.toLowerCase().replace(/\s/g,"-");
    time = time.toLowerCase().replace(/â/g,"a");
    time = time.toLowerCase().replace(/ã/g,"a");
    time = time.toLowerCase().replace(/ê/g,"e");
    time = time.toLowerCase().replace(/á/g,"a");
    time = time.toLowerCase().replace(/é/g,"e");
    time = time.toLowerCase().replace(/ô/g,"o");
    time = time.toLowerCase().replace(/õ/g,"o");
    time = time.toLowerCase().replace(/ó/g,"o");
    time = time.toLowerCase().replace(/ç/g,"c");
    time = time.toLowerCase().replace(/í/g,"i");
    time = time.toLowerCase().replace(/ö/g,"o");
    time = time.toLowerCase().replace(/ü/g,"u");
    var emblema = `https://logodetimes.com/times/${time}/logo-${time}-256.png`;
    if(time.includes("brentford")){
        emblema = "https://logodetimes.com/times/brentford-football-club/brentford-football-club-256.png"
    }
    else if(time.includes("sergipe")){
        emblema = "https://api.sofascore.app/api/v1/team/2016/image"
    }
    else if(time.includes("bahia-de-feira")){
        emblema = "https://upload.wikimedia.org/wikipedia/commons/0/0b/Associação_Desportiva_Bahia_de_Feira.png";
    }
    else if(time.includes("sport")){
        emblema = "https://logodetimes.com/times/sport-recife/logo-sport-recife-256.png";
    }
    else if(time.includes("vasco")){
        emblema = "https://logodetimes.com/times/vasco-da-gama/logo-vasco-da-gama-256.png"
    }
    else if(time.includes("athletico")){
        emblema = "https://logodetimes.com/times/atletico-paranaense/logo-atletico-paranaense-256.png"
    }
    else if(time.includes("atletico-mg")){
        emblema = "https://static.flashscore.com/res/image/data/WbSJHDh5-pCk2vaSD.png"
    }
    else if(time.includes("fulham")){
        emblema = "https://upload.wikimedia.org/wikipedia/pt/1/13/Fulham_FC.svg"
    }
    else if(time.includes("altos")){
        emblema = "https://upload.wikimedia.org/wikipedia/pt/d/df/Associação_Atlética_de_Altos.png"
    }
    else if(time.includes("manaus")){
        emblema = "http://www.santacruzpe.com.br/wp-content/uploads/2021/05/manaus-escudo.png"
    }
    else if(time.includes("goias")){
        emblema = "https://logodetimes.com/times/goias/logo-goias-esporte-clube-256.png"
    }
    else if(time.includes("bragantino")){
        emblema = "https://logodetimes.com/times/red-bull-bragantino/logo-red-bull-bragantino-256.png"
    }
    else if(time.includes("democrata")){
        emblema = "https://upload.wikimedia.org/wikipedia/pt/e/ec/ECDemocrata.png"
    }
    else if(time.includes("newclastle")){
        emblema = "https://logodetimes.com/times/newcastle-united-football-club/newcastle-united-football-club-256.png"
    }
    else if(time.includes("newcastle")){
        emblema = "https://logodetimes.com/times/newcastle-united-football-club/newcastle-united-football-club-256.png"
    }
    else if(time.includes("aston")){
        emblema  = "https://logodetimes.com/times/aston-villa-football-club/aston-villa-football-club-256.png"
    }
    else if(time.includes("paysandu")){
        emblema = "https://logodetimes.com/times/paysandu/logo-paysandu-5.png"
    }
    else if(time.includes("river-plate")){
        emblema = "https://logodetimes.com/times/river-plate/logo-river-plate-5.png"
    }
    else if(time.includes("colombia")){
        emblema = "https://logodetimes.com/times/colombia/selecao-colombiana-de-futebol-256.png"
    }
    else if(time.includes("coreia-do-sul")){
        emblema = "https://logodetimes.com/times/coreia-do-sul/selecao-sul-coreana-de-futebol-256.png"
    }
    else if(time.includes("boca-juniors")){
        emblema = "https://logodetimes.com/times/club-atletico-boca-juniors/club-atletico-boca-juniors-256.png"
    }
    else if(time.includes("floresta")){
        emblema = "https://s.sde.globo.com/media/organizations/2023/05/01/Floresta_Esporte_Clube.svg"
    }
    else if(time.includes("racing")){
        emblema = "https://static.flashscore.com/res/image/data/6T5YTkZA-OCiVKiPK.png"
    }
    else if(time.includes("central-cordoba")){
        emblema = "https://static.flashscore.com/res/image/data/Awt3olyS-OY0kP8mI.png"
    }
    else if(time.includes("londrina")){
        emblema = "https://static.flashscore.com/res/image/data/ADUlTugl-UNa46UTC.png"
    }
    else if(time.includes("brasil")){
        emblema = "https://static.flashscore.com/res/image/data/hCaVxehl-88LAtdNt.png"
    }
    else if(time.includes("panama")){
        emblema = "https://static.flashscore.com/res/image/data/GjtXYjcM-6yXdouA1.png"
    }
    else if(time.includes("alemanha")){
        emblema = "https://static.flashscore.com/res/image/data/zP226aXg-fB4vYUZp.png"
    }
    else if(time.includes("marrocos")){
        emblema = "https://static.flashscore.com/res/image/data/byRvSVil-hOurGDLS.png"
    }
    else if(time.includes("inter-miami")){
        emblema = "https://api.sofascore.app/api/v1/team/337602/image"
    }
    else if(time.includes("atlanta-united")){
        emblema = "https://api.sofascore.app/api/v1/team/243211/image"
    }
    else if(time.includes("chicago-sky")){
        emblema = "https://api.sofascore.app/api/v1/team/35546/image"
    }
    else if(time.includes("rb-leipzig")){
        emblema = "https://api.sofascore.app/api/v1/team/36360/image"
    }
    else if(time.includes("udinese")){
        emblema = "https://api.sofascore.app/api/v1/team/2695/image"
    }
    else if(time.includes("noruega")){
        emblema = "https://api.sofascore.app/api/v1/team/4475/image"
    }
    else if(time.includes("nova-zelandia")){
        emblema = "https://api.sofascore.app/api/v1/team/4227/image"
    }
    else if(time.includes("filipinas")){
        emblema = "https://api.sofascore.app/api/v1/team/4791/image"
    }
    else if(time.includes("suica")){
        emblema = "https://api.sofascore.app/api/v1/team/4699/image"
    }
    else if(time.includes("las-vegas-ace")){
        emblema = "https://api.sofascore.app/api/v1/team/35550/image"
    }
    else if(time.includes("estados-unidos")){
        emblema = "https://logodetimes.com/times/estados-unidos/selecao-de-futebol-dos-estados-unidos-256.png"
    }
    else if(time.includes("holanda")){
        emblema = "https://logodetimes.com/times/holanda/selecao-holandesa-de-futebol-256.png"
    }
    else if(time.includes("crystal-palace")){
        emblema = "https://logodetimes.com/times/crystal-palace-football-club/crystal-palace-football-club-256.png"
    }
    else if(time.includes("brighton")){
        emblema = "https://logodetimes.com/times/brighton-hove-albion-football-club/brighton-hove-albion-football-club-256.png"
    }
    else if(time.includes("canada")){
        emblema = "https://logodetimes.com/times/canada/selecao-canadense-de-futebol-256.png"
    }
    else if(time.includes("irlanda")){
        emblema = "https://upload.wikimedia.org/wikipedia/commons/4/45/Flag_of_Ireland.svg"
    }
    else if(time.includes("lion-city-sailors")){
        emblema = "https://static.flashscore.com/res/image/data/67RQUJjl-pW3pRTln.png"
    }
    else if(time.includes("millonarios")){
        emblema = "https://static.flashscore.com/res/image/data/COAjhCg5-MJNCagMC.png"
    }
    else if(time.includes("argentina")){
        emblema = "https://static.flashscore.com/res/image/data/xQCUe9zB-AmY8ktbk.png"
    }
    else if(time.includes("africa-do-sul")){
        emblema = "https://static.flashscore.com/res/image/data/Kfq8aDCr-xQxQqqtQ.png"
    }
    else if(time.includes("australia")){
        emblema = "https://static.flashscore.com/res/image/data/Ygu7zgHG-YNb3oHYR.png"
    }
    else if(time.includes("vietna")){
        emblema = "https://static.flashscore.com/res/image/data/rZCKbaFa-QHeKqeWC.png"
    }
    else if(time.includes("nigeria")){
        emblema = "https://static.flashscore.com/res/image/data/OIzTC8fM-CEPH9Bbd.png"
    }
    else if(time.includes("portugal")){
        emblema = "https://static.flashscore.com/res/image/data/IBvrXaZg-vZG58BBc.png"
    }
    else if(time.includes("stade-rennais")){
        emblema = "https://static.flashscore.com/res/image/data/IsanuwAr-Y5eozcI6.png"
    }
    else if(time.includes("west-ham")){
        emblema = "https://static.flashscore.com/res/image/data/Qo3RdMjl-ARW4wdCc.png"
    }
    else if(time.includes("hoffenheim")){
        emblema = "https://static.flashscore.com/res/image/data/I3cMF7f5-n7lWn9DL.png"
    }
    else if(time.includes("rangers")){
        emblema = "https://static.flashscore.com/res/image/data/v7C7fDfM-fFCBVa82.png"
    }
    else if(time.includes("borussia-monchengladbach")){
        emblema = "https://static.flashscore.com/res/image/data/rDRx1VXg-ncmj9JbF.png"
    }
    else if(time.includes("stuttgart")){
        emblema = "https://static.flashscore.com/res/image/data/x0YB6veM-86lnAaq9.png"
    }
    else if(time.includes("stoke-city")){
        emblema = "https://static.flashscore.com/res/image/data/W4N0OQZA-UXSECOAa.png"
    }
    else if(time.includes("everton")){
        emblema = "https://static.flashscore.com/res/image/data/EwJqZUZA-0jUEaeqq.png"
    }
    else if(time.includes("ajax")){
        emblema = "https://static.flashscore.com/res/image/data/dlKzA3il-tSCQr0DR.png"
    }
    else if(time.includes("augsburg")){
        emblema = "https://static.flashscore.com/res/image/data/6ZUvwjgl-Qmnf8wEL.png"
    }
    else if(time.includes("wolverhampton")){
        emblema = "https://static.flashscore.com/res/image/data/Iwsrq5xS-CjV6Eptm.png"
    }
    else if(time.includes("celtic")){
        emblema = "https://static.flashscore.com/res/image/data/6BtM40Br-xGFNNID8.png"
    }
    else if(time.includes("bayern-de-munique")){
        emblema = "https://static.flashscore.com/res/image/data/bLImRoyB-xQOIafxi.png"
    }
    else if(time.includes("betis")){
        emblema = "https://static.flashscore.com/res/image/data/hvyaw5HG-zkU5wiAr.png"
    }
    else if(time.includes("burnley")){
        emblema = "https://static.flashscore.com/res/image/data/UaPJjYBr-6PhTI7J6.png"
    }
    else if(time.includes("psg")){
        emblema = "https://static.flashscore.com/res/image/data/EskJufg5-06Ua3sOf.png"
    }
    else if(time.includes("cerezo-osaka")){
        emblema = "https://static.flashscore.com/res/image/data/UPIOwxZA-8l3GGez7.png"
    }
    else if(time.includes("kawasaki")){
        emblema = "https://static.flashscore.com/res/image/data/SnclEAg5-j758IH5f.png"
    }
    

    return emblema;
}

module.exports = router;