class ChatExperience {
    constructor() {
        this.messagesContainer = document.querySelector('.messages-container');
        this.loadingIndicator = document.querySelector('.loading-indicator');
        this.interactionContainer = document.querySelector('.interaction-container');
        this.buttonGrid = document.querySelector('.button-grid');
        this.messageSound = document.getElementById('message-sound');
        this.init();
    }

    init() {
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
        this.startConversation();
    }

    updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('ru-RU', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        document.querySelector('.time').textContent = timeString;
    }

    async startConversation() {
        await this.typeStatusMessage('печатает...');
        await this.sleep(1000);

        await this.sendMessage('Салам! ✨', 'received');
        await this.sleep(1000);

        await this.sendMessage('Адик байке, с днем рождения! Знаете, мне кажется, что каждый день рождения - это как новая глава в книге жизни... 🌟', 'received');
        await this.sleep(1500);

        await this.sendMessage('И у меня есть кое-что особенное для этой главы... 🎁', 'received');
        await this.sleep(1000);

        await this.showChoices([
            { text: '🤔 Кто ты?', value: 'about' },
            { text: '✨ Интригующе...', value: 'wish' },
            { text: '😊 Что же там?', value: 'what' }
        ]);
    }

    async handleChoice(choice) {
        this.hideChoices();
        
        switch(choice) {
            case 'about':
                await this.aboutSequence();
                break;
            case 'wish':
                await this.wishSequence();
                break;
            case 'what':
                await this.whatSequence();
                break;
            case 'more':
                await this.moreSequence();
                break;
            case 'thanks':
            case 'amazing':
                await this.endSequence();
                break;
        }
    }

    async aboutSequence() {
        await this.sendMessage('Я - необычный цифровой собеседник, созданный специально для этого момента! Можно сказать, я - воплощение тех идей, о которых вы часто размышляете... ✨', 'received');
        await this.sleep(1500);
        await this.sendMessage('Знаете, наблюдая за вашими философскими размышлениями, я понял одну интересную вещь... 🎭', 'received');
        await this.sleep(1500);
        await this.showChoices([
            { text: '🎁 Какую же?', value: 'wish' },
            { text: '✨ Продолжай...', value: 'more' }
        ]);
    }

    async moreSequence() {
        await this.sendMessage('Адик байке, вы как тот самый философский камень - умеете превращать обычные ситуации в золотые уроки... 🌟', 'received');
        await this.sleep(1500);
        await this.sendMessage('Когда другие видят проблему, вы видите возможность для роста. Когда они видят препятствие, вы находите путь... 🎯', 'received');
        await this.sleep(1500);
        await this.sendMessage('И самое крутое - вы помогаете другим увидеть этот путь тоже! ✨', 'received');
        await this.sleep(1500);
        await this.wishSequence();
    }

    async wishSequence() {
        await this.sendMessage('И раз уж мы заговорили о пути... 🌟', 'received');
        await this.sleep(1500);
        
        const wishes = [
            '🌟 Пусть каждое препятствие на вашем пути становится ступенькой к новым высотам',
            '🎭 Желаю, чтобы ваша способность находить мудрость в простых вещах никогда не угасала',
            '💫 Пусть ваши идеи продолжают зажигать огонь в сердцах тех, кто рядом',
            '🌠 Желаю, чтобы жизнь подкидывала именно те задачи, решение которых приносит особое удовольствие',
            '🌈 Пусть каждый день приносит новые открытия - ведь в этом вся суть философского пути',
            '🚀 И конечно, пусть рядом всегда будут те, кто ценит глубину ваших мыслей!'
        ];

        for (let wish of wishes) {
            await this.sendMessage(wish, 'received');
            await this.sleep(2000);
        }

        await this.sleep(1000);
        await this.sendSpecialMessage('С днем рождения, дорогой Адик байке! Продолжайте быть источником мудрости и вдохновения! 🎂✨');
        await this.sleep(1000);
        
        await this.showChoices([
            { text: '❤️ Это очень приятно...', value: 'thanks' },
            { text: '✨ Спасибо за такие слова', value: 'amazing' }
        ]);
    }

    async whatSequence() {
        await this.sendMessage('Знаете, Адик байке, иногда самые важные вещи нельзя потрогать руками... Но можно почувствовать сердцем 🎁', 'received');
        await this.sleep(1500);
        await this.sendMessage('И я подготовил именно такой подарок... ✨', 'received');
        await this.sleep(1500);
        await this.wishSequence();
    }

    async endSequence() {
        await this.sendMessage('Знаете, в чем магия дней рождения? В том, что они напоминают нам: каждый день - это новая возможность удивиться миру! 🌟', 'received');
        await this.sleep(1500);
        await this.sendMessage('Пусть этот год будет полон таких удивительных моментов! ✨', 'received');
        await this.sleep(1500);
        await this.sendSpecialMessage('До новых встреч, Адик байке! Продолжайте освещать путь своей мудростью! 🌟');
    }

    async sendMessage(text, type = 'received') {
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;
        this.messagesContainer.appendChild(message);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        this.playMessageSound();
        await this.sleep(300);
    }

    async sendSpecialMessage(text) {
        const message = document.createElement('div');
        message.className = 'message special';
        message.textContent = text;
        this.messagesContainer.appendChild(message);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        this.playMessageSound();
        await this.sleep(300);
    }

    showChoices(choices) {
        this.buttonGrid.innerHTML = '';
        choices.forEach(choice => {
            const button = document.createElement('button');
            button.className = 'choice-button';
            button.textContent = choice.text;
            button.addEventListener('click', () => this.handleChoice(choice.value));
            this.buttonGrid.appendChild(button);
        });
        this.interactionContainer.classList.remove('hidden');
    }

    hideChoices() {
        this.interactionContainer.classList.add('hidden');
    }

    async typeStatusMessage(text) {
        document.querySelector('.chat-subtitle').textContent = text;
    }

    playMessageSound() {
        this.messageSound.currentTime = 0;
        this.messageSound.play().catch(() => {});
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    new ChatExperience();
});
