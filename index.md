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
