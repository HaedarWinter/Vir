document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const resetEmailInput = document.getElementById('resetEmail');
    
    const forgotPasswordBtn = document.querySelector('.forgot-password-btn');
    const backToLoginBtn = document.querySelector('.back-to-login-btn');
    const sendResetBtn = document.querySelector('.send-reset-btn');
    const registerLink = document.querySelector('.register-text');
    const showPasswordBtns = document.querySelectorAll('.show-password-btn');
    const loginBtn = document.querySelector('.login-btn');

    const ValidationUtils = {
        isValidIndonesianPhone: (phone) => {
            const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,10}$/;
            return phoneRegex.test(phone);
        },
        isValidEmail: (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },

        isStrongPassword: (password) => {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            return passwordRegex.test(password);
        },

        showError: (inputElement, message) => {
            const existingError = inputElement.parentElement.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }

            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.color = 'red';
            errorElement.style.fontSize = '12px';
            errorElement.style.marginTop = '5px';
            errorElement.textContent = message;

            inputElement.parentElement.appendChild(errorElement);
            inputElement.style.borderColor = 'red';
        },

        clearError: (inputElement) => {
            const existingError = inputElement.parentElement.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            inputElement.style.borderColor = '';
        }
    };

    // Fungsi Login yang Ditingkatkan
    async function loginUser(email, password) {
        try {
            // Simulasi proses autentikasi (ganti dengan backend Anda)
            const response = await simulateBackendLogin(email, password);
            
            if (response.success) {
                // Simpan token atau informasi login
                localStorage.setItem('userToken', response.token);
                localStorage.setItem('userEmail', email);
                
                // Redirect ke halaman dashboard
                window.location.href = './page/index.html';
            } else {
                // Tampilkan pesan kesalahan
                ValidationUtils.showError(emailInput, response.message || 'Login gagal');
            }
        } catch (error) {
            console.error('Login error:', error);
            ValidationUtils.showError(emailInput, 'Terjadi kesalahan. Silakan coba lagi.');
        }
    }

    // Fungsi simulasi backend login (GANTI DENGAN PROSES BACKEND SEBENARNYA)
    function simulateBackendLogin(email, password) {
        return new Promise((resolve) => {
            // Simulasi penundaan jaringan
            setTimeout(() => {
                // Contoh logika sederhana (HANYA UNTUK DEMONSTRASI)
                if (email === 'user@example.com' && password === 'Password123!') {
                    resolve({
                        success: true, 
                        token: 'dummy_token_' + Math.random().toString(36)
                    });
                } else {
                    resolve({
                        success: false, 
                        message: 'Email atau password salah'
                    });
                }
            }, 1000);
        });
    }

    // Fungsi untuk menampilkan/menyembunyikan password
    showPasswordBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.previousElementSibling;
            const type = input.type === 'password' ? 'text' : 'password';
            input.type = type;
        });
    });

    // Event Listener untuk Tombol Login
    loginBtn.addEventListener('click', () => {
        // Reset semua error sebelumnya
        ValidationUtils.clearError(emailInput);
        ValidationUtils.clearError(passwordInput);

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Validasi input
        if (!email) {
            ValidationUtils.showError(emailInput, 'Email atau nomor telepon tidak boleh kosong');
            return;
        }

        const isValidIdentifier = 
            ValidationUtils.isValidEmail(email) || 
            ValidationUtils.isValidIndonesianPhone(email);

        if (!isValidIdentifier) {
            ValidationUtils.showError(emailInput, 'Masukkan email atau nomor telepon yang valid');
            return;
        }

        if (!password) {
            ValidationUtils.showError(passwordInput, 'Password tidak boleh kosong');
            return;
        }

        if (!ValidationUtils.isStrongPassword(password)) {
            ValidationUtils.showError(passwordInput, 'Password harus minimal 8 karakter, mengandung huruf besar, huruf kecil, angka, dan karakter khusus');
            return;
        }

        // Tambahkan indikator loading
        loginBtn.textContent = 'Mohon Tunggu...';
        loginBtn.disabled = true;

        // Proses login
        loginUser(email, password)
            .finally(() => {
                // Kembalikan tombol ke kondisi semula
                loginBtn.textContent = 'Log In';
                loginBtn.disabled = false;
            });
    });

    // Event Listener untuk Lupa Password
    forgotPasswordBtn.addEventListener('click', () => {
        loginForm.classList.add('hidden');
        forgotPasswordForm.classList.remove('hidden');
    });

    // Event Listener untuk Kembali ke Login
    backToLoginBtn.addEventListener('click', () => {
        forgotPasswordForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });

    // Event Listener untuk Kirim Reset Password
    sendResetBtn.addEventListener('click', () => {
        ValidationUtils.clearError(resetEmailInput);

        const resetContact = resetEmailInput.value.trim();

        if (!resetContact) {
            ValidationUtils.showError(resetEmailInput, 'Email atau nomor telepon tidak boleh kosong');
            return;
        }

        // Validate either email or Indonesian phone number
        const isValidContact = 
            ValidationUtils.isValidEmail(resetContact) || 
            ValidationUtils.isValidIndonesianPhone(resetContact);

        if (!isValidContact) {
            ValidationUtils.showError(resetEmailInput, 'Masukkan email atau nomor telepon yang valid');
            return;
        }

        try {
            // Prepare WhatsApp reset link (using a placeholder URL)
            const resetLink = `https://wa.me/send?text=Tautan Reset Password Anda: https://example.com/reset-password?token=${generateResetToken()}`;
            
            // Open WhatsApp with pre-filled message
            window.open(resetLink, '_blank');

            console.log('Password reset requested for', resetContact);
            
            alert(`Tautan reset password telah disiapkan untuk dikirim via WhatsApp ke ${resetContact}`);
            
            resetEmailInput.value = '';
            forgotPasswordForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
        } catch (error) {
            alert('Gagal menyiapkan tautan reset. Silakan coba lagi.');
        }
    });

    // Utility function to generate a simple reset token
    function generateResetToken() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    // Event Listener untuk Registrasi
    registerLink.addEventListener('click', () => {
        alert('Halaman pendaftaran akan segera hadir!');
    });
});