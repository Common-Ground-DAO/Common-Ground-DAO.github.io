---
layout: default
title: "Introducing Smart Wallets on Common Ground"
date: 2024-05-10
---

<section class="section">
  <div class="container">
    <p class="text-secondary mb-4">May 10, 2024 · Florian</p>
    <h1 class="heading-2 mb-6">{{ page.title }}</h1>

    <div class="post-content">
      <p class="lead mb-8">Account abstraction is a new buzzword in the web3 space. What is it and how are leveraging it on Common Ground?</p>

      <img src="/assets/images/blog/web3-social-roundup-9.avif" alt="Introducing Smart Wallets on Common Ground" class="mb-8">

      <h2 class="heading-4 mb-4">Introduction to Account Abstraction</h2>
      <p class="mb-6">Account abstraction is a concept in the Ethereum ecosystem that aims to improve the functionality and flexibility of user accounts. Traditionally, Ethereum has two types of accounts: externally owned accounts (EOAs), controlled by regular wallets, and contract accounts, which are governed by smart contract code. Account abstraction seeks to unify these models, allowing user accounts to include smart contract logic. People call these resulting wallets "Smart Wallets".</p>

      <p class="mb-6">The journey of account abstraction began with the recognition of limitations in the EOA model. EOAs, being simple and controlled directly by private keys, lack the programmability and flexibility offered by smart contracts. The goal has been to enable user accounts to support complex operations, such as multi-signature wallets, social recovery, and gas abstraction.</p>

      <p class="mb-6">The concept evolved through various Ethereum Improvement Proposals (EIPs), with early attempts to separate signature validation from transaction execution. Although not implemented, these proposals paved the way for more sophisticated approaches.</p>

      <p class="mb-8">Today, account abstraction is being actively explored and implemented through various projects and proposals. The Ethereum community continues to push forward with initiatives to integrate account abstraction more deeply into the ecosystem.</p>

      <h2 class="heading-4 mb-4">The future of account abstraction</h2>
      <p class="mb-6">Now that we've understood the present, let's look at the near-term future.</p>

      <h3 class="heading-5 mb-2">LUKSO and Account Abstraction</h3>
      <p class="mb-6">LUKSO, one of our partner ecosystems that's building a blockchain for the creative economy, has taken significant strides in account abstraction. They introduced the concept of Universal Profiles, which are on-chain accounts that can interact with dApps, manage digital assets, and support social recovery and programmable permissions.</p>

      <p class="mb-8">On Common Ground, we have implemented LUKSO's Universal Profile accounts, enabling our users to benefit from these advanced features.</p>

      <h3 class="heading-5 mb-2">Passkeys and EIP-7212: Revolutionizing Internet-Native Accounts</h3>
      <p class="mb-6">Passkeys represent a significant advancement in digital identity management, offering a seamless, secure, and user-friendly way to manage online accounts. Passkeys replace traditional passwords with cryptographic keys, making authentication more secure and convenient. They leverage public-private key pairs to authenticate users without the need for memorizing or storing passwords.</p>

      <p class="mb-6">Passkeys operate by generating a unique key pair for each account, where the private key is securely stored on the user's device, and the public key is registered with the service provider. This setup ensures that even if the service provider is compromised, the user's private key remains safe.</p>

      <p class="mb-6">If you want to test Passkeys yourself, simply head over to WebAuthN and create a test account. To create a wallet with a passkey you can try a demo at DefiForTheWorld.</p>

      <p class="mb-6">In order to sign Ethereum transactions with passkeys while keeping transaction cost cheap, a change to the protocol is required. EIP-7212 introduces that missing feature via a "pre-compile".</p>

      <p class="mb-8">EIP-7212 therefore aims to standardize the implementation of account abstraction, facilitating the widespread adoption of passkeys. By providing a framework for creating accounts with embedded smart contract logic, EIP-7212 enhances security and usability, making passkeys a viable option for both Web2 and Web3 applications.</p>

      <p class="mb-8">Smart wallets combined with passkeys as a universal login solution, will allow all users, including Web2, to bypass the need for traditional Web2 logins like Google or Facebook. These smart wallets offer easy onboarding and self-custody credentials, appealing to both Web2 developers and users. While mainstream options like Apple or Google might mediate passkey recovery, alternatives like Yubikeys and self-custody EOAs provide users with more control over their digital identities.</p>

      <h3 class="heading-5 mb-2">JoyID and Passkey Wallets</h3>
      <p class="mb-6">JoyID allows projects like Common Ground to leverage Passkey Wallets without waiting for EIP-7212 to be merged into the Ethereum Protocol.</p>

      <p class="mb-8">JoyID's system involves decentralized management of keys and authorization mechanisms via an Account Abstraction (AA) account on Nervos CKB. The AA account allows for Passkey authorizations across devices and secures an encrypted shard forming part of a 2-of-2 key pair. The counterpart shard is generated by the device using the Passkey during signing. This process achieves a decentralized signature conversion from secp256r1 to secp256k1 without server assistance, maintaining security and decentralization.</p>

      <h2 class="heading-4 mb-4">Conclusion</h2>
      <p>Projects like LUKSO, initiatives like EIP-7212, and innovations from JoyID are at the forefront of the Smart Wallet transformation, offering practical implementations and setting the stage for broader adoption. On Common Ground, integrating these advanced account features allows us to offer our users a more robust and user-friendly experience, leveraging the full potential of Web3 technologies.</p>
    </div>
  </div>
</section>
