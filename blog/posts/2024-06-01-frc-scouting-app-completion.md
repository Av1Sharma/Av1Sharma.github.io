---
title: "FRC Scouting App Completion - June 1, 2024"
date: "2024-06-01"
---

Finished my FRC-Scouting Web App. This was a large project if I'm being honest, took me a solid two days to build this large app. The frontend was react and vite, something im semi familiar with but the backend was a doozy. I had previously used node.js and express but integrating a LLM request was something I had never done before. Tried OpenAI and then realized I had to pay, so I decided to use Groq and their free llama model. By no means is it better, but with enough context, the model performs decent. This isn't created to replace actual strategy, but only to supplement it or give a starting point. I do admit, I did vibe code a little throughout this, especially towards the part where I had to deploy to Vercel (I didn't want to do all that work). But it worked out in the end. By no means is it done though, I need to fix it on the LLM integration on mobile, as it will only work on desktop currently for some reason.

I'm thinking of starting on another Swift app, this one again more focused on health and wellness. The issue is I can't publish an app on the App Store for anything less than $100. It's kind of annoying. 

I will be building a sentiment analyzer for stocks. Obviously parsing through each and every stock is not viable, it will break my limit for where I host it. I'm thinking of selecting a few stocks or maybe just having it on a rotation based on which stock is being talked about the most in the news and X. In addition, after I get the sentiment analyzer going, I'm gonna have the program look at technical indicators. Things such as P/E, Volume, and dividend. Most important is the trading volume, as with heavy sentiment that will fluctuate a lot. 