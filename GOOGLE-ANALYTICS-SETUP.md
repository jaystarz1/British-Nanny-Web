# Google Analytics 4 (GA4) Setup Guide - thebritishnanny.ca

## 📊 Step 1: Create GA4 Property

1. **Go to Google Analytics**
   - Visit: https://analytics.google.com
   - Sign in with your Google account

2. **Create Property**
   - Click **Admin** (gear icon, bottom left)
   - Click **Create Property**
   - Enter:
     - Property name: `The British Nanny Daycare`
     - Time zone: `(GMT-05:00) Eastern Time`
     - Currency: `Canadian Dollar (CAD)`
   - Click **Next**

3. **Business Details**
   - Industry: `Other`
   - Business size: `Small`
   - Click **Next**

4. **Business Objectives** (select all that apply)
   - Generate leads
   - Raise brand awareness
   - Get baseline reports
   - Click **Create**

5. **Data Stream Setup**
   - Choose platform: **Web**
   - Website URL: `https://thebritishnanny.ca`
   - Stream name: `British Nanny Website`
   - Click **Create Stream**

## 📋 Step 2: Get Your Measurement ID

After creating the stream, you'll see:
- **Measurement ID**: Looks like `G-XXXXXXXXXX`
- **Copy this ID** - you'll need it next

## 🚀 Step 3: Add to Your Website

### Option A: Quick Manual Add (5 minutes)
Copy this code and replace `G-XXXXXXXXXX` with your actual Measurement ID:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
<!-- End Google Analytics -->
```

Add this code to the `<head>` section of:
- index.html
- potty-training-book.html
- All files in resources/ folder

### Option B: Use Our Script (Recommended)
1. Run: `./add-google-analytics.sh`
2. Enter your Measurement ID when prompted
3. Script will add GA4 to all pages automatically

## ✅ Step 4: Verify Installation

1. **Real-time Check**
   - Open your website in a browser
   - In Google Analytics, go to **Reports** → **Real-time**
   - You should see yourself as an active user

2. **Google Tag Assistant**
   - Install Chrome extension: [Tag Assistant Legacy](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
   - Visit your website
   - Click the extension icon
   - Should show "Google Analytics 4" as active

## 🎯 Step 5: Configure Important Events

In GA4, go to **Admin** → **Events** → **Create event**

### Recommended Events to Track:

1. **Phone Click**
   - Event name: `phone_click`
   - Matching conditions: Link URL contains `tel:`

2. **Email Click**
   - Event name: `email_click`
   - Matching conditions: Link URL contains `mailto:`

3. **Form Submit**
   - Event name: `contact_form_submit`
   - (Requires additional code)

4. **Resource Download**
   - Event name: `file_download`
   - Matching conditions: Link URL contains `.pdf`

## 📈 Step 6: Set Up Conversions

Mark these events as conversions:
1. Go to **Admin** → **Conversions**
2. Toggle ON for:
   - phone_click
   - email_click
   - contact_form_submit

## 🔗 Step 7: Link with Google Search Console

1. In GA4, go to **Admin** → **Search Console Links**
2. Click **Link**
3. Choose your Search Console property
4. Select your Web Stream
5. Click **Submit**

## 📱 Step 8: Audience Configuration

### Create Audiences:
1. **Local Parents**
   - Location: Ottawa, Ontario
   - Age: 25-45
   - Interests: Parenting

2. **Daycare Seekers**
   - Behavior: Visited 2+ pages
   - Time on site: >30 seconds

## 🚫 Step 9: Privacy & Compliance

### Add Cookie Consent (Optional but Recommended)
Consider adding a cookie consent banner for GDPR/Privacy compliance.

### Update Privacy Policy
Add a section about Google Analytics data collection.

## 📊 Useful Reports to Monitor

After 24-48 hours, check these reports:

1. **Acquisition** → **Traffic acquisition**
   - See where visitors come from

2. **Engagement** → **Pages and screens**
   - Most visited pages

3. **Demographics** → **Demographic details**
   - Visitor demographics

4. **Tech** → **Tech details**
   - Devices and browsers used

## 🎯 Goals for Daycare Website

Track these KPIs:
- Monthly unique visitors
- Average session duration
- Phone call clicks
- Contact form submissions
- Resource downloads
- Bounce rate (<60% is good)

## 🔧 Troubleshooting

**Not seeing data?**
- Clear browser cache
- Check if ad blocker is active
- Verify Measurement ID is correct
- Wait 24 hours for full data

**Zero users in real-time?**
- Check code is in `<head>` section
- Verify no JavaScript errors
- Test in incognito mode

---

**Setup Date**: [Today's Date]
**Measurement ID**: [To be added after setup]
**Property Name**: The British Nanny Daycare