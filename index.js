
var http = require('http');
const util = require('util')
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "juanY2Uw@",
  database: "renting_suggest",
  insecureAuth : true
});

var identifiers = [3577089, 3577107, 3577102, 3577150, 3577159];

var GeocoderGeonames = require('geocoder-geonames'),
    geocoder = new GeocoderGeonames({
      username: 'juankav89',
    });

    con.connect(function(err) {
        if (err) throw err;

        geocoder.get('search',{
            q: 'Aruba'
        })
        .then(function(response){
            // console.log(Object.keys(response.geonames));
            response.geonames.forEach(element => {
                if (identifiers.includes(element.geonameId)) {
                    var sql = "INSERT INTO \`suggest\`"+
                    "(\`geonameid\`, \`name\`, \`asciiname\`, \`alternatenames\`,"+
                    "\`iata\`, \`latitude\`, \`longitude\`, \`fclass\`,"+
                    "\`fcode\`, \`country\`, \`countryName\`, \`countrygeonameid\`,"+
                    " \`population\`, \`hasOffice\`)"+
                    "VALUES ("+element.geonameId+", '"+element.name+"', '"+
                    element.name+"', '"+element.name+"', 'AUA', "+element.lat+", "+element.lng+
                    ", '"+element.fcl+"', '"+element.fcode+"', '"+element.countryCode+"', '"+element.countryName+
                    "', "+element.countryId+", "+element.population+", 1);";

                    // response {
                    //   adminCode1: '00',
                    //   toponymName: 'Oranjestad',
                    //   countryId: '3577279',
                    //   fcl: 'P',
                    //   population: 29998,
                    //   countryCode: 'AW',
                      
                    //   fclName: 'city, village,...',
                    //   countryName: 'Aruba',
                    //   fcodeName: 'capital of a political entity',
                    //   adminName1: '',
                    //   fcode: 'PPLC'
                    // }

  // geonameid: 3577154,
  //   name: 'Oranjestad',
  //   asciiname: 'Oranjestad',
  //   alternatenames: "Gorad Aran'estad, Oran'estad, Oranestad, Oraniestat, Oranjestad, Oranjestad pa Aruba, Oranjestad på Aruba, Oranjestadas, Oranjestade, Oranjestado, Oranjested, Oranjestêd, ao la nie si ta de, awrnjstad, olanyeseutateu, oraniesutaddo, oraniyecuttatu, oranjestada, xo ran yes tad, Οράνιεστατ, Горад Араньестад, Оранестад, Ораньестад, Ораньєстад, Орањестад, אורנייסטאד, أورنجستاد, اورنجستاد, اورنجسٹیڈ، اروبا, ओरांजेश्टाड, ஒரானியெசுத்தாடு, โอรันเยสตัด, ორანესტადი, オラニエスタッド, 奥拉涅斯塔德, 오라녜스타트",
  //   iata: 'AUA',
  //   data: '{"ar": "أورنجستاد", "de": "Oranjestad", "en": "Oranjestad", "es": "Oranjestad", "fr": "Oranjestad", "it": "Oranjestad", "ja": "オラニエスタッド", "ko": "오라녜스타트", "nl": "Oranjestad", "pt": "Oranjestad"}',
  //   latitude: 12.52398,
  //   longitude: -70.02703,
  //   fclass: 'P',
  //   fcode: 'PPLC',
  //   country: 'AW',
  //   countryName: 'Aruba',
  //   countryData: '{"ar": "آروبا", "de": "Aruba", "en": "Aruba", "es": "Aruba", "fr": "Aruba", "it": "Aruba", "ja": "アルバ島", "ko": "아루바", "nl": "Aruba", "pt": "Aruba"}',
  //   countrygeonameid: 3577279,
  //   admin1geonameid: null,
  //   adminName1: '',
  //   adminData: '{"xx": "xx"}',
  //   admin1: '00',
  //   admin2: '',
  //   population: 29998,
  //   timezone: 'America/Aruba',
  //   moddate: 2010-12-07T05:00:00.000Z,
  //   hasOffice: 1,
  //   schedule: '{"1": [{"close": "2300", "opening": "600"}], "2": [{"close": "2300", "opening": "600"}], "3": [{"close": "2300", "opening": "600"}], "4": [{"close": "2300", "opening": "600"}], "5": [{"close": "2300", "opening": "600"}], "6": [{"close": "2300", "opening": "600"}], "7": [{"close": "2300", "opening": "600"}]}'
  // }

                  con.query(sql, function (err, result, fields) {
                    if (err) throw err;
                    console.log("Record inserted");
                  }); 
                }   
            });
        })
        .catch(function(error){
            console.log("error", error);
        });
      });

      

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
}).listen(8080); 


