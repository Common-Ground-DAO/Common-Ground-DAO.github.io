---
layout: default
---

<section class="section hero-section">
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

    <a href="{{ site.app_url }}" class="btn btn-cta btn-lg btn-pill show-mobile-only mb-6" target="_blank">Launch App</a>

    <div class="action-box hide-mobile">
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

<section class="section-flush hide-mobile media-carousel">
  <div class="carousel-track">
    <div class="carousel-slide active">
      <video autoplay loop muted playsinline preload="metadata">
        <source src="/assets/videos/product-trailer.mp4" type="video/mp4">
      </video>
    </div>
    {% for screenshot in site.screenshots %}
    <div class="carousel-slide">
      <img src="{{ screenshot }}" alt="Common Ground screenshot" loading="lazy">
    </div>
    {% endfor %}
  </div>
  <button class="carousel-btn carousel-btn-prev" aria-label="Previous slide">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  </button>
  <button class="carousel-btn carousel-btn-next" aria-label="Next slide">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  </button>
</section>

<section class="section hide-mobile">
  <div class="container">
    <p class="section-eyebrow">Play & Stream all the things</p>
    <h2 class="heading-2 mb-4">Games & Apps</h2>
    <p class="lead mb-8">Gaming like never before - play with friends instantly, anywhere, right in your browser.</p>
    <div class="grid grid-2">
      <div class="feature-card">
        <span class="feature-badge">New</span>
        <h3 class="heading-4 mt-4 mb-4">Build & Publish Apps & Games</h3>
        <p class="text-secondary mb-4">Common Ground features a full-scale application model, that allows you to play, publish & monetize any app, game or web page right within your community.</p>
        <a href="{{ site.apps_guide_url }}" target="_blank" class="link">Get Started →</a>
      </div>
      <div class="feature-card">
        <span class="feature-badge">New</span>
        <h3 class="heading-4 mt-4 mb-4">SDK & Sample Apps</h3>
        <p class="text-secondary mb-4">Create a deep integration between your app and Common Ground: build on our user account & community model with our SDK and get started in minutes.</p>
        <a href="{{ site.sdk_url }}" target="_blank" class="link">Get Started →</a>
      </div>
      <div class="feature-card">
        <span class="feature-badge">New</span>
        <h3 class="heading-4 mt-4 mb-4">Open Source Everything</h3>
        <p class="text-secondary mb-4">Common Ground is entirely open source, including the games & apps we're publishing for our communities.</p>
        <a href="{{ site.github_url }}" target="_blank" class="link">Get Started →</a>
      </div>
      <div class="feature-card">
        <span class="feature-badge feature-badge-muted">Soon</span>
        <h3 class="heading-4 mt-4 mb-4">Much, much more</h3>
        <p class="text-secondary">We're only getting started. The community super app for the new Web wasn't built in a day!</p>
      </div>
    </div>
  </div>
</section>

<section class="section-flush hide-mobile video-ticker">
  <div class="ticker-track">
    {% for video_id in site.community_videos %}
    <a href="https://www.youtube.com/watch?v={{ video_id }}" target="_blank" class="ticker-item">
      <img src="https://img.youtube.com/vi/{{ video_id }}/mqdefault.jpg" alt="Community video" width="240" height="135">
      <span class="ticker-play-icon">▶</span>
    </a>
    {% endfor %}
    {% for video_id in site.community_videos %}
    <a href="https://www.youtube.com/watch?v={{ video_id }}" target="_blank" class="ticker-item">
      <img src="https://img.youtube.com/vi/{{ video_id }}/mqdefault.jpg" alt="Community video" width="240" height="135">
      <span class="ticker-play-icon">▶</span>
    </a>
    {% endfor %}
  </div>
</section>

<section class="section hide-mobile">
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

<section class="section hide-mobile">
  <div class="container">
    <div class="split-feature split-feature-reverse">
      <div class="split-feature-image split-feature-image-alt">
        <img src="/assets/images/product-3.png" alt="Common Ground explore and discover">
      </div>
      <div class="split-feature-content">
        <h2 class="heading-2 mb-4">Identity & Wallet</h2>
        <p class="lead mb-8">Our deep integration of wallets, tokens & digital identities empowers ecosytems of communities to connect in a trusted, self-sovereign way.</p>
        <div class="feature-list mb-6">
          <span class="feature-list-item feature-list-item-highlight"><img src="/assets/images/chains/lukso.png" alt="" class="chain-icon">LUKSO 👑</span>
          <span class="feature-list-item feature-list-item-highlight"><img src="/assets/images/chains/fuel.png" alt="" class="chain-icon">Fuel 👑</span>
          <span class="feature-list-item"><img src="/assets/images/chains/arbitrum.png" alt="" class="chain-icon">Arbitrum</span>
          <span class="feature-list-item"><img src="/assets/images/chains/avalanche.png" alt="" class="chain-icon">Avalanche</span>
          <span class="feature-list-item"><img src="/assets/images/chains/base.png" alt="" class="chain-icon">Base</span>
          <span class="feature-list-item"><img src="/assets/images/chains/bsc.png" alt="" class="chain-icon">BSC</span>
          <span class="feature-list-item"><img src="/assets/images/chains/cardano.png" alt="" class="chain-icon">Cardano</span>
          <span class="feature-list-item"><img src="/assets/images/chains/ethereum.png" alt="" class="chain-icon">Ethereum</span>
          <span class="feature-list-item"><img src="/assets/images/chains/fantom.png" alt="" class="chain-icon">Fantom</span>
          <span class="feature-list-item"><img src="/assets/images/chains/gnosis.png" alt="" class="chain-icon">Gnosis</span>
          <span class="feature-list-item"><img src="/assets/images/chains/linea.png" alt="" class="chain-icon">Linea</span>
          <span class="feature-list-item"><img src="/assets/images/chains/near.png" alt="" class="chain-icon">Near</span>
          <span class="feature-list-item"><img src="/assets/images/chains/optimism.png" alt="" class="chain-icon">Optimism</span>
          <span class="feature-list-item"><img src="/assets/images/chains/polygon.png" alt="" class="chain-icon">Polygon</span>
          <span class="feature-list-item"><img src="/assets/images/chains/scroll.png" alt="" class="chain-icon">Scroll</span>
          <span class="feature-list-item"><img src="/assets/images/chains/solana.png" alt="" class="chain-icon">Solana</span>
          <span class="feature-list-item"><img src="/assets/images/chains/zksync.png" alt="" class="chain-icon">zkSync</span>
        </div>
        <p class="text-secondary text-sm">Supporting over 16 chains</p>
      </div>
    </div>
  </div>
</section>

<section class="section-flush hide-mobile">
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/{{ site.youtube_video_id }}?autoplay=1&mute=1&controls=1&loop=1&playlist={{ site.youtube_video_id }}"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen>
    </iframe>
  </div>
</section>

<section class="section hide-mobile">
  <div class="container">
    <div class="content-split">
      <div class="content-split-image">
        <img src="/assets/images/inter-2.avif" alt="Contribute to Common Ground">
      </div>
      <div class="content-split-text">
        <h2 class="heading-2 mb-4">Contribute to a Better World</h2>
        <p class="lead mb-6">We're building the FOSS alternative to Discord!</p>
        <p class="text-secondary mb-4">When people share knowledge & work together, it's important that they own and govern their digital spaces.</p>
        <p class="text-secondary mb-8">To succeed, we need Open Source Developers who help us build the most impactful community platform the world has ever seen.</p>
        <h3 class="heading-4 mb-4">Benefits</h3>
        <ul class="benefit-list mb-8">
          <li>Get rewarded in $CG Tokens</li>
          <li>Our governance token mediates ownership</li>
          <li>Join the open source revolution</li>
          <li>Learn and earn while contributing</li>
          <li>More benefits to come</li>
        </ul>
        <a href="{{ site.repo_url }}" target="_blank" class="btn btn-primary">Make a Pull Request</a>
      </div>
    </div>
  </div>
</section>

<section class="section-video-bg hide-mobile">
  <video autoplay loop muted playsinline preload="metadata">
    <source src="/assets/videos/grid.mp4" type="video/mp4">
  </video>
  <div class="container">
    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-number">1M+</span>
        <span class="stat-label">Group Messages</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">501K+</span>
        <span class="stat-label">DMs</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">64K+</span>
        <span class="stat-label">Users</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">8.9K+</span>
        <span class="stat-label">Blog Posts</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">5.9K+</span>
        <span class="stat-label">Communities</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">5K+</span>
        <span class="stat-label">Live Streams</span>
      </div>
    </div>
  </div>
</section>

<section class="section-flush hide-mobile video-ticker">
  <div class="ticker-track ticker-track-reverse">
    {% for video_id in site.podcast_videos %}
    <a href="https://www.youtube.com/watch?v={{ video_id }}" target="_blank" class="ticker-item">
      <img src="https://img.youtube.com/vi/{{ video_id }}/mqdefault.jpg" alt="Podcast video" width="240" height="135">
      <span class="ticker-play-icon">▶</span>
    </a>
    {% endfor %}
    {% for video_id in site.podcast_videos %}
    <a href="https://www.youtube.com/watch?v={{ video_id }}" target="_blank" class="ticker-item">
      <img src="https://img.youtube.com/vi/{{ video_id }}/mqdefault.jpg" alt="Podcast video" width="240" height="135">
      <span class="ticker-play-icon">▶</span>
    </a>
    {% endfor %}
  </div>
</section>

<section class="section hide-mobile">
  <div class="container">
    <p class="section-eyebrow">From the Blog</p>
    <h2 class="heading-2 mb-4">Latest Updates</h2>
    <p class="lead mb-8">News, tutorials, and insights from the Common Ground team.</p>

    <div class="blog-slider">
      {% for post in site.posts limit:6 %}
      <a href="{{ post.url }}" class="blog-card">
        {% if post.featured_image %}
        <div class="blog-card-image">
          <img src="{{ post.featured_image }}" alt="{{ post.title }}" loading="lazy">
        </div>
        {% endif %}
        <div class="blog-card-content">
          <p class="blog-card-date">{{ post.date | date: "%B %d, %Y" }}</p>
          <h3 class="blog-card-title">{{ post.title }}</h3>
        </div>
      </a>
      {% endfor %}
    </div>

    <div class="text-center mt-8">
      <a href="/blog" class="btn btn-secondary">View All Posts</a>
    </div>
  </div>
</section>
