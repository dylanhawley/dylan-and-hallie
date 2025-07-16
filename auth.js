(function() {
    const PASSWORD = 'test';
    const AUTH_KEY = 'dylan_hallie_wedding_auth';
    
    function isAuthenticated() {
        return localStorage.getItem(AUTH_KEY) === 'authenticated';
    }
    
    function setAuthenticated() {
        localStorage.setItem(AUTH_KEY, 'authenticated');
    }
    
    function showLoginModal() {
        const overlay = document.createElement('div');
        overlay.id = 'auth-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #949d62;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
        `;
        
        // Create modal content
        const modal = document.createElement('div');
        modal.style.cssText = `
            padding: 3rem;
            max-width: 400px;
            width: 90%;
            text-align: center;
        `;
        
        modal.innerHTML = `
            <img src="https://media-public.canva.com/2jwBc/MAGWga2jwBc/1/t.png" alt="Swan Couple Doodle" style="width: 100%; margin-bottom: 2rem;">
            <form id="auth-form" style="margin-bottom: 1rem;">
                <input 
                    type="password" 
                    id="password-input" 
                    placeholder="Password"
                    style="
                        width: 100%;
                        padding: 0.75rem;
                        border-radius: 0.5rem;
                        font-size: 1rem;
                        margin-bottom: 1rem;
                        outline: none;
                        transition: border-color 0.3s;
                    "
                    required
                />
            </form>
            
            <div id="error-message" style="color: #dc2626; font-size: 0.875rem; min-height: 1.25rem;"></div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Focus on password input
        const passwordInput = document.getElementById('password-input');
        passwordInput.focus();
        
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
    
    function initAuth() {
        addShakeAnimation();
        if (!isAuthenticated()) showLoginModal();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAuth);
    } else {
        initAuth();
    }
})(); 