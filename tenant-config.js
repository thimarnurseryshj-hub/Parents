(function(){
  var cfg = {
    tenantId: "themar-nursery",
    dataResetVersion: "2026-07-11-parent-portal",
    nameAr: "حضانة ثمار",
    nameEn: "Themar Nursery",
    appTitleAr: "Nursery Management System",
    parentPortalTitleAr: "Parent Portal",
    receiptVerifierTitleAr: "Receipt Verification",
    registrationTitleAr: "Child Registration Form",
    addressAr: "الشارقة",
    addressEn: "Sharjah",
    phone: "0555893136",
    email: "ttakriti@gmail.com",
    logoUrl: "",
    logoDataUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 220'%3E%3Crect width='220' height='220' rx='110' fill='%23ffffff'/%3E%3Ccircle cx='110' cy='110' r='100' fill='%23f8fbf3' stroke='%238fc142' stroke-width='8'/%3E%3Ccircle cx='110' cy='82' r='10' fill='%238fc142'/%3E%3Ccircle cx='84' cy='95' r='9' fill='%238fc142'/%3E%3Ccircle cx='136' cy='95' r='9' fill='%238fc142'/%3E%3Ccircle cx='96' cy='70' r='8' fill='%238fc142'/%3E%3Ccircle cx='124' cy='70' r='8' fill='%238fc142'/%3E%3Ctext x='110' y='135' text-anchor='middle' font-family='Arial,sans-serif' font-size='34' font-weight='700' fill='%23e77aaa'%3EThemar%3C/text%3E%3Ctext x='110' y='157' text-anchor='middle' font-family='Arial,sans-serif' font-size='12' fill='%23e77aaa'%3EMontessori Preschool%3C/text%3E%3C/svg%3E",
    theme: {
      primary: "#e77aaa",
      secondary: "#e57da9",
      accent: "#8fc142"
    },
    firebase: {
      apiKey: "AIzaSyDb9N7kSOt4PgU4XBi9ngV7NFfLcg7lp30",
      authDomain: "thimar-nursery.firebaseapp.com",
      databaseURL: "https://thimar-nursery-default-rtdb.firebaseio.com",
      projectId: "thimar-nursery",
      storageBucket: "thimar-nursery.firebasestorage.app",
      messagingSenderId: "98783588209",
      appId: "1:98783588209:web:41afb144d46d9ec4e250d0",
      measurementId: "G-ZD4EYQN1MF"
    },
    security: {
      requireFirebaseAuth: true
    },
    services: {
      firebaseBaseUrl: "https://thimar-nursery-default-rtdb.firebaseio.com",
      backendApiBaseUrl: "",
      otpApiUrl: "",
      registrationEmailWebAppUrl: "https://script.google.com/macros/s/AKfycbyg89qMoKh3W7K0Im8orf0FG6QlPAk8khHuo92YBD7nRlhCffnXr4T3IymJnO2uqTnzJQ/exec",
      receiptVerificationBaseUrl: ""
    },
    receipt: {
      refundPolicyAr: "",
      refundPolicyEn: ""
    },
    clearLocalDataOnTenantChange: false
  };

  function clean(value){ return String(value == null ? "" : value).trim(); }
  function first(){
    for (var i = 0; i < arguments.length; i++) {
      var value = clean(arguments[i]);
      if (value) return value;
    }
    return "";
  }
  function theme(){ return cfg.theme || {}; }
  function services(){ return cfg.services || {}; }
  function firebase(){ return cfg.firebase || {}; }
  function nameAr(){ return first(cfg.nameAr, cfg.nameEn, "Nursery"); }
  function nameEn(){ return first(cfg.nameEn, cfg.nameAr, "Nursery"); }
  function logo(){ return first(cfg.logoUrl, cfg.logoDataUrl); }
  function firebaseRoot(){
    var raw = first(services().firebaseBaseUrl, firebase().databaseURL).replace(/\/+$/, "");
    if (!raw) return "";
    return /\/nursery_data$/i.test(raw) ? raw : raw + "/nursery_data";
  }
  function settings(){
    return {
      name: nameAr(),
      addr_ar: clean(cfg.addressAr),
      addr_en: clean(cfg.addressEn),
      phone: clean(cfg.phone),
      email: clean(cfg.email),
      refund_ar: clean(cfg.receipt && cfg.receipt.refundPolicyAr),
      refund_en: clean(cfg.receipt && cfg.receipt.refundPolicyEn),
      logoDataUrl: logo()
    };
  }
  function setText(selector, value){
    value = clean(value);
    if (!value) return;
    document.querySelectorAll(selector).forEach(function(el){ el.textContent = value; });
  }
  function setLogo(){
    var src = logo();
    if (!src) return;
    document.querySelectorAll("img.logo,img.portalLogo,img.logoMini,img.docLogo,.hdr-brand img,#logo-preview-img").forEach(function(img){
      img.src = src;
      img.alt = nameEn() + " Logo";
      img.style.display = "";
    });
  }
  function apply(){
    var t = theme();
    try {
      document.documentElement.style.setProperty("--primary", first(t.primary, "#e77aaa"));
      document.documentElement.style.setProperty("--secondary", first(t.secondary, "#e57da9"));
      document.documentElement.style.setProperty("--accent", first(t.accent, "#8fc142"));
    } catch (_e) {}
    try { window.FB_BASE = firebaseRoot(); } catch (_e2) {}
    try { if (typeof nurserySettings !== "undefined") nurserySettings = Object.assign({}, nurserySettings || {}, settings()); } catch (_e3) {}
    try { if (typeof logoDataUrl !== "undefined") logoDataUrl = logo() || logoDataUrl || ""; } catch (_e4) {}
    setText(".login-title,.portalNameAr", nameAr());
    setText(".portalNameEn", nameEn());
    setText(".footer", nameEn() + " Parent Portal");
    setLogo();
    try { if (typeof updateLogoPreview === "function") updateLogoPreview(); } catch (_e5) {}
    try { if (typeof applySettingsToUI === "function") applySettingsToUI(); } catch (_e6) {}
  }

  try {
    Object.defineProperty(window, "NURSERY_TENANT_CONFIG", {
      value: cfg,
      writable: false,
      configurable: false,
      enumerable: true
    });
  } catch (_e7) {
    window.NURSERY_TENANT_CONFIG = cfg;
  }

  window.NURSERY_BRANDING = {
    config: cfg,
    apply: apply,
    settings: settings,
    logo: logo,
    firebaseRoot: firebaseRoot
  };
  window.KP_STABLE_TENANT = {
    page: "parent",
    firebaseRoot: firebaseRoot,
    settings: settings
  };
  window.FB_BASE = firebaseRoot();

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", apply);
  else apply();
  setTimeout(apply, 100);
  setTimeout(apply, 800);
  setTimeout(apply, 1800);
})();
