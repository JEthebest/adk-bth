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

        await this.sendMessage('Адик байке, с днем рождения! 🌟', 'received');
        await this.sleep(1500);

        await this.sendMessage('Тут кое-что для тебя приготовлено... 🎁', 'received');
        await this.sleep(1000);

        await this.showChoices([
            { text: '🤔 А кто это?', value: 'about' },
            { text: '✨ Давай!', value: 'wish' },
            { text: '😊 Что там?', value: 'what' }
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
        await this.sendMessage('Я твой праздничный помощник, Адик байке! ✨', 'received');
        await this.sleep(1500);
        await this.sendMessage('Знаю, что ты любишь философию и глубокие разговоры... 🎭', 'received');
        await this.sleep(1500);
        await this.showChoices([
            { text: '🎁 Интересно!', value: 'wish' },
            { text: '✨ А что еще знаешь?', value: 'more' }
        ]);
    }

    async moreSequence() {
        await this.sendMessage('Знаешь, Адик байке, что в тебе особенно круто? 🌟', 'received');
        await this.sleep(1500);
        await this.sendMessage('То, как ты находишь простые решения в сложных ситуациях... 🎯', 'received');
        await this.sleep(1500);
        await this.sendMessage('И как умеешь поддержать и вдохновить других! ✨', 'received');
        await this.sleep(1500);
        await this.wishSequence();
    }

    async wishSequence() {
        await this.sendMessage('Приготовься к поздравлению, Адик байке! 🌟', 'received');
        await this.sleep(1500);
        
        const wishes = [
            '🌟 Желаю тебе всегда оставаться таким же крутым и находчивым',
            '🎭 Пусть твой философский взгляд помогает видеть интересное в простых вещах',
            '💫 Продолжай вдохновлять других своими идеями',
            '🌠 Пусть все задуманное получается легко и просто',
            '🌈 Побольше новых открытий и классных моментов',
            '🚀 И конечно же, пусть все мечты сбываются!'
        ];

        for (let wish of wishes) {
            await this.sendMessage(wish, 'received');
            await this.sleep(2000);
        }

        await this.sleep(1000);
        await this.sendSpecialMessage('С днем рождения, Адик байке! 🎂✨');
        await this.sleep(1000);
        
        await this.showChoices([
            { text: '❤️ Спасибо!', value: 'thanks' },
            { text: '✨ Как классно!', value: 'amazing' }
        ]);
    }

    async whatSequence() {
        await this.sendMessage('Это твой праздничный сюрприз, Адик байке! 🎁', 'received');
        await this.sleep(1500);
        await this.sendMessage('Сейчас все увидишь... ✨', 'received');
        await this.sleep(1500);
        await this.wishSequence();
    }

    async endSequence() {
        await this.sendMessage('Было приятно поздравить тебя! 🌟', 'received');
        await this.sleep(1500);
        await this.sendMessage('Пусть этот день будет особенным! ✨', 'received');
        await this.sleep(1500);
        await this.sendSpecialMessage('До встречи, Адик байке! 🌟');
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
