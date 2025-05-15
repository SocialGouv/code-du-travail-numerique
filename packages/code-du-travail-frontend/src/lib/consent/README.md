# Consent Management System

This module provides a comprehensive consent management system for tracking tools used in the Code du Travail Numérique application.

## Features

- Manages consent for tracking tools (Matomo is mandatory, Google Tag Manager for SEA is optional)
- Restricts SEA tracking to specific pages only
- Persists consent settings in localStorage
- Provides components for both legacy and DSFR parts of the application
- Ensures no cookies are loaded until explicit user consent is given
- Complies with GDPR and ePrivacy regulations

## Architecture

The consent management system consists of the following components:

### 1. Consent Service (`/src/lib/consent/index.ts`)

Core service that handles:

- Storing and retrieving consent settings
- Applying consent settings to tracking tools
- Initializing consent only after user has provided explicit consent

### 2. DSFR Cookie Consent Banner (`/src/modules/cookie-consent/CookieConsent.tsx`)

A cookie consent banner for the DSFR parts of the application, using the DSFR design system components.

### 3. Legacy Cookie Consent Banner (`/src/components/CookieConsent/index.tsx`)

A cookie consent banner for the legacy parts of the application, using styled-components.

## Integration

The consent management system is integrated into the application in the following ways:

### For DSFR Parts (App Router)

The DSFR cookie consent banner is included in the `DefaultLayout` component:

```tsx
// src/modules/config/DefaultLayout.tsx
import { CookieConsentDSFR } from "../cookie-consent";

// ...

<DsfrProvider lang={lang}>
  {children}
  <CookieConsentDSFR />
</DsfrProvider>;
```

### For Legacy Parts (Pages Router)

The legacy cookie consent banner is included in the `_app.tsx` file:

```tsx
// pages/_app.tsx
import CookieConsentLegacy from "../src/components/CookieConsent/index";
import { initConsent } from "../src/lib/consent";

// ...

useEffect(() => {
  // Initialize consent
  initConsent();

  // Initialize Matomo
  // ...
}, []);

// ...

<ThemeProvider>
  <GlobalStyles />
  <A11y />
  <Component {...pageProps} />
  <CookieConsentLegacy />
</ThemeProvider>;
```

## Google Tag Manager Integration

The Google Tag Manager script is added to the `_document.tsx` file and is only activated when the user consents to SEA tracking:

```tsx
// pages/_document.tsx
<Head>
  {/* ... */}

  {/* Google Tag Manager script - Will only be activated with user consent */}
  <script
    id="gtm-script-placeholder"
    dangerouslySetInnerHTML={{
      __html: `
        // This script will be replaced by the actual GTM script when user consents
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'DC-3048978');
      `,
    }}
  />
</Head>
```

## Usage

### Checking Consent Status

You can check the consent status in your components:

```tsx
import { getStoredConsent } from "../lib/consent";

const MyComponent = () => {
  const consent = getStoredConsent();

  // Check if user has consented to SEA tracking
  if (consent.sea) {
    // Do something
  }

  // ...
};
```

### Updating Consent Settings

You can update the consent settings programmatically:

```tsx
import { saveConsent } from "../lib/consent";

// Update consent settings (note: matomo will always be true regardless of what's passed)
saveConsent({ matomo: false, sea: false }); // matomo will still be true
```

## SEA Campaign Tracking

SEA tracking is only enabled on specific pages (homepage, key contribution pages, information pages, tools, etc.) even when the user has consented. This ensures that tracking is limited to the most relevant pages for campaign measurement.

When the user consents to SEA tracking and is on an allowed page, the following Google Tag Manager script is loaded:

```html
<!-- Google tag (gtag.js) -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=DC-3048978"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());

  gtag("config", "DC-3048978");
</script>

<script>
  gtag("event", "conversion", {
    allow_custom_scripts: true,
    send_to: "DC-3048978/cdtn/arr_cdtn+unique",
  });
</script>
```

This script tracks user interactions for the SEA campaign.
