process.env.NTBA_FIX_319 = 1;


const TelegramBot = require('node-telegram-bot-api');


const http = require('https');

//token del bot
const token ='1959846275:AAHq5diZG5CC4YvFy5sVbcMq5MazZHQCib4';


// URL OpenSky network
const OpenSkynetworkAppId ='https://opensky-network.org/api';


const bot = new TelegramBot(token, {polling: true});



bot.on("polling_error", (err) => console.log(err));



bot.onText(/\/location (.*)/, (msg, match) => {
	const chatId = msg.chat.id;
	const location = match[1] ? match[1] : "";

	//contatoreAereiStampati usato per conteggiare il numero di aerei originari 
	//dalla stessa nazione stampati
	var contatoreAereiStampati = 0;

	//contatoreAereiNonStampati usato per conteggiare il numero di aerei originari 
	//dalla stessa nazione non stampati
	var contatoreAereiNonStampati = 0;


	http.get('https://opensky-network.org/api/states/all?origin_country='+location, (res)=> {
		let rawDat = '';
		res.on('data', (chunk) => { rawDat += chunk; });
		res.on('end',() =>{
		
		//variabili contatore 
		//contatoreTotale usato per ciclare tutto il vettore
		var contatoreTotale = 0;
		
		//contatoreCaratteri usato per evitare di superare i 4096 caratteri a messaggio
		var contatoreCaratteri = -1;

		//contatore usato per tenere conto dei messaggi
		var contatoreMessaggi = 0;	


		//funzione sleep
		function sleep(milliseconds) {
			var start = new Date().getTime();
			for (var i = 0; i < 1e7; i++) {
				if ((new Date().getTime() - start) > milliseconds){
				break;
				}
			}
		}

		//usato per uscire dal programma quando i servizi offerti  
		//dal sitonon son disponibili
		var esci = false;
		
		try{

			const parsedData = JSON.parse(rawDat);
				
			var messages =[];

			//usato per capire se vi sono aerei nel vettore	
			var esito = false;

			//usato per capire se vi sono troppi aerei da stampare	
			var termina = false;


			//ciclo while che permette di scorrere tutto il vettore
			while(parsedData.states[contatoreTotale] != null){

				//condiozne che ci permette di contare quanti aerei ci sono 
				//(della stessa nazione d'origine) anche senza stamparli
				if(parsedData.states[contatoreTotale][2] == location){
							contatoreAereiNonStampati++;
				}

				if(termina == false){

					//condizione che ci permette di andare a caricare le informazioni 
					//dentro la variabile messages (tramite il comando push)
					if(parsedData.states[contatoreTotale][2] == location){
							
						esito = true;

						//caricamento valori nella variabile messages, tramite comando push
						messages.push(
						"\nicao24:"+parsedData.states[contatoreTotale][0]+
						"\nLatitude:"+parsedData.states[contatoreTotale][6]+
						"\nLongitude:"+parsedData.states[contatoreTotale][5]);
					
						//incremento contatori
						contatoreCaratteri++;
						contatoreAereiStampati++;


						//condizione che permette di inviare messaggi tramite i comandi 
						//sendMessage e join, avviene ogni 35 aerei caricati tramite il 
						//comando push sulla variabile messages
						if(contatoreCaratteri == 35){
									
							//invio messaggio, tramite i comandi sendMessage e join
							bot.sendMessage(chatId, messages.join("\n"));
							messages = [];

							//riporto il contatore al valore di partenza
							contatoreCaratteri = -1;

							//incremento contatore
							contatoreMessaggi++;

							//condizione per evitare che il codice vada in "429 too many request"
							if(contatoreMessaggi == 50){
								sleep(1500);
								contatoreMessggi = 0;
								termina = true;
							}
						}
					}						

					//incremento contatore
					contatoreTotale++;
				}

				if(termina == false){

					//condizione che permette di inviare l'ultimo messaggio 
					//riguardante gli aerei (se vi è)
					if(messages != []){
						bot.sendMessage(chatId, messages.join("\n"));
					}
				}
			}

		}catch(e){
			bot.sendMessage(chatId,"SERVIZI OFFERTI DAL SITO NON DISPONIBILI AL MOMENTO");
			esci = true;
		}

		if(esito == true){

			//invio dell'ultimo messaggio con informazioni relative al numero totale 
			//di aerei originari della nazione richiesta
			if(termina == true){
					
				sleep(20000)
				bot.sendMessage(chatId,
					"\nNazione d'origine:"+location+
					"\nNon è stato possibile stampare tutti gli aerei.\nCAUSA LIMITAZIONI TELEGRAM\nNe sono stati stampati "
					+contatoreAereiStampati+" su "+
					contatoreAereiNonStampati+" complessivi");
				}else{
					
				sleep(20000)
				bot.sendMessage(chatId,
					"Numero di aerei totali: "+contatoreAereiStampati+
						"\nNazione d'origine:"+location);
				}
			}else if(esci == false){
				bot.sendMessage(chatId,"\nNon sono state trovate corrispondenze, motivi:\n-Sintassi errata [/location Italy] lettera iniziale della nazione maiuscola\n-Non ci sono aerei originari da quella nazione in questo momento");
			}
		});
	}).on ('error', (e) => {
		bot.sendMessage(chatId,"errore" + e.message);
	});

});



