# SEO and Tracking Setup

## Google Analytics 4

The site is ready for GA4 through `NEXT_PUBLIC_GA_MEASUREMENT_ID`.

1. Create a GA4 web data stream.
2. Copy the measurement ID, such as `G-XXXXXXXXXX`.
3. Add it to `.env.local` for local preview:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
```

4. Add the same environment variable in Vercel before deploying.

Tracked event:

- `booking_click`: fires when a visitor clicks a booking form link.

Useful GA4 reports:

- Page views by page path
- Traffic source, such as Google, Instagram, Facebook, or direct
- Device category
- City or region
- `booking_click` event count

## Google Search Console

The site already includes:

- HTML verification file: `public/google33b001ab28b7089e.html`
- Robots file: `public/robots.txt`
- Dynamic sitemap: `app/sitemap.ts`

After deployment, submit this sitemap in Search Console:

```text
https://coach-ken.vercel.app/sitemap.xml
```

Useful Search Console reports:

- Search queries that show the site
- Clicks and impressions
- Average ranking position
- Pages that receive Google search traffic
