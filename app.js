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
            <title>DevOps Assignment - Web App</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    max-width: 800px;
                    margin: 50px auto;
                    padding: 20px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    text-align: center;
                }
                .container {
                    background: rgba(255,255,255,0.1);
                    padding: 40px;
                    border-radius: 10px;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
                }
                h1 { font-size: 2.5em; margin-bottom: 20px; }
                .info { margin: 20px 0; font-size: 1.2em; }
                .status { color: #4CAF50; font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🚀 DevOps Assignment</h1>
                <div class="info">
                    <p class="status">✅ Web App is Running Successfully!</p>
                    <p><strong>Server:</strong> Node.js + Express</p>
                    <p><strong>Port:</strong> ${port}</p>
                    <p><strong>Environment:</strong> ${process.env.NODE_ENV || 'development'}</p>
                    <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
                </div>
                <div class="info">
                    <h3>🎯 Assignment Status</h3>
                    <p>✅ Phase 1: Web App Created</p>
                    <p>🔄 Phase 2: Docker Setup</p>
                    <p>⏳ Phase 3: AWS EC2 Deployment</p>
                    <p>⏳ Phase 4: Documentation</p>
                </div>
            </div>
        </body>
        </html>
    `);
});

app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

app.get('/api/info', (req, res) => {
    res.json({
        app: 'DevOps Assignment Web App',
        version: '1.0.0',
        node_version: process.version,
        environment: process.env.NODE_ENV || 'development',
        port: port
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 DevOps Assignment App running on http://localhost:${port}`);
    console.log(`📊 Health check: http://localhost:${port}/health`);
    console.log(`📋 API info: http://localhost:${port}/api/info`);
});