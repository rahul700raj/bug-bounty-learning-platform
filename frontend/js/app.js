// API Base URL
const API_URL = window.location.origin;

// Load OWASP Categories
async function loadOWASPCategories() {
    try {
        const response = await fetch(`${API_URL}/api/owasp/categories`);
        const data = await response.json();
        
        const container = document.getElementById('owasp-categories');
        container.innerHTML = data.categories.map(cat => `
            <div class="card">
                <h3>${cat.id}. ${cat.name}</h3>
                <span class="severity ${cat.severity.toLowerCase()}">${cat.severity}</span>
                <p>Learn about ${cat.name} vulnerabilities and how to prevent them.</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading OWASP categories:', error);
    }
}

// Load Challenges
async function loadChallenges() {
    try {
        const response = await fetch(`${API_URL}/api/challenges`);
        const data = await response.json();
        
        const container = document.getElementById('challenges-list');
        container.innerHTML = data.challenges.map(challenge => `
            <div class="card">
                <h3>${challenge.title}</h3>
                <span class="severity ${challenge.difficulty.toLowerCase()}">${challenge.difficulty}</span>
                <p>${challenge.description}</p>
                <p><strong>Endpoint:</strong> <code>${challenge.endpoint}</code></p>
                <p><em>Hint: ${challenge.hint}</em></p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading challenges:', error);
    }
}

// Load Resources
async function loadResources() {
    try {
        const response = await fetch(`${API_URL}/api/resources`);
        const data = await response.json();
        
        const container = document.getElementById('resources-list');
        let html = '';
        
        for (const [category, resources] of Object.entries(data.resources)) {
            html += `<h3>${category}</h3>`;
            resources.forEach(resource => {
                html += `
                    <a href="${resource.url}" target="_blank" class="resource-link">
                        ${resource.name}
                    </a>
                `;
            });
        }
        
        container.innerHTML = html;
    } catch (error) {
        console.error('Error loading resources:', error);
    }
}

// Test Vulnerability
async function testVulnerability(type, isSecure) {
    const output = document.getElementById('lab-output');
    output.textContent = 'Testing...';
    
    try {
        let endpoint, method, body;
        
        switch(type) {
            case 'broken-access':
                endpoint = `/api/owasp/broken-access/${isSecure ? 'secure' : 'vulnerable'}/123`;
                method = 'GET';
                break;
                
            case 'sql-injection':
                endpoint = `/api/owasp/sql-injection/${isSecure ? 'secure' : 'vulnerable'}`;
                method = 'POST';
                body = JSON.stringify({ username: "admin' OR '1'='1" });
                break;
                
            case 'xss':
                endpoint = `/api/owasp/xss/${isSecure ? 'secure' : 'vulnerable'}`;
                method = 'POST';
                body = JSON.stringify({ comment: '<script>alert("XSS")</script>' });
                break;
                
            case 'ssrf':
                endpoint = `/api/owasp/ssrf/vulnerable`;
                method = 'POST';
                body = JSON.stringify({ url: 'http://localhost:3000/admin' });
                break;
                
            default:
                output.textContent = 'Please select a vulnerability type';
                return;
        }
        
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'user-id': '123' // For broken access control demo
            }
        };
        
        if (body) {
            options.body = body;
        }
        
        const response = await fetch(`${API_URL}${endpoint}`, options);
        const data = await response.json();
        
        output.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        output.textContent = `Error: ${error.message}`;
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadOWASPCategories();
    loadChallenges();
    loadResources();
    
    document.getElementById('test-vulnerable')?.addEventListener('click', () => {
        const type = document.getElementById('vulnerability-select').value;
        if (type) {
            testVulnerability(type, false);
        } else {
            document.getElementById('lab-output').textContent = 'Please select a vulnerability type';
        }
    });
    
    document.getElementById('test-secure')?.addEventListener('click', () => {
        const type = document.getElementById('vulnerability-select').value;
        if (type) {
            testVulnerability(type, true);
        } else {
            document.getElementById('lab-output').textContent = 'Please select a vulnerability type';
        }
    });
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
