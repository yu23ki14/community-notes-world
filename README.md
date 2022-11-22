# Community Notes Dashboard

A dashboard to display Twitter's [Community Notes](https://twitter.github.io/communitynotes) program data.

Twitter [publishes data](https://www.twitter.com/i/communitynotes/download-data/) about program's notes, ratings, and (anonymized) users daily, so people have free access to analyze it, identify problems, and spot opportunities to make Community Notes better.

This site is built with Next.js and deployed to Vercel. It currently only uses static page rendering, but future features could require implementing server-side rendering.

See the site live here: [communitynotes.world](https://www.communitynotes.world)

## Stack

- Next.js
- Typescript
- Radix UI
- Vercel

## How it works

1. Every day, a Github Action triggers a new build in Vercel
3. During the build, we download Twitter's latest data files and build the static dashboard
4. Site is deployed, reflecting new data

Twitter's data is published daily and has a built-in 48h delay.

## Contributing

We welcome contributions with new dashboard tiles, bug fixes, and code improvements. See issues for suggestions.

## Getting Started

Clone this repository, and make sure you have Node installed.
To run the development server and preview the site locally:

```bash
npm run dev
# or
yarn dev
```

## Learn More about Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Disclaimer

This dashboard is open-source and not officially maintained by Twitter Inc. All intellectual proerty (Twitter and Community Notes name, brand, etc) are property of Twitter Inc.

Your use of the datasets is governed by the Twitter Developer Agreement and Policy. By downloading using the data, you agree to the [Twitter Developer Agreement and Policy](https://developer.twitter.com/en/developer-terms).
