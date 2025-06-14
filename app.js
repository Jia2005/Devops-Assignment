const express = require('express');
const app = express();
const port = 3000;

// Serve static files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>DevOps Dashboard</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
                    min-height: 100vh;
                    color: #fff;
                }

                .dashboard {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 20px;
                    min-height: 100vh;
                    align-content: start;
                }

                .card {
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    border-radius: 12px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    padding: 24px;
                    transition: all 0.3s ease;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                }

                .card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
                }

                .card-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 20px;
                    font-size: 1.2em;
                    font-weight: 600;
                }

                .card-header i {
                    color: #64b5f6;
                    font-size: 1.3em;
                }

                .hero-card {
                    grid-column: 1 / -1;
                    text-align: center;
                    padding: 40px 24px;
                }

                .hero-title {
                    font-size: 2.5em;
                    margin-bottom: 10px;
                    background: linear-gradient(45deg, #fff, #64b5f6);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .hero-subtitle {
                    font-size: 1.1em;
                    opacity: 0.8;
                    margin-bottom: 20px;
                }

                .status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(76, 175, 80, 0.2);
                    padding: 8px 16px;
                    border-radius: 20px;
                    border: 1px solid #4CAF50;
                    font-size: 0.9em;
                    font-weight: 500;
                }

                .info-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 15px;
                }

                .info-item {
                    background: rgba(255, 255, 255, 0.05);
                    padding: 15px;
                    border-radius: 8px;
                    text-align: center;
                }

                .info-value {
                    font-size: 1.2em;
                    font-weight: 600;
                    color: #64b5f6;
                    margin-bottom: 5px;
                }

                .info-label {
                    font-size: 0.85em;
                    opacity: 0.8;
                }

                .phase-list {
                    list-style: none;
                }

                .phase-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }

                .phase-item:last-child {
                    border-bottom: none;
                }

                .phase-icon {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.8em;
                    transition: all 0.5s ease;
                }

                .phase-icon.completed {
                    background: #4CAF50;
                    color: white;
                }

                .phase-icon.current {
                    background: #FF9800;
                    color: white;
                    animation: pulse 2s infinite;
                }

                .phase-icon.pending {
                    background: rgba(255, 255, 255, 0.2);
                    color: #ccc;
                }

                /* Progressive completion animations */
                .phase-icon.phase-1 {
                    animation: completePhase1 20s ease-in-out forwards;
                }

                .phase-icon.phase-2 {
                    animation: completePhase2 20s ease-in-out forwards;
                }

                .phase-icon.phase-3 {
                    animation: completePhase3 20s ease-in-out forwards;
                }

                .phase-icon.phase-4 {
                    animation: completePhase4 20s ease-in-out forwards;
                }

                @keyframes completePhase1 {
                    0%, 20% {
                        background: rgba(255, 255, 255, 0.2);
                        color: #ccc;
                    }
                    25%, 100% {
                        background: #4CAF50;
                        color: white;
                    }
                }

                @keyframes completePhase2 {
                    0%, 45% {
                        background: rgba(255, 255, 255, 0.2);
                        color: #ccc;
                    }
                    50%, 100% {
                        background: #4CAF50;
                        color: white;
                    }
                }

                @keyframes completePhase3 {
                    0%, 70% {
                        background: rgba(255, 255, 255, 0.2);
                        color: #ccc;
                    }
                    75%, 100% {
                        background: #4CAF50;
                        color: white;
                    }
                }

                @keyframes completePhase4 {
                    0%, 95% {
                        background: rgba(255, 255, 255, 0.2);
                        color: #ccc;
                    }
                    100% {
                        background: #4CAF50;
                        color: white;
                    }
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.6; }
                }

                .stat-value {
                    font-size: 2em;
                    font-weight: 700;
                    color: #64b5f6;
                    display: block;
                    margin-bottom: 5px;
                }

                .btn-group {
                    display: flex;
                    gap: 10px;
                    margin-top: 15px;
                }

                .btn {
                    flex: 1;
                    padding: 10px 15px;
                    background: rgba(100, 181, 246, 0.2);
                    border: 1px solid #64b5f6;
                    border-radius: 6px;
                    color: #64b5f6;
                    text-decoration: none;
                    text-align: center;
                    font-size: 0.9em;
                    transition: all 0.3s ease;
                }

                .btn:hover {
                    background: #64b5f6;
                    color: white;
                }

                .progress-bar {
                    width: 100%;
                    height: 6px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 3px;
                    overflow: hidden;
                    margin: 15px 0;
                }

                .progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #4CAF50, #64b5f6);
                    border-radius: 3px;
                    animation: progress 20s ease-in-out forwards;
                }

                @keyframes progress {
                    0% { width: 0%; }
                    25% { width: 25%; }
                    50% { width: 50%; }
                    75% { width: 75%; }
                    100% { width: 100%; }
                }

                @media (max-width: 768px) {
                    .dashboard {
                        grid-template-columns: 1fr;
                        padding: 15px;
                    }
                    .hero-title {
                        font-size: 2em;
                    }
                    .info-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
        </head>
        <body>
            <div class="dashboard">
                <!-- Hero Section -->
                <div class="card hero-card">
                    <h1 class="hero-title"><i class="fas fa-rocket"></i> DevOps Dashboard</h1>
                    <p class="hero-subtitle">Application Monitoring & Deployment Status</p>
                    <div class="status-badge">
                        <i class="fas fa-check-circle"></i>
                        System Online
                    </div>
                </div>

                <!-- Server Info -->
                <div class="card">
                    <div class="card-header">
                        <i class="fas fa-server"></i>
                        Server Status
                    </div>
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-value">Node.js</div>
                            <div class="info-label">Runtime</div>
                        </div>
                        <div class="info-item">
                            <div class="info-value">${port}</div>
                            <div class="info-label">Port</div>
                        </div>
                        <div class="info-item">
                            <div class="info-value">${process.env.NODE_ENV || 'Dev'}</div>
                            <div class="info-label">Environment</div>
                        </div>
                        <div class="info-item">
                            <div class="info-value" id="uptime">0s</div>
                            <div class="info-label">Uptime</div>
                        </div>
                    </div>
                    <div class="btn-group">
                        <a href="/health" class="btn">
                            <i class="fas fa-heartbeat"></i> Health
                        </a>
                        <a href="/api/info" class="btn">
                            <i class="fas fa-info"></i> API
                        </a>
                    </div>
                </div>

                <!-- Project Progress -->
                <div class="card">
                    <div class="card-header">
                        <i class="fas fa-tasks"></i>
                        Project Progress
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <ul class="phase-list">
                        <li class="phase-item">
                            <div class="phase-icon phase-1 pending">
                                <i class="fas fa-check"></i>
                            </div>
                            <span>Web Application</span>
                        </li>
                        <li class="phase-item">
                            <div class="phase-icon phase-2 pending">
                                <i class="fas fa-check"></i>
                            </div>
                            <span>Docker Setup</span>
                        </li>
                        <li class="phase-item">
                            <div class="phase-icon phase-3 pending">
                                <i class="fas fa-check"></i>
                            </div>
                            <span>AWS Deployment</span>
                        </li>
                        <li class="phase-item">
                            <div class="phase-icon phase-4 pending">
                                <i class="fas fa-check"></i>
                            </div>
                            <span>Documentation</span>
                        </li>
                    </ul>
                </div>

                <!-- Live Stats -->
                <div class="card">
                    <div class="card-header">
                        <i class="fas fa-chart-line"></i>
                        Live Metrics
                    </div>
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="stat-value" id="memory">45</div>
                            <div class="info-label">Memory (MB)</div>
                        </div>
                        <div class="info-item">
                            <div class="stat-value" id="requests">127</div>
                            <div class="info-label">Requests</div>
                        </div>
                    </div>
                    <div style="margin-top: 15px; font-size: 0.9em; opacity: 0.8;">
                        <i class="fas fa-clock"></i> Last updated: <span id="timestamp">${new Date().toLocaleTimeString()}</span>
                    </div>
                </div>
            </div>

            <script>
                function updateMetrics() {
                    // Simulate live data
                    document.getElementById('uptime').textContent = Math.floor(Math.random() * 3600) + 's';
                    document.getElementById('memory').textContent = Math.floor(Math.random() * 30 + 40);
                    document.getElementById('requests').textContent = Math.floor(Math.random() * 50 + 100);
                    document.getElementById('timestamp').textContent = new Date().toLocaleTimeString();
                }

                updateMetrics();
                setInterval(updateMetrics, 3000);
            </script>
        </body>
        </html>
    `);
});

app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        version: '1.0.0'
    });
});

app.get('/api/info', (req, res) => {
    res.json({
        app: 'DevOps Dashboard',
        version: '1.0.0',
        node_version: process.version,
        environment: process.env.NODE_ENV || 'development',
        port: port,
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log('🚀 DevOps Dashboard');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📱 Dashboard: http://localhost:${port}`);
    console.log(`💚 Health:    http://localhost:${port}/health`);
    console.log(`📊 API:       http://localhost:${port}/api/info`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`✅ Server running on port ${port}`);
});