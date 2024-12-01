# @umami/node

## Overview

The Umami client for Node.js and Edge Runtime environments allows you to send analytics data to Umami from server-side applications.

## Installation

```shell
npm install @umami/node
```

This command will install the API client [npm package](https://www.npmjs.com/package/@umami/node).

## Usage

```typescript
import umami from '@umami/node';

// Initialize the client
const umamiClient = new umami.UmamiClient({
  websiteId: '50429a93-8479-4073-be80-d5d29c09c2ec', // Your website id
  hostUrl: 'https://umami.mywebsite.com', // URL to your Umami instance
  // userAgent: (optional) agent specifications
});

// Optional: Identify session attributes
const sessionId = Date.now().toString();
const identifyOptions = {
  attribute: "11.23",
  sessionId: sessionId
};
await umamiClient.identify(identifyOptions);

// Track a page view
const pageEvent = {
  url: '/home',
  title: 'Homepage'
};
await umamiClient.track(pageEvent);

// Track a custom event
const eventData = { color: 'red' };
const customEvent = {
  url: '/home',
  title: 'Homepage',
  name: 'button-click',
  data: eventData
};
await umamiClient.track(customEvent);
```

If you're using Umami Cloud, use `https://cloud.umami.is` as `hostUrl`.

### Event Properties

When tracking events, you can include these properties:

- **hostname**: Server hostname
- **language**: Client language (e.g., en-US)
- **referrer**: Page referrer
- **screen**: Screen dimensions (e.g., 1920x1080)
- **title**: Page title
- **url**: Page URL
- **name**: Event name (for custom events)
- **data**: Custom event properties

### Edge Runtime Compatibility

This client is compatible with Edge Runtime environments like Cloudflare Workers, Vercel Edge Functions, and other edge computing platforms. It uses standard Web APIs and doesn't rely on Node.js-specific features.