// Helper function
function getCartItems() {
  try {
    return JSON.parse(localStorage.getItem('cartItems') || '[]');
  } catch (e) {
    return [];
  }
}

function saveCartItems(items) {
  localStorage.setItem('cartItems', JSON.stringify(items));
  updateNotification(); // Otomatis update angka notifikasi
}

// Update notifikasi keranjang
function updateNotification() {
  const notificationCart = document.getElementById('notification-cart');
  if (!notificationCart) return;
  const items = getCartItems();
  notificationCart.textContent = items.length; // tampilkan jumlah item
}

// Loading website
window.addEventListener("load", () => {
  const loader = document.getElementById("loadingScreen");
  document.body.classList.add("loading-active");
  document.body.style.overflow = "hidden";

  // Simulasikan durasi loading
  setTimeout(() => {
    loader.style.opacity = "0";
    document.body.classList.remove("loading-active");
    document.body.style.overflow = "auto";
    setTimeout(() => {
      loader.remove()

      // Animasi from-bottom
      const elements = document.querySelectorAll(".from-bottom");
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      }, { threshold: 0 });

      elements.forEach(el => observer.observe(el));

      const coffeImg = document.querySelector(".coffe-png");
      const cawanImg = document.querySelector(".cawan-png");

      const imgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains("coffe-png")) {
              entry.target.classList.add("coffe-fadeIn");
            } else if (entry.target.classList.contains("cawan-png")) {
              entry.target.classList.add("cawan-fadeIn");
            }
          } else {
            // Hapus animasi ketika keluar viewport agar bisa diulang
            entry.target.classList.remove("coffe-fadeIn", "cawan-fadeIn");
          }
        });
      }, { threshold: 0 });

      imgObserver.observe(coffeImg);
      imgObserver.observe(cawanImg);


    }, 500);
  }, 1000);
});

// Tombol menu hamburger
const tombolMenu = document.getElementById('navToggle');
const lineOne = document.querySelector('.line-one');
const lineTwo = document.querySelector('.line-two');
const lineThree = document.querySelector('.line-three');

tombolMenu.addEventListener('click', () => {
  lineOne.classList.toggle('active');
  lineTwo.classList.toggle('active');
  lineThree.classList.toggle('active');
});

// Main event listener
document.addEventListener('DOMContentLoaded', function () {
  // Panggil update notif di semua halaman
  updateNotification();

  // Toggle mobile menu
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navMenu.classList.remove('active');
      lineOne.classList.remove('active');
      lineTwo.classList.remove('active');
      lineThree.classList.remove('active');
    }
  });

  // Cart html href
  const cartBtn = document.getElementById('cart.html');
  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      window.location.href = 'cart.html';
    });
  }

  // Fungsi tombol Beli Sekarang (pakai event delegation)
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-buy')) {
      window.location.href = 'payment.html';
    }
  });

  // Arahkan ke login pages
  const lgnPath = document.getElementById('login-icon');
  if (lgnPath) {
    lgnPath.addEventListener('click', () => {
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 600);
    });
  }

  // Tambah ke keranjang (index.html)
  const btnKeranjangList = document.querySelectorAll(".btn-cart");
  btnKeranjangList.forEach((btn) => {
    btn.addEventListener("click", () => {
      const menuItem = btn.closest(".menu-item");
      if (menuItem) {
        const cartItems = getCartItems();
        cartItems.push(menuItem.outerHTML);
        saveCartItems(cartItems);
        updateNotification(); // update angka di icon
        alert('Produk berhasil ditambahkan');
      }
    });
  });

  // Keranjang checkbox products
  const cartAllBtn = document.querySelector('.cart-all-product');
  if (cartAllBtn) {
    cartAllBtn.addEventListener('click', () => {
      const checkedItems = document.querySelectorAll('.menu-item input[type="checkbox"]:checked');
      const cartItems = getCartItems();
      checkedItems.forEach(chk => {
        const menuItem = chk.closest('.menu-item');
        if (menuItem) cartItems.push(menuItem.outerHTML);
      });
      saveCartItems(cartItems);
      updateNotification();
      alert('Produk terpilih berhasil dimasukkan ke keranjang!');
    });
  }

  // Tombol Hapus Semua Produk
  const btnDeleteAll = document.getElementById('btnDeleteAll');
  if (btnDeleteAll) {
    btnDeleteAll.addEventListener('click', () => {
      localStorage.removeItem('cartItems');
      updateNotification();
      location.reload();
    });
  }

  // Halaman cart.html
  const cartContainer = document.getElementById("cart-container");
  const cartEmpty = document.getElementById("cart-empty");
  const btnBackIt = document.getElementById("btnBackIt");
  const btnDivCart = document.getElementById("btn-div-cart");

  if (cartContainer) {
    const savedItems = getCartItems();

    if (savedItems.length > 0) {
      // Tampilkan semua item di keranjang
      cartContainer.innerHTML = savedItems.join('');
      if (cartEmpty) cartEmpty.style.display = "none";
      if (btnDivCart) btnDivCart.style.display = "flex";

      // Tampilkan tombol hapus hanya di cart.html
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
      if (btnDivCart) btnDivCart.style.display = "none";
    }

    // Update angka notifikasi di cart.html
    updateNotification();
  }

  // Fungsi tombol “Beli Sekarang”
  document.addEventListener("DOMContentLoaded", () => {
    const buyButtons = document.querySelectorAll(".btn-buy");

    buyButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        const product = e.target.closest(".menu-item");
        if (!product) return;

        const name = product.querySelector(".menu-item-title").innerText;
        const price = product.querySelector(".menu-item-price").innerText;
        const image = product.querySelector(".menu-item-image img").src;

        const orderData = { name, price, image };
        localStorage.setItem("orderData", JSON.stringify(orderData));

        window.location.href = "payment.html"; // arahkan ke halaman pembayaran
      });
    });
  });

  // CHECKBOX FUNCTION
  const checkAll = document.getElementById('check1');
  const otherChecks = document.querySelectorAll('#check2, #check3, #check4, #check5, #check6, #check7');

  checkAll.addEventListener('change', () => {
    otherChecks.forEach(chk => chk.checked = checkAll.checked);
  });

  // Form kontak
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      const fieldModal = document.getElementById("field-modal");

      if (name && email && message) {
        fieldModal.classList.toggle("succes");
        setTimeout(function () {
          fieldModal.classList.remove("succes");
        }, 3000);
        contactForm.reset();
      } else {
        alert('Silakan isi semua field yang diperlukan.');
      }
    });
  }
});

// Sinkronisasi antar tab
window.addEventListener('storage', (e) => {
  if (e.key === 'cartItems') updateNotification();
});