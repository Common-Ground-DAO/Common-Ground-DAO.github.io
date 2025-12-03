---
layout: default
title: "Web3 Social: weekly round up #1"
date: 2023-10-13
featured_image: /assets/images/blog/web3-social-roundup-1.avif
---

<section class="section">
  <div class="container">
    <p class="text-secondary mb-4">October 13, 2023 · Florian</p>
    <h1 class="heading-2 mb-6">{{ page.title }}</h1>

    <div class="post-content">
      <p class="lead mb-8">I'm starting a new series where I summarize what's new in web3 social. I'm gathering so much intel every week on what's happening in this little industry of ours and I thought it's probably helpful for others too. So, here we go.</p>

      <img src="/assets/images/blog/web3-social-roundup-1.avif" alt="Web3 Social Weekly Round Up" class="mb-8">

      <h2 class="heading-4 mb-4">Farcaster opens permissionless signups</h2>
      <p class="mb-6">Anyone can now sign up to Farcaster, in a fully permissionless manner. Until now, you needed an invite by the founder Dan Romero or an existing member. With permissionless signups, anyone with a wallet can sign up. Did I say wallet? Not even that is needed: Farcaster supports signup with Apple/Google passkeys too, allowing new users to sign up in seconds, while having the ability to generate a self-custodial wallet out of their passkey too thanks to account abstraction.</p>

      <p class="mb-8">To track the Farcaster network, check out this handy Dune Dashboard.</p>

      <h2 class="heading-4 mb-4">Lens crosses 125.000 registered users</h2>
      <p class="mb-6">While still being in invite-only mode, Lens just crossed the milestone of 125.000 signed up users, i.e. people with an on-chain lens handle.</p>

      <p class="mb-8">To track the Lens network, check out this handy Dune Dashboard.</p>

      <h2 class="heading-4 mb-4">EIP 6963 has been finalized</h2>
      <p class="mb-6">When the Ethereum network went live on July 30 2015, people used dApps with the Mist Browser, a software bundle that combined a Full Node, a Browser and a Wallet. Since then, a lot has happened. Importantly, some clever people came up with the idea to allow users to install a wallet directly into their favorite browser and use dApps that way. For several years there was just one browser extension to install, Metamask. Metamask would inject the window.ethereum object into every website to allow that website to interact with that browser extension. Today, there are many alternative wallets to choose from, such as Rainbow. But since dApps have gotten used to just call the window.ethereum object, all these different wallets inject that same object into every website, thereby overwriting each others' window.ethereum objects by order of how they're loaded in the browser, which is basically random. This leads to undesirable and unpredictable behavior for end users. EIP 6963 ends this madness. It finally allows for orderly multi injected provider discovery based on new conventions. Many wallets have already implemented this new standard.</p>

      <p class="mb-8">To track who's already supporting EIP 6963 check this handy website.</p>

      <h2 class="heading-4 mb-4">Good Dollar shows good growth</h2>
      <p class="mb-6">Guess who has 600k verified human users, 100k MAU and 1.2M transactions per week?</p>

      <p class="mb-8">No, it's not friend tech. It's a project called Good Dollar, that's running on the Celo Blockchain. Good Dollar is a UBI project, solving for global inequality. Pretty cool!</p>

      <h2 class="heading-4 mb-4">Medium is opting out of AI</h2>
      <p class="mb-6">The web2 blogging company Medium has decided to opt out of having its users content be scraped by AI Bots such as that of OpenAI. In a blog post, CEO Tony Stubblebine explains their reasoning. For them, credit, compensation and consent are required.</p>

      <p class="mb-8">Cool move, Medium. A pitty that you're still shitty. (saying that as a former medium user)</p>

      <h2 class="heading-4 mb-4">The end</h2>
      <p class="mb-6">That was it for this week. If you found this interesting, be sure to check back here once a week where I'll be sharing the latest and greatest in web3 social.</p>

      <p>Peace out ☮️</p>
    </div>
  </div>
</section>
