// PricePulse - Real-Time Price Tracking Application
// ====================================================

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Global App State
const appState = {
    trackedProducts: [],
    priceAlerts: [],
    userSettings: {
        notificationsEnabled: true,
        currency: 'USD',
        alertThreshold: 10 // percentage
    }
};

// Initialize the application
function initializeApp() {
    loadTrackedProducts();
    setupEventListeners();
    updatePriceDisplay();
    setupSmoothScroll();
    initializeNotifications();
    console.log('PricePulse initialized');
}

// Load tracked products from localStorage
function loadTrackedProducts() {
    const stored = localStorage.getItem('pricepulse_products');
    if (stored) {
        appState.trackedProducts = JSON.parse(stored);
    } else {
        // Sample data for demonstration
        appState.trackedProducts = [
            {
                id: 1,
                name: 'Wireless Headphones',
                currentPrice: 89.99,
                originalPrice: 149.99,
                platform: 'Amazon',
                priceHistory: [89.99, 92.50, 95.00, 98.50],
                lastUpdated: new Date().toISOString(),
                alertPrice: 85.00
            },
            {
                id: 2,
                name: 'Smart Watch',
                currentPrice: 199.99,
                originalPrice: 299.99,
                platform: 'eBay',
                priceHistory: [199.99, 205.00, 210.00],
                lastUpdated: new Date().toISOString(),
                alertPrice: 180.00
            },
            {
                id: 3,
                name: 'USB-C Cable',
                currentPrice: 12.99,
                originalPrice: 19.99,
                platform: 'Walmart',
                priceHistory: [12.99, 14.99, 15.99],
                lastUpdated: new Date().toISOString(),
                alertPrice: 10.00
            }
        ];
        saveTrackedProducts();
    }
}

// Save tracked products to localStorage
function saveTrackedProducts() {
    localStorage.setItem('pricepulse_products', JSON.stringify(appState.trackedProducts));
}

// Setup event listeners for buttons
function setupEventListeners() {
    // Navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    // CTA Buttons
    const ctaButtons = document.querySelectorAll('.btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Handle navigation clicks with smooth scroll
function handleNavClick(e) {
    if (this.getAttribute('href').startsWith('#') && this.getAttribute('href') !== '#') {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Handle button clicks
function handleButtonClick(e) {
    const buttonText = this.textContent.toLowerCase();
    
    if (buttonText.includes('sign up') || buttonText.includes('get started')) {
        showSignupModal();
    } else if (buttonText.includes('watch demo')) {
        showDemoModal();
    } else if (buttonText.includes('start free trial')) {
        showTrialModal();
    } else if (buttonText.includes('contact sales')) {
        showContactModal();
    }
}

// Show signup modal
function showSignupModal() {
    const message = 'Welcome to PricePulse!\n\nSign up to start tracking product prices and get alerts when prices drop.\n\nEmail: ';
    const email = prompt(message);
    
    if (email && email.includes('@')) {
        showNotification('✓ Success', `Welcome ${email}! Check your email for confirmation.`, 'success');
    } else if (email) {
        showNotification('✗ Error', 'Please enter a valid email address.', 'error');
    }
}

// Show demo modal
function showDemoModal() {
    showNotification('📺 Demo', 'Watch our tutorial video on how to use PricePulse effectively.\n\nFeatures:\n- Add products to track\n- Set price alerts\n- View price history\n- Get notifications', 'info');
}

// Show trial modal
function showTrialModal() {
    showNotification('🎉 Free Trial', 'Start your 14-day free trial of PricePulse Pro!\n\nUnlimited product tracking\nEmail & SMS alerts\nAdvanced analytics', 'success');
}

// Show contact modal
function showContactModal() {
    const message = 'Contact our sales team\n\nBusiness Email: ';
    const email = prompt(message);
    
    if (email && email.includes('@')) {
        showNotification('✓ Received', `We'll contact you at ${email} soon!`, 'success');
    }
}

// Show notification toast
function showNotification(title, message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 5px;">${title}</div>
        <div>${message}</div>
    `;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 350px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Smooth scroll setup
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Initialize notifications
function initializeNotifications() {
    // Add CSS animations
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

// Handle keyboard shortcuts
function handleKeyboardShortcuts(e) {
    // Ctrl/Cmd + K: Show product search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        showSearchModal();
    }
    
    // Ctrl/Cmd + T: Add new product to track
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        showAddProductModal();
    }
}

// Show search modal
function showSearchModal() {
    const query = prompt('Search for products:\n\nExample: Wireless Headphones, Smart Watch, etc.');
    if (query) {
        showNotification('🔍 Search', `Searching for "${query}"...\n\nWe\'ll find the best prices across all platforms.`, 'info');
    }
}

// Show add product modal
function showAddProductModal() {
    const productName = prompt('Enter product name to track:');
    if (productName) {
        const targetPrice = prompt(`Enter target price for ${productName}:`);
        if (targetPrice && !isNaN(targetPrice)) {
            addProduct(productName, parseFloat(targetPrice));
        }
    }
}

// Add new product to track
function addProduct(name, targetPrice) {
    const newProduct = {
        id: Date.now(),
        name: name,
        currentPrice: Math.random() * 500 + 10, // Mock price
        originalPrice: Math.random() * 200 + targetPrice,
        platform: ['Amazon', 'eBay', 'Walmart'][Math.floor(Math.random() * 3)],
        priceHistory: [],
        lastUpdated: new Date().toISOString(),
        alertPrice: targetPrice
    };
    
    appState.trackedProducts.push(newProduct);
    saveTrackedProducts();
    
    showNotification('✓ Product Added', `${name} is now being tracked!\n\nAlert price set to: $${targetPrice}`, 'success');
    
    // Simulate price update
    setTimeout(() => updatePriceDisplay(), 1000);
}

// Update price display
function updatePriceDisplay() {
    console.log('Updating prices for tracked products...');
    
    appState.trackedProducts.forEach(product => {
        // Simulate price changes
        const priceChange = (Math.random() - 0.5) * 10;
        const newPrice = Math.max(product.originalPrice * 0.3, product.currentPrice + priceChange);
        
        const oldPrice = product.currentPrice;
        product.currentPrice = parseFloat(newPrice.toFixed(2));
        product.priceHistory.push(product.currentPrice);
        
        // Keep only last 30 price points
        if (product.priceHistory.length > 30) {
            product.priceHistory.shift();
        }
        
        product.lastUpdated = new Date().toISOString();
        
        // Check if price alert should trigger
        if (product.currentPrice <= product.alertPrice) {
            triggerPriceAlert(product);
        }
    });
    
    saveTrackedProducts();
}

// Trigger price alert
function triggerPriceAlert(product) {
    const discount = ((product.originalPrice - product.currentPrice) / product.originalPrice * 100).toFixed(0);
    
    showNotification(
        '🎉 Price Drop Alert!',
        `${product.name}\n$${product.originalPrice} → $${product.currentPrice}\nSave ${discount}% on ${product.platform}`,
        'success'
    );
    
    // Send browser notification if enabled
    if (appState.userSettings.notificationsEnabled && 'Notification' in window && Notification.permission === 'granted') {
        new Notification('PricePulse Alert', {
            body: `${product.name} is now $${product.currentPrice}! Save ${discount}%`,
            icon: '💰'
        });
    }
}

// Get product savings summary
function getSavingsSummary() {
    let totalSavings = 0;
    appState.trackedProducts.forEach(product => {
        totalSavings += (product.originalPrice - product.currentPrice);
    });
    return totalSavings.toFixed(2);
}

// Get average discount
function getAverageDiscount() {
    if (appState.trackedProducts.length === 0) return 0;
    
    const totalDiscount = appState.trackedProducts.reduce((sum, product) => {
        const discount = ((product.originalPrice - product.currentPrice) / product.originalPrice) * 100;
        return sum + discount;
    }, 0);
    
    return (totalDiscount / appState.trackedProducts.length).toFixed(1);
}

// Export data as JSON
function exportData() {
    const dataStr = JSON.stringify(appState.trackedProducts, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pricepulse_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showNotification('✓ Exported', 'Your price tracking data has been downloaded.', 'success');
}

// Clear all tracked products
function clearAllProducts() {
    if (confirm('Are you sure? This will delete all tracked products.')) {
        appState.trackedProducts = [];
        saveTrackedProducts();
        showNotification('✓ Cleared', 'All products have been removed.', 'success');
    }
}

// Get product by ID
function getProduct(productId) {
    return appState.trackedProducts.find(p => p.id === productId);
}

// Remove product by ID
function removeProduct(productId) {
    appState.trackedProducts = appState.trackedProducts.filter(p => p.id !== productId);
    saveTrackedProducts();
    showNotification('✓ Removed', 'Product has been removed from tracking.', 'success');
}

// Update product alert price
function updateAlertPrice(productId, newAlertPrice) {
    const product = getProduct(productId);
    if (product) {
        product.alertPrice = newAlertPrice;
        saveTrackedProducts();
        showNotification('✓ Updated', `Alert price set to $${newAlertPrice}`, 'success');
    }
}

// Get lowest price from history
function getLowestPrice(productId) {
    const product = getProduct(productId);
    if (product && product.priceHistory.length > 0) {
        return Math.min(...product.priceHistory);
    }
    return null;
}

// Get highest price from history
function getHighestPrice(productId) {
    const product = getProduct(productId);
    if (product && product.priceHistory.length > 0) {
        return Math.max(...product.priceHistory);
    }
    return null;
}

// Get price trend (up/down/stable)
function getPriceTrend(productId) {
    const product = getProduct(productId);
    if (product && product.priceHistory.length >= 2) {
        const recent = product.priceHistory[product.priceHistory.length - 1];
        const previous = product.priceHistory[product.priceHistory.length - 2];
        
        if (recent > previous) return 'up';
        if (recent < previous) return 'down';
        return 'stable';
    }
    return 'unknown';
}

// Log app statistics
function logStatistics() {
    const stats = {
        totalProductsTracked: appState.trackedProducts.length,
        totalSavings: getSavingsSummary(),
        averageDiscount: getAverageDiscount() + '%',
        lastUpdated: new Date().toLocaleString()
    };
    
    console.log('PricePulse Statistics:', stats);
    return stats;
}

// Periodic price update (every 5 minutes)
setInterval(() => {
    if (document.visibilityState === 'visible') {
        updatePriceDisplay();
        console.log('Prices updated at', new Date().toLocaleTimeString());
    }
}, 5 * 60 * 1000);

// Log when page becomes visible
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        console.log('PricePulse is now active');
        updatePriceDisplay();
    }
});

// Public API for external use
window.PricePulse = {
    addProduct,
    removeProduct,
    updateAlertPrice,
    getProduct,
    getLowestPrice,
    getHighestPrice,
    getPriceTrend,
    getSavingsSummary,
    getAverageDiscount,
    exportData,
    clearAllProducts,
    logStatistics,
    getTrackedProducts: () => appState.trackedProducts,
    updateSettings: (newSettings) => Object.assign(appState.userSettings, newSettings)
};

// Welcome message
console.log('%cWelcome to PricePulse! 🚀', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('Use window.PricePulse to access the API');
console.log('Example: PricePulse.addProduct("Product Name", 99.99)');
