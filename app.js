
const app = Vue.createApp({

    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: [],
        };
    },

    computed: {
        monsterbarstyle() {
            if (this.monsterHealth <0) {
                return { width: '0%' };
            }
            return {width: this.monsterHealth + '%'};
        },
        playerbarstyle() {
            if (this.playerHealth <0) {
                return { width: '0%' };
            }
            return {width: this.playerHealth + '%'};
        },
        mayusespecialattack() {
            return this.currentRound % 3 !== 0;
        }
    },

    watch: {

        playerHealth(value) {
            if(value <= 0 && this.monsterHealth <= 0) {
                this.winner ='draw';
            } else if (value <= 0) {
                this.winner ='monster';
            }
        },
        monsterHealth(value) {
            if(value <= 0 && this.playerHealth <= 0) {
                this.winner ='draw';
            } else if (value <= 0) {
                this.winner ='player';
            }
        },
    },

    methods : {

        attackMonster() {
            this.currentRound++;
            const attackValue = Math.floor(Math.random() * (12 -5)) + 5;
            this.monsterHealth = this.monsterHealth - attackValue;
            this.addMessage('player', 'attack', attackValue);
            this.attackPlayer();
        },

        attackPlayer() {
            const attackValue = Math.floor(Math.random() * (15 -5)) + 8;
            this.playerHealth = this.playerHealth - attackValue;
            this.addMessage('monster', 'attack', attackValue);
        },

        specialattackMonster() {
            this.currentRound++;
            const attackValue = Math.floor(Math.random() * (25 -10)) + 10;
            this.monsterHealth = this.monsterHealth - attackValue;
            this.addMessage('player', 'attack', attackValue);
            this.attackPlayer();
        },

        healPlayer() {
            const healValue = Math.floor(Math.random() * (25 -8)) + 8;
            if (this.playerHealth + healValue > 100) { ;
                this.playerHealth = 100;
            } else {
            this.playerHealth = this.playerHealth + healValue;
            }
            this.addMessage('player', 'heal', healValue);
            this.attackPlayer();
        },
        startGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
            this.currentRound = 0;
            this.logMessages = [];
        },
        surrender(){
            this.winner = 'monster';
        },
        addMessage(who, what, value){

            this.logMessages.push({
                actionBy: who,
                actionType: what,
                actionValue: value,
            });

        },

    }

});

app.mount('#game');