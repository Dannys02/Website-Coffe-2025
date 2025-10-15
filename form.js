// LOGIKA HALAMAN LOGIN
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.login-form');
  const emailInput = document.getElementById('email-login');
  const passwordInput = document.getElementById('password-login');
  const emailError = document.getElementById('erorValidationEmail');
  const passwordError = document.getElementById('erorValidationPassword');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Mencegah reload halaman
    
    // Ambil nilai input
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    // Reset pesan error
    emailError.textContent = '';
    passwordError.textContent = '';
    
    let valid = true;
    
    // === VALIDASI EMAIL ===
    if (email === '') {
      emailError.textContent = 'Email harus di isi!';
      valid = false;
    }
    
    // === VALIDASI PASSWORD ===
    if (password === '') {
      passwordError.textContent = 'Password harus di isi!';
      valid = false;
    } else if (password.length < 8) {
      passwordError.textContent = 'Password minimal 8 karakter!';
      valid = false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      passwordError.textContent = 'Password harus mengandung tanda khusus!';
      valid = false;
    }
    
    // Jika semua valid, bisa lanjut (misalnya ke dashboard)
    if (valid) {
      alert('Login berhasil ✅');
      // window.location.href = 'dashboard.html'; // aktifkan jika mau pindah halaman
    }
  });
});