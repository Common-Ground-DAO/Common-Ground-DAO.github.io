---
layout: default
---

<section class="section">
  <div class="container">
    {% if site.posts.size > 0 %}
    <a href="{{ site.posts.first.url }}" class="hero-latest mb-6">
      <span class="hero-latest-label">Latest</span>
      <span>{{ site.posts.first.title }}</span>
      <span class="hero-latest-arrow">→</span>
    </a>
    {% endif %}

    <h1 class="heading-1 mb-6">{{ site.description }}</h1>
    <p class="lead max-w-2xl mb-8">{{ site.explainer }}</p>

    <div class="action-box">
      <div class="action-tabs">
        <button class="action-tab active" data-tab="panel-launch">{{ site.actions.launch.label }}</button>
        <button class="action-tab" data-tab="panel-contribute">{{ site.actions.contribute.label }}</button>
        <button class="action-tab" data-tab="panel-fork">{{ site.actions.fork.label }}</button>
        <button class="action-tab" data-tab="panel-govern">{{ site.actions.govern.label }}</button>
      </div>
      <div class="action-content">
        <div id="panel-launch" class="action-panel active">
          <a href="{{ site.app_url }}" class="action-panel-link" target="_blank">{{ site.app_url | remove: "https://" }}</a>
          <p class="action-panel-desc">{{ site.actions.launch.text }}</p>
        </div>
        <div id="panel-contribute" class="action-panel">
          <a href="{{ site.repo_url }}" class="action-panel-link" target="_blank">{{ site.repo_url | remove: "https://" }}</a>
          <p class="action-panel-desc">{{ site.actions.contribute.text }}</p>
        </div>
        <div id="panel-fork" class="action-panel">
          <a href="{{ site.fork_url }}" class="action-panel-link" target="_blank">{{ site.fork_url | remove: "https://" }}</a>
          <p class="action-panel-desc">{{ site.actions.fork.text }}</p>
        </div>
        <div id="panel-govern" class="action-panel">
          <a href="{{ site.governance_url }}" class="action-panel-link" target="_blank">{{ site.governance_url | remove: "https://" }}</a>
          <p class="action-panel-desc">{{ site.actions.govern.text }}</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section-flush">
  <video autoplay loop muted playsinline preload="metadata">
    <source src="/assets/videos/product-trailer.mp4" type="video/mp4">
  </video>
</section>

<section class="section">
  <div class="container">
    <p class="section-eyebrow">Play & Stream all the things</p>
    <h2 class="heading-2 mb-4">Games & Apps</h2>
    <p class="lead mb-8">Gaming like never before - play with friends instantly, anywhere, right in your browser.</p>
    <div class="grid grid-2">
      <div class="feature-card">
        <span class="feature-badge">New</span>
        <h3 class="heading-4 mt-4 mb-4">Build & Publish Apps & Games</h3>
        <p class="text-secondary">Common Ground features a full-scale application model, that allows you to play, publish & monetize any app, game or web page right within your community.</p>
      </div>
      <div class="feature-card">
        <span class="feature-badge">New</span>
        <h3 class="heading-4 mt-4 mb-4">SDK & Sample Apps</h3>
        <p class="text-secondary">Create a deep integration between your app and Common Ground: build on our user account & community model with our SDK and get started in minutes.</p>
      </div>
      <div class="feature-card">
        <span class="feature-badge">New</span>
        <h3 class="heading-4 mt-4 mb-4">Open Source Everything</h3>
        <p class="text-secondary">Common Ground is entirely open source, including the games & apps we're publishing for our communities.</p>
      </div>
      <div class="feature-card">
        <span class="feature-badge feature-badge-muted">Soon</span>
        <h3 class="heading-4 mt-4 mb-4">Much, much more</h3>
        <p class="text-secondary">We're only getting started. The community super app for the new Web wasn't built in a day!</p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="split-feature">
      <div class="split-feature-image">
        <img src="/assets/images/product-1.avif" alt="Common Ground app on mobile">
      </div>
      <div class="split-feature-content">
        <h2 class="heading-2 mb-4">Community, friends, live streams & events — all in one place</h2>
        <p class="lead mb-8">Build a more active community with everything you need in one place. Easy to use and fun, of course!</p>
        <div class="feature-list">
          <span class="feature-list-item">Chats</span>
          <span class="feature-list-item">Video Calls & Live Streams</span>
          <span class="feature-list-item">Blogging</span>
          <span class="feature-list-item">Gaming & Apps</span>
          <span class="feature-list-item">Tokens</span>
          <span class="feature-list-item">Private & Public Spaces</span>
          <span class="feature-list-item">Roles & Permissions</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="split-feature split-feature-reverse">
      <div class="split-feature-image split-feature-image-alt">
        <img src="/assets/images/product-3.png" alt="Common Ground explore and discover">
      </div>
      <div class="split-feature-content">
        <h2 class="heading-2 mb-4">Monetize & Earn</h2>
        <p class="lead mb-8">Our deep integration of wallets, tokens & stablecoins makes it easier than ever to monetize right within your community. No intermediaries, no fees, no bullshit.</p>
        <div class="feature-list mb-6">
          <span class="feature-list-item feature-list-item-highlight">LUKSO 👑</span>
          <span class="feature-list-item feature-list-item-highlight">Fuel 👑</span>
          <span class="feature-list-item">Arbitrum</span>
          <span class="feature-list-item">Avalanche</span>
          <span class="feature-list-item">Base</span>
          <span class="feature-list-item">BSC</span>
          <span class="feature-list-item">Cardano</span>
          <span class="feature-list-item">Ethereum</span>
          <span class="feature-list-item">Fantom</span>
          <span class="feature-list-item">Gnosis</span>
          <span class="feature-list-item">Linea</span>
          <span class="feature-list-item">Near</span>
          <span class="feature-list-item">Optimism</span>
          <span class="feature-list-item">Polygon</span>
          <span class="feature-list-item">Scroll</span>
          <span class="feature-list-item">Solana</span>
          <span class="feature-list-item">zkSync</span>
        </div>
        <p class="text-secondary text-sm">Supporting over 16 chains</p>
      </div>
    </div>
  </div>
</section>
