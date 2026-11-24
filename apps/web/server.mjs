/**
 * AIRO eMed US — Standalone Web Application Server
 * Serves the Hims-style web frontend and connects directly to the @airo/core domain engine.
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Direct import of our built core domain package
import {
  CDSSEvaluator,
  EligibilityValidator,
  HASTAuditLogger,
  SubscriptionEngine,
  STATE_TELEHEALTH_RULES,
} from '../../packages/core/dist/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, 'public');

const PORT = parseInt(process.env.PORT || '3000', 10);
const ALT_PORT = PORT === 3000 ? 3005 : 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
};

// In-memory subscription store for demonstration
let demoSubscriptions = new Map();

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
  });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1e6) {
        req.socket.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  // Set HIPAA-grade security headers
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');

  // ----------------------------------------------------
  // API ROUTING
  // ----------------------------------------------------
  if (req.method === 'POST' && pathname === '/api/intake/evaluate') {
    try {
      const body = await parseBody(req);
      const {
        stateOfResidence = 'TX',
        currentPhysicalState = 'TX',
        category = 'HAIR_LOSS',
        patientAge = 28,
        biologicalSex = 'MALE',
        answers = {},
      } = body;

      // 1. Audit Log of Evaluation Request
      const auditEntry = HASTAuditLogger.createAuditEntry({
        userId: 'guest_intake_eval',
        userRole: 'PATIENT',
        action: 'CREATE',
        resourceType: 'ENCOUNTER',
        resourceId: `eval_${Date.now()}`,
        patientId: 'patient_eval_session',
        rawIpAddress: req.socket.remoteAddress || '127.0.0.1',
        accessReason: 'Patient self-intake clinical pre-screening',
      });
      console.log(`[HIPAA Audit] Created audit entry: ${auditEntry.id} (IP Hash: ${auditEntry.ipAddressHash.slice(0, 12)}...)`);

      // 2. State Gating Validation
      const eligibility = EligibilityValidator.validatePatientEligibility(
        stateOfResidence,
        currentPhysicalState,
        category,
        patientAge
      );

      if (!eligibility.isEligible) {
        return sendJson(res, 403, {
          success: false,
          error: 'ELIGIBILITY_RESTRICTION',
          reasons: eligibility.reasons,
        });
      }

      // 3. Clinical Decision Support System (CDSS) Check
      const cdssResult = CDSSEvaluator.evaluateIntake(
        category,
        answers,
        biologicalSex,
        eligibility.allowedModality
      );

      if (cdssResult.hasHardStop) {
        return sendJson(res, 422, {
          success: false,
          error: 'CLINICAL_CONTRAINDICATION_HARD_STOP',
          reasons: cdssResult.findings
            .filter((f) => f.severity === 'CRITICAL_HARD_STOP')
            .map((f) => `${f.ruleTitle}: ${f.clinicalExplanation}`),
          findings: cdssResult.findings,
        });
      }

      return sendJson(res, 200, {
        success: true,
        allowedModality: cdssResult.recommendedModality,
        requiresVideo: cdssResult.recommendedModality === 'SYNCHRONOUS_AUDIO_VIDEO',
        disclosures: eligibility.requiredDisclosures,
        findings: cdssResult.findings,
      });
    } catch (err) {
      return sendJson(res, 500, {
        success: false,
        error: 'EVALUATION_ERROR',
        message: err.message,
      });
    }
  }

  if (req.method === 'POST' && pathname === '/api/checkout') {
    try {
      const body = await parseBody(req);
      const { patientId = 'pat_001', category = 'HAIR_LOSS' } = body;

      const planMap = {
        HAIR_LOSS: { id: 'plan_hair_custom', name: 'Custom Topical Hair Regrowth Spray', monthlyPrice: '$45/mo', amount: 45 },
        SEXUAL_HEALTH_ED: { id: 'plan_ed_mints', name: 'Hard Mints (Tadalafil 5mg Daily)', monthlyPrice: '$40/mo', amount: 40 },
        WEIGHT_MANAGEMENT: { id: 'plan_glp1_care', name: 'Wegovy® Care & Clinical Membership', monthlyPrice: '$79/mo (+ drug)', amount: 79 },
        DERMATOLOGY: { id: 'plan_derm_custom', name: 'Custom Tretinoin Night Formula', monthlyPrice: '$35/mo', amount: 35 },
      };

      const selectedPlan = planMap[category] || planMap.HAIR_LOSS;

      const newSub = SubscriptionEngine.createPendingSubscription(patientId, {
        id: selectedPlan.id,
        name: selectedPlan.name,
        intervalDays: 30,
        amountUSD: selectedPlan.amount,
        isPassThroughDrugIncluded: false,
        cancelAnytimeNoticeText: 'Cancel anytime in 1 click.',
      });

      demoSubscriptions.set(newSub.id, newSub);

      return sendJson(res, 200, {
        success: true,
        subscriptionId: newSub.id,
        planName: selectedPlan.name,
        monthlyPrice: selectedPlan.monthlyPrice,
        status: newSub.status,
      });
    } catch (err) {
      return sendJson(res, 500, { success: false, message: err.message });
    }
  }

  if (req.method === 'POST' && pathname === '/api/patient/subscription/pause') {
    return sendJson(res, 200, {
      success: true,
      message: 'Subscription paused for 30 days. No recurring charges will occur.',
    });
  }

  if (req.method === 'POST' && pathname === '/api/patient/subscription/cancel') {
    return sendJson(res, 200, {
      success: true,
      message: 'Subscription cancelled in 1 click. Zero further billing.',
    });
  }

  if (req.method === 'GET' && pathname === '/api/states') {
    return sendJson(res, 200, { success: true, states: STATE_TELEHEALTH_RULES });
  }

  // ----------------------------------------------------
  // STATIC FILE SERVING
  // ----------------------------------------------------
  let filePath;
  if (pathname === '/' || pathname === '/index.html') {
    filePath = path.join(PUBLIC_DIR, 'index.html');
  } else if (pathname === '/concerns' || pathname === '/concerns/') {
    filePath = path.join(PUBLIC_DIR, 'concerns.html');
  } else if (pathname === '/questionnaire' || pathname === '/questionnaire/') {
    filePath = path.join(PUBLIC_DIR, 'questionnaire.html');
  } else {
    filePath = path.join(PUBLIC_DIR, pathname);
  }

  // Security: prevent path traversal
  const normalizedPath = path.normalize(filePath);
  if (!normalizedPath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('Access Denied');
  }

  fs.stat(normalizedPath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for SPA routes
      const indexPath = path.join(PUBLIC_DIR, 'index.html');
      fs.readFile(indexPath, (readErr, content) => {
        if (readErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          return res.end('Not Found');
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        return res.end(content);
      });
      return;
    }

    const ext = path.extname(normalizedPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // HTTP 206 Partial Content (Range requests) for video playback & scrubbing
    if (req.headers.range && (ext === '.mp4' || ext === '.webm' || ext === '.mov')) {
      const range = req.headers.range;
      const fileSize = stats.size;
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(normalizedPath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType,
      };
      res.writeHead(206, head);
      file.pipe(res);
      return;
    }

    fs.readFile(normalizedPath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('Server Error');
      }
      res.writeHead(200, { 'Content-Type': contentType });
      return res.end(content);
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`AIRO eMed US Web Application running at:`);
  console.log(`👉 http://localhost:${PORT}`);
  console.log(`👉 http://localhost:${PORT}/concerns.html`);
  console.log(`👉 http://localhost:${PORT}/questionnaire.html`);
  console.log(`=======================================================`);
});

// Also bind secondary port if available so both 3000 and 3005 work seamlessly
const altServer = http.createServer(server.listeners('request')[0]);
altServer.on('error', () => { /* ignore if already occupied */ });
altServer.listen(ALT_PORT, '0.0.0.0', () => {
  console.log(`👉 Also accessible on http://localhost:${ALT_PORT}`);
});
