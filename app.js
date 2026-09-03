// Peña Los Intratables - Almodóvar del Campo App Logic (V12 - Sincronización en Tiempo Real con Supabase)

const STORAGE_KEY = 'intratables_peña_db_v13';

// Configuración del Servidor en la Nube Supabase
const SUPABASE_URL = 'https://aourshrfzrrockzfptdh.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_OTTeiveW-h_btriwhzAh8w_Je9kln_t';

let supabaseInstance = null;
function getSupabaseClient() {
  if (supabaseInstance) return supabaseInstance;
  try {
    if (typeof window !== 'undefined' && window.supabase && typeof window.supabase.createClient === 'function' && SUPABASE_URL && SUPABASE_ANON_KEY) {
      supabaseInstance = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      return supabaseInstance;
    }
  } catch (e) {
    console.warn('Supabase client init error:', e);
  }
  return null;
}

// Instancias globales de gráficos Chart.js
let chartGastoCatInstance = null;
let chartPresupuestoVsRealInstance = null;

// Datos por defecto con los peñistas socios e invitados oficiales de la peña
const DEFAULT_DATA = {
  config: {
    cuotaBaseCorralon: 80,
    tramoAlcoholCompleto: 50,
    tramoAlcoholFinde: 30,
    tramoAlcoholDia: 15,
    cajaAnteriores: 0,
    totalCorralon: 800,
    tarifaDia: 15,
    tarifaFinde: 35,
    tarifaCompleto: 70,
    fechaFiestas: '2026-09-12T12:00:00'
  },
  usuarios: [
    { id: 'usr_1', nombre: 'Daniel López', usuario: 'daniel.lopez', clave: 'admin1234', rol: 'admin' },
    { id: 'usr_2', nombre: 'Daniel García', usuario: 'daniel.garcia', clave: 'admin1234', rol: 'admin' },
    { id: 'usr_3', nombre: 'Antonio Horta', usuario: 'antonio.horta', clave: 'admin1234', rol: 'admin' }
  ],
  socios: [
    { id: 'soc_1', nombre: 'Dani (Daniel López)', cuotaBase: 80, tramoAlcohol: 'completo', diasSueltos: 0, cuota: 130, pagado: 130 },
    { id: 'soc_2', nombre: 'Dani G (Daniel García)', cuotaBase: 80, tramoAlcohol: 'completo', diasSueltos: 0, cuota: 130, pagado: 130 },
    { id: 'soc_3', nombre: 'Horta (Antonio Horta)', cuotaBase: 80, tramoAlcohol: 'completo', diasSueltos: 0, cuota: 130, pagado: 130 },
    { id: 'soc_4', nombre: 'Jorgele', cuotaBase: 80, tramoAlcohol: 'completo', diasSueltos: 0, cuota: 130, pagado: 0 },
    { id: 'soc_5', nombre: 'Elena', cuotaBase: 80, tramoAlcohol: 'completo', diasSueltos: 0, cuota: 130, pagado: 0 },
    { id: 'soc_6', nombre: 'Miriam', cuotaBase: 80, tramoAlcohol: 'completo', diasSueltos: 0, cuota: 130, pagado: 0 },
    { id: 'soc_7', nombre: 'Nuria', cuotaBase: 80, tramoAlcohol: 'completo', diasSueltos: 0, cuota: 130, pagado: 0 },
    { id: 'soc_8', nombre: 'Josito', cuotaBase: 80, tramoAlcohol: 'completo', diasSueltos: 0, cuota: 130, pagado: 0 },
    { id: 'soc_9', nombre: 'Bea', cuotaBase: 80, tramoAlcohol: 'completo', diasSueltos: 0, cuota: 130, pagado: 0 },
    { id: 'soc_10', nombre: 'Sergio', cuotaBase: 80, tramoAlcohol: 'completo', diasSueltos: 0, cuota: 130, pagado: 0 },
    { id: 'soc_11', nombre: 'Barbero', cuotaBase: 80, tramoAlcohol: 'completo', diasSueltos: 0, cuota: 130, pagado: 0 },
    { id: 'soc_12', nombre: 'Clau', cuotaBase: 80, tramoAlcohol: 'completo', diasSueltos: 0, cuota: 130, pagado: 0 },
    { id: 'soc_13', nombre: 'Miguel L', cuotaBase: 80, tramoAlcohol: 'completo', diasSueltos: 0, cuota: 130, pagado: 0 },
    { id: 'soc_14', nombre: 'Paula', cuotaBase: 80, tramoAlcohol: 'completo', diasSueltos: 0, cuota: 130, pagado: 0 },
    { id: 'soc_15', nombre: 'Alba', cuotaBase: 80, tramoAlcohol: 'completo', diasSueltos: 0, cuota: 130, pagado: 0 },
    { id: 'soc_16', nombre: 'Elías', cuotaBase: 80, tramoAlcohol: 'completo', diasSueltos: 0, cuota: 130, pagado: 0 },
    { id: 'soc_17', nombre: 'Nuria (2)', cuotaBase: 80, tramoAlcohol: 'completo', diasSueltos: 0, cuota: 130, pagado: 0 },
    { id: 'soc_18', nombre: 'María G', cuotaBase: 80, tramoAlcohol: 'completo', diasSueltos: 0, cuota: 130, pagado: 0 },
    { id: 'soc_19', nombre: 'María M', cuotaBase: 80, tramoAlcohol: 'completo', diasSueltos: 0, cuota: 130, pagado: 0 },
    { id: 'soc_20', nombre: 'Mario', cuotaBase: 80, tramoAlcohol: 'completo', diasSueltos: 0, cuota: 130, pagado: 0 },
    { id: 'soc_21', nombre: 'Raquel', cuotaBase: 80, tramoAlcohol: 'completo', diasSueltos: 0, cuota: 130, pagado: 0 },
    { id: 'soc_22', nombre: 'Miguel S', cuotaBase: 80, tramoAlcohol: 'completo', diasSueltos: 0, cuota: 130, pagado: 0 },
    { id: 'soc_23', nombre: 'Cachi', cuotaBase: 80, tramoAlcohol: 'completo', diasSueltos: 0, cuota: 130, pagado: 0 },
    { id: 'soc_24', nombre: 'Laura', cuotaBase: 80, tramoAlcohol: 'completo', diasSueltos: 0, cuota: 130, pagado: 0 },
    { id: 'soc_25', nombre: 'Robles', cuotaBase: 80, tramoAlcohol: 'completo', diasSueltos: 0, cuota: 130, pagado: 0 },
    { id: 'soc_26', nombre: 'Irene', cuotaBase: 80, tramoAlcohol: 'finde', diasSueltos: 0, cuota: 110, pagado: 0 }
  ],
  invitados: [
    { id: 'inv_1', nombre: 'Amiga 1 de Miriam', anfitrionId: 'soc_6', modalidad: 'finde1', detalleDia: '1er Fin de Semana', importe: 35, estado: 'pendiente' },
    { id: 'inv_2', nombre: 'Amiga 2 de Miriam', anfitrionId: 'soc_6', modalidad: 'finde1', detalleDia: '1er Fin de Semana', importe: 35, estado: 'pendiente' },
    { id: 'inv_3', nombre: 'Sergio (Invitado)', anfitrionId: '', modalidad: 'finde1', detalleDia: '1er Fin de Semana', importe: 35, estado: 'pendiente' },
    { id: 'inv_4', nombre: 'Marina', anfitrionId: '', modalidad: 'finde1', detalleDia: '1er Fin de Semana', importe: 35, estado: 'pendiente' },
    { id: 'inv_5', nombre: 'Candela', anfitrionId: '', modalidad: 'finde1', detalleDia: '1er Fin de Semana', importe: 35, estado: 'pendiente' },
    { id: 'inv_6', nombre: 'Ángel', anfitrionId: '', modalidad: 'finde1', detalleDia: '1er Fin de Semana', importe: 35, estado: 'pendiente' },
    { id: 'inv_7', nombre: 'Tamara', anfitrionId: '', modalidad: 'dia', detalleDia: 'Los dos sábados (2 días)', importe: 30, estado: 'pendiente' },
    { id: 'inv_8', nombre: 'Loro', anfitrionId: '', modalidad: 'dia', detalleDia: 'Sábados noche y Jueves (3 días)', importe: 45, estado: 'pendiente' },
    { id: 'inv_9', nombre: 'María (Por confirmar días)', anfitrionId: '', modalidad: 'dia', detalleDia: 'Pendiente confirmar días', importe: 15, estado: 'pendiente' },
    { id: 'inv_10', nombre: 'Luis 🐎', anfitrionId: '', modalidad: 'dia', detalleDia: 'Por confirmar', importe: 15, estado: 'pendiente' },
    { id: 'inv_11', nombre: 'Ana', anfitrionId: '', modalidad: 'dia', detalleDia: 'Día suelto', importe: 15, estado: 'pendiente' }
  ],
  compras: [
    { id: 'cmp_1', nombre: 'Ron Barceló', cantidad: '50 botellas (1L)', precioUnitario: 13.45, precio: 672.50, categoria: 'alcohol', estado: 'comprado' },
    { id: 'cmp_2', nombre: 'Whisky Red Label', cantidad: '50 botellas (1L)', precioUnitario: 13.40, precio: 670, categoria: 'alcohol', estado: 'comprado' },
    { id: 'cmp_3', nombre: 'Coca-Cola 2L (Packs 6)', cantidad: '300 botellas (2L)', precioUnitario: 1.13, precio: 340, categoria: 'refrescos', estado: 'comprado' },
    { id: 'cmp_4', nombre: 'Ginebra Puerto de Indias', cantidad: '30 botellas (75CL)', precioUnitario: 14.00, precio: 420, categoria: 'alcohol', estado: 'pendiente' },
    { id: 'cmp_5', nombre: 'Fanta Limón 2L (Packs 6)', cantidad: '200 botellas (2L)', precioUnitario: 1.10, precio: 220, categoria: 'refrescos', estado: 'pendiente' },
    { id: 'cmp_6', nombre: 'Altavoz Potente Equipo Sonido Corralón', cantidad: '1 unidad (300W)', precioUnitario: 300, precio: 300, categoria: 'equipamiento', estado: 'comprado' },
    { id: 'cmp_7', nombre: 'Alquiler Corralón (Reserva)', cantidad: 'Alquiler 10 días', precioUnitario: 800, precio: 800, categoria: 'corralon', estado: 'comprado' }
  ],
  gastos: [
    { id: 'gst_1', concepto: 'Hielos de emergencia Noche 1', categoria: 'imprevisto_bebida', importe: 45, compradorId: 'soc_1', estado: 'aprobado' }
  ]
};

// State Manager
let db = loadData();
let currentUser = loadSession();

function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const data = JSON.parse(saved);
      if (!data.compras) data.compras = JSON.parse(JSON.stringify(DEFAULT_DATA.compras));
      if (!data.socios || data.socios.length < 26) {
        data.socios = JSON.parse(JSON.stringify(DEFAULT_DATA.socios));
        data.invitados = JSON.parse(JSON.stringify(DEFAULT_DATA.invitados));
      }
      return data;
    } catch (e) {
      console.error('Error al cargar LocalStorage:', e);
    }
  }
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

function saveDataLocalOnly() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch (e) {
    console.error('Error al guardar LocalStorage:', e);
  }
}

function saveData() {
  saveDataLocalOnly();
  renderAll();
  pushToSupabase();
}

function showSyncStatus(msg, type = 'success') {
  const icon = document.getElementById('sync-status-icon');
  const text = document.getElementById('sync-status-text');
  const banner = document.getElementById('sync-status-banner');
  if (!icon || !text || !banner) return;

  text.textContent = msg;

  if (type === 'syncing') {
    icon.textContent = '🔄';
    banner.style.background = '#e0f2fe';
    banner.style.color = '#0369a1';
    banner.style.borderColor = '#bae6fd';
  } else if (type === 'error') {
    icon.textContent = '⚠️';
    banner.style.background = '#fef2f2';
    banner.style.color = '#b91c1c';
    banner.style.borderColor = '#fecaca';
  } else {
    icon.textContent = '☁️';
    banner.style.background = '#f0fdf4';
    banner.style.color = '#166534';
    banner.style.borderColor = '#bbf7d0';
  }
}

async function syncFromSupabase() {
  const client = getSupabaseClient();
  if (!client) {
    showSyncStatus('Modo local (Copia guardada en el dispositivo)', 'error');
    return;
  }
  try {
    showSyncStatus('Conectando con la nube...', 'syncing');
    const { data, error } = await client
      .from('intratables_db')
      .select('content')
      .eq('id', 'main_peña_db')
      .maybeSingle();

    if (error) {
      if (error.code === '42P01' || (error.message && error.message.includes('does not exist'))) {
        showSyncStatus('⚠️ Pendiente: Crear la tabla intratables_db en Supabase SQL Editor', 'error');
      } else {
        showSyncStatus('⚠️ Sin conexión a la nube - Usando datos locales', 'error');
      }
      return;
    }

    if (data && data.content) {
      db = data.content;
      if (!db.socios || db.socios.length < 26) {
        db.socios = JSON.parse(JSON.stringify(DEFAULT_DATA.socios));
        db.invitados = JSON.parse(JSON.stringify(DEFAULT_DATA.invitados));
        await pushToSupabase();
      } else {
        saveDataLocalOnly();
        renderAll();
      }
      showSyncStatus('Conectado en tiempo real con Supabase');
    } else if (!data) {
      await pushToSupabase();
    }
  } catch (err) {
    console.warn('Sync inicial Supabase:', err);
    showSyncStatus('Modo local activo (Localstorage)', 'error');
  }
}

function subscribeRealtime() {
  const client = getSupabaseClient();
  if (!client) return;
  try {
    client
      .channel('public:intratables_db')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'intratables_db' }, payload => {
        if (payload.new && payload.new.content) {
          db = payload.new.content;
          saveDataLocalOnly();
          renderAll();
          showSyncStatus('Actualizado por un compañero en tiempo real');
        }
      })
      .subscribe();
  } catch (err) {
    console.error('Error al suscribirse a Realtime:', err);
  }
}

let pushTimeout = null;
async function pushToSupabase() {
  const client = getSupabaseClient();
  if (!client) return;
  showSyncStatus('Guardando cambios en la nube...', 'syncing');
  clearTimeout(pushTimeout);
  pushTimeout = setTimeout(async () => {
    try {
      const { error } = await client
        .from('intratables_db')
        .upsert({ id: 'main_peña_db', content: db, updated_at: new Date().toISOString() });

      if (error) {
        console.error('Error al enviar a Supabase:', error);
        if (error.code === '42P01' || (error.message && error.message.includes('does not exist'))) {
          showSyncStatus('⚠️ Pendiente: Ejecutar SQL en Supabase (Tabla no creada)', 'error');
        } else {
          showSyncStatus('⚠️ Error de conexión a la nube - Guardado en local', 'error');
        }
      } else {
        showSyncStatus('Sincronizado en tiempo real con Supabase');
      }
    } catch (err) {
      console.error('Excepción al enviar a Supabase:', err);
      showSyncStatus('Modo local activo', 'error');
    }
  }, 300);
}

function loadSession() {
  const sess = sessionStorage.getItem('intratables_session_user');
  if (sess) {
    try {
      return JSON.parse(sess);
    } catch (e) {}
  }
  return null;
}

function saveSession(user) {
  currentUser = user;
  if (user) {
    sessionStorage.setItem('intratables_session_user', JSON.stringify(user));
  } else {
    sessionStorage.removeItem('intratables_session_user');
  }
  updateAuthUI();
}

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupSubTabs();
  setupFiltersAndSearch();
  setupFormsAndModals();
  setupAuthControls();
  setupPhotoLightbox();
  startCountdownTimer();
  updateAuthUI();
  renderAll();
  
  // Sincronización Nube en Tiempo Real con Supabase
  syncFromSupabase();
  subscribeRealtime();
});

// Navigation Tabs
function setupNavigation() {
  const tabs = document.querySelectorAll('.nav-tab, .ios-tab-item');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.tab;
      
      document.querySelectorAll('.nav-tab, .ios-tab-item').forEach(t => {
        if (t.dataset.tab === targetId) {
          t.classList.add('active');
        } else {
          t.classList.remove('active');
        }
      });

      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');

      // Las fotos de la peña sólo aparecen en el Dashboard. El resto ocupa todo el ancho de PC.
      const appLayout = document.querySelector('.app-body-layout');
      const sidebarGallery = document.querySelector('.sidebar-gallery');
      const isDashboard = targetId === 'tab-dashboard';

      if (sidebarGallery) {
        sidebarGallery.style.display = isDashboard ? 'block' : 'none';
      }

      if (appLayout) {
        if (isDashboard) {
          appLayout.classList.remove('no-sidebar');
        } else {
          appLayout.classList.add('no-sidebar');
        }
      }

      if (isDashboard) {
        renderCharts();
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

// Lightbox Visualizador de Fotos en Grande
function setupPhotoLightbox() {
  const modalLightbox = document.getElementById('modal-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const btnClose = document.getElementById('btn-close-lightbox');

  if (!modalLightbox) return;

  document.addEventListener('click', e => {
    const photoTarget = e.target.closest('.sidebar-photo-img, .peña-hero-logo');
    if (photoTarget) {
      lightboxImg.src = photoTarget.src;
      lightboxCaption.textContent = photoTarget.alt || 'Foto oficial de la Peña Los Intratables';
      modalLightbox.classList.add('active');
    }
  });

  btnClose?.addEventListener('click', () => {
    modalLightbox.classList.remove('active');
  });

  modalLightbox.addEventListener('click', e => {
    if (e.target === modalLightbox) {
      modalLightbox.classList.remove('active');
    }
  });
}

// Sub-Tabs (Peñistas vs Invitados)
function setupSubTabs() {
  const btnSocios = document.getElementById('subtab-btn-socios');
  const btnInvitados = document.getElementById('subtab-btn-invitados');
  const paneSocios = document.getElementById('subpane-socios');
  const paneInvitados = document.getElementById('subpane-invitados');

  if (btnSocios && btnInvitados) {
    btnSocios.addEventListener('click', () => {
      btnSocios.classList.add('active');
      btnInvitados.classList.remove('active');
      paneSocios.classList.add('active');
      paneInvitados.classList.remove('active');
    });

    btnInvitados.addEventListener('click', () => {
      btnInvitados.classList.add('active');
      btnSocios.classList.remove('active');
      paneInvitados.classList.add('active');
      paneSocios.classList.remove('active');
    });
  }
}

window.switchTab = function(tabId) {
  const tabBtn = document.querySelector(`[data-tab="${tabId}"]`);
  if (tabBtn) tabBtn.click();
};

// Autenticación & Control de Sesión
function setupAuthControls() {
  const btnAuthTrigger = document.getElementById('btn-auth-trigger');
  const modalAuth = document.getElementById('modal-auth');
  
  const tabLogin = document.getElementById('auth-tab-login');
  const tabRegister = document.getElementById('auth-tab-register');
  const formLogin = document.getElementById('form-login');
  const formRegister = document.getElementById('form-register');

  btnAuthTrigger.addEventListener('click', () => {
    if (currentUser) {
      if (confirm(`¿Cerrar la sesión de ${currentUser.nombre}?`)) {
        saveSession(null);
        alert('🔒 Sesión cerrada.');
      }
    } else {
      openModalAuth();
    }
  });

  document.getElementById('btn-open-register')?.addEventListener('click', () => {
    openModalAuth('register');
  });

  tabLogin.addEventListener('click', () => {
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
    formLogin.style.display = 'block';
    formRegister.style.display = 'none';
  });

  tabRegister.addEventListener('click', () => {
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
    formRegister.style.display = 'block';
    formLogin.style.display = 'none';
  });

  // Submit Login
  formLogin.addEventListener('submit', e => {
    e.preventDefault();
    const usr = document.getElementById('login-usuario').value.trim();
    const pass = document.getElementById('login-clave').value.trim();

    // Permite login por usuario (ej. daniel.lopez) o por nombre completo (ej. Daniel López)
    const found = db.usuarios.find(u => 
      (u.usuario.toLowerCase() === usr.toLowerCase() || u.nombre.toLowerCase() === usr.toLowerCase()) && 
      u.clave === pass
    );

    if (found) {
      saveSession(found);
      closeModals();
      alert(`🎉 ¡Bienvenido ${found.nombre}! Sesión iniciada.`);
    } else {
      alert('❌ Usuario o contraseña incorrectos.\nUsuarios autorizados:\n- Daniel López (clave: admin1234)\n- Daniel García (clave: admin1234)\n- Antonio Horta (clave: admin1234)');
    }
  });

  // Submit Register
  formRegister.addEventListener('submit', e => {
    e.preventDefault();
    const nombre = document.getElementById('reg-nombre').value.trim();
    const usuario = document.getElementById('reg-usuario').value.trim();
    const clave = document.getElementById('reg-clave').value.trim();

    if (db.usuarios.some(u => u.usuario.toLowerCase() === usuario.toLowerCase())) {
      alert('⚠️ Este nombre de usuario ya existe. Elige otro.');
      return;
    }

    const newUser = { id: 'usr_' + Date.now(), nombre, usuario, clave, rol: 'tesorero' };
    db.usuarios.push(newUser);
    saveData();
    saveSession(newUser);
    closeModals();
    alert(`🎉 ¡Cuenta creada con éxito! Bienvenido ${nombre}.`);
  });
}

function openModalAuth(tab = 'login') {
  const modalAuth = document.getElementById('modal-auth');
  const tabLogin = document.getElementById('auth-tab-login');
  const tabRegister = document.getElementById('auth-tab-register');
  const formLogin = document.getElementById('form-login');
  const formRegister = document.getElementById('form-register');

  formLogin.reset();
  formRegister.reset();

  if (tab === 'register') {
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
    formRegister.style.display = 'block';
    formLogin.style.display = 'none';
  } else {
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
    formLogin.style.display = 'block';
    formRegister.style.display = 'none';
  }

  modalAuth.classList.add('active');
}

function updateAuthUI() {
  const userStatusIcon = document.getElementById('user-status-icon');
  const userStatusText = document.getElementById('user-status-text');
  const sessionBanner = document.getElementById('session-banner');

  if (currentUser) {
    document.body.classList.remove('read-only');
    document.body.classList.add('authenticated');
    userStatusIcon.textContent = '👤';
    userStatusText.textContent = currentUser.nombre;
    sessionBanner.innerHTML = `<span>🟢 Sesión Activa: <strong>${escapeHTML(currentUser.nombre)}</strong></span> <button onclick="saveSession(null)" class="ios-link-btn" style="color: #dc2626;">Salir 🚪</button>`;
  } else {
    document.body.classList.add('read-only');
    document.body.classList.remove('authenticated');
    userStatusIcon.textContent = '🔑';
    userStatusText.textContent = 'Acceso Tesorero';
    sessionBanner.innerHTML = `<span>👁️ Modo Lectura (Sin inicio de sesión)</span> <button onclick="openModalAuth()" class="ios-link-btn">Iniciar Sesión 🔐</button>`;
  }

  renderUsuariosList();
  renderAll();
}

function renderUsuariosList() {
  const ul = document.getElementById('list-usuarios-registered');
  if (!ul) return;

  ul.innerHTML = db.usuarios.map(u => `
    <li>
      <span>👤 <strong>${escapeHTML(u.nombre)}</strong> (usuario: <code>${escapeHTML(u.usuario)}</code>)</span>
      <span class="badge badge-success">Autorizado</span>
    </li>
  `).join('');
}

// Countdown Timer
function startCountdownTimer() {
  const timerElem = document.getElementById('countdown-timer');
  
  function updateTimer() {
    const targetDate = new Date(db.config.fechaFiestas || '2026-09-12T12:00:00').getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      timerElem.textContent = '🎉 ¡ESTAMOS EN FIESTAS EN ALMODÓVAR! 🎉';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    timerElem.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// Render Core
function renderAll() {
  renderMetrics();
  renderSocios();
  renderInvitados();
  renderCompras();
  renderGastos();
  renderConfig();
  renderCharts();
}

// 1. Dashboard Interactivo
function renderMetrics() {
  // Recaudado Socios
  const recaudadoSocios = db.socios.reduce((acc, s) => acc + (Number(s.pagado) || 0), 0);
  
  // Recaudado Invitados
  const recaudadoInvitados = db.invitados
    .filter(i => i.estado === 'pagado')
    .reduce((acc, i) => acc + (Number(i.importe) || 0), 0);

  // Fondo / Caja Ahorrada del Año Pasado
  const cajaAnteriores = Number(db.config.cajaAnteriores) || 0;

  const totalRecaudado = recaudadoSocios + recaudadoInvitados + cajaAnteriores;

  // Compras Comunes Compradas
  const totalComprasIniciales = db.compras
    .filter(c => c.estado === 'comprado' && c.categoria !== 'corralon')
    .reduce((acc, c) => acc + (Number(c.precio) || 0), 0);

  // Gasto Corralón
  const gastoCorralon = db.compras
    .filter(c => c.categoria === 'corralon' && c.estado === 'comprado')
    .reduce((acc, c) => acc + (Number(c.precio) || 0), 0);
  
  const presupuestoCorralon = db.config.totalCorralon || 800;

  // Gastos Extras Imprevistos
  const totalGastosExtras = db.gastos
    .filter(g => g.estado === 'aprobado')
    .reduce((acc, g) => acc + (Number(g.importe) || 0), 0);

  // Total Gastado Real
  const totalGastado = gastoCorralon + totalComprasIniciales + totalGastosExtras;

  // Pendiente de Cobro
  const pendienteSocios = db.socios.reduce((acc, s) => {
    const pend = (Number(s.cuota) || 0) - (Number(s.pagado) || 0);
    return acc + (pend > 0 ? pend : 0);
  }, 0);

  const pendienteInvitados = db.invitados
    .filter(i => i.estado === 'pendiente')
    .reduce((acc, i) => acc + (Number(i.importe) || 0), 0);

  const totalPendiente = pendienteSocios + pendienteInvitados;
  const saldoCaja = totalRecaudado - totalGastado;

  const sociosPendientesCount = db.socios.filter(s => (s.cuota - s.pagado) > 0).length;

  // Populate Main Cards
  document.getElementById('val-recaudado').textContent = `${totalRecaudado.toLocaleString()} €`;
  document.getElementById('val-recaudado-socios').textContent = recaudadoSocios;
  document.getElementById('val-recaudado-invitados').textContent = recaudadoInvitados;
  if (document.getElementById('val-caja-anterior')) {
    document.getElementById('val-caja-anterior').textContent = cajaAnteriores;
  }

  document.getElementById('val-gastado').textContent = `${totalGastado.toLocaleString()} €`;

  const elemSaldo = document.getElementById('val-saldo');
  elemSaldo.textContent = `${saldoCaja.toLocaleString()} €`;
  elemSaldo.className = `metric-value ${saldoCaja >= 0 ? 'text-success' : 'text-danger'}`;
  document.getElementById('val-saldo-status').textContent = saldoCaja >= 0 ? '👍 Saldo positivo en caja' : '⚠️ Saldo negativo en caja';

  document.getElementById('val-pendiente').textContent = `${totalPendiente.toLocaleString()} €`;
  document.getElementById('val-socios-pendientes').textContent = sociosPendientesCount;

  document.getElementById('count-socios').textContent = db.socios.length;
  document.getElementById('count-invitados').textContent = db.invitados.length;

  // Breakdown Cards
  document.getElementById('dash-corralon-amount').textContent = `${gastoCorralon} €`;
  document.getElementById('dash-corralon-budget').textContent = `${presupuestoCorralon} €`;

  document.getElementById('dash-iniciales-amount').textContent = `${totalComprasIniciales} €`;
  document.getElementById('dash-extras-amount').textContent = `${totalGastosExtras} €`;

  renderSummaryLists();
}

// Render Charts via Chart.js
function renderCharts() {
  if (typeof Chart === 'undefined') return;

  const canvasGastoCat = document.getElementById('chartGastoCategoria');
  const canvasPresupuestoVsReal = document.getElementById('chartPresupuestoVsReal');

  if (!canvasGastoCat || !canvasPresupuestoVsReal) return;

  // Calculate Categories Data
  let gastoCorralon = 0;
  let gastoAlcohol = 0;
  let gastoRefrescos = 0;
  let gastoEquipamiento = 0;
  let gastoOtrosCompras = 0;

  db.compras.forEach(c => {
    const val = c.estado === 'comprado' ? (Number(c.precio) || 0) : 0;
    if (c.categoria === 'corralon') gastoCorralon += val;
    else if (c.categoria === 'alcohol') gastoAlcohol += val;
    else if (c.categoria === 'refrescos') gastoRefrescos += val;
    else if (c.categoria === 'equipamiento') gastoEquipamiento += val;
    else gastoOtrosCompras += val;
  });

  const gastoExtras = db.gastos
    .filter(g => g.estado === 'aprobado')
    .reduce((acc, g) => acc + Number(g.importe), 0);

  // 1. Chart 1: Donut Chart por Categoría
  if (chartGastoCatInstance) chartGastoCatInstance.destroy();

  chartGastoCatInstance = new Chart(canvasGastoCat, {
    type: 'doughnut',
    data: {
      labels: ['Corralón', 'Alcohol (1L/75CL)', 'Refrescos (2L) & Hielos', 'Equipamiento/Sonido', 'Gastos Extras Imprevistos'],
      datasets: [{
        data: [gastoCorralon, gastoAlcohol, gastoRefrescos, gastoEquipamiento, gastoExtras],
        backgroundColor: [
          '#0284c7', // Corralon Blue
          '#dc2626', // Alcohol Red
          '#16a34a', // Refrescos Green
          '#d97706', // Equipos Amber
          '#9333ea'  // Extras Purple
        ],
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });

  // 2. Chart 2: Bar Chart Comparativo de Gastos por Bloque
  if (chartPresupuestoVsRealInstance) chartPresupuestoVsRealInstance.destroy();

  chartPresupuestoVsRealInstance = new Chart(canvasPresupuestoVsReal, {
    type: 'bar',
    data: {
      labels: ['Corralón', 'Alcohol (1L)', 'Refrescos (2L)', 'Equipamiento', 'Extras Imprevistos'],
      datasets: [
        {
          label: 'Gasto Total (€)',
          data: [gastoCorralon, gastoAlcohol, gastoRefrescos, gastoEquipamiento, gastoExtras],
          backgroundColor: '#16a34a'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

function renderSummaryLists() {
  // Deudores
  const deudores = db.socios
    .filter(s => (s.cuota - s.pagado) > 0)
    .slice(0, 5);

  const listDeudores = document.getElementById('list-deudores-summary');
  if (deudores.length === 0) {
    listDeudores.innerHTML = '<li class="empty-msg">¡Todos los peñistas han pagado! 🎉</li>';
  } else {
    listDeudores.innerHTML = deudores.map(s => `
      <li>
        <span><strong>${escapeHTML(s.nombre)}</strong></span>
        <span class="text-danger">Faltan ${s.cuota - s.pagado} €</span>
      </li>
    `).join('');
  }

  // Ultimos Gastos Extras
  const ultimosGastos = [...db.gastos].reverse().slice(0, 5);
  const listGastos = document.getElementById('list-gastos-summary');
  if (ultimosGastos.length === 0) {
    listGastos.innerHTML = '<li class="empty-msg">No hay gastos extras registrados aún.</li>';
  } else {
    listGastos.innerHTML = ultimosGastos.map(g => `
      <li>
        <span>${escapeHTML(g.concepto)}</span>
        <strong class="text-danger">${g.importe} €</strong>
      </li>
    `).join('');
  }
}

// 2. Compras Comunes (Bote General)
let compraFilter = 'todos';
let compraSearchQuery = '';

function extractQtyNumber(cantidadStr) {
  if (!cantidadStr) return '1';
  const match = cantidadStr.match(/(\d+)/);
  return match ? match[1] : cantidadStr;
}

function renderCompras() {
  const tbody = document.getElementById('tbody-compras');
  let list = db.compras.filter(c => {
    const matchSearch = c.nombre.toLowerCase().includes(compraSearchQuery.toLowerCase()) ||
                        (c.cantidad && c.cantidad.toLowerCase().includes(compraSearchQuery.toLowerCase()));
    const isComprado = c.estado === 'comprado';
    if (compraFilter === 'pendiente') return matchSearch && !isComprado;
    if (compraFilter === 'comprado') return matchSearch && isComprado;
    return matchSearch;
  });

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="empty-msg">No hay compras registradas en el bote común.</td></tr>`;
    return;
  }

  const catLabels = {
    alcohol: '🍷 Alcohol (1L / 75CL)',
    refrescos: '🥤 Refrescos 2L & Hielos',
    equipamiento: '🔊 Sonido / Equipos',
    corralon: '🏠 Corralón',
    comida: '🥩 Comida',
    otros: '📦 Otros'
  };

  tbody.innerHTML = list.map((c, index) => {
    const isComprado = c.estado === 'comprado';
    const cantidadText = c.cantidad || '-';
    const qtyNum = extractQtyNumber(cantidadText);
    const pTotal = Number(c.precio || 0).toFixed(2);
    const pUnit = c.precioUnitario ? Number(c.precioUnitario).toFixed(2) + ' €/ud' : '-';

    return `
      <tr>
        <td class="desktop-only"><strong>${index + 1}</strong></td>
        
        <!-- VISTA MÓVIL: Tarjeta Blanca Limpia con Swipe Deslizable a la Izquierda -->
        <td class="mobile-only-cell">
          <div class="compra-swipe-row">
            <div class="compra-swipe-body">
              <div class="compra-main-info">
                <div style="display:flex; align-items:center; gap:6px;">
                  <strong class="compra-name-title">${escapeHTML(c.nombre)}</strong>
                  <span class="compra-qty-circle">${qtyNum} ud</span>
                </div>
                <div class="compra-sub-info">
                  <span class="badge ${isComprado ? 'badge-success' : 'badge-warning'}" style="font-size: 0.72rem; padding: 2px 6px;">
                    ${isComprado ? '✅ Comprado' : '⏳ Pendiente'}
                  </span>
                  <span style="font-size:0.75rem; color:#64748b;">👈 Desliza para acciones</span>
                </div>
              </div>

              <div class="compra-price-info">
                <strong class="compra-total-val">${pTotal} €</strong>
                ${c.precioUnitario ? `<span class="compra-unit-val">${pUnit}</span>` : ''}
              </div>
            </div>

            <div class="compra-swipe-actions">
              <button class="swipe-action-btn ${isComprado ? 'btn-secondary' : 'btn-primary'}" onclick="toggleEstadoCompra('${c.id}')" title="${isComprado ? 'Comprado' : 'Comprar'}">
                ${isComprado ? '✅' : '⏳'}
              </button>
              <button class="swipe-action-btn btn-secondary admin-only" onclick="openModalCompra('${c.id}')" title="Editar">✏️</button>
              <button class="swipe-action-btn btn-danger admin-only" onclick="deleteCompra('${c.id}')" title="Eliminar">🗑️</button>
            </div>
          </div>
        </td>

        <!-- CELDAS DE ORDENADOR (DESKTOP) TRADICIONALES -->
        <td class="desktop-only"><strong class="item-title">${escapeHTML(c.nombre)}</strong></td>
        <td class="desktop-only"><span class="badge badge-warning" style="font-size: 0.85rem;">📦 ${qtyNum} ud</span></td>
        <td class="desktop-only"><span style="font-size: 0.88rem; font-weight: 600; color: #475569;">${pUnit}</span></td>
        <td class="desktop-only"><strong class="text-success" style="font-size: 0.95rem;">${pTotal} €</strong></td>
        <td class="desktop-only">
          <span class="badge ${isComprado ? 'badge-success' : 'badge-warning'}">
            ${isComprado ? '✅ Comprado' : '⏳ Pendiente'}
          </span>
        </td>
        <td class="text-right desktop-only">
          ${currentUser ? `
            <button class="${isComprado ? 'btn-secondary' : 'btn-primary'} btn-sm" onclick="toggleEstadoCompra('${c.id}')" title="${isComprado ? 'Comprado' : 'Comprar'}">
              ${isComprado ? '✅ Comprado' : '⏳ Comprar'}
            </button>
            <button class="btn-secondary btn-sm admin-only" onclick="openModalCompra('${c.id}')" title="Editar">✏️</button>
            <button class="btn-danger btn-sm admin-only" onclick="deleteCompra('${c.id}')" title="Eliminar">🗑️</button>
          ` : `<span class="badge ${isComprado ? 'badge-success' : 'badge-warning'}">${isComprado ? '✅ Comprado' : '⏳ Pendiente'}</span>`}
        </td>
      </tr>
    `;
  }).join('');
}

function calcularCuotaSocio(s) {
  const base = Number(s.cuotaBase !== undefined ? s.cuotaBase : (db.config.cuotaBaseCorralon || 80));
  let extra = 0;
  if (s.tramoAlcohol === 'completo') {
    extra = Number(db.config.tramoAlcoholCompleto !== undefined ? db.config.tramoAlcoholCompleto : 50);
  } else if (s.tramoAlcohol === 'finde') {
    extra = Number(db.config.tramoAlcoholFinde !== undefined ? db.config.tramoAlcoholFinde : 30);
  } else if (s.tramoAlcohol === 'dia') {
    const dias = Number(s.diasSueltos || 1);
    extra = (Number(db.config.tramoAlcoholDia !== undefined ? db.config.tramoAlcoholDia : 15)) * dias;
  }
  return base + extra;
}

// 3. Render Socios
let socioFilter = 'todos';
let socioSearchQuery = '';

function renderSocios() {
  const tbody = document.getElementById('tbody-socios');
  let list = db.socios.filter(s => {
    const cuotaTotal = calcularCuotaSocio(s);
    s.cuota = cuotaTotal;
    const matchSearch = s.nombre.toLowerCase().includes(socioSearchQuery.toLowerCase());
    const pendiente = (s.cuota - s.pagado) > 0;
    if (socioFilter === 'pendiente') return matchSearch && pendiente;
    if (socioFilter === 'pagado') return matchSearch && !pendiente;
    return matchSearch;
  });

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="empty-msg">No se encontraron peñistas.</td></tr>`;
    return;
  }

  const tramoLabels = {
    completo: '🌟 Fiestas Completas (+50€)',
    finde: '🎟️ Fin de Semana (+30€)',
    dia: '🎫 Días Sueltos',
    ninguno: '🚫 Solo Alquiler (+0€)'
  };

  tbody.innerHTML = list.map((s, index) => {
    const cuotaTotal = calcularCuotaSocio(s);
    s.cuota = cuotaTotal;
    const pend = s.cuota - s.pagado;
    const isPagado = pend <= 0;
    const cuotaBaseVal = s.cuotaBase !== undefined ? s.cuotaBase : (db.config.cuotaBaseCorralon || 80);
    const tramoLabelText = s.tramoAlcohol === 'dia' ? `🎫 ${s.diasSueltos || 1}d sueltos` : (tramoLabels[s.tramoAlcohol] || '🌟 Fiestas Completas');

    return `
      <tr>
        <td class="desktop-only"><strong>${index + 1}</strong></td>
        
        <!-- VISTA MÓVIL: Tarjeta Blanca Limpia con Swipe Deslizable a la Izquierda -->
        <td class="mobile-only-cell">
          <div class="ios-swipe-row">
            <div class="ios-swipe-body">
              <div class="ios-swipe-main">
                <strong class="ios-swipe-title">${escapeHTML(s.nombre)}</strong>
                <div class="ios-swipe-sub">
                  <span class="badge ${isPagado ? 'badge-success' : 'badge-danger'}" style="font-size: 0.72rem; padding: 2px 6px;">
                    ${isPagado ? '✅ Pagado' : '❌ Falta ' + pend + '€'}
                  </span>
                  <span style="font-size:0.75rem; color:#64748b;">• ${tramoLabelText}</span>
                </div>
              </div>

              <div class="ios-swipe-price">
                <strong class="${isPagado ? 'text-success' : 'text-danger'}" style="font-size: 1.05rem;">${s.pagado} / ${cuotaTotal} €</strong>
                <span style="font-size: 0.72rem; color: #64748b;">Base: ${cuotaBaseVal}€</span>
              </div>
            </div>

            <div class="ios-swipe-actions">
              <button class="swipe-action-btn ${isPagado ? 'btn-secondary' : 'btn-primary'} admin-only" onclick="${isPagado ? `quickDesmarcarPagoSocio('${s.id}')` : `quickMarcarPagadoSocio('${s.id}')`}" title="${isPagado ? 'Pagado' : 'Pagar'}">
                ${isPagado ? '✅' : '❌'}
              </button>
              <button class="swipe-action-btn btn-secondary admin-only" onclick="openModalSocio('${s.id}')" title="Editar">✏️</button>
              <button class="swipe-action-btn btn-danger admin-only" onclick="deleteSocio('${s.id}')" title="Eliminar">🗑️</button>
            </div>
          </div>
        </td>

        <!-- CELDAS DESKTOP TRADICIONALES -->
        <td class="desktop-only"><strong>${escapeHTML(s.nombre)}</strong></td>
        <td class="desktop-only">${cuotaBaseVal} €</td>
        <td class="desktop-only">${tramoLabelText}</td>
        <td class="desktop-only"><strong class="text-main">${cuotaTotal} €</strong></td>
        <td class="desktop-only text-success">${s.pagado} €</td>
        <td class="desktop-only"><span class="badge ${isPagado ? 'badge-success' : 'badge-danger'}">${isPagado ? '✅ Pagado' : '❌ Falta por Pagar'}</span></td>
        <td class="text-right desktop-only">
          ${currentUser ? `
            <button class="${isPagado ? 'btn-secondary' : 'btn-primary'} btn-sm admin-only" onclick="${isPagado ? `quickDesmarcarPagoSocio('${s.id}')` : `quickMarcarPagadoSocio('${s.id}')`}">
              ${isPagado ? '✅ Pagado' : '❌ Pagar'}
            </button>
            <button class="btn-secondary btn-sm admin-only" onclick="openModalSocio('${s.id}')">✏️</button>
            <button class="btn-danger btn-sm admin-only" onclick="deleteSocio('${s.id}')">🗑️</button>
          ` : `<span class="badge ${isPagado ? 'badge-success' : 'badge-danger'}">${isPagado ? '✅ Pagado' : '❌ Sin Pagar'}</span>`}
        </td>
      </tr>
    `;
  }).join('');
}

// 4. Render Invitados
let invitadoSearchQuery = '';

function renderInvitados() {
  const tbody = document.getElementById('tbody-invitados');
  let list = db.invitados.filter(i => {
    const anf = db.socios.find(s => s.id === i.anfitrionId);
    const anfNombre = anf ? anf.nombre : '';
    return i.nombre.toLowerCase().includes(invitadoSearchQuery.toLowerCase()) || 
           anfNombre.toLowerCase().includes(invitadoSearchQuery.toLowerCase());
  });

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="empty-msg">No hay invitados registrados.</td></tr>`;
    return;
  }

  const modalidadLabels = {
    dia: '🎫 Día Suelto',
    finde1: '🎟️ 1er Finde',
    finde2: '🎟️ 2º Finde',
    completo: '🌟 Fiestas Completas (10d)'
  };

  tbody.innerHTML = list.map((i, index) => {
    const anfitrion = db.socios.find(s => s.id === i.anfitrionId);
    const isPagado = i.estado === 'pagado';

    return `
      <tr>
        <td class="desktop-only"><strong>${index + 1}</strong></td>
        
        <!-- VISTA MÓVIL: Tarjeta Blanca Limpia con Swipe Deslizable a la Izquierda -->
        <td class="mobile-only-cell">
          <div class="ios-swipe-row">
            <div class="ios-swipe-body">
              <div class="ios-swipe-main">
                <strong class="ios-swipe-title">${escapeHTML(i.nombre)}</strong>
                <div class="ios-swipe-sub">
                  <span class="badge ${isPagado ? 'badge-success' : 'badge-danger'}" style="font-size: 0.72rem; padding: 2px 6px;">
                    ${isPagado ? '✅ Pagado' : '❌ Falta por Pagar'}
                  </span>
                  <span style="font-size:0.75rem; color:#64748b;">• Anfitrión: ${anfitrion ? escapeHTML(anfitrion.nombre) : '-'}</span>
                </div>
              </div>

              <div class="ios-swipe-price">
                <strong class="text-success" style="font-size: 1.05rem;">${i.importe} €</strong>
                <span style="font-size: 0.72rem; color: #64748b;">${modalidadLabels[i.modalidad] || i.modalidad}</span>
              </div>
            </div>

            <div class="ios-swipe-actions">
              <button class="swipe-action-btn ${isPagado ? 'btn-secondary' : 'btn-primary'} admin-only" onclick="togglePagoInvitado('${i.id}')" title="${isPagado ? 'Pagado' : 'Pagar'}">
                ${isPagado ? '✅' : '❌'}
              </button>
              <button class="swipe-action-btn btn-secondary admin-only" onclick="openModalInvitado('${i.id}')" title="Editar">✏️</button>
              <button class="swipe-action-btn btn-danger admin-only" onclick="deleteInvitado('${i.id}')" title="Eliminar">🗑️</button>
            </div>
          </div>
        </td>

        <!-- CELDAS DESKTOP TRADICIONALES -->
        <td class="desktop-only"><strong>${escapeHTML(i.nombre)}</strong></td>
        <td class="desktop-only">${anfitrion ? escapeHTML(anfitrion.nombre) : 'Desconocido'}</td>
        <td class="desktop-only">${modalidadLabels[i.modalidad] || i.modalidad}</td>
        <td class="desktop-only">${escapeHTML(i.detalleDia || '-')}</td>
        <td class="desktop-only"><strong>${i.importe} €</strong></td>
        <td class="desktop-only">
          <span class="badge ${isPagado ? 'badge-success' : 'badge-danger'}">
            ${isPagado ? '✅ Pagado' : '❌ Falta por Pagar'}
          </span>
        </td>
        <td class="text-right desktop-only">
          ${currentUser ? `
            <button class="${isPagado ? 'btn-secondary' : 'btn-primary'} btn-sm admin-only" onclick="togglePagoInvitado('${i.id}')">
              ${isPagado ? '✅ Pagado' : '❌ Pagar'}
            </button>
            <button class="btn-secondary btn-sm admin-only" onclick="openModalInvitado('${i.id}')">✏️</button>
            <button class="btn-danger btn-sm admin-only" onclick="deleteInvitado('${i.id}')">🗑️</button>
          ` : `<span class="badge ${isPagado ? 'badge-success' : 'badge-danger'}">${isPagado ? '✅ Pagado' : '❌ Sin Pagar'}</span>`}
        </td>
      </tr>
    `;
  }).join('');
}

// 5. Render Gastos Extras / Imprevistos
let gastoSearchQuery = '';
let gastoFilter = 'todos';

function renderGastos() {
  const tbody = document.getElementById('tbody-gastos');
  let list = db.gastos.filter(g => {
    const matchSearch = g.concepto.toLowerCase().includes(gastoSearchQuery.toLowerCase()) ||
                        g.categoria.toLowerCase().includes(gastoSearchQuery.toLowerCase());
    const isPagado = g.estado === 'aprobado';
    if (gastoFilter === 'pendiente') return matchSearch && !isPagado;
    if (gastoFilter === 'pagado') return matchSearch && isPagado;
    return matchSearch;
  });

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="empty-msg">No se encontraron gastos extras.</td></tr>`;
    return;
  }

  const catLabels = {
    imprevisto_bebida: '🍷 Reposición Bebida / Hielos',
    imprevisto_comida: '🥩 Comida Extra',
    imprevisto_menaje: '🥛 Vasos y Limpieza',
    imprevisto_equipo: '🔧 Sonido / Cableado',
    otros: '📦 Otros Imprevistos'
  };

  tbody.innerHTML = list.map((g, index) => {
    let pagadoPorText = '💰 Bote Peña';
    if (g.compradorId && g.compradorId !== 'peña') {
      const socio = db.socios.find(s => s.id === g.compradorId);
      pagadoPorText = socio ? `👤 ${socio.nombre}` : 'Socio Desconocido';
    }

    const isAprobado = g.estado === 'aprobado';

    return `
      <tr>
        <td class="desktop-only"><strong>${index + 1}</strong></td>
        
        <!-- VISTA MÓVIL: Tarjeta Blanca Limpia con Swipe Deslizable a la Izquierda -->
        <td class="mobile-only-cell">
          <div class="ios-swipe-row">
            <div class="ios-swipe-body">
              <div class="ios-swipe-main">
                <strong class="ios-swipe-title">${escapeHTML(g.concepto)}</strong>
                <div class="ios-swipe-sub">
                  <span class="badge ${isAprobado ? 'badge-success' : 'badge-warning'}" style="font-size: 0.72rem; padding: 2px 6px;">
                    ${isAprobado ? '✅ Aprobado' : '⏳ Pendiente'}
                  </span>
                  <span style="font-size:0.75rem; color:#64748b;">• ${escapeHTML(pagadoPorText)}</span>
                </div>
              </div>

              <div class="ios-swipe-price">
                <strong class="text-danger" style="font-size: 1.05rem;">${g.importe} €</strong>
              </div>
            </div>

            <div class="ios-swipe-actions">
              <button class="swipe-action-btn ${isAprobado ? 'btn-secondary' : 'btn-primary'} admin-only" onclick="toggleEstadoGasto('${g.id}')" title="${isAprobado ? 'Aprobado' : 'Aprobar'}">
                ${isAprobado ? '✅' : '⏳'}
              </button>
              <button class="swipe-action-btn btn-secondary admin-only" onclick="openModalGasto('${g.id}')" title="Editar">✏️</button>
              <button class="swipe-action-btn btn-danger admin-only" onclick="deleteGasto('${g.id}')" title="Eliminar">🗑️</button>
            </div>
          </div>
        </td>

        <!-- CELDAS DESKTOP TRADICIONALES -->
        <td class="desktop-only"><strong>${escapeHTML(g.concepto)}</strong></td>
        <td class="desktop-only">${catLabels[g.categoria] || g.categoria}</td>
        <td class="desktop-only"><strong class="text-danger">${g.importe} €</strong></td>
        <td class="desktop-only">${escapeHTML(pagadoPorText)}</td>
        <td class="desktop-only">
          <span class="badge ${isAprobado ? 'badge-success' : 'badge-warning'}">
            ${isAprobado ? '✅ Pagado' : '⏳ Falta por Pagar'}
          </span>
        </td>
        <td class="text-right desktop-only">
          ${currentUser ? `
            <button class="${isAprobado ? 'btn-secondary' : 'btn-primary'} btn-sm admin-only" onclick="toggleEstadoGasto('${g.id}')">
              ${isAprobado ? '✅ Pagado' : '⏳ Pagar'}
            </button>
            <button class="btn-secondary btn-sm admin-only" onclick="openModalGasto('${g.id}')">✏️</button>
            <button class="btn-danger btn-sm admin-only" onclick="deleteGasto('${g.id}')">🗑️</button>
          ` : `<span class="badge ${isAprobado ? 'badge-success' : 'badge-warning'}">${isAprobado ? '✅ Pagado' : '⏳ Pendiente'}</span>`}
        </td>
      </tr>
    `;
  }).join('');
}

// 6. Render Config
function renderConfig() {
  if (document.getElementById('cfg-caja-anterior')) {
    document.getElementById('cfg-caja-anterior').value = db.config.cajaAnteriores || 0;
  }
  if (document.getElementById('cfg-cuota-base-corralon')) {
    document.getElementById('cfg-cuota-base-corralon').value = db.config.cuotaBaseCorralon || 80;
  }
  if (document.getElementById('cfg-tramo-completo')) {
    document.getElementById('cfg-tramo-completo').value = db.config.tramoAlcoholCompleto || 50;
  }
  if (document.getElementById('cfg-tramo-finde')) {
    document.getElementById('cfg-tramo-finde').value = db.config.tramoAlcoholFinde || 30;
  }
  if (document.getElementById('cfg-tramo-dia')) {
    document.getElementById('cfg-tramo-dia').value = db.config.tramoAlcoholDia || 15;
  }
  document.getElementById('cfg-total-corralon').value = db.config.totalCorralon || 800;
  document.getElementById('cfg-tarifa-dia').value = db.config.tarifaDia || 15;
  document.getElementById('cfg-tarifa-finde').value = db.config.tarifaFinde || 35;
  document.getElementById('cfg-tarifa-completo').value = db.config.tarifaCompleto || 70;
}

// Setup Filters & Search
function setupFiltersAndSearch() {
  // Compras Search & Filter
  document.getElementById('search-compras').addEventListener('input', e => {
    compraSearchQuery = e.target.value;
    renderCompras();
  });

  document.querySelectorAll('[data-filter-compra]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filter-compra]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      compraFilter = btn.dataset.filterCompra;
      renderCompras();
    });
  });

  // Socios Search & Filter
  document.getElementById('search-socios').addEventListener('input', e => {
    socioSearchQuery = e.target.value;
    renderSocios();
  });

  document.querySelectorAll('[data-filter-socio]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filter-socio]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      socioFilter = btn.dataset.filterSocio;
      renderSocios();
    });
  });

  // Invitados Search
  document.getElementById('search-invitados').addEventListener('input', e => {
    invitadoSearchQuery = e.target.value;
    renderInvitados();
  });

  // Gastos Search & Filter
  document.getElementById('search-gastos').addEventListener('input', e => {
    gastoSearchQuery = e.target.value;
    renderGastos();
  });

  document.querySelectorAll('[data-filter-gasto]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filter-gasto]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      gastoFilter = btn.dataset.filterGasto;
      renderGastos();
    });
  });
}

// Forms & Modals Setup
function setupFormsAndModals() {
  // Close Modals
  document.querySelectorAll('.modal-close, .modal-cancel').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('active'));
    });
  });

  // Open Add Compra Común
  document.getElementById('btn-add-compra')?.addEventListener('click', () => {
    if (!currentUser) return openModalAuth();
    openModalCompra();
  });

  // Auto-cálculo de precio total según unidades y precio individual
  const inputQty = document.getElementById('compra-cantidad');
  const inputUnit = document.getElementById('compra-precio-unitario');
  const inputTotal = document.getElementById('compra-precio');

  function autoCalcCompraTotal() {
    const unitPrice = parseFloat(inputUnit?.value);
    if (!isNaN(unitPrice) && unitPrice > 0) {
      const match = inputQty?.value.match(/(\d+)/);
      const qty = match ? parseInt(match[1], 10) : 1;
      if (inputTotal) inputTotal.value = (unitPrice * qty).toFixed(2);
    }
  }

  inputUnit?.addEventListener('input', autoCalcCompraTotal);
  inputQty?.addEventListener('input', autoCalcCompraTotal);

  // Save Compra Común Form
  document.getElementById('form-compra').addEventListener('submit', e => {
    e.preventDefault();
    if (!currentUser) return openModalAuth();

    const id = document.getElementById('compra-id').value;
    const nombre = document.getElementById('compra-nombre').value.trim();
    const cantidad = document.getElementById('compra-cantidad').value.trim();
    const precioUnitario = Number(document.getElementById('compra-precio-unitario').value) || 0;
    const categoria = document.getElementById('compra-categoria').value;
    const precio = Number(document.getElementById('compra-precio').value) || 0;
    const estado = document.getElementById('compra-estado').value;

    const itemData = { id, nombre, cantidad, precioUnitario, categoria, precio, estado };

    if (id) {
      const idx = db.compras.findIndex(c => c.id === id);
      if (idx !== -1) db.compras[idx] = itemData;
    } else {
      const newId = 'cmp_' + Date.now();
      db.compras.push({ ...itemData, id: newId });
    }

    saveData();
    closeModals();
  });

  // Open Add Socio
  document.getElementById('btn-add-socio')?.addEventListener('click', () => {
    if (!currentUser) return openModalAuth();
    openModalSocio();
  });

  // Auto-cálculo de cuota de peñista (Cuota Base Corralón + Tramo de Alcohol)
  const inputSocioBase = document.getElementById('socio-cuota-base');
  const selectSocioTramo = document.getElementById('socio-tramo-alcohol');
  const inputSocioDias = document.getElementById('socio-dias-sueltos');
  const groupSocioDias = document.getElementById('group-socio-dias');
  const inputSocioCuota = document.getElementById('socio-cuota');

  function autoRecalcSocioCuota() {
    const tramo = selectSocioTramo?.value;
    if (groupSocioDias) {
      groupSocioDias.style.display = tramo === 'dia' ? 'block' : 'none';
    }
    const tempSocio = {
      cuotaBase: Number(inputSocioBase?.value) || (db.config.cuotaBaseCorralon || 80),
      tramoAlcohol: tramo,
      diasSueltos: Number(inputSocioDias?.value) || 1
    };
    if (inputSocioCuota) {
      inputSocioCuota.value = calcularCuotaSocio(tempSocio);
    }
  }

  inputSocioBase?.addEventListener('input', autoRecalcSocioCuota);
  selectSocioTramo?.addEventListener('change', autoRecalcSocioCuota);
  inputSocioDias?.addEventListener('input', autoRecalcSocioCuota);

  // Save Socio Form
  document.getElementById('form-socio').addEventListener('submit', e => {
    e.preventDefault();
    if (!currentUser) return openModalAuth();

    const id = document.getElementById('socio-id').value;
    const nombre = document.getElementById('socio-nombre').value.trim();
    const cuotaBase = Number(document.getElementById('socio-cuota-base').value) || (db.config.cuotaBaseCorralon || 80);
    const tramoAlcohol = document.getElementById('socio-tramo-alcohol').value;
    const diasSueltos = Number(document.getElementById('socio-dias-sueltos').value) || 1;
    const cuota = Number(document.getElementById('socio-cuota').value) || calcularCuotaSocio({ cuotaBase, tramoAlcohol, diasSueltos });
    const pagado = Number(document.getElementById('socio-pagado').value);

    const socioData = { id, nombre, cuotaBase, tramoAlcohol, diasSueltos, cuota, pagado };

    if (id) {
      const idx = db.socios.findIndex(s => s.id === id);
      if (idx !== -1) db.socios[idx] = socioData;
    } else {
      const newId = 'soc_' + Date.now();
      db.socios.push({ ...socioData, id: newId });
    }

    saveData();
    closeModals();
  });

  // Open Add Invitado
  document.getElementById('btn-add-invitado')?.addEventListener('click', () => {
    if (!currentUser) return openModalAuth();
    openModalInvitado();
  });

  // Modalidad invitado change price auto
  document.getElementById('invitado-modalidad').addEventListener('change', e => {
    const mod = e.target.value;
    const inputImp = document.getElementById('invitado-importe');
    const groupFecha = document.getElementById('group-invitado-fecha');

    if (mod === 'dia') {
      inputImp.value = db.config.tarifaDia || 15;
      groupFecha.style.display = 'flex';
    } else if (mod === 'finde1' || mod === 'finde2') {
      inputImp.value = db.config.tarifaFinde || 35;
      groupFecha.style.display = 'none';
    } else if (mod === 'completo') {
      inputImp.value = db.config.tarifaCompleto || 70;
      groupFecha.style.display = 'none';
    }
  });

  // Save Invitado Form
  document.getElementById('form-invitado').addEventListener('submit', e => {
    e.preventDefault();
    if (!currentUser) return openModalAuth();

    const id = document.getElementById('invitado-id').value;
    const nombre = document.getElementById('invitado-nombre').value.trim();
    const anfitrionId = document.getElementById('invitado-anfitrion').value;
    const modalidad = document.getElementById('invitado-modalidad').value;
    const detalleDia = document.getElementById('invitado-detalle-dia').value.trim();
    const importe = Number(document.getElementById('invitado-importe').value);
    const estado = document.getElementById('invitado-estado').value;

    if (id) {
      const idx = db.invitados.findIndex(i => i.id === id);
      if (idx !== -1) db.invitados[idx] = { id, nombre, anfitrionId, modalidad, detalleDia, importe, estado };
    } else {
      const newId = 'inv_' + Date.now();
      db.invitados.push({ id: newId, nombre, anfitrionId, modalidad, detalleDia, importe, estado });
    }

    saveData();
    closeModals();
  });

  // Open Add Gasto Extra
  document.getElementById('btn-add-gasto')?.addEventListener('click', () => {
    if (!currentUser) return openModalAuth();
    openModalGasto();
  });

  // Save Gasto Extra Form
  document.getElementById('form-gasto').addEventListener('submit', e => {
    e.preventDefault();
    if (!currentUser) return openModalAuth();

    const id = document.getElementById('gasto-id').value;
    const concepto = document.getElementById('gasto-concepto').value.trim();
    const categoria = document.getElementById('gasto-categoria').value;
    const importe = Number(document.getElementById('gasto-importe').value);
    const compradorId = document.getElementById('gasto-comprador').value;
    const estado = document.getElementById('gasto-estado').value;

    if (id) {
      const idx = db.gastos.findIndex(g => g.id === id);
      if (idx !== -1) db.gastos[idx] = { id, concepto, categoria, importe, compradorId, estado };
    } else {
      const newId = 'gst_' + Date.now();
      db.gastos.push({ id: newId, concepto, categoria, importe, compradorId, estado });
    }

    saveData();
    closeModals();
  });

  // Config Tarifas Form
  document.getElementById('form-config-tarifas').addEventListener('submit', e => {
    e.preventDefault();
    if (!currentUser) return openModalAuth();

    db.config.cajaAnteriores = Number(document.getElementById('cfg-caja-anterior').value) || 0;
    db.config.cuotaBaseCorralon = Number(document.getElementById('cfg-cuota-base-corralon').value) || 80;
    db.config.tramoAlcoholCompleto = Number(document.getElementById('cfg-tramo-completo').value) || 50;
    db.config.tramoAlcoholFinde = Number(document.getElementById('cfg-tramo-finde').value) || 30;
    db.config.tramoAlcoholDia = Number(document.getElementById('cfg-tramo-dia').value) || 15;
    db.config.totalCorralon = Number(document.getElementById('cfg-total-corralon').value);
    db.config.tarifaDia = Number(document.getElementById('cfg-tarifa-dia').value);
    db.config.tarifaFinde = Number(document.getElementById('cfg-tarifa-finde').value);
    db.config.tarifaCompleto = Number(document.getElementById('cfg-tarifa-completo').value);

    saveData();
    renderAll();
    alert('✅ Configuración de cuotas, tramos de alcohol y fondo ahorrado actualizados correctamente.');
  });

  // Export JSON
  document.getElementById('btn-export-json').addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(db, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `intratables_cuentas_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  });

  // Import JSON
  document.getElementById('input-import-json').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (imported.socios && imported.gastos) {
          db = imported;
          if (!db.compras) db.compras = JSON.parse(JSON.stringify(DEFAULT_DATA.compras));
          saveData();
          alert('🎉 Cuentas importadas con éxito.');
        } else {
          alert('❌ El archivo JSON no tiene el formato correcto.');
        }
      } catch (err) {
        alert('❌ Error al leer el archivo JSON.');
      }
    };
    reader.readAsText(file);
  });

  // Reset Data
  document.getElementById('btn-reset-data').addEventListener('click', () => {
    if (!currentUser) return openModalAuth();

    if (confirm('⚠️ ¿Seguro que quieres resetear los datos a los valores de prueba por defecto?')) {
      db = JSON.parse(JSON.stringify(DEFAULT_DATA));
      saveData();
    }
  });
}

function closeModals() {
  document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('active'));
}

// Modal Handlers & Actions

// 1. Compra Común (Bote General)
window.openModalCompra = function(id = null) {
  if (!currentUser) return openModalAuth();

  const modal = document.getElementById('modal-compra');
  const title = document.getElementById('modal-compra-title');
  document.getElementById('form-compra').reset();

  if (id) {
    const c = db.compras.find(item => item.id === id);
    if (c) {
      title.textContent = 'Editar Compra Común';
      document.getElementById('compra-id').value = c.id;
      document.getElementById('compra-nombre').value = c.nombre;
      document.getElementById('compra-cantidad').value = c.cantidad || '';
      document.getElementById('compra-precio-unitario').value = c.precioUnitario || '';
      document.getElementById('compra-categoria').value = c.categoria;
      document.getElementById('compra-precio').value = c.precio || 0;
      document.getElementById('compra-estado').value = c.estado;
    }
  } else {
    title.textContent = 'Añadir Compra Común';
    document.getElementById('compra-id').value = '';
    document.getElementById('compra-precio-unitario').value = '';
    document.getElementById('compra-estado').value = 'comprado';
  }

  modal.classList.add('active');
};

window.toggleEstadoCompra = function(id) {
  if (!currentUser) return openModalAuth();
  const c = db.compras.find(item => item.id === id);
  if (c) {
    c.estado = c.estado === 'comprado' ? 'pendiente' : 'comprado';
    saveData();
  }
};

window.deleteCompra = function(id) {
  if (!currentUser) return openModalAuth();
  if (confirm('¿Eliminar esta compra de la lista común?')) {
    db.compras = db.compras.filter(c => c.id !== id);
    saveData();
  }
};

// 2. Socio Modal & Actions
window.openModalSocio = function(id = null) {
  if (!currentUser) return openModalAuth();

  const modal = document.getElementById('modal-socio');
  const title = document.getElementById('modal-socio-title');
  document.getElementById('form-socio').reset();

  const baseConfig = db.config.cuotaBaseCorralon || 80;
  const extraConfig = db.config.tramoAlcoholCompleto || 50;

  if (id) {
    const s = db.socios.find(item => item.id === id);
    if (s) {
      title.textContent = 'Editar Peñista';
      document.getElementById('socio-id').value = s.id;
      document.getElementById('socio-nombre').value = s.nombre;
      document.getElementById('socio-cuota-base').value = s.cuotaBase !== undefined ? s.cuotaBase : baseConfig;
      document.getElementById('socio-tramo-alcohol').value = s.tramoAlcohol || 'completo';
      document.getElementById('socio-dias-sueltos').value = s.diasSueltos || 1;
      document.getElementById('socio-cuota').value = s.cuota || calcularCuotaSocio(s);
      document.getElementById('socio-pagado').value = s.pagado || 0;
    }
  } else {
    title.textContent = 'Añadir Peñista';
    document.getElementById('socio-id').value = '';
    document.getElementById('socio-cuota-base').value = baseConfig;
    document.getElementById('socio-tramo-alcohol').value = 'completo';
    document.getElementById('socio-dias-sueltos').value = 1;
    document.getElementById('socio-cuota').value = baseConfig + extraConfig;
    document.getElementById('socio-pagado').value = baseConfig + extraConfig;
  }

  const tramoSelect = document.getElementById('socio-tramo-alcohol');
  const groupDias = document.getElementById('group-socio-dias');
  if (groupDias && tramoSelect) {
    groupDias.style.display = tramoSelect.value === 'dia' ? 'block' : 'none';
  }

  modal.classList.add('active');
};

window.deleteSocio = function(id) {
  if (!currentUser) return openModalAuth();
  if (confirm('¿Eliminar este peñista de la lista?')) {
    db.socios = db.socios.filter(s => s.id !== id);
    saveData();
  }
};

// 3. Invitado Modal & Actions
window.openModalInvitado = function(id = null) {
  if (!currentUser) return openModalAuth();

  const modal = document.getElementById('modal-invitado');
  const title = document.getElementById('modal-invitado-title');
  const selectAnfitrion = document.getElementById('invitado-anfitrion');
  document.getElementById('form-invitado').reset();

  // Populate Anfitriones
  selectAnfitrion.innerHTML = '<option value="">Selecciona peñista anfitrión...</option>' + 
    db.socios.map(s => `<option value="${s.id}">${escapeHTML(s.nombre)}</option>`).join('');

  if (id) {
    const inv = db.invitados.find(item => item.id === id);
    if (inv) {
      title.textContent = 'Editar Invitado';
      document.getElementById('invitado-id').value = inv.id;
      document.getElementById('invitado-nombre').value = inv.nombre;
      selectAnfitrion.value = inv.anfitrionId;
      document.getElementById('invitado-modalidad').value = inv.modalidad;
      document.getElementById('invitado-detalle-dia').value = inv.detalleDia || '';
      document.getElementById('invitado-importe').value = inv.importe;
      document.getElementById('invitado-estado').value = inv.estado;
    }
  } else {
    title.textContent = 'Registrar Invitado';
    document.getElementById('invitado-id').value = '';
    document.getElementById('invitado-importe').value = db.config.tarifaDia || 15;
  }

  modal.classList.add('active');
};

window.togglePagoInvitado = function(id) {
  if (!currentUser) return openModalAuth();
  const inv = db.invitados.find(i => i.id === id);
  if (inv) {
    inv.estado = inv.estado === 'pagado' ? 'pendiente' : 'pagado';
    saveData();
  }
};

window.deleteInvitado = function(id) {
  if (!currentUser) return openModalAuth();
  if (confirm('¿Eliminar este invitado?')) {
    db.invitados = db.invitados.filter(i => i.id !== id);
    saveData();
  }
};

// 4. Gasto Extra / Imprevisto Modal & Actions
window.openModalGasto = function(id = null) {
  if (!currentUser) return openModalAuth();

  const modal = document.getElementById('modal-gasto');
  const title = document.getElementById('modal-gasto-title');
  const selectComprador = document.getElementById('gasto-comprador');
  document.getElementById('form-gasto').reset();

  // Populate Compradores
  selectComprador.innerHTML = '<option value="peña">💰 Bote General de la Peña</option>' + 
    db.socios.map(s => `<option value="${s.id}">👤 ${escapeHTML(s.nombre)}</option>`).join('');

  if (id) {
    const g = db.gastos.find(item => item.id === id);
    if (g) {
      title.textContent = 'Editar Gasto Extra';
      document.getElementById('gasto-id').value = g.id;
      document.getElementById('gasto-concepto').value = g.concepto;
      document.getElementById('gasto-categoria').value = g.categoria;
      document.getElementById('gasto-importe').value = g.importe;
      selectComprador.value = g.compradorId || 'peña';
      document.getElementById('gasto-estado').value = g.estado;
    }
  } else {
    title.textContent = 'Registrar Gasto Extra / Imprevisto';
    document.getElementById('gasto-id').value = '';
  }

  modal.classList.add('active');
};

window.quickMarcarPagadoSocio = function(id) {
  if (!currentUser) return openModalAuth();
  const s = db.socios.find(item => item.id === id);
  if (s) {
    s.pagado = s.cuota;
    saveData();
  }
};

window.quickDesmarcarPagoSocio = function(id) {
  if (!currentUser) return openModalAuth();
  const s = db.socios.find(item => item.id === id);
  if (s) {
    s.pagado = 0;
    saveData();
  }
};

window.toggleEstadoGasto = function(id) {
  if (!currentUser) return openModalAuth();
  const g = db.gastos.find(item => item.id === id);
  if (g) {
    g.estado = g.estado === 'aprobado' ? 'pendiente' : 'aprobado';
    saveData();
  }
};

window.aprobarGasto = function(id) {
  if (!currentUser) return openModalAuth();
  const g = db.gastos.find(item => item.id === id);
  if (g) {
    g.estado = 'aprobado';
    saveData();
  }
};

window.deleteGasto = function(id) {
  if (!currentUser) return openModalAuth();
  if (confirm('¿Eliminar este gasto extra?')) {
    db.gastos = db.gastos.filter(g => g.id !== id);
    saveData();
  }
};

window.restaurarListaOficial = function() {
  db.socios = JSON.parse(JSON.stringify(DEFAULT_DATA.socios));
  db.invitados = JSON.parse(JSON.stringify(DEFAULT_DATA.invitados));
  saveData();
  alert('✅ Lista oficial de 26 Peñistas y 11 Invitados restaurada y sincronizada en tiempo real.');
};

// Utils
function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
