// === Helper function ===
function getCartItems() {
  try {
    return JSON.parse(localStorage.getItem('cartItems') || '[]');
  } catch (e) {
    return [];
  }
}

function saveCartItems(items) {
  localStorage.setItem('cartItems', JSON.stringify(items));
  updateNotification(); // 🔥 Otomatis update angka notifikasi
}

// === Update notifikasi keranjang ===
function updateNotification() {
  const notificationCart = document.getElementById('notification-cart');
  if (!notificationCart) return;
  const items = getCartItems();
  notificationCart.textContent = items.length; // tampilkan jumlah item
}

const tombolMenu = document.getElementById('navToggle');
const lineOne = document.querySelector('.line-one');
const lineTwo = document.querySelector('.line-two');
const lineThree = document.querySelector('.line-three');

tombolMenu.addEventListener('click', () => {
  lineOne.classList.toggle('active');
  lineTwo.classList.toggle('active');
  lineThree.classList.toggle('active');
});

// === Main event listener ===
document.addEventListener('DOMContentLoaded', function() {
  // Panggil update notif di semua halaman
  updateNotification();
  
  // Toggle mobile menu
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navMenu.classList.remove('active');
    }
  });
  
  // Cart html href
  const cartBtn = document.getElementById('cart.html');
  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      window.location.href = 'cart.html';
    });
  }
  
  // Login path
  const lgnPath = document.getElementById('login-icon');
  if (lgnPath) {
    lgnPath.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }
  
  // === Tambah ke keranjang (index.html) ===
  const btnKeranjangList = document.querySelectorAll(".btn-cart");
  btnKeranjangList.forEach((btn) => {
    btn.addEventListener("click", () => {
      const menuItem = btn.closest(".menu-item");
      if (menuItem) {
        const cartItems = getCartItems();
        cartItems.push(menuItem.outerHTML);
        saveCartItems(cartItems);
        updateNotification(); // update angka di icon
        window.location.href = "cart.html";
      }
    });
  });
  
  // === Halaman cart.html ===
  const cartContainer = document.getElementById("cart-container");
  const cartEmpty = document.getElementById("cart-empty");
  const btnBackIt = document.getElementById("btnBackIt");
  
  if (cartContainer) {
    const savedItems = getCartItems();
    
    if (savedItems.length > 0) {
      // Tampilkan semua item di keranjang
      cartContainer.innerHTML = savedItems.join('');
      if (cartEmpty) cartEmpty.style.display = "none";
      if (btnBackIt) btnBackIt.style.display = "block";
      
      // 🔥 Tampilkan tombol hapus hanya di cart.html
      const deleteButtons = cartContainer.querySelectorAll("#hpsBtn");
      deleteButtons.forEach((btn, index) => {
        btn.style.display = "block";
        btn.addEventListener("click", () => {
          const updatedItems = getCartItems();
          updatedItems.splice(index, 1); // hapus item
          saveCartItems(updatedItems); // simpan & update notifikasi
          location.reload(); // refresh tampilan cart
        });
      });
      
    } else {
      if (cartEmpty) cartEmpty.style.display = "flex";
      if (btnBackIt) btnBackIt.style.display = "none";
    }
    
    // Update angka notifikasi di cart.html
    updateNotification();
  }
  
  // === Form kontak ===
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      if (name && email && message) {
        alert('Terima kasih! Pesan Anda telah dikirim. Kami akan segera menghubungi Anda.');
        contactForm.reset();
      } else {
        alert('Silakan isi semua field yang diperlukan.');
      }
    });
  }
});

// === Sinkronisasi antar tab ===
window.addEventListener('storage', (e) => {
  if (e.key === 'cartItems') updateNotification();
});
