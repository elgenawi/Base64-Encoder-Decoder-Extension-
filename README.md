# Base64 Encoder & Decoder Pro v2.0

A modern, feature-rich Chrome extension for encoding and decoding Base64 text with a beautiful dark theme interface.

## 🌟 Features

### Core Functionality
- **Encode**: Convert plain text to Base64 format
- **Decode**: Convert Base64 back to plain text
- **Auto-detection**: Automatically detects input type and suggests appropriate action
- **Real-time validation**: Validates Base64 format before decoding

### User Interface
- **Modern dark theme** with gradient backgrounds
- **Responsive design** that works on different screen sizes
- **Smooth animations** and hover effects
- **Intuitive button highlighting** based on input type
- **Character counter** with visual feedback
- **Clean, professional layout**

### Enhanced Functionality
- **One-click copy** to clipboard
- **Paste from clipboard** functionality
- **Select all text** with single click
- **Clear text** functionality
- **Format output** (Base64 line breaks, JSON formatting)
- **Download results** as text files
- **Toast notifications** for user feedback
- **Status messages** with different types (success, error, warning, info)

### Keyboard Shortcuts
- **Ctrl+E**: Encode text
- **Ctrl+D**: Decode text
- **Ctrl+L**: Clear text
- **Ctrl+C**: Copy (standard)
- **Ctrl+V**: Paste (standard)
- **Ctrl+A**: Select All (standard)

### Settings & Customization
- **Auto-detect input type**: Toggle automatic detection
- **Character count display**: Show/hide character counter
- **Keyboard shortcuts**: Enable/disable shortcuts
- **Auto-copy results**: Automatically copy after encode/decode
- **Format Base64 output**: Add line breaks for readability
- **Toast notifications**: Control popup notifications
- **Status messages**: Control status panel messages

## 🚀 Installation

### From Source (Development)
1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The extension icon should appear in your toolbar

### From Chrome Web Store
*Coming soon - extension will be published to the Chrome Web Store*

## 📖 Usage

### Basic Operations
1. **Click the extension icon** in your Chrome toolbar
2. **Enter text** in the input field
3. **Click Encode** to convert plain text to Base64
4. **Click Decode** to convert Base64 back to plain text
5. Use the **Copy button** to copy results to clipboard

### Advanced Features
- **Auto-detection**: The extension will highlight the suggested action based on your input
- **Format button**: Clean up Base64 with line breaks or format JSON
- **Download button**: Save your results as a text file
- **Settings**: Click the gear icon to customize behavior

### Keyboard Shortcuts
For power users, use keyboard shortcuts for faster operation:
- `Ctrl+E` to encode
- `Ctrl+D` to decode
- `Ctrl+L` to clear
- Standard copy/paste shortcuts work as expected

## 🎨 Design Features

### Color Scheme
- **Primary**: Purple/blue gradient (#667eea to #764ba2)
- **Accent**: Pink gradient (#f093fb)
- **Background**: Dark theme with multiple shades
- **Text**: High contrast white/gray for accessibility

### Animations
- **Smooth transitions** on all interactive elements
- **Button hover effects** with scale and shadow
- **Slide-in animations** for status messages
- **Toast notifications** with slide-in from right

### Accessibility
- **High contrast** text and backgrounds
- **Focus indicators** for keyboard navigation
- **Screen reader friendly** with proper ARIA labels
- **Reduced motion** support for users with vestibular disorders

## 🔧 Technical Details

### File Structure
```
base64-extension/
├── manifest.json          # Extension configuration
├── popup.html            # Main popup interface
├── options.html          # Settings page
├── styles.css            # Modern CSS with CSS variables
├── script.js             # Main application logic
├── options.js            # Settings page logic
├── README.md             # This file
└── images/
    ├── icon.png          # Extension icon
    └── gearWheel.png     # Settings icon
```

### Browser Compatibility
- **Chrome**: Manifest V3 compatible
- **Edge**: Full compatibility
- **Other Chromium browsers**: Should work with Manifest V3 support

### Permissions Used
- `clipboardWrite`: For copy functionality
- `storage`: For saving user preferences
- `offline_enabled`: Works without internet connection

## 🔄 Changelog

### Version 2.0.0 (Current)
- **Complete redesign** with modern dark theme
- **Enhanced user interface** with better spacing and typography
- **Auto-detection** of input type
- **Keyboard shortcuts** support
- **Settings page** with customizable options
- **Toast notifications** for better user feedback
- **Download functionality** for saving results
- **Format functionality** for better output readability
- **Improved error handling** and validation
- **Accessibility improvements**
- **Responsive design** for different screen sizes

### Version 1.5.2 (Previous)
- Basic encode/decode functionality
- Simple interface
- Copy and clear operations

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and test thoroughly
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Development Setup
1. Clone the repository
2. Make your changes
3. Load the extension in Chrome for testing
4. Test all functionality before submitting

### Code Style
- Use modern ES6+ JavaScript
- Follow the existing CSS variable naming convention
- Maintain the dark theme design language
- Add comments for complex functionality

## 🐛 Bug Reports

If you find a bug, please create an issue with:
- **Steps to reproduce** the issue
- **Expected behavior**
- **Actual behavior**
- **Browser version** and operating system
- **Screenshots** if applicable

## 💡 Feature Requests

Have an idea for a new feature? Create an issue with:
- **Clear description** of the feature
- **Use case** explaining why it would be useful
- **Mockups or examples** if applicable

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Font Awesome** for the beautiful icons
- **Google Fonts** for the Inter font family
- **Chrome Extension APIs** for the platform capabilities
- **Original Base64 Extension** for the inspiration

## 📞 Support

- **GitHub Issues**: For bug reports and feature requests
- **Email**: [Your email for support]
- **Documentation**: This README file

---

**Made with ❤️ for better Base64 handling in Chrome**
