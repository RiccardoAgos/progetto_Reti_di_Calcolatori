process.env.NTBA_FIX_319 = 1;


const TelegramBot = require('node-telegram-bot-api');


const http = require('https');

//token del bot
const token ='1959846275:AAHq5diZG5CC4YvFy5sVbcMq5MazZHQCib4';


// URL OpenSky network
const OpenSkynetworkAppId ='https://opensky-network.org/api';

const bot = new TelegramBot(token, {polling: true});



bot.on("polling_error", (err) => console.log(err));


//funzione sleep
function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds){
			break;
		}
	}
}

//variabili 

//contatoreTotale usato per scorrere tutto il vettore
var contatoreTotale = 0;
	
//contatoreCaratteri usato per evitare di superare i 4096 caratteri a messaggio
var contatoreCaratteri = -1;

//contatore usato per tenere conto dei messaggi
var contatoreMessaggi = 0;	

//contatore usato per scorrere tutto il vettore
var contatore = 0;

//contatoreAereiStampati usato per conteggiare il numero di aerei originari 
//dalla stessa nazione stampati
var contatoreAereiStampati = 0;

//contatoreAereiNonStampati usato per conteggiare il numero di aerei originari 
//dalla stessa nazione non stampati
var contatoreAereiNonStampati = 0;

var i = 0;

//variabile usata per capire se vi sono aerei nel vettore	
var esito = false;

//variabile usata per capire se vi sono troppi aerei da stampare	
var termina = false;

//variabile usata per uscire dal programma quando i servizi offerti  
//dal sito non sono disponibili
var esci = false;

//variabile usata per verificare la stampa
var stampa = false;

//variabile usata per evitare le ripetizioni nella stampa degli aerei
var controllo = "pippo";


//comando /location
bot.onText(/\/location (.*)/, (msg, match) => {
	const chatId = msg.chat.id;
	const location = match[1] ? match[1] : "";

	

	//creazione del vettore multidimensionale
	var posizioni = new Array();
	for(i=0;i<90;i++){
		posizioni[i] = new Array();
	}
	i=0;


	posizioni[0][0]="Russian Federation";
	//latitudine massima
	posizioni[0][1]=82.16;
	//latitudine minima
	posizioni[0][2]=41.18;
	//longitudine massima
	posizioni[0][3]=19.61;
	//longitudine minima
	posizioni[0][4]=-168.97;
	//grandezza
	posizioni[0][5]=17100000;


	posizioni[1][0]="Uzbekistan";
	//latitudine massima
	posizioni[1][1]=45.59;
	//latitudine minima
	posizioni[1][2]=37.17;
	//longitudine massima
	posizioni[1][3]=73.14;
	//longitudine minima
	posizioni[1][4]=55.99;
	//grandezza
	posizioni[1][5]=447400;
	
	posizioni[2][0]="Trinidad and Tobago";
	//latitudine massima
	posizioni[2][1]=11.40;
	//latitudine minima
	posizioni[2][2]=9.99;
	//longitudine massima
	posizioni[2][3]=-61.97;
	//longitudine minima
	posizioni[2][4]=-60.45;
	//grandezza
	posizioni[2][5]=5128;

	posizioni[3][0]="Denmark";
	//latitudine massima
	posizioni[3][1]=50.02;
	//latitudine minima
	posizioni[3][2]=54.03;
	//longitudine massima
	posizioni[3][3]=15.22;
	//longitudine minima
	posizioni[3][4]=7.85;
	//grandezza
	posizioni[3][5]=43094;

	posizioni[4][0]="Iraq";
	//latitudine massima
	posizioni[4][1]=37.38;
	//latitudine minima
	posizioni[4][2]=29.06;
	//longitudine massima
	posizioni[4][3]=48.63;
	//longitudine minima
	posizioni[4][4]=38.79;
	//grandezza
	posizioni[4][5]=437072;

	posizioni[5][0]="Turkey";
	//latitudine massima
	posizioni[5][1]=42.36;
	//latitudine minima
	posizioni[5][2]=35.80;
	//longitudine massima
	posizioni[5][3]=44.81;
	//longitudine minima
	posizioni[5][4]=25.53;
	//grandezza
	posizioni[5][5]=780580;

	posizioni[6][0]="Israel";
	//latitudine massima
	posizioni[6][1]=33.33;
	//latitudine minima
	posizioni[6][2]=29.47;
	//longitudine massima
	posizioni[6][3]=35.89;
	//longitudine minima
	posizioni[6][4]=34.26;
	//grandezza
	posizioni[6][5]=20770;

	posizioni[7][0]="Belgium";
	//latitudine massima
	posizioni[7][1]=51.50;
	//latitudine minima
	posizioni[7][2]=49.49;
	//longitudine massima
	posizioni[7][3]=6.40;
	//longitudine minima
	posizioni[7][4]=2.52;
	//grandezza
	posizioni[7][5]=30510;

	posizioni[8][0]="Serbia";
	//latitudine massima
	posizioni[8][1]=46.19;
	//latitudine minima
	posizioni[8][2]=42.23;
	//longitudine massima
	posizioni[8][3]=23.0;
	//longitudine minima
	posizioni[8][4]=18.83;
	//grandezza
	posizioni[8][5]=88361;

	posizioni[9][0]="San Marino";
	//latitudine massima
	posizioni[9][1]=43.99;
	//latitudine minima
	posizioni[9][2]=43.89;
	//longitudine massima
	posizioni[9][3]=12.51;
	//longitudine minima
	posizioni[9][4]=12.40;
	//grandezza
	posizioni[9][5]=61.2;

	posizioni[10][0]="Indonesia";
	//latitudine massima
	posizioni[10][1]=6.21;
	//latitudine minima
	posizioni[10][2]=-11.10;
	//longitudine massima
	posizioni[10][3]=141.04;
	//longitudine minima
	posizioni[10][4]=94.73;
	//grandezza
	posizioni[10][5]=1919440;

	posizioni[11][0]="China";
	//latitudine massima
	posizioni[11][1]=53.56;
	//latitudine minima
	posizioni[11][2]=17.99;
	//longitudine massima
	posizioni[11][3]=134.77;
	//longitudine minima
	posizioni[11][4]=73.49;
	//grandezza
	posizioni[11][5]=9596960;

	posizioni[12][0]="Japan";
	//latitudine massima
	posizioni[12][1]=45.64;
	//latitudine minima
	posizioni[12][2]=20.35;
	//longitudine massima
	posizioni[12][3]=154.00;
	//longitudine minima
	posizioni[12][4]=122.85;
	//grandezza
	posizioni[12][5]=377835;

	posizioni[13][0]="Slovakia";
	//latitudine massima
	posizioni[13][1]=49.61;
	//latitudine minima
	posizioni[13][2]=47.73;
	//longitudine massima
	posizioni[13][3]=22.55;
	//longitudine minima
	posizioni[13][4]=16.83;
	//grandezza
	posizioni[13][5]=48845;

	posizioni[14][0]="Pakistan";
	//latitudine massima
	posizioni[14][1]=37.08;
	//latitudine minima
	posizioni[14][2]=23.63;
	//longitudine massima
	posizioni[14][3]=77.83;
	//longitudine minima
	posizioni[14][4]=60.87;
	//grandezza
	posizioni[14][5]=803940;

	posizioni[15][0]="Ireland";
	//latitudine massima
	posizioni[15][1]=55.46;
	//latitudine minima
	posizioni[15][2]=51.30;
	//longitudine massima
	posizioni[15][3]=-5.66;
	//longitudine minima
	posizioni[15][4]=-10.76;
	//grandezza
	posizioni[15][5]=70280;

	posizioni[16][0]="Morocco";
	//latitudine massima
	posizioni[16][1]=35.93;
	//latitudine minima
	posizioni[16][2]=27.66;
	//longitudine massima
	posizioni[16][3]=-1;
	//longitudine minima
	posizioni[16][4]=-13.30;
	//grandezza
	posizioni[16][5]=446550;

	posizioni[17][0]="New Zealand";
	//latitudine massima
	posizioni[17][1]=-28.87;
	//latitudine minima
	posizioni[17][2]=-52.72;
	//longitudine massima
	posizioni[17][3]=165.74;
	//longitudine minima
	posizioni[17][4]=-175.12;
	//grandezza
	posizioni[17][5]=268680;

	posizioni[18][0]="Islamic Republic of Iran";
	//latitudine massima
	posizioni[18][1]=39.78;
	//latitudine minima
	posizioni[18][2]=24.80;
	//longitudine massima
	posizioni[18][3]=63.33;
	//longitudine minima
	posizioni[18][4]=44.03;
	//grandezza
	posizioni[18][5]=1648000;

	posizioni[19][0]="Oman";
	//latitudine massima
	posizioni[19][1]=26.43;
	//latitudine minima
	posizioni[19][2]=16.45;
	//longitudine massima
	posizioni[19][3]=60.30;
	//longitudine minima
	posizioni[19][4]=52.00;
	//grandezza
	posizioni[19][5]=212460;

	posizioni[20][0]="Luxembourg";
	//latitudine massima
	posizioni[20][1]=50.18;
	//latitudine minima
	posizioni[20][2]=49.44;
	//longitudine massima
	posizioni[20][3]=6.53;
	//longitudine minima
	posizioni[20][4]=5.73;
	//grandezza
	posizioni[20][5]=2586;

	posizioni[21][0]="Slovenia";
	//latitudine massima
	posizioni[21][1]=46.87;
	//latitudine minima
	posizioni[21][2]=45.42;
	//longitudine massima
	posizioni[21][3]=16.61;
	//longitudine minima
	posizioni[21][4]=13.50;
	//grandezza
	posizioni[21][5]=20273;


	posizioni[22][0]="Bangladesh";
	//latitudine massima
	posizioni[22][1]=26.63;
	//latitudine minima
	posizioni[22][2]=20.61;
	//longitudine massima
	posizioni[22][3]=92.68;
	//longitudine minima
	posizioni[22][4]=88.00;
	//grandezza
	posizioni[22][5]=144000;

	posizioni[23][0]="Croatia";
	//latitudine massima
	posizioni[23][1]=46.55;
	//latitudine minima
	posizioni[23][2]=42.50;
	//longitudine massima
	posizioni[23][3]=19.44;
	//longitudine minima
	posizioni[23][4]=13.52;
	//grandezza
	posizioni[23][5]=56542;

	posizioni[24][0]="Venezuela";
	//latitudine massima
	posizioni[24][1]=12.68;
	//latitudine minima
	posizioni[24][2]=0.64;
	//longitudine massima
	posizioni[24][3]=-59.80;
	//longitudine minima
	posizioni[24][4]=-73.35;
	//grandezza
	posizioni[24][5]=912050;

	posizioni[25][0]="Ecuador";
	//latitudine massima
	posizioni[25][1]=2.29;
	//latitudine minima
	posizioni[25][2]=-5.01;
	//longitudine massima
	posizioni[25][3]=-75.18;
	//longitudine minima
	posizioni[25][4]=-92.60;
	//grandezza
	posizioni[25][5]=283560;


	posizioni[26][0]="Côte d'Ivoire";
	//latitudine massima
	posizioni[26][1]=10.74;
	//latitudine minima
	posizioni[26][2]=4.19;
	//longitudine massima
	posizioni[26][3]=-2.49;
	//longitudine minima
	posizioni[26][4]=-8.60;
	//grandezza
	posizioni[26][5]=322460;

	posizioni[27][0]="Kuwait";
	//latitudine massima
	posizioni[27][1]=30.10;
	//latitudine minima
	posizioni[27][2]=28.52;
	//longitudine massima
	posizioni[27][3]=48.51;
	//longitudine minima
	posizioni[27][4]=46.55;
	//grandezza
	posizioni[27][5]=17820;

	posizioni[28][0]="Libyan Arab Jamahiriya";
	//latitudine massima
	posizioni[28][1]=33.22;
	//latitudine minima
	posizioni[28][2]=19.50;
	//longitudine massima
	posizioni[28][3]=25.26;
	//longitudine minima
	posizioni[28][4]=9.39;
	//grandezza
	posizioni[28][5]=1759540;

	posizioni[29][0]="Cyprus";
	//latitudine massima
	posizioni[29][1]=35.70;
	//latitudine minima
	posizioni[29][2]=34.63;
	//longitudine massima
	posizioni[29][3]=34.60;
	//longitudine minima
	posizioni[29][4]=32.24;
	//grandezza
	posizioni[29][5]=9250;

	posizioni[30][0]="Kazakhstan";
	//latitudine massima
	posizioni[30][1]=55.44;
	//latitudine minima
	posizioni[30][2]=40.56;
	//longitudine massima
	posizioni[30][3]=87.31;
	//longitudine minima
	posizioni[30][4]=46.49;
	//grandezza
	posizioni[30][5]=2717300;

	posizioni[31][0]="Sri Lanka";
	//latitudine massima
	posizioni[31][1]=10.03;
	//latitudine minima
	posizioni[31][2]=5.68;
	//longitudine massima
	posizioni[31][3]=82.14;
	//longitudine minima
	posizioni[31][4]=79.26;
	//grandezza
	posizioni[31][5]=65610;

	posizioni[32][0]="Singapore";
	//latitudine massima
	posizioni[32][1]=1.47;
	//latitudine minima
	posizioni[32][2]=1.14;
	//longitudine massima
	posizioni[32][3]=104.09;
	//longitudine minima
	posizioni[32][4]=103.59;
	//grandezza
	posizioni[32][5]=692.7;

	posizioni[33][0]="Ukraine";
	//latitudine massima
	posizioni[33][1]=52.37;
	//latitudine minima
	posizioni[33][2]=44.29;
	//longitudine massima
	posizioni[33][3]=40.22;
	//longitudine minima
	posizioni[33][4]=22.13;
	//grandezza
	posizioni[33][5]=603700;

	posizioni[34][0]="Malaysia";
	//latitudine massima
	posizioni[34][1]=7.51;
	//latitudine minima
	posizioni[34][2]=0.85;
	//longitudine massima
	posizioni[34][3]=119.40;
	//longitudine minima
	posizioni[34][4]=98.93;
	//grandezza
	posizioni[34][5]=329750;

	posizioni[35][0]="Czech Republic";
	//latitudine massima
	posizioni[35][1]=51.05;
	//latitudine minima
	posizioni[35][2]=48.55;
	//longitudine massima
	posizioni[35][3]=18.85;
	//longitudine minima
	posizioni[35][4]=12.09;
	//grandezza
	posizioni[35][5]=78866;

	posizioni[36][0]="Senegal";
	//latitudine massima
	posizioni[36][1]=16.69;
	//latitudine minima
	posizioni[36][2]=12.26;
	//longitudine massima
	posizioni[36][3]=-11.34;
	//longitudine minima
	posizioni[36][4]=-17.68;
	//grandezza
	posizioni[36][5]=196190;

	posizioni[37][0]="Nepal";
	//latitudine massima
	posizioni[37][1]=30.44;
	//latitudine minima
	posizioni[37][2]=26.34;
	//longitudine massima
	posizioni[37][3]=88.20;
	//longitudine minima
	posizioni[37][4]=80.05;
	//grandezza
	posizioni[37][5]=140800;

	posizioni[38][0]="Lebanon";
	//latitudine massima
	posizioni[38][1]=34.69;
	//latitudine minima
	posizioni[38][2]=33.05;
	//longitudine massima
	posizioni[38][3]=36.62;
	//longitudine minima
	posizioni[38][4]=35.07;
	//grandezza
	posizioni[38][5]=10400;

	posizioni[39][0]="Bahrain";
	//latitudine massima
	posizioni[39][1]=26.33;
	//latitudine minima
	posizioni[39][2]=25.53;
	//longitudine massima
	posizioni[39][3]=50.85;
	//longitudine minima
	posizioni[39][4]=50.34;
	//grandezza
	posizioni[39][5]=665;

	posizioni[40][0]="Taiwan";
	//latitudine massima
	posizioni[40][1]=26.45;
	//latitudine minima
	posizioni[40][2]=20.51;
	//longitudine massima
	posizioni[40][3]=123.5;
	//longitudine minima
	posizioni[40][4]=116.66;
	//grandezza
	posizioni[40][5]=35980;

	posizioni[41][0]="Ethiopia";
	//latitudine massima
	posizioni[41][1]=14.89;
	//latitudine minima
	posizioni[41][2]=3.40;
	//longitudine massima
	posizioni[41][3]=48.00;
	//longitudine minima
	posizioni[41][4]=32.99;
	//grandezza
	posizioni[41][5]=1127127;

	posizioni[42][0]="Latvia";
	//latitudine massima
	posizioni[42][1]=58.08;
	//latitudine minima
	posizioni[42][2]=55.67;
	//longitudine massima
	posizioni[42][3]=28.24;
	//longitudine minima
	posizioni[42][4]=20.84;
	//grandezza
	posizioni[42][5]=64589;

	posizioni[43][0]="Qatar";
	//latitudine massima
	posizioni[43][1]=26.21;
	//latitudine minima
	posizioni[43][2]=24.47;
	//longitudine massima
	posizioni[43][3]=51.67;
	//longitudine minima
	posizioni[43][4]=50.72;
	//grandezza
	posizioni[43][5]=11437;

	posizioni[44][0]="Republic of Korea";
	//latitudine massima
	posizioni[44][1]=43.01;
	//latitudine minima
	posizioni[44][2]=33.00;
	//longitudine massima
	posizioni[44][3]=131.16;
	//longitudine minima
	posizioni[44][4]=124.17;
	//grandezza
	posizioni[44][5]=219020;

	posizioni[45][0]="Egypt";
	//latitudine massima
	posizioni[45][1]=31.81;
	//latitudine minima
	posizioni[45][2]=21.99;
	//longitudine massima
	posizioni[45][3]=37.05;
	//longitudine minima
	posizioni[45][4]=24.69;
	//grandezza
	posizioni[45][5]=1001450;

	posizioni[46][0]="United States";
	//latitudine massima
	posizioni[46][1]=71.53;
	//latitudine minima
	posizioni[46][2]=18.77;
	//longitudine massima
	posizioni[46][3]=170.59;
	//longitudine minima
	posizioni[46][4]=-121.88;
	//grandezza
	posizioni[46][5]=9629091;

	posizioni[47][0]="Guatemala";
	//latitudine massima
	posizioni[47][1]=17.81;
	//latitudine minima
	posizioni[47][2]=13.63;
	//longitudine massima
	posizioni[47][3]=-88.19;
	//longitudine minima
	posizioni[47][4]=-92.27;
	//grandezza
	posizioni[47][5]=108890;

	posizioni[48][0]="Malta";
	//latitudine massima
	posizioni[48][1]=36.08;
	//latitudine minima
	posizioni[48][2]=35.79;
	//longitudine massima
	posizioni[48][3]=14.57;
	//longitudine minima
	posizioni[48][4]=14.18;
	//grandezza
	posizioni[48][5]=316;

	posizioni[49][0]="Kenya";
	//latitudine massima
	posizioni[49][1]=5.03;
	//latitudine minima
	posizioni[49][2]=-4.72;
	//longitudine massima
	posizioni[49][3]=41.90;
	//longitudine minima
	posizioni[49][4]=33.90;
	//grandezza
	posizioni[49][5]=582650;

	posizioni[50][0]="Lithuania";
	//latitudine massima
	posizioni[50][1]=56.45;
	//latitudine minima
	posizioni[50][2]=53.89;
	//longitudine massima
	posizioni[50][3]=26.83;
	//longitudine minima
	posizioni[50][4]=20.93;
	//grandezza
	posizioni[50][5]=65200;

	
	posizioni[51][0]="Panama";
	//latitudine massima
	posizioni[51][1]=9.71;
	//latitudine minima
	posizioni[51][2]=7.04;
	//longitudine massima
	posizioni[51][3]=-77.15;
	//longitudine minima
	posizioni[51][4]=-83.05;
	//grandezza
	posizioni[51][5]=78200;

	posizioni[52][0]="Azerbaijan";
	//latitudine massima
	posizioni[52][1]=41.95;
	//latitudine minima
	posizioni[52][2]=38.39;
	//longitudine massima
	posizioni[52][3]=50.74;
	//longitudine minima
	posizioni[52][4]=44.76;
	//grandezza
	posizioni[52][5]=86600;

	posizioni[53][0]="Republic of Moldova";
	//latitudine massima
	posizioni[53][1]=48.49;
	//latitudine minima
	posizioni[53][2]=45.46;
	//longitudine massima
	posizioni[53][3]=30.16;
	//longitudine minima
	posizioni[53][4]=26.61;
	//grandezza
	posizioni[53][5]=33843;

	posizioni[54][0]="Thailand";
	//latitudine massima
	posizioni[54][1]=20.46;
	//latitudine minima
	posizioni[54][2]=5.61;
	//longitudine massima
	posizioni[54][3]=105.63;
	//longitudine minima
	posizioni[54][4]=97.34;
	//grandezza
	posizioni[54][5]=514000;

	posizioni[55][0]="Chile";
	//latitudine massima
	posizioni[55][1]=-17.49;
	//latitudine minima
	posizioni[55][2]=-56.14;
	//longitudine massima
	posizioni[55][3]=-66.33;
	//longitudine minima
	posizioni[55][4]=-110.02;
	//grandezza
	posizioni[55][5]=756950;

	posizioni[56][0]="Germany";
	//latitudine massima
	posizioni[56][1]=55.08;
	//latitudine minima
	posizioni[56][2]=47.27;
	//longitudine massima
	posizioni[56][3]=15.04;
	//longitudine minima
	posizioni[56][4]=5.86;
	//grandezza
	posizioni[56][5]=357021;

	posizioni[57][0]="Switzerland";
	//latitudine massima
	posizioni[57][1]=47.80;
	//latitudine minima
	posizioni[57][2]=45.81;
	//longitudine massima
	posizioni[57][3]=10.49;
	//longitudine minima
	posizioni[57][4]=5.95;
	//grandezza
	posizioni[57][5]=41290;

	posizioni[58][0]="United Kingdom";
	//latitudine massima
	posizioni[58][1]=60.91;
	//latitudine minima
	posizioni[58][2]=34.56;
	//longitudine massima
	posizioni[58][3]=33.91;
	//longitudine minima
	posizioni[58][4]=-8.89;
	//grandezza
	posizioni[58][5]=2448200;

	posizioni[59][0]="Canada";
	//latitudine massima
	posizioni[59][1]=83.63;
	//latitudine minima
	posizioni[59][2]=41.67;
	//longitudine massima
	posizioni[59][3]=-50.97;
	//longitudine minima
	posizioni[59][4]=-141.00;
	//grandezza
	posizioni[59][5]=9984670;

	posizioni[60][0]="Mexico";
	//latitudine massima
	posizioni[60][1]=32.71;
	//latitudine minima
	posizioni[60][2]=14.38;
	//longitudine massima
	posizioni[60][3]=-86.58;
	//longitudine minima
	posizioni[60][4]=-118.65;
	//grandezza
	posizioni[60][5]=1972550;

	posizioni[61][0]="Estonia";
	//latitudine massima
	posizioni[61][1]=59.73;
	//latitudine minima
	posizioni[61][2]=57.50;
	//longitudine massima
	posizioni[61][3]=28.21;
	//longitudine minima
	posizioni[61][4]=21.65;
	//grandezza
	posizioni[61][5]=45226;

	posizioni[62][0]="Brazil";
	//latitudine massima
	posizioni[62][1]=5.27;
	//latitudine minima
	posizioni[62][2]=-34.08;
	//longitudine massima
	posizioni[62][3]=-28.65;
	//longitudine minima
	posizioni[62][4]=-73.98;
	//grandezza
	posizioni[62][5]=8511965;

	posizioni[63][0]="Portugal";
	//latitudine massima
	posizioni[63][1]=42.15;
	//latitudine minima
	posizioni[63][2]=32.28;
	//longitudine massima
	posizioni[63][3]=-6.19;
	//longitudine minima
	posizioni[63][4]=-31.46;
	//grandezza
	posizioni[63][5]=92391;

	posizioni[64][0]="France";
	//latitudine massima
	posizioni[64][1]=51.12;
	//latitudine minima
	posizioni[64][2]=41.32;
	//longitudine massima
	posizioni[64][3]=9.66;
	//longitudine minima
	posizioni[64][4]=-5.55;
	//grandezza
	posizioni[64][5]=547030;

	posizioni[65][0]="Austria";
	//latitudine massima
	posizioni[65][1]=47.02;
	//latitudine minima
	posizioni[65][2]=46.37;
	//longitudine massima
	posizioni[65][3]=17.16;
	//longitudine minima
	posizioni[65][4]=9.53;
	//grandezza
	posizioni[65][5]=83858;

	posizioni[66][0]="Spain";
	//latitudine massima
	posizioni[66][1]=43.85;
	//latitudine minima
	posizioni[66][2]=27.49;
	//longitudine massima
	posizioni[66][3]=4.63;
	//longitudine minima
	posizioni[66][4]=-18.26;
	//grandezza
	posizioni[66][5]=504782;

	posizioni[67][0]="Hungary";
	//latitudine massima
	posizioni[67][1]=48.58;
	//latitudine minima
	posizioni[67][2]=45.73;
	//longitudine massima
	posizioni[67][3]=22.89;
	//longitudine minima
	posizioni[67][4]=16.11;
	//grandezza
	posizioni[67][5]=93030;

	posizioni[68][0]="Kingdom of the Netherlands";
	//latitudine massima
	posizioni[68][1]=53.63;
	//latitudine minima
	posizioni[68][2]=50.75;
	//longitudine massima
	posizioni[68][3]=7.22;
	//longitudine minima
	posizioni[68][4]=3.33;
	//grandezza
	posizioni[68][5]=41526;

	posizioni[69][0]="Iceland";
	//latitudine massima
	posizioni[69][1]=67.24;
	//latitudine minima
	posizioni[69][2]=62.48;
	//longitudine massima
	posizioni[69][3]=-12.23;
	//longitudine minima
	posizioni[69][4]=-26.25;
	//grandezza
	posizioni[69][5]=103000;

	posizioni[70][0]="Greece";
	//latitudine massima
	posizioni[70][1]=41.74;
	//latitudine minima
	posizioni[70][2]=34.54;
	//longitudine massima
	posizioni[70][3]=29.65;
	//longitudine minima
	posizioni[70][4]=19.30;
	//grandezza
	posizioni[70][5]=131940;

	posizioni[71][0]="Dominican Republic";
	//latitudine massima
	posizioni[71][1]=19.97;
	//latitudine minima
	posizioni[71][2]=17.36;
	//longitudine massima
	posizioni[71][3]=-68.25;
	//longitudine minima
	posizioni[71][4]=-72.00;
	//grandezza
	posizioni[71][5]=48730;

	posizioni[72][0]="India";
	//latitudine massima
	posizioni[72][1]=35.50;
	//latitudine minima
	posizioni[72][2]=6.46;
	//longitudine massima
	posizioni[72][3]=97.39;
	//longitudine minima
	posizioni[72][4]=68.10;
	//grandezza
	posizioni[72][5]=3287590;

	posizioni[73][0]="Romania";
	//latitudine massima
	posizioni[73][1]=48.26;
	//latitudine minima
	posizioni[73][2]=43.61;
	//longitudine massima
	posizioni[73][3]=29.77;
	//longitudine minima
	posizioni[73][4]=20.26;
	//grandezza
	posizioni[73][5]=237500;

	posizioni[74][0]="Argentina";
	//latitudine massima
	posizioni[74][1]=-21.78;
	//latitudine minima
	posizioni[74][2]=-55.12;
	//longitudine massima
	posizioni[74][3]=-53.63;
	//longitudine minima
	posizioni[74][4]=-73.56;
	//grandezza
	posizioni[74][5]=2766890;

	posizioni[75][0]="Australia";
	//latitudine massima
	posizioni[75][1]=-9.18;
	//latitudine minima
	posizioni[75][2]=-54.83;
	//longitudine massima
	posizioni[75][3]=159.28;
	//longitudine minima
	posizioni[75][4]=110.95;
	//grandezza
	posizioni[75][5]=7686850;

	posizioni[76][0]="Philippines";
	//latitudine massima
	posizioni[76][1]=19.93;
	//latitudine minima
	posizioni[76][2]=4.22;
	//longitudine massima
	posizioni[76][3]=127.64;
	//longitudine minima
	posizioni[76][4]=116.14;
	//grandezza
	posizioni[76][5]=300000;

	posizioni[77][0]="Jordan";
	//latitudine massima
	posizioni[77][1]=33.37;
	//latitudine minima
	posizioni[77][2]=29.18;
	//longitudine massima
	posizioni[77][3]=39.30;
	//longitudine minima
	posizioni[77][4]=34.94;
	//grandezza
	posizioni[77][5]=92300;

	posizioni[78][0]="Poland";
	//latitudine massima
	posizioni[78][1]=54.90;
	//latitudine minima
	posizioni[78][2]=49.00;
	//longitudine massima
	posizioni[78][3]=24.14;
	//longitudine minima
	posizioni[78][4]=14.12;
	//grandezza
	posizioni[78][5]=312685;

	posizioni[79][0]="Bulgaria";
	//latitudine massima
	posizioni[79][1]=44.21;
	//latitudine minima
	posizioni[79][2]=41.23;
	//longitudine massima
	posizioni[79][3]=28.72;
	//longitudine minima
	posizioni[79][4]=22.35;
	//grandezza
	posizioni[79][5]=110910;

	posizioni[80][0]="South Africa";
	//latitudine massima
	posizioni[80][1]=-22.12;
	//latitudine minima
	posizioni[80][2]=-47.13;
	//longitudine massima
	posizioni[80][3]=38.22;
	//longitudine minima
	posizioni[80][4]=16.28;
	//grandezza
	posizioni[80][5]=1219912;

	posizioni[81][0]="Norway";
	//latitudine massima
	posizioni[81][1]=71.30;
	//latitudine minima
	posizioni[81][2]=57.80;
	//longitudine massima
	posizioni[81][3]=31.35;
	//longitudine minima
	posizioni[81][4]=4.06;
	//grandezza
	posizioni[81][5]=324220;

	posizioni[82][0]="Finland";
	//latitudine massima
	posizioni[82][1]=70.09;
	//latitudine minima
	posizioni[82][2]=59.69;
	//longitudine massima
	posizioni[82][3]=31.58;
	//longitudine minima
	posizioni[82][4]=20.45;
	//grandezza
	posizioni[82][5]=337030;

	posizioni[83][0]="Algeria";
	//latitudine massima
	posizioni[83][1]=37.22;
	//latitudine minima
	posizioni[83][2]=18.96;
	//longitudine massima
	posizioni[83][3]=11.99;
	//longitudine minima
	posizioni[83][4]=-8.66;
	//grandezza
	posizioni[83][5]=2381740;

	posizioni[84][0]="Colombia";
	//latitudine massima
	posizioni[84][1]=13.51;
	//latitudine minima
	posizioni[84][2]=-4.22;
	//longitudine massima
	posizioni[84][3]=-66.85;
	//longitudine minima
	posizioni[84][4]=-81.83;
	//grandezza
	posizioni[84][5]=1138910;

	posizioni[85][0]="Sweden";
	//latitudine massima
	posizioni[85][1]=69.05;
	//latitudine minima
	posizioni[85][2]=55.00;
	//longitudine massima
	posizioni[85][3]=24.17;
	//longitudine minima
	posizioni[85][4]=10.57;
	//grandezza
	posizioni[85][5]=449964;

	posizioni[86][0]="Saudi Arabia";
	//latitudine massima
	posizioni[86][1]=32.15;
	//latitudine minima
	posizioni[86][2]=16.00;
	//longitudine massima
	posizioni[86][3]=55.66;
	//longitudine minima
	posizioni[86][4]=34.52;
	//grandezza
	posizioni[86][5]=1960582;

	posizioni[87][0]="Tunisia";
	//latitudine massima
	posizioni[87][1]=37.53;
	//latitudine minima
	posizioni[87][2]=30.22;
	//longitudine massima
	posizioni[87][3]=11.59;
	//longitudine minima
	posizioni[87][4]=7.52;
	//grandezza
	posizioni[87][5]=163610;

	
	posizioni[88][0]="United Arab Emirates";
	//latitudine massima
	posizioni[88][1]=26.07;
	//latitudine minima
	posizioni[88][2]=22.63;
	//longitudine massima
	posizioni[88][3]=56.43;
	//longitudine minima
	posizioni[88][4]=51.47;
	//grandezza
	posizioni[88][5]=82880;

	posizioni[89][0]="Italy";
	//latitudine massima
	posizioni[89][1]=47.9;
	//latitudine minima
	posizioni[89][2]=35.48;
	//longitudine massima
	posizioni[89][3]=18.79;
	//longitudine minima
	posizioni[89][4]=6.62;
	//grandezza
	posizioni[89][5]=301230;


	http.get('https://opensky-network.org/api/states/all?'+location, (res)=> {
		let rawDat = '';
		res.on('data', (chunk) => { rawDat += chunk; });
		res.on('end',() =>{


		try{

			const parsedData = JSON.parse(rawDat);

			//variabile messages 
			var messages = [];

			var i = 0;

			//varibile grandezzaMinore usata per trovare la nazione corretta 
			var grandezzaMinore = 1000000000;

			//variabile nazioneSatmpe usata per salvare la nazione corretta
			var nazioneStampa = 0;


			//ciclo while che permette di scorrere tutto il vettore
			while(parsedData.states[contatoreTotale] != null)
			{
				//condizione che ci permette di contare quanti aerei ci sono 
				//(della stessa nazione d'origine) anche senza stamparli
				if(parsedData.states[contatoreTotale][2] == location)
				{
					contatoreAereiNonStampati++;
				}
				if(termina == false)
				{

					//condizione di ricerca 
					if(parsedData.states[contatoreTotale][2] == location)
					{
						esito = true;
						
						if((parsedData.states[contatoreTotale][6] == null)||((parsedData.states[contatoreTotale][5] == null)))
						{
							messages.push(
								"\nicao24:"+parsedData.states[contatoreTotale][0]+
								"\nposizione: NON TROVATA");

							//incremento contatori
							contatoreCaratteri++;

						}else{

							//blocco di ricerca della posizione esatta dell'aereo
							for(i=0;i<90;i++)
							{
								//condizione per la longitudine
								if((parsedData.states[contatoreTotale][5] >= posizioni[i][4])&&(parsedData.states[contatoreTotale][5] <= posizioni[i][3]))
								{
									//condizione per la latitudine
									if((parsedData.states[contatoreTotale][6] >= posizioni[i][2])&&(parsedData.states[contatoreTotale][6] <= posizioni[i][1]))
									{		
									//ricerca della nazione corretta								
										if(posizioni[i][5] <= grandezzaMinore)
										{
											grandezzaMinore = posizioni[i][5];
											nazioneStampa = i;

											stampa = true;

										}
									}
										
								}
							}
							if(stampa == true)
							{
								messages.push(
									"\nicao24:"+parsedData.states[contatoreTotale][0]+
									"\nposizione: "+posizioni[nazioneStampa][0]);
									
								//incremento contatore
								contatoreCaratteri++;

								stampa = false;

							}else
							{
								messages.push(
											"\nicao24:"+parsedData.states[contatoreTotale][0]+
											"\nposizione: NON TROVATA");

								//incremento contatori
								contatoreCaratteri++;
							}
							
						}
						//condizione che permette di inviare messaggi tramite i comandi 
						//sendMessage e join, avviene ogni 35 aerei caricati tramite il 
						//comando push sulla variabile messages
						if(contatoreCaratteri == 35)
						{
								
							//invio messaggio, tramite i comandi sendMessage e join
							bot.sendMessage(chatId, messages.join("\n"));
							var messages = [];
																
							//riporto il contatore al valore di partenza
							contatoreCaratteri = -1;

							//incremento contatore
							contatoreMessaggi++;

							//condizione per evitare che il programma vada in "429 too many request"
							if(contatoreMessaggi == 50)
							{
								sleep(1500);
								contatoreMessaggi = 0;
								termina = true;
							}
						}

						grandezzaMinore = 1000000000;

						//incremento contatore
						contatoreAereiStampati++;
						
					}						
				}
				
				//incremento contatore
				contatoreTotale++;

				
			}

		}catch(e)
		{
			bot.sendMessage(chatId,"SERVIZI OFFERTI DAL SITO NON DISPONIBILI AL MOMENTO ");
			esci = true;
		}


		if(termina == false)
		{
			//condizione che permette di inviare l'ultimo messaggio 
			//riguardante gli aerei (se vi è)
			if(contatoreCaratteri != -1)
			{
				bot.sendMessage(chatId, messages.join("\n"));
			}	
		}



		if(esito == true)
		{

			//invio dell'ultimo messaggio con informazioni relative al numero totale 
			//di aerei originari della nazione richiesta
			if(termina == true)
			{
					
				sleep(20000);
				bot.sendMessage(chatId,
					"\nNazione d'origine:"+location+
					"\nNon è stato possibile stampare tutti gli aerei.\nCAUSA LIMITAZIONI TELEGRAM\nNe sono stati stampati "
					+contatoreAereiStampati+" su "+
					contatoreAereiNonStampati+" complessivi");
			}else
			{
					
				sleep(20000);
				bot.sendMessage(chatId,
					"Numero di aerei totali: "+contatoreAereiStampati+
						"\nNazione d'origine: "+location);
			}
		}else if(esci == false)
		{
				bot.sendMessage(chatId,"\nNon sono state trovate corrispondenze, motivi:\n-Sintassi errata [/location Italy] lettera iniziale della nazione maiuscola\n-Non ci sono aerei originari da quella nazione in questo momento");
		}
	});
	}).on ('error', (e) => {
		bot.sendMessage(chatId,"errore2" + e.message);
	});
	
	//valori iniziali
	contatoreTotale = 0;
	contatoreMessaggi = 0;
	contatoreAereiStampati = 0;
	contatoreAereiNonStampati = 0;
	contatoreCaratteri = -1;
	esito = false;
	termina = false;
	esci = false;
	stampa = false;

});



//comando /nation 
bot.onText(/\/nation/, (msg, match) => {
	const chatId = msg.chat.id;
	const nation = match[1] ? match[1] : "";

	bot.sendMessage(chatId,"LISTA DELLE NAZIONI PRESENTI\nsu OpenSky network\nItaly\nUnited Arab Emirates\nBangladesh\nTrinidad and Tobago\nUnited States\nDenmark\nIraq\nTurkey\nIsrael\nBelgium\nSerbia\nSan Marino\nIndonesia\nChina\nJapan\nSlovakia\nPakistan\nIreland\nMorocco\nNew Zealand\nIslamic Republic of Iran\nOman\nLuxembourg\nSlovenia\nRussian Federation\nCroatia\nVenezuela\nEcuador\nCôte d'Ivoire\nKuwait\nLibyan Arab Jamahiriya\nCyprus\nKazakhstan\nSri Lanka\nSingapore\nUkraine\nMalaysia\nCzech Republic\nSenegal\nNepal\nLebanon\nBahrain\nTaiwan\nEthiopia\nLatvia\nQatar\nRepublic of Korea\nEgypt\nUzbekistan\nGuatemala\nMalta\nKenya\nLithuania\nBelarus\nPanama\nAzerbaijan\nRepublic of Moldova\nThailand\nChile\nGermany\nSwitzerland\nUnited Kingdom\nCanada\nMexico\nEstonia\nBrazil\nPortugal\nFrance\nAustria\nSpain\nHungary\nKingdom of the Netherlands\nIceland\nGreece\nDominican Republic\nIndia\nRomania\nArgentina\nAustralia\nPhilippines\nJordan\nPoland\nBulgaria\nSouth Africa\nNorway\nFinland\nAlgeria\nColombia\nSweden\nSaudi Arabia\nTunisia");
});


