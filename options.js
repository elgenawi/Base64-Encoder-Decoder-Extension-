/**
 * Options/Settings page for Base64 Encoder & Decoder Pro
 */

class SettingsManager {
    constructor() {
        this.defaultSettings = {
            autoDetect: true,
            showCharCount: true,
            keyboardShortcuts: true,
            autoCopy: false,
            formatOutput: false,
            showToasts: true,
            showStatus: true
        };
        this.settings = { ...this.defaultSettings };
        this.init();
    }

    async init() {
        await this.loadSettings();
        this.bindElements();
        this.attachEventListeners();
        this.updateUI();
    }

    bindElements() {
        this.elements = {
            backBtn: document.getElementById('backBtn'),
            resetBtn: document.getElementById('resetBtn'),
            toggleSwitches: document.querySelectorAll('.toggle-switch')
        };
    }

    attachEventListeners() {
        // Back button
        this.elements.backBtn.addEventListener('click', () => {
            window.close();
        });

        // Reset button
        this.elements.resetBtn.addEventListener('click', () => {
            this.resetSettings();
        });

        // Toggle switches
        this.elements.toggleSwitches.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const setting = toggle.dataset.setting;
                this.toggleSetting(setting, toggle);
            });
        });
    }

    async loadSettings() {
        try {
            const result = await chrome.storage.sync.get(Object.keys(this.defaultSettings));
            this.settings = { ...this.defaultSettings, ...result };
        } catch (error) {
            console.warn('Could not load settings from storage, using defaults');
            this.settings = { ...this.defaultSettings };
        }
    }

    async saveSettings() {
        try {
            await chrome.storage.sync.set(this.settings);
        } catch (error) {
            console.warn('Could not save settings to storage');
        }
    }

    updateUI() {
        this.elements.toggleSwitches.forEach(toggle => {
            const setting = toggle.dataset.setting;
            const isActive = this.settings[setting];
            
            if (isActive) {
                toggle.classList.add('active');
            } else {
                toggle.classList.remove('active');
            }
        });
    }

    toggleSetting(settingName, toggleElement) {
        this.settings[settingName] = !this.settings[settingName];
        
        if (this.settings[settingName]) {
            toggleElement.classList.add('active');
        } else {
            toggleElement.classList.remove('active');
        }
        
        this.saveSettings();
        this.showFeedback(`${this.formatSettingName(settingName)} ${this.settings[settingName] ? 'enabled' : 'disabled'}`);
    }

    async resetSettings() {
        const confirmed = confirm('Are you sure you want to reset all settings to default values?');
        
        if (confirmed) {
            this.settings = { ...this.defaultSettings };
            await this.saveSettings();
            this.updateUI();
            this.showFeedback('Settings reset to default values');
        }
    }

    formatSettingName(name) {
        return name.replace(/([A-Z])/g, ' $1').toLowerCase().replace(/^./, str => str.toUpperCase());
    }

    showFeedback(message) {
        // Create a temporary feedback element
        const feedback = document.createElement('div');
        feedback.className = 'toast success';
        feedback.style.position = 'fixed';
        feedback.style.top = '20px';
        feedback.style.right = '20px';
        feedback.style.zIndex = '1000';
        feedback.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 2000);
    }
}

// Initialize settings manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SettingsManager();
});
