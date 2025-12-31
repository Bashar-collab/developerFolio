# Analytics Setup Guide

This guide will help you set up website analytics to track visits, page views, and user interactions on your portfolio.

## 📊 Available Analytics Options

### 1. Google Analytics 4 (GA4) - Recommended
**Free, comprehensive analytics with detailed insights**

**What you'll get:**
- Total number of visits
- Page views
- User demographics (country, city)
- Device and browser information
- User behavior and engagement metrics
- Real-time visitor tracking
- **Note:** Individual IP addresses are not shown (for privacy/GDPR compliance)

**Setup Steps:**
1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Admin" (gear icon) → "Create Account"
4. Fill in account details and property name
5. Set up a "Web" data stream
6. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)
7. Update `public/index.html`:
   - Replace `G-XXXXXXXXXX` with your actual Measurement ID (appears twice)
8. (Optional) Add to `.env` file:
   ```
   REACT_APP_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
9. View your analytics at [Google Analytics Dashboard](https://analytics.google.com/)

---

### 2. Plausible Analytics - Privacy-Focused Alternative
**Lightweight, privacy-friendly, GDPR compliant**

**What you'll get:**
- Visit counts
- Page views
- Country-level location data
- Referrer information
- Device and browser stats
- **Note:** No individual IP addresses (privacy-first approach)

**Setup Steps:**
1. Sign up at [Plausible.io](https://plausible.io/)
2. Add your website domain
3. Copy your domain name
4. Add to `.env` file:
   ```
   REACT_APP_PLAUSIBLE_DOMAIN=yourdomain.com
   ```
5. Add the Plausible script to `public/index.html` (before closing `</head>` tag):
   ```html
   <script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
   ```

---

### 3. Custom Backend Solution (For IP Tracking)
**If you need to track individual IP addresses, you'll need a custom backend**

**Requirements:**
- Backend API (Node.js, Python, etc.)
- Database to store visit data
- API endpoint to receive visit data

**Implementation:**
1. Create a backend API endpoint (e.g., `/api/track-visit`)
2. Store visit data: IP address, timestamp, user agent, referrer
3. Add tracking code to your React app that sends data to your API
4. Create a dashboard to view the data

**Example Backend Endpoint (Node.js/Express):**
```javascript
app.post('/api/track-visit', (req, res) => {
  const visitData = {
    ip: req.ip || req.headers['x-forwarded-for'],
    userAgent: req.headers['user-agent'],
    referrer: req.headers['referer'],
    timestamp: new Date(),
    path: req.body.path
  };
  // Save to database
  // Return success
});
```

---

## 🚀 Quick Setup (Google Analytics 4)

### Step 1: Get Your GA4 Measurement ID
1. Visit [Google Analytics](https://analytics.google.com/)
2. Create an account and property
3. Set up a Web data stream
4. Copy your Measurement ID (starts with `G-`)

### Step 2: Update Your Code
1. Open `public/index.html`
2. Find the Google Analytics script (around line 46-54)
3. Replace `G-XXXXXXXXXX` with your actual Measurement ID in both places:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ACTUAL-ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-YOUR-ACTUAL-ID', {
       page_path: window.location.pathname,
     });
   </script>
   ```

### Step 3: (Optional) Use Environment Variables
1. Copy `env.example` to `.env`:
   ```bash
   cp env.example .env
   ```
2. Add your GA4 ID:
   ```
   REACT_APP_GA4_MEASUREMENT_ID=G-YOUR-ACTUAL-ID
   ```
3. Update `src/utils/analytics.js` to use the environment variable

### Step 4: Test
1. Build and deploy your site:
   ```bash
   npm run build
   npm run deploy
   ```
2. Visit your website
3. Check Google Analytics Real-Time reports (should show your visit within seconds)

---

## 📈 What Data You Can Track

### Available Metrics:
- ✅ **Total Visits** - Number of unique visitors
- ✅ **Page Views** - Total pages viewed
- ✅ **Geographic Data** - Country, city (approximate)
- ✅ **Device Information** - Desktop, mobile, tablet
- ✅ **Browser & OS** - Chrome, Firefox, Safari, etc.
- ✅ **Referrers** - Where visitors came from
- ✅ **Time on Site** - How long visitors stay
- ✅ **Bounce Rate** - Single-page sessions

### Not Available (Privacy Reasons):
- ❌ **Individual IP Addresses** - Most analytics tools don't show this
- ❌ **Exact Physical Location** - Only approximate city/country
- ❌ **Personal Identifiers** - Names, emails, etc.

---

## 🎯 Tracking Custom Events

You can track button clicks, downloads, and other interactions:

```javascript
import { trackButtonClick, trackDownload, trackExternalLink } from './utils/analytics';

// Track button click
trackButtonClick('Resume Download', 'Header');

// Track file download
trackDownload('resume.pdf');

// Track external link
trackExternalLink('https://github.com/username');
```

---

## 🔒 Privacy & GDPR Compliance

- **Google Analytics**: Complies with GDPR when properly configured
- **Plausible**: Privacy-first, GDPR compliant by default
- **Custom Solution**: You're responsible for compliance

**Important:** If tracking IP addresses, ensure you:
- Inform users in your privacy policy
- Get consent where required (GDPR, CCPA)
- Securely store and handle data
- Allow users to opt-out

---

## 🆘 Troubleshooting

### Analytics not working?
1. Check browser console for errors
2. Verify your Measurement ID is correct
3. Ensure analytics scripts are loading (check Network tab)
4. Clear browser cache and test again
5. Check if ad blockers are blocking analytics

### Not seeing data in Google Analytics?
1. Wait 24-48 hours for some reports (Real-Time works immediately)
2. Verify your Measurement ID is correct
3. Check that your site is deployed and accessible
4. Use Google Analytics DebugView for testing

---

## 📚 Additional Resources

- [Google Analytics Documentation](https://developers.google.com/analytics)
- [Plausible Analytics Docs](https://plausible.io/docs)
- [GDPR Compliance Guide](https://gdpr.eu/)

---

## 💡 Recommendation

For most portfolio websites, **Google Analytics 4** is the best choice because:
- Free and feature-rich
- Easy to set up
- Comprehensive insights
- Large community and resources

If privacy is a major concern, consider **Plausible Analytics** as an alternative.

