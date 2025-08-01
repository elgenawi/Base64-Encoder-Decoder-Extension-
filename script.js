/**
 * Base64 Encoder & Decoder Pro
 * Modern Chrome Extension with enhanced functionality
 * Version 2.0.0
 */

class Base64App {
    constructor() {
        this.elements = {};
        this.isEncoded = false;
        this.init();
    }

    init() {
        this.bindElements();
        this.attachEventListeners();
        this.setupInitialState();
    }

    bindElements() {
        this.elements = {
            textInput: document.getElementById('textInput'),
            charCount: document.getElementById('charCount'),
            encodeBtn: document.getElementById('encodeBtn'),
            decodeBtn: document.getElementById('decodeBtn'),
            copyBtn: document.getElementById('copyBtn'),
            selectAllBtn: document.getElementById('selectAllBtn'),
            clearBtn: document.getElementById('clearBtn'),
            pasteBtn: document.getElementById('pasteBtn'),
            formatBtn: document.getElementById('formatBtn'),
            downloadBtn: document.getElementById('downloadBtn'),
            aboutBtn: document.getElementById('aboutBtn'),
            statusMessage: document.getElementById('statusMessage'),
            outputText: document.getElementById('outputText'),
            toastContainer: document.getElementById('toastContainer')
        };
    }

    attachEventListeners() {
        // Input events
        this.elements.textInput.addEventListener('input', () => this.handleInputChange());
        this.elements.textInput.addEventListener('paste', () => {
            setTimeout(() => this.handleInputChange(), 10);
        });

        // Button events
        this.elements.encodeBtn.addEventListener('click', () => this.encode());
        this.elements.decodeBtn.addEventListener('click', () => this.decode());
        this.elements.copyBtn.addEventListener('click', () => this.copyToClipboard());
        this.elements.selectAllBtn.addEventListener('click', () => this.selectAllText());
        this.elements.clearBtn.addEventListener('click', () => this.clearText());
        this.elements.pasteBtn.addEventListener('click', () => this.pasteFromClipboard());
        this.elements.formatBtn.addEventListener('click', () => this.formatOutput());
        this.elements.downloadBtn.addEventListener('click', () => this.downloadOutput());
        this.elements.aboutBtn.addEventListener('click', () => this.showAbout());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    }

    setupInitialState() {
        this.updateCharCount();
        this.updateOutputDisplay();
        this.showStatus('Ready to encode or decode Base64 text', 'info');
    }

    handleInputChange() {
        this.updateCharCount();
        this.hideStatus();
        this.detectInputType();
        this.updateOutputDisplay();
    }

    updateCharCount() {
        const count = this.elements.textInput.value.length;
        this.elements.charCount.textContent = count.toLocaleString();
        
        // Add visual feedback for character count
        if (count > 10000) {
            this.elements.charCount.style.color = 'var(--warning-color)';
        } else {
            this.elements.charCount.style.color = 'var(--text-muted)';
        }
    }

    detectInputType() {
        const text = this.elements.textInput.value.trim();
        if (!text) return;

        // Enhanced Base64 detection
        const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
        const isValidBase64 = base64Regex.test(text) && text.length % 4 === 0;
        
        if (isValidBase64 && text.length > 0) {
            try {
                atob(text);
                this.isEncoded = true;
                this.highlightButton(this.elements.decodeBtn);
            } catch (e) {
                this.isEncoded = false;
                this.highlightButton(this.elements.encodeBtn);
            }
        } else {
            this.isEncoded = false;
            this.highlightButton(this.elements.encodeBtn);
        }
    }

    highlightButton(button) {
        // Remove highlight from all buttons
        [this.elements.encodeBtn, this.elements.decodeBtn].forEach(btn => {
            btn.classList.remove('highlighted');
        });
        
        // Add highlight to suggested button
        button.classList.add('highlighted');
    }

    encode() {
        const text = this.elements.textInput.value;
        
        if (!text.trim()) {
            this.showStatus('Please enter some text to encode', 'error');
            this.elements.textInput.focus();
            return;
        }

        try {
            const encoded = btoa(unescape(encodeURIComponent(text)));
            this.elements.textInput.value = encoded;
            this.updateCharCount();
            this.updateOutputDisplay(encoded);
            this.showStatus('Text successfully encoded to Base64', 'success');
            this.showToast('Encoded successfully!', 'success');
            this.isEncoded = true;
        } catch (error) {
            this.showStatus('Error encoding text: ' + error.message, 'error');
            this.showToast('Encoding failed', 'error');
        }
    }

    decode() {
        const text = this.elements.textInput.value.trim();
        
        if (!text) {
            this.showStatus('Please enter Base64 text to decode', 'error');
            this.elements.textInput.focus();
            return;
        }

        // Validate Base64 format
        if (!this.isValidBase64(text)) {
            this.showStatus('Invalid Base64 format. Please check your input.', 'error');
            this.showToast('Invalid Base64 format', 'error');
            return;
        }

        try {
            const decoded = decodeURIComponent(escape(atob(text)));
            this.elements.textInput.value = decoded;
            this.updateCharCount();
            this.updateOutputDisplay(decoded);
            this.showStatus('Base64 successfully decoded to text', 'success');
            this.showToast('Decoded successfully!', 'success');
            this.isEncoded = false;
        } catch (error) {
            this.showStatus('Error decoding Base64: Invalid or corrupted data', 'error');
            this.showToast('Decoding failed', 'error');
        }
    }

    isValidBase64(str) {
        try {
            // Remove whitespace and check basic format
            const cleaned = str.replace(/\s/g, '');
            
            // Check if string is valid Base64
            const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
            if (!base64Regex.test(cleaned)) return false;
            
            // Check if length is divisible by 4
            if (cleaned.length % 4 !== 0) return false;
            
            // Try to decode to verify validity
            atob(cleaned);
            return true;
        } catch (e) {
            return false;
        }
    }

    async copyToClipboard() {
        const text = this.elements.textInput.value;
        
        if (!text.trim()) {
            this.showStatus('Nothing to copy', 'warning');
            return;
        }

        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
            } else {
                // Fallback for older browsers
                this.elements.textInput.select();
                document.execCommand('copy');
            }
            
            this.showStatus('Text copied to clipboard', 'success');
            this.showToast('Copied to clipboard!', 'success');
        } catch (error) {
            this.showStatus('Failed to copy text', 'error');
            this.showToast('Copy failed', 'error');
        }
    }

    selectAllText() {
        if (!this.elements.textInput.value.trim()) {
            this.showStatus('No text to select', 'warning');
            return;
        }

        this.elements.textInput.select();
        this.elements.textInput.focus();
        this.showStatus('All text selected', 'info');
    }

    clearText() {
        if (!this.elements.textInput.value.trim()) {
            this.showStatus('Text area is already empty', 'info');
            return;
        }

        this.elements.textInput.value = '';
        this.updateCharCount();
        this.updateOutputDisplay();
        this.hideStatus();
        this.elements.textInput.focus();
        this.showToast('Text cleared', 'info');
    }

    async pasteFromClipboard() {
        try {
            let text = '';
            
            if (navigator.clipboard && window.isSecureContext) {
                text = await navigator.clipboard.readText();
            } else {
                // Focus the textarea and use execCommand as fallback
                this.elements.textInput.focus();
                document.execCommand('paste');
                return;
            }
            
            if (text.trim()) {
                this.elements.textInput.value = text;
                this.handleInputChange();
                this.showStatus('Text pasted from clipboard', 'success');
                this.showToast('Pasted successfully!', 'success');
            } else {
                this.showStatus('Clipboard is empty', 'warning');
            }
        } catch (error) {
            this.showStatus('Failed to paste from clipboard', 'error');
            this.showToast('Paste failed', 'error');
        }
    }

    formatOutput() {
        const text = this.elements.textInput.value;
        if (!text.trim()) {
            this.showStatus('No text to format', 'warning');
            return;
        }

        try {
            if (this.isEncoded) {
                // Format Base64 with line breaks every 64 characters
                const formatted = text.replace(/.{64}/g, '$&\n');
                this.elements.textInput.value = formatted;
            } else {
                // Format JSON if it's JSON, otherwise just clean up whitespace
                try {
                    const parsed = JSON.parse(text);
                    this.elements.textInput.value = JSON.stringify(parsed, null, 2);
                } catch (e) {
                    // If not JSON, just clean up whitespace
                    this.elements.textInput.value = text.trim().replace(/\s+/g, ' ');
                }
            }
            
            this.updateCharCount();
            this.updateOutputDisplay();
            this.showStatus('Text formatted', 'success');
            this.showToast('Formatted successfully!', 'success');
        } catch (error) {
            this.showStatus('Error formatting text', 'error');
        }
    }

    downloadOutput() {
        const text = this.elements.textInput.value;
        if (!text.trim()) {
            this.showStatus('No text to download', 'warning');
            return;
        }

        try {
            const blob = new Blob([text], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            
            const filename = this.isEncoded ? 'base64_encoded.txt' : 'base64_decoded.txt';
            
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showStatus(`File downloaded as ${filename}`, 'success');
            this.showToast('Downloaded successfully!', 'success');
        } catch (error) {
            this.showStatus('Error downloading file', 'error');
            this.showToast('Download failed', 'error');
        }
    }

    showAbout() {
        // Open GitHub profile in a new tab
        try {
            chrome.tabs.create({ url: 'https://github.com/elgenawi' });
            this.showToast('Opening GitHub profile...', 'info');
        } catch (error) {
            // Fallback if chrome.tabs is not available
            window.open('https://github.com/elgenawi', '_blank');
            this.showToast('Opening GitHub profile...', 'info');
        }
    }

    handleKeyboardShortcuts(e) {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key.toLowerCase()) {
                case 'e':
                    e.preventDefault();
                    this.encode();
                    break;
                case 'd':
                    e.preventDefault();
                    this.decode();
                    break;
                case 'l':
                    e.preventDefault();
                    this.clearText();
                    break;
                default:
                    // Let default shortcuts (copy, paste, select all) work normally
                    break;
            }
        }
    }

    updateOutputDisplay(text = null) {
        const displayText = text || this.elements.textInput.value;
        
        if (!displayText.trim()) {
            this.elements.outputText.textContent = 'Your encoded/decoded text will appear here...';
            this.elements.outputText.classList.add('empty');
        } else {
            this.elements.outputText.textContent = displayText;
            this.elements.outputText.classList.remove('empty');
        }
    }

    showStatus(message, type = 'info') {
        this.elements.statusMessage.className = `status-message ${type}`;
        this.elements.statusMessage.querySelector('.status-text').textContent = message;
        this.elements.statusMessage.classList.remove('hidden');
        
        // Auto-hide after 5 seconds for non-error messages
        if (type !== 'error') {
            setTimeout(() => this.hideStatus(), 5000);
        }
    }

    hideStatus() {
        this.elements.statusMessage.classList.add('hidden');
    }

    showToast(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = this.getToastIcon(type);
        
        toast.innerHTML = `
            <i class="toast-icon ${icon}"></i>
            <span class="toast-message">${message}</span>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => this.removeToast(toast));
        
        this.elements.toastContainer.appendChild(toast);
        
        // Auto-remove after duration
        setTimeout(() => this.removeToast(toast), duration);
    }

    getToastIcon(type) {
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    removeToast(toast) {
        if (toast && toast.parentNode) {
            toast.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Base64App();
});

// Add CSS for highlighted buttons
const style = document.createElement('style');
style.textContent = `
    .btn.highlighted {
        transform: scale(1.02);
        box-shadow: 0 0 20px rgba(102, 126, 234, 0.4);
        border: 2px solid var(--primary-color);
    }
`;
document.head.appendChild(style);
