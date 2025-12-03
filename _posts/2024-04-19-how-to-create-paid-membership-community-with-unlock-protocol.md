---
layout: default
title: "Web3 Magic: How to create a paid membership community on Common Ground with Unlock Protocol"
date: 2024-04-19
---

<section class="section">
  <div class="container">
    <p class="text-secondary mb-4">April 19, 2024 · Florian</p>
    <h1 class="heading-2 mb-6">{{ page.title }}</h1>

    <div class="post-content">
      <p class="lead mb-8">In this guide you learn how to create a paid membership community, leveraging NFTs, Unlock Protocol and of course, Common Ground.</p>

      <img src="/assets/images/blog/web3-social-roundup-8.avif" alt="How to create a paid membership community with Unlock Protocol" class="mb-8">

      <h2 class="heading-4 mb-4">Understanding Composability</h2>
      <p class="mb-6">Composability in Web3 refers to the ability of different protocols and platforms to interact seamlessly, enabling the creation of complex and customizable solutions. This modularity allows developers and creators to build upon existing components without starting from scratch.</p>

      <p class="mb-4">Leveraging composability for your community means:</p>

      <p class="mb-4"><strong>Integration of Tools:</strong> Combine various Web3 tools to create a unique community that lives onchain. For instance, integrate membership management with Unlock Protocol and social interaction features from Common Ground.</p>

      <p class="mb-4"><strong>Customization and Flexibility:</strong> Tailor your community features to meet specific needs. Use composable smart contracts to manage memberships, access controls, and payment systems effortlessly.</p>

      <p class="mb-4"><strong>Interoperability:</strong> Ensure your community benefits from the interoperability of Web3 protocols. This means your community can interact with other platforms and services, enhancing user experience and engagement.</p>

      <p class="mb-8"><strong>Decentralized Ownership:</strong> By leveraging Web3's composability, you maintain true ownership of your community by making it effectively platformless. This decentralized approach ensures that control remains with you and your members, not a central authority.</p>

      <h2 class="heading-4 mb-4">Enter Unlock Protocol</h2>
      <p class="mb-8">Unlock Protocol offers a set of open source and purpose built smart contracts specifically for community memberships and subscriptions. The smart contracts let you add time constraints, update pricing, and handle recurring payments.</p>

      <h2 class="heading-4 mb-4">Step-by-Step Guide to Creating a Membership NFT Contract on Unlock</h2>
      <p class="mb-6">Let's dive in. This is a step-by-step guide to create your first Membership NFT with Unlock Protocol.</p>

      <h3 class="heading-5 mb-2">Step 1: Access the Unlock Dashboard</h3>
      <ul class="mb-6">
        <li>Go to the Unlock Protocol Dashboard.</li>
        <li>Connect your web3 wallet (e.g., MetaMask or Rabby).</li>
      </ul>

      <h3 class="heading-5 mb-2">Step 2: Create a New Lock</h3>
      <ul class="mb-6">
        <li>Click on "Create Lock".</li>
        <li>Choose between two kinds of onchain attestations: organize event and sell tickets or create a certification about someone's expertise on chain. Both of these contracts are NFT contracts.</li>
        <li>Fill in the lock details:
          <ul>
            <li><strong>Lock Name:</strong> Choose a name for your membership contract.</li>
            <li><strong>Currency:</strong> Select the currency (e.g., ETH, DAI).</li>
            <li><strong>Price:</strong> Set the price for membership.</li>
            <li><strong>Duration:</strong> Define the duration of the membership (e.g., 1 month, 1 year).</li>
          </ul>
        </li>
        <li>Set the total number of memberships available (if limited).</li>
        <li>Choose whether memberships are transferable or not.</li>
      </ul>

      <h3 class="heading-5 mb-2">Step 3: Deploy the Lock</h3>
      <ul class="mb-6">
        <li>Review the details and confirm.</li>
        <li>Approve the transaction in your wallet to deploy the lock.</li>
      </ul>

      <p class="mb-8"><strong>Important:</strong> to get the smart contract address of your NFT, click on "View contract" located below the image on the right. This takes you to a blockchain explorer. On there, copy the contract address. This contract address is important for the next step: the token-gating.</p>

      <h2 class="heading-4 mb-4">Token-gating access to your community</h2>
      <p class="mb-6">Now let's understand how we can leverage what we just did to create token-gated spaces in your community on Common Ground!</p>

      <h3 class="heading-5 mb-2">Step 1: Create a community</h3>
      <p class="mb-6">If you haven't yet, create your community on Common Ground.</p>

      <h3 class="heading-5 mb-2">Step 2: Access your community's admin panel</h3>
      <p class="mb-6">Then tap on your community's name in the sidebar to open the context dialogue for entering your community admin settings!</p>

      <h3 class="heading-5 mb-2">Step 3: Add your membership NFT as your community token</h3>
      <p class="mb-6">Then add your lock's smart contract address that you just created with Unlock Protocol as a community token in your admin panel.</p>

      <h3 class="heading-5 mb-2">Step 4: Create a token-gated role</h3>
      <p class="mb-6">Now you can create one or more roles in your community that require some amount of your membership NFTs to be claimed.</p>

      <h3 class="heading-5 mb-2">Step 5: Setup role-gated channels</h3>
      <p class="mb-6">Once you've created your token-gated roles, you can create as many chat channels as you like, which are only accessible to people who were able to claim your token-gated role(s).</p>

      <p class="mb-6">A super helpful feature is the ability to set chats & content to "preview only" for people who do not have the required role to see the content. This way, they are aware that there are things that would be available to them if they were to become a member. That's important if you want people to discover the value of a membership in your community.</p>

      <h3 class="heading-5 mb-2">Step 6: Upgrade your community to be more discoverable</h3>
      <p class="mb-6">If you want your community to grow, it's helpful to consider purchasing our "Publish Community" package and even the "Unique Community Url" under the Spark Upgrades tab.</p>

      <h3 class="heading-5 mb-2">Step 7: Create some public & token-gated welcome articles</h3>
      <p class="mb-6">In order for both guests and newly-joined member to have a pleasant experience in your community, it's helpful to publish a bunch of blog posts with different access-levels attached. That means your guests will see different blog posts than your members. That way you can upsell your guests to members and focus on retaining your members with valuable content.</p>

      <p class="mb-6">When creating a new blog post, choose who can access it, who can just "preview" it, and who cannot see it at all.</p>

      <h3 class="heading-5 mb-2">Step 8: Events & Workshops just for your paying members</h3>
      <p class="mb-6">To create a webinar or workshop series that's exclusive to your paying members, you can schedule live events & conduct live broadcasts and calls directly on Common Ground and tie that into the role feature just like we did with blog posts.</p>

      <p class="mb-8">We're creating an event that all your guests can "see" but in order to RSVP and actually participate they have to become a paying member first. Your paying members can immediately RSVP, add the event to their calendar and when the day comes, immediately join your live event on Common Ground.</p>

      <h2 class="heading-4 mb-4">Conclusion</h2>
      <p>When it comes to leveraging web3 for your community, there is no better place than Common Ground. Through the power of tokens such as NFTs you can create absolutely unique experiences for your members and make a sustainable living from your community work. Did you know that we support over 15 blockchains for token-gating already on Common Ground? That means you can create your community in the ecosystem that you feel the most at home in, be it Ethereum, Base, Optimism, Arbitrum, Gnosis, Polygon, Linea, Scroll, Binance Smart Chain, zkSync, Fantom or Avalanche. Support for non-EVM chains like Solana, Near, Cardano, Bitcoin and more is coming soon.</p>
    </div>
  </div>
</section>
