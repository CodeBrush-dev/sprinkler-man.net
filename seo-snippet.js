// Single-file SEO snippet (CONFIG + META_DATA + LD_DATA + runtime)

(function () {
  "use strict";


  const CONFIG = {
    baseUrlFallback: "https://www.sprinkler-man.net",
    googleSiteVerification: ""
  };

  // === DATA (from your previous meta-tags.js) ===
  const META_DATA = {"meta_tags_list":[{"page_url":"https://www.sprinkler-man.net/","title_tag":"Irrigation Repair Fort Worth | Sprinkler Man Irrigation","meta_description":"Expert irrigation repair in Fort Worth, TX. Residential irrigation service, lawn sprinkler maintenance, leak detection, and backflow protection."},{"page_url":"https://www.sprinkler-man.net/about","title_tag":"Residential Irrigation Service | Sprinkler Man Fort Worth","meta_description":"Residential irrigation service and lawn sprinkler maintenance in Fort Worth, Tarrant and Parker County. Efficient water use and careful lawn preservation."},{"page_url":"https://www.sprinkler-man.net/portfolios","title_tag":"Sprinkler Systems Texas Repair | Sprinkler Man Services","meta_description":"Sprinkler systems Texas repair and installation. Sprinkler valve repair, leak detection, backflow protection, and high efficiency nozzles for your lawn."},{"page_url":"https://www.sprinkler-man.net/contact","title_tag":"Lawn Sprinkler Maintenance | Contact Sprinkler Man","meta_description":"Contact Sprinkler Man for irrigation repair Fort Worth, lawn sprinkler maintenance, sprinkler valve repair, and residential irrigation service."}],"keywords":["Irrigation Repair Fort Worth","Sprinkler Systems Texas","Lawn Sprinkler Maintenance","Backflow Protection Fort Worth","Leak Detection Tarrant County","Residential Irrigation Service","Sprinkler Valve Repair","High Efficiency Nozzles","Lawn Care Fort Worth","Irrigation System Installation"]};

  // === DATA (from your previous LD.js) ===
  const LD_DATA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.sprinkler-man.net/#localbusiness",
  "name": "Sprinkler Man Irrigation and Repair",
  "url": "https://www.sprinkler-man.net/",
  "description": "Sprinkler Man provides professional maintenance and repair of residential lawn sprinkler systems in Fort Worth and the Tarrant/Parker County areas, including Fort Worth, Mid-Cities, Keller, Southlake, Grapevine, Azle and Weatherford.",
  "image": [
    "https://static.wixstatic.com/media/1fa3b5_46464c63448e42ff8e4a29a449152358.png/v1/fill/w_144,h_258,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1fa3b5_46464c63448e42ff8e4a29a449152358.png",
    "https://static.wixstatic.com/media/1fa3b5_5d2ccba806534a4f9ff810e3f3c9a3b6.jpg/v1/fill/w_715,h_447,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/1fa3b5_5d2ccba806534a4f9ff810e3f3c9a3b6.jpg"
  ],
  "telephone": "+1-817-983-3821",
  "areaServed": [
    {
      "@type": "City",
      "name": "Fort Worth"
    },
    {
      "@type": "City",
      "name": "Mid-Cities"
    },
    {
      "@type": "City",
      "name": "Keller"
    },
    {
      "@type": "City",
      "name": "Southlake"
    },
    {
      "@type": "City",
      "name": "Grapevine"
    },
    {
      "@type": "City",
      "name": "Azle"
    },
    {
      "@type": "City",
      "name": "Weatherford"
    }
  ],
  "foundingDate": "2007",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Sprinkler and Irrigation Repair Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Repairing broken pipes, leaks and driplines"
      },
      {
        "@type": "Offer",
        "name": "Repair of non-performing or leaking station valves"
      },
      {
        "@type": "Offer",
        "name": "Diagnosing irrigation controller malfunctions"
      },
      {
        "@type": "Offer",
        "name": "Detection of cut or damaged field wiring"
      },
      {
        "@type": "Offer",
        "name": "Nozzle, spray head and rotor replacement"
      },
      {
        "@type": "Offer",
        "name": "Adjusting spray patterns to ensure proper coverage"
      },
      {
        "@type": "Offer",
        "name": "Checking for appropriate hydraulics"
      },
      {
        "@type": "Offer",
        "name": "Replacement of backflow protection device"
      },
      {
        "@type": "Offer",
        "name": "Adding or modifying existing lines"
      },
      {
        "@type": "Offer",
        "name": "Retro-fitting existing systems with high efficiency rotors or nozzles"
      }
    ]
  },
  "priceRange": "$$$",
  "knowsAbout": [
    "lawn sprinkler repair",
    "irrigation system repair",
    "sprinkler system maintenance",
    "residential lawn sprinklers",
    "sprinkler leak repair",
    "sprinkler valve repair",
    "sprinkler controller diagnostics"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-817-983-3821",
    "contactType": "customer service",
    "areaServed": "US-TX",
    "availableLanguage": "en"
  },
  "employee": {
    "@type": "Person",
    "name": "Paul G. (Bucky) Burch"
  }
};

  /* ===== Helpers ===== */
  function clamp(str, max) {
    if (typeof str !== "string") str = String(str ?? "");
    return str.length <= max ? str : str.slice(0, Math.max(0, max - 1)) + "…";
  }

  function stripTrailingSlash(p) {
    if (!p) return "/";
    return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
  }

  function normalizePathFromUrl(url) {
    try {
      const u = new URL(url);
      return stripTrailingSlash(u.pathname || "/");
    } catch {
      const m = String(url || "").match(/^https?:\/\/[^/]+(\/[^?#]*)?/i);
      return stripTrailingSlash((m && m[1]) || "/");
    }
  }

  function removeLangPrefix(pathname) {
    const m = String(pathname || "/").match(
      /^\/([a-z]{2}(?:-[A-Z]{2})?)(?=\/|$)(.*)$/
    );
    if (!m) return pathname || "/";
    const rest = stripTrailingSlash(m[2] || "/");
    return rest || "/";
  }

  function currentPagePath() {
    const path = window.location.pathname || "/";
    return stripTrailingSlash(path || "/");
  }

  function currentKeyCandidates() {
    const path = currentPagePath();
    const origin = (window.location.origin || "").replace(/\/$/, "");
    const full = origin + path;

    if (path === "/") {
      return [full, "/"];
    }

    const noLang = removeLangPrefix(path);
    return [full, path, stripTrailingSlash(path), noLang, stripTrailingSlash(noLang)];
  }

  function buildIndex(metaJson) {
    const list = (metaJson && metaJson.meta_tags_list) || [];
    const index = {};
    for (const item of list) {
      const path = normalizePathFromUrl(item.page_url);
      let origin = "";
      try {
        origin = new URL(item.page_url).origin;
      } catch {
        origin = "";
      }
      const full = origin ? origin.replace(/\/$/, "") + path : "";

      const entry = {
        title: item.title_tag || "",
        description: item.meta_description || "",
      };

      index[path] = entry;
      index[stripTrailingSlash(path)] = entry;
      if (full) index[full] = entry;
    }
    return index;
  }

  function _stripQuotes(s) {
    return String(s ?? "")
      .replace(/["'“”‘’„«»]/g, "")
      .replace(/\s+/g, " ")
      .replace(/^[\s\-–—·,;:]+|[\s\-–—·,;:]+$/g, "")
      .trim();
  }

  function normalizeKeywordsList(input, opts) {
    const { maxKeywords = 20 } = opts || {};
    if (input == null) return [];
    let items = Array.isArray(input)
      ? input.slice()
      : typeof input === "string"
      ? input.split(",")
      : [];
    const seen = new Set();
    return items
      .map(_stripQuotes)
      .filter((s) => s && s.length >= 2)
      .filter((s) => {
        const k = s.toLowerCase();
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      })
      .slice(0, maxKeywords);
  }

  function normalizeKeywords(input, opts) {
    const { maxKeywords = 20, maxLength = 280 } = opts || {};
    const list = normalizeKeywordsList(input, { maxKeywords });
    const content = list.join(", ");
    return content.length > maxLength ? content.slice(0, maxLength) : content;
  }

  function applyAltFallbacks(keywordsPool) {
    if (!Array.isArray(keywordsPool) || keywordsPool.length === 0) return;
    try {
      const images = Array.from(document.querySelectorAll("img"));
      let i = 0;
      images.forEach((img) => {
        const curAlt = (img.getAttribute("alt") || "").trim().toLowerCase();
        const shouldReplace =
          !curAlt ||
          curAlt.endsWith(".jpg") ||
          curAlt.endsWith(".png") ||
          curAlt === "image" ||
          curAlt === "img";
        if (shouldReplace) {
          img.setAttribute("alt", keywordsPool[i % keywordsPool.length]);
          i++;
        }
      });
    } catch {
      /* ignore */
    }
  }

  function optimizeImages() {
    try {
      const images = Array.from(document.querySelectorAll("img"));
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              io.unobserve(img);
              // hook for tracking / lazy work if needed
            }
          });
        });
        images.forEach((img, index) => {
          if (index > 0) io.observe(img);
        });
      }
    } catch (err) {
      console.error("Image optimization error:", err);
    }
  }

  function upsertMeta(nameOrProperty, content, useProperty) {
    const selector = useProperty
      ? `meta[property="${nameOrProperty}"]`
      : `meta[name="${nameOrProperty}"]`;
    let el = document.head.querySelector(selector);
    if (!el) {
      el = document.createElement("meta");
      if (useProperty) el.setAttribute("property", nameOrProperty);
      else el.setAttribute("name", nameOrProperty);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  }

  function upsertLink(rel, href) {
    let link = document.head.querySelector(`link[rel="${rel}"]`);
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", rel);
      document.head.appendChild(link);
    }
    link.setAttribute("href", href);
  }

  function injectJsonLd(ldObject) {
    if (!ldObject) return;
    try {
      const existing = Array.from(
        document.head.querySelectorAll('script[type="application/ld+json"]')
      );
      existing.forEach((el) => {
        el.parentNode.removeChild(el);
      });

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(ldObject);
      document.head.appendChild(script);
    } catch (err) {
      console.error("Error injecting JSON-LD:", err);
    }
  }

  function applyJsonLd() {
    injectJsonLd(LD_DATA);
  }

  function applySeoFromJson() {
    try {
      const metaJson = META_DATA;
      const index = buildIndex(metaJson);

      const path = currentPagePath();
      const isHome = path === "/";

      const fallbackBase =
        (CONFIG && CONFIG.baseUrlFallback) ? CONFIG.baseUrlFallback : "";
      const baseUrl = (window.location.origin || fallbackBase).replace(/\/$/, "");
      const canonicalUrl = baseUrl + path;

      const keys = currentKeyCandidates();
      let entry = null;
      for (const k of keys) {
        if (index[k]) {
          entry = index[k];
          break;
        }
      }

      if (!entry) {
        return normalizeKeywordsList(metaJson.keywords, { maxKeywords: 25 });
      }

      const title = clamp(entry.title, 60);
      const desc = clamp(entry.description, 185);

      document.title = title;

      const metaList = [
        { type: "name", key: "description", content: desc },
        { type: "property", key: "og:url", content: canonicalUrl },
        { type: "name", key: "resource-hints", content: "preload" },
        { type: "name", key: "format-detection", content: "telephone=yes" },
        { type: "name", key: "mobile-web-app-capable", content: "yes" },
        { type: "name", key: "apple-mobile-web-app-capable", content: "yes" },
      ];

      // opcjonalnie dodaj google-site-verification, jeśli jest w CONFIG
      if (CONFIG && CONFIG.googleSiteVerification) {
        metaList.push({
          type: "name",
          key: "google-site-verification",
          content: CONFIG.googleSiteVerification
        });
      }

      if (isHome && metaJson && metaJson.keywords) {
        const kwContent = normalizeKeywords(metaJson.keywords, {
          maxKeywords: 25,
          maxLength: 512,
        });
        if (kwContent) {
          metaList.push({ type: "name", key: "keywords", content: kwContent });
        }
      }

      metaList.forEach((m) => {
        upsertMeta(m.key, m.content, m.type === "property");
      });

      upsertLink("canonical", canonicalUrl);

      return normalizeKeywordsList(metaJson.keywords, { maxKeywords: 25 });
    } catch (err) {
      console.error("Error meta settings:", err);
      return [];
    }
  }

  function initSnippetSEO() {
    const keywordsPool = applySeoFromJson();
    const path = currentPagePath();
    if (path === "/") {
      applyJsonLd();
    }
    optimizeImages();
    applyAltFallbacks(keywordsPool);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSnippetSEO);
  } else {
    initSnippetSEO();
  }
})();
