---
layout: page
title: Governance
summary: Join us in building the future of decentralized communication through progressive decentralization and community ownership.
permalink: /governance/
---

<div class="governance-intro">
    <div class="container">
        <h2>Progressive Decentralization</h2>
        <p>Common Ground is on a journey from a community-driven platform to a fully decentralized, cooperatively owned communication protocol. Our governance model evolves with the platform, ensuring sustainable growth and true community ownership.</p>
    </div>
</div>

<div class="container">
    <section class="governance-section">
        <h2>Get Involved Today</h2>
        <div class="participation-grid">
            <div class="participation-card">
                <div class="card-icon">🐛</div>
                <h3>Report Issues</h3>
                <p>Help improve Common Ground by submitting bugs or feature requests through our official form.</p>
                <a href="https://forms.office.com/e/0iahZJHis4" class="button" target="_blank">Submit Report →</a>
            </div>

            <div class="participation-card">
                <div class="card-icon">💡</div>
                <h3>Propose Features</h3>
                <p>Share and discuss your ideas for new features in our dedicated feature proposal channel.</p>
                <a href="https://app.cg/c/commonground/channel/~pRHnEd6Ae5KbUfWwc3DM2B/" class="button" target="_blank">Propose Features →</a>
            </div>

            <div class="participation-card">
                <div class="card-icon">🤝</div>
                <h3>Get Support</h3>
                <p>Connect with our community and get help in our dedicated support channel.</p>
                <a href="https://app.cg/c/commonground/channel/~1KVhCmhzZYdShkRa3vnEoi/" class="button" target="_blank">Get Help →</a>
            </div>

            <div class="participation-card">
                <div class="card-icon">🌳</div>
                <h3>Ecosystem Partner</h3>
                <p>Bring your entire ecosystem to Common Ground, coordinating tens of thousands of people.</p>
                <a href="https://forms.office.com/e/uui0VViU7R" class="button" target="_blank">Inquire Today →</a>
            </div>            
        </div>
    </section>
    <section class="governance-section">
        <h2>Governance Roadmap</h2>
        <div class="timeline">
            <div class="timeline-item active">
                <div class="timeline-marker">1</div>
                <div class="timeline-content">
                    <h3>Token Holder Engagement</h3>
                    <p>Token holders can claim special roles on Common Ground, gaining access to exclusive features and recognition within the community.</p>
                    <a href="https://app.cg/token/" class="button verify-button" target="_blank">Verify Token Holdings →</a>
                </div>
            </div>

            <div class="timeline-item active">
                <div class="timeline-marker">2</div>
                <div class="timeline-content">
                    <h3>Enhanced Participation</h3>
                    <p>Access exclusive channels, content, and events. Engage directly with the team and help shape the platform's roadmap through privileged access and direct communication.</p>
                    <a href="https://app.cg/c/commonground/" class="button verify-button" target="_blank">Join Community →</a>
                </div>
            </div>

            <div class="timeline-item">
                <div class="timeline-marker">3</div>
                <div class="timeline-content">
                    <h3>Token-Weighted Governance</h3>
                    <p>Implementation of formal governance through Snapshot voting and the Common Ground extension API, enabling token-weighted decision-making on key proposals.</p>
                </div>
            </div>

            <div class="timeline-item">
                <div class="timeline-marker">4</div>
                <div class="timeline-content">
                    <h3>Open Source Transition</h3>
                    <p>Opening the Common Ground codebase under a community-oriented permissive license, enabling transparency and community contributions.</p>
                </div>
            </div>

            <div class="timeline-item">
                <div class="timeline-marker">5</div>
                <div class="timeline-content">
                    <h3>Revenue Sustainability</h3>
                    <p>Establishment of sustainable revenue streams through the Common Ground app, ensuring long-term viability and community benefit.</p>
                </div>
            </div>

            <div class="timeline-item">
                <div class="timeline-marker">6</div>
                <div class="timeline-content">
                    <h3>Cooperative Formation</h3>
                    <p>Incorporation of the Common Ground Cooperative to assume operational control of app.cg, establishing formal community ownership.</p>
                </div>
            </div>

            <div class="timeline-item">
                <div class="timeline-marker">7</div>
                <div class="timeline-content">
                    <h3>Bicameral Governance</h3>
                    <p>Implementation of a two-chamber governance system between CG Cooperative and CG DAO, balancing operational needs with community direction.</p>
                </div>
            </div>

            <div class="timeline-item">
                <div class="timeline-marker">8</div>
                <div class="timeline-content">
                    <h3>DAO Dissolution</h3>
                    <p>Final transition to full cooperative ownership with the planned dissolution of CG DAO, completing the decentralization journey.</p>
                </div>
            </div>
        </div>
    </section>
</div>

<style>
.governance-intro {
    background: var(--primary-light);
    padding: 4rem 0;
    margin-bottom: 4rem;
}

.governance-section {
    margin-bottom: 4rem;
}

.timeline {
    position: relative;
    padding: 3rem 0;
    background-color: #f8f9fa;
}

.timeline::before {
    content: '';
    position: absolute;
    left: 2rem;
    top: 0;
    height: 100%;
    width: 2px;
    background: #d1d5da;
}

.timeline-item {
    position: relative;
    padding-left: 5rem;
    margin-bottom: 2rem;
    opacity: 0.8;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.timeline-item.active {
    opacity: 1;
}

.timeline-marker {
    position: absolute;
    left: 1rem;
    top: 0;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: var(--brand-color);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    box-shadow: 0px 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
}

.timeline-item:hover .timeline-marker {
    transform: scale(1.1);
}

.timeline-content {
    background: #fff;
    padding: 2rem;
    border-radius: 0.75rem;
    border: none;
    box-shadow: 0px 2px 8px rgba(0,0,0,0.05);
    transition: box-shadow 0.3s ease;
}

.timeline-content:hover {
    box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
}

.timeline-content h3 {
    margin: 0 0 0.75rem 0;
    font-size: 1.25rem;
    color: var(--brand-color);
}

.timeline-content p {
    font-size: 1rem;
    line-height: 1.5;
    color: #333;
}

.verify-button {
    margin-top: 1rem;
    background: #0366d6;
    color: #fff;
    border: none;
    padding: 0.75rem 1.25rem;
    border-radius: 0.5rem;
    text-decoration: none;
    transition: background 0.3s ease;
    font-weight: bold;
}

.verify-button:hover {
    background: #0256b3;
}

/* Future Milestones Styling */
.timeline-item:not(.active) {
    opacity: 0.6;
}
.timeline-item:not(.active) .timeline-marker {
    background: #6c757d;
    box-shadow: none;
    animation: pulse 2s infinite;
}
.timeline-item:not(.active) .timeline-content {
    background: #fdfdfe;
    border: 2px dashed #d1d5da;
    box-shadow: none;
    transition: none;
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(108,117,125, 0.5);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(108,117,125, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(108,117,125, 0);
    }
}

/* End Future Milestones Styling */

/* Additional Enhancements for Future Milestones */
.timeline-item:not(.active) .timeline-content {
    position: relative;
}
.timeline-item:not(.active) .timeline-content::before {
    /* Common styling for the pseudo-element */
    position: absolute;
    top: -1rem;
    right: 1rem;
    font-size: 0.75rem;
    background: #fff;
    color: #6c757d;
    font-weight: bold;
    padding: 0.2rem 0.5rem;
    border: 1px solid #6c757d;
    border-radius: 0.25rem;
}
/* For the first two future roadmap items (overall 3rd and 4th children, assuming first 2 are active) */
.timeline-item:not(.active):nth-child(3) .timeline-content::before,
.timeline-item:not(.active):nth-child(4) .timeline-content::before {
    content: 'Coming Soon';
}
/* For subsequent future roadmap items (5th child onward) */
.timeline-item:not(.active):nth-child(n+5) .timeline-content::before {
    content: 'Coming Eventually';
}

.participation-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.participation-card {
    background: var(--background);
    padding: 2rem;
    border-radius: 0.5rem;
    border: 1px solid var(--border-color);
    text-align: center;
}

.card-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.button {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: var(--primary);
    color: white;
    text-decoration: none;
    border-radius: 0.25rem;
    margin-top: 1rem;
    transition: background 0.2s ease;
}

.button:hover {
    background: var(--primary-dark);
}

@media (max-width: 768px) {
    .timeline::before {
        left: 0.75rem;
    }
    
    .timeline-item {
        padding-left: 2.5rem;
    }
    
    .timeline-marker {
        width: 1.5rem;
        height: 1.5rem;
        font-size: 0.8rem;
    }
}
</style> 