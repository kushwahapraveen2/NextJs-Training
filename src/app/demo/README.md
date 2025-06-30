# Next.js Rendering Strategies Demo

This demo showcases the four main rendering strategies in Next.js with simple, educational examples.

## 🎯 What You'll Learn

- **SSG (Static Site Generation)** - Pages built at build time
- **SSR (Server-Side Rendering)** - Pages rendered on server for each request
- **ISR (Incremental Static Regeneration)** - Static pages that can update in background
- **Intercepting Routes** - Modal-like navigation without full page reloads

## 📁 Demo Structure

```
/demo/
├── page.tsx                    # Main demo index
├── ssg/page.tsx               # Static Site Generation demo
├── ssr/page.tsx               # Server-Side Rendering demo
├── isr/page.tsx               # Incremental Static Regeneration demo
└── intercepting/
    ├── page.tsx               # Photo gallery
    ├── photo/[id]/page.tsx    # Full photo page
    └── @modal/(.)photo/[id]/page.tsx  # Modal overlay
```

## 🚀 How to Test Each Demo

### SSG Demo (`/demo/ssg`)

1. Run `npm run build` - Notice console logs during build
2. Run `npm start` - Page loads instantly
3. View page source - HTML is pre-rendered
4. Disconnect internet - Page still works (it's static!)

### SSR Demo (`/demo/ssr`)

1. Refresh the page multiple times
2. Notice server time changes with each refresh
3. Check console for SSR logs on each request
4. Request ID changes - shows fresh server processing

### ISR Demo (`/demo/isr`)

1. Visit the page - see static content
2. Wait 10+ seconds and refresh
3. Stock numbers change randomly (background updates)
4. Check console for ISR revalidation logs

### Intercepting Routes (`/demo/intercepting`)

1. Click "View Details" on any photo
2. Photo opens in modal overlay
3. Background gallery stays visible
4. URL updates to show photo route
5. Click outside or use browser back to close

## 💡 Key Concepts Explained

### SSG (Static Site Generation)

- **When it runs:** At build time (`npm run build`)
- **Best for:** Content that doesn't change frequently
- **Pros:** Fastest performance, SEO-friendly, cost-effective
- **Cons:** Static content only, no real-time data

### SSR (Server-Side Rendering)

- **When it runs:** On every request
- **Best for:** Content that needs to be fresh
- **Pros:** Always fresh data, SEO-friendly, user-specific content
- **Cons:** Slower than SSG, higher server costs

### ISR (Incremental Static Regeneration)

- **When it runs:** At build time + background revalidation
- **Best for:** Content that changes occasionally
- **Pros:** Fast initial load, fresh data, background updates
- **Cons:** Stale data initially, complex caching

### Intercepting Routes

- **What it does:** Intercepts navigation to show modal
- **Best for:** Modal-like experiences
- **Pros:** Better UX, context preservation, URL updates
- **Cons:** More complex routing setup

## 🔧 Technical Implementation

### SSG Implementation

```typescript
export const getStaticProps = async () => {
  // Runs at build time
  return { props: { data } };
};
```

### SSR Implementation

```typescript
export const getServerSideProps = async (context) => {
  // Runs on every request
  return { props: { data } };
};
```

### ISR Implementation

```typescript
export const getStaticProps = async () => {
  return {
    props: { data },
    revalidate: 10, // Revalidate every 10 seconds
  };
};
```

### Intercepting Routes Implementation

```
@modal/(.)photo/[id]/page.tsx  // Modal component
photo/[id]/page.tsx            // Full page component
```

## 🎓 Learning Outcomes

After exploring these demos, you should understand:

1. **When to use each rendering strategy**
2. **How to implement each approach**
3. **Performance implications of each choice**
4. **SEO considerations for each method**
5. **User experience differences**

## 🚀 Next Steps

- Try modifying the demos to see how they behave
- Experiment with different data sources
- Test performance differences
- Explore more advanced Next.js features

Happy learning! 🎉
