// Authentication system for Dylan & Hallie's wedding website
(function() {
    const PASSWORD = 'test';
    const AUTH_KEY = 'dylan_hallie_wedding_auth';
    
    // Check if user is already authenticated
    function isAuthenticated() {
        return localStorage.getItem(AUTH_KEY) === 'authenticated';
    }
    
    // Set authentication status
    function setAuthenticated() {
        localStorage.setItem(AUTH_KEY, 'authenticated');
    }
    
    // Create and show login modal
    function showLoginModal() {
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.id = 'auth-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
        `;
        
        // Create modal content
        const modal = document.createElement('div');
        modal.style.cssText = `
            background: white;
            padding: 3rem;
            border-radius: 1rem;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            max-width: 400px;
            width: 90%;
            text-align: center;
            border: 2px solid #fecaca;
        `;
        
        modal.innerHTML = `
            <div style="margin-bottom: 2rem;">
                <h1 style="font-family: 'Dancing Script', cursive; font-size: 3rem; color: #9f1239; margin-bottom: 1rem;">Dylan & Hallie</h1>
                <div style="width: 4rem; height: 2px; background: #fca5a5; margin: 0 auto 1.5rem;"></div>
                <h2 style="color: #9f1239; font-size: 1.5rem; margin-bottom: 0.5rem;">Private Wedding Website</h2>
                <p style="color: #6b7280; font-size: 1rem;">Please enter the password to continue</p>
            </div>
            
            <form id="auth-form" style="margin-bottom: 1rem;">
                <input 
                    type="password" 
                    id="password-input" 
                    placeholder="Enter password"
                    style="
                        width: 100%;
                        padding: 0.75rem;
                        border: 2px solid #fecaca;
                        border-radius: 0.5rem;
                        font-size: 1rem;
                        margin-bottom: 1rem;
                        outline: none;
                        transition: border-color 0.3s;
                    "
                    required
                />
                <button 
                    type="submit"
                    style="
                        width: 100%;
                        background: #9f1239;
                        color: white;
                        padding: 0.75rem;
                        border: none;
                        border-radius: 0.5rem;
                        font-size: 1rem;
                        cursor: pointer;
                        transition: background-color 0.3s;
                    "
                    onmouseover="this.style.background='#7f1d1d'"
                    onmouseout="this.style.background='#9f1239'"
                >
                    Enter Website
                </button>
            </form>
            
            <div id="error-message" style="color: #dc2626; font-size: 0.875rem; min-height: 1.25rem;"></div>
            
            <p style="color: #9ca3af; font-size: 0.75rem; margin-top: 1.5rem;">
                This website contains private wedding information for invited guests only.
            </p>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Focus on password input
        const passwordInput = document.getElementById('password-input');
        passwordInput.focus();
        
        // Add input focus styles
        passwordInput.addEventListener('focus', function() {
            this.style.borderColor = '#9f1239';
            this.style.boxShadow = '0 0 0 3px rgba(159, 18, 57, 0.1)';
        });
        
        passwordInput.addEventListener('blur', function() {
            this.style.borderColor = '#fecaca';
            this.style.boxShadow = 'none';
        });
        
        // Handle form submission
        document.getElementById('auth-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const enteredPassword = passwordInput.value;
            const errorDiv = document.getElementById('error-message');
            
            if (enteredPassword === PASSWORD) {
                setAuthenticated();
                // Fade out the modal
                overlay.style.transition = 'opacity 0.5s ease-out';
                overlay.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(overlay);
                    // Re-enable scrolling
                    document.body.style.overflow = '';
                }, 500);
            } else {
                errorDiv.textContent = 'Incorrect password. Please try again.';
                passwordInput.value = '';
                passwordInput.focus();
                
                // Add shake animation
                modal.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    modal.style.animation = '';
                }, 500);
            }
        });
        
        // Disable body scrolling
        document.body.style.overflow = 'hidden';
    }
    
    // Add shake animation styles
    function addShakeAnimation() {
        if (!document.getElementById('shake-animation')) {
            const style = document.createElement('style');
            style.id = 'shake-animation';
            style.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Initialize authentication
    function initAuth() {
        // Add shake animation styles
        addShakeAnimation();
        
        // Check if user is authenticated
        if (!isAuthenticated()) {
            // Small delay to ensure page is loaded
            setTimeout(showLoginModal, 100);
        }
    }
    
    // Run when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAuth);
    } else {
        initAuth();
    }
})(); 