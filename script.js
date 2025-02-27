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

        await this.sendMessage('Адик байке, с праздником! 🌟', 'received');
        await this.sleep(1500);

        await this.sendMessage('У меня для Вас особенный сюрприз... 🎁', 'received');
        await this.sleep(1000);

        await this.showChoices([
            { text: '🤔 А кто это?', value: 'about' },
            { text: '✨ Интересно!', value: 'wish' },
            { text: '😊 Что за сюрприз?', value: 'what' }
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
        await this.sendMessage('Я Ваш праздничный помощник! ✨', 'received');
        await this.sleep(1500);
        await this.sendMessage('Знаю о Вашей любви к философии и глубоким размышлениям... 🎭', 'received');
        await this.sleep(1500);
        await this.showChoices([
            { text: '🎁 Жду сюрприз!', value: 'wish' },
            { text: '✨ Расскажите ещё', value: 'more' }
        ]);
    }

    async moreSequence() {
        await this.sendMessage('Знаете, что в Вас восхищает больше всего? 🌟', 'received');
        await this.sleep(1500);
        await this.sendMessage('Ваша способность находить простые решения в сложных ситуациях... 🎯', 'received');
        await this.sleep(1500);
        await this.sendMessage('И то, как Вы вдохновляете окружающих своим примером! ✨', 'received');
        await this.sleep(1500);
        await this.wishSequence();
    }

    async wishSequence() {
        await this.sendMessage('Приготовьтесь к чему-то особенному! 🌟', 'received');
        await this.sleep(1500);
        
        const wishes = [
            '✨ Ваш пример вдохновляет и мотивирует окружающих',
            '🎭 Ваш философский взгляд на мир помогает видеть красоту в простом',
            '💫 Продолжайте менять мир своими идеями и мыслями',
            '🌟 Ваша способность находить решения восхищает',
            '🌈 Пусть каждый день приносит новые открытия',
            '🚀 Пусть все Ваши мечты воплощаются в реальность!'
        ];

        for (let wish of wishes) {
            await this.sendMessage(wish, 'received');
            await this.sleep(2000);
        }

        await this.sleep(1000);
        await this.sendSpecialMessage('С Днем Рождения, Адик байке! 🎂✨');
        await this.sleep(1000);
        
        await this.showChoices([
            { text: '❤️ Спасибо!', value: 'thanks' },
            { text: '✨ Как красиво!', value: 'amazing' }
        ]);
    }

    async whatSequence() {
        await this.sendMessage('Это Ваш особенный праздничный сюрприз! 🎁', 'received');
        await this.sleep(1500);
        await this.sendMessage('Давайте создадим праздничное настроение! ✨', 'received');
        await this.sleep(1500);
        await this.wishSequence();
    }

    async endSequence() {
        await this.sendMessage('Это было очень душевно! 🌟', 'received');
        await this.sleep(1500);
        await this.sendMessage('Пусть этот день будет наполнен радостью и вдохновением! ✨', 'received');
        await this.sleep(1500);
        await this.sendSpecialMessage('До новых встреч, Адик байке! 🌟');
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
