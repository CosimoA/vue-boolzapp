/*
Descrizione:
https://docs.google.com/document/d/1n7zAM-rjfdqDIzszFA1F6pSZDL4LADU4w8k1RAl8kzM/edit?usp=sharing
*/

const { createApp } = Vue;

createApp({
    data() {
        return {
            contacts: [
                {
                    name: 'Michele',
                    avatar: './img/avatar_1.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },{
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },{
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },{
                    name: 'Fabio',
                    avatar: './img/avatar_2.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },{
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },{
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },{
                    name: 'Samuele',
                    avatar: './img/avatar_3.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },{
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },{
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },{
                    name: 'Alessandro B.',
                    avatar: './img/avatar_4.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },{
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },{
                    name: 'Alessandro L.',
                    avatar: './img/avatar_5.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },{
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },{
                    name: 'Claudia',
                    avatar: './img/avatar_6.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },{
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },{
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },{
                    name: 'Federico',
                    avatar: './img/avatar_7.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },{
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },{
                    name: 'Davide',
                    avatar: './img/avatar_8.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },{
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },{
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ],
            // Contatto selezionato
            selectedContact: null,
            // Array nuovi messaggi quando utente scrive messaggi nuovi
            newMessage: "",
        }
    },
    methods: {

        // Funzione per richiamare i dati dall'array
        ottieniDatiContatti() {
            return this.contacts.map((contatto) => ({
                nome: contatto.name,
                avatar: contatto.avatar,
                ultimoMessaggio: contatto.messages.length > 0 ? contatto.messages[contatto.messages.length - 1].message : '',
                dataUltimoMessaggio: contatto.messages.length > 0 ? contatto.messages[contatto.messages.length - 1].date : '',
                messages: contatto.messages
            }));
        },

        // Funzione per selezionare i contatti dalla lista al click
        selectContact(contact) {
            this.selectedContact = contact;
        },

        // Funzione per abbinare la classe sent or received in CSS
        getMessageClass(message) {
            return message.status === "sent" ? "messaggio-sent" : "messaggio-received";
        },

        // Funzione per formattare l'acquisizione della data e ricavare solo l'orario
        getHourFromDate(dateString) {
            const [datePart, timePart] = dateString.split(" ");
            const [hours, minutes] = timePart.split(":");
            return `${hours}:${minutes}`;
        },

        // Funzione invia messaggio
        inviaMessaggio() {
            if (this.newMessage !== "") {
                const nuovoMessaggio = {
                    date: new Date().toLocaleString(),
                    message: this.newMessage,
                    status: "sent",
                };
                this.selectedContact.messages.push(nuovoMessaggio);
                this.newMessage = "";

                // Simula la risposta "ok" dopo 1 secondo
                setTimeout(() => {
                    const rispostaOk = {
                        date: new Date().toLocaleString(),
                        message: "Ok!",
                        status: "received",
                    };
                    this.selectedContact.messages.push(rispostaOk);
                }, 1000);
            }
        },
    },
    mounted() {
        // Seleziona il primo contatto al caricamento della pagina
        if (this.contacts.length > 0) {
            this.selectedContact = this.ottieniDatiContatti()[0];
        }
    }
}).mount('#app');