import { useState, useEffect } from "react";
import { CameraFeed } from "@/components/camera-feed";
import { Card } from "@/components/ui/card";
import { Shield, ShieldAlert, CheckCircle, Smartphone, AlertTriangle, User } from "lucide-react";

type VerificationStep = 'init' | 'detecting' | 'liveness' | 'analyzing' | 'success' | 'spoof';

const LIVENESS_CHALLENGES = [
  "Turn your head slightly left",
  "Blink twice",
  "Smile briefly",
  "Look up slightly"
];

export default function Attendance() {
  const [step, setStep] = useState<VerificationStep>('init');
  const [challenge, setChallenge] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [confidence, setConfidence] = useState(0);
  
  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString().split(' ')[0]}] ${msg}`]);
  };

  useEffect(() => {
    // Simulated Verification Flow
    if (step === 'init') {
      addLog("Initializing camera and neural models...");
      setTimeout(() => setStep('detecting'), 1500);
    }
    else if (step === 'detecting') {
      addLog("Face detected. Initiating bounding box tracking.");
      setTimeout(() => {
        setStep('liveness');
        setChallenge(LIVENESS_CHALLENGES[Math.floor(Math.random() * LIVENESS_CHALLENGES.length)]);
        addLog("Initiating Challenge-Response liveness test.");
      }, 2000);
    }
    else if (step === 'liveness') {
      // Wait for "user" to perform challenge
      setTimeout(() => {
        addLog("Challenge passed. Liveness confirmed.");
        setStep('analyzing');
      }, 3000);
    }
    else if (step === 'analyzing') {
      addLog("Analyzing 3D depth and screen reflections...");
      let conf = 45;
      const interval = setInterval(() => {
        conf += Math.floor(Math.random() * 15);
        if (conf > 98) {
          clearInterval(interval);
          setConfidence(98.7);
          
          // Simulate higher likelihood of spoofing for demonstration
          if (Math.random() > 0.4) {
            setStep('spoof');
            addLog("CRITICAL: Face tracking anomalies / screen spoof detected.");
          } else {
            setStep('success');
            addLog("Identity verified. Attendance logged.");
          }
        } else {
          setConfidence(conf);
        }
      }, 300);
    }
  }, [step]);

  const getCameraStatus = () => {
    if (step === 'success') return 'success';
    if (step === 'spoof') return 'error';
    if (step !== 'init') return 'scanning';
    return 'idle';
  };

  const getOverlayText = () => {
    switch(step) {
      case 'init': return "Looking for face...";
      case 'detecting': return "Aligning face features...";
      case 'liveness': return "Verifying liveness...";
      case 'analyzing': return "Anti-spoofing checks...";
      case 'success': return "John Doe - Verified";
      case 'spoof': return "Spoofing Attempt Detected";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 flex flex-col lg:flex-row gap-8 items-center justify-center">
      
      {/* Left: Camera Interface */}
      <div className="w-full max-w-md">
        <div className="mb-6 text-center lg:text-left">
          <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2 justify-center lg:justify-start">
            <Shield className="w-6 h-6 text-primary" />
            Live Verification
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Multi-layer anti-spoofing active</p>
        </div>

        <CameraFeed 
          onCapture={() => {}} 
          status={getCameraStatus()}
          challengeText={step === 'liveness' ? challenge : undefined}
          overlayText={getOverlayText()}
        />

        {step === 'success' && (
          <div className="mt-6 p-4 rounded-lg bg-success/10 border border-success/30 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4">
            <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
            <div>
              <h4 className="text-success font-semibold text-sm">Attendance Logged</h4>
              <p className="text-xs text-success/80 mt-1">Timestamp: {new Date().toLocaleTimeString()}</p>
            </div>
            <button onClick={() => { setStep('init'); setLogs([]); setConfidence(0); }} className="ml-auto text-xs underline text-success">Next Student</button>
          </div>
        )}

        {step === 'spoof' && (
          <div className="mt-6 p-4 rounded-lg bg-destructive/10 border border-destructive/30 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4">
            <ShieldAlert className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <h4 className="text-destructive font-semibold text-sm">Access Denied</h4>
              <p className="text-xs text-destructive/80 mt-1">Reason: Flat screen surface detected.</p>
            </div>
            <button onClick={() => { setStep('init'); setLogs([]); setConfidence(0); }} className="ml-auto text-xs underline text-destructive">Retry</button>
          </div>
        )}
      </div>

      {/* Right: Security Analytics Panel */}
      <div className="w-full max-w-md flex flex-col gap-4">
        
        {/* Confidence Meter */}
        <Card className="p-5 border-border bg-card/50 backdrop-blur">
          <div className="flex justify-between items-end mb-2">
            <h3 className="text-sm font-mono text-muted-foreground">MATCH CONFIDENCE</h3>
            <span className={`text-2xl font-bold font-mono ${confidence > 90 ? 'text-success' : confidence > 50 ? 'text-primary' : 'text-muted-foreground'}`}>
              {confidence.toFixed(1)}%
            </span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${confidence > 90 ? 'bg-success' : confidence > 50 ? 'bg-primary' : 'bg-muted-foreground'}`}
              style={{ width: `${confidence}%` }}
            ></div>
          </div>
        </Card>

        {/* Security Checks Status */}
        <Card className="p-5 border-border bg-card/50 backdrop-blur space-y-4">
          <h3 className="text-sm font-mono text-muted-foreground mb-4 border-b border-border pb-2">ANTI-SPOOFING LAYERS</h3>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-white">
              <Smartphone className="w-4 h-4 text-muted-foreground" />
              <span>Device Camera Auth</span>
            </div>
            {step === 'init' ? <span className="text-muted-foreground">Pending</span> : <span className="text-success text-xs font-mono">VERIFIED</span>}
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-white">
              <User className="w-4 h-4 text-muted-foreground" />
              <span>3D Depth Analysis</span>
            </div>
            {['init', 'detecting'].includes(step) ? <span className="text-muted-foreground">Pending</span> : 
             step === 'spoof' ? <span className="text-destructive text-xs font-mono">FAILED</span> :
             <span className="text-success text-xs font-mono">VERIFIED</span>}
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-white">
              <Shield className="w-4 h-4 text-muted-foreground" />
              <span>Challenge-Response (Liveness)</span>
            </div>
            {['init', 'detecting', 'liveness'].includes(step) ? <span className="text-muted-foreground">Pending</span> : 
             <span className="text-success text-xs font-mono">VERIFIED</span>}
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-white">
              <AlertTriangle className="w-4 h-4 text-muted-foreground" />
              <span>Reflection / Screen Check</span>
            </div>
            {['init', 'detecting', 'liveness', 'analyzing'].includes(step) ? <span className="text-muted-foreground">Analyzing</span> : 
             step === 'spoof' ? <span className="text-destructive text-xs font-mono">DETECTED</span> :
             <span className="text-success text-xs font-mono">CLEAR</span>}
          </div>
        </Card>

        {/* System Logs */}
        <Card className="p-0 border-border bg-black/40 backdrop-blur flex flex-col h-[200px]">
          <div className="px-4 py-2 border-b border-border/50 bg-secondary/30 text-xs font-mono text-muted-foreground">
            TERMINAL // EVENT_LOG
          </div>
          <div className="p-4 flex-1 overflow-y-auto space-y-1 font-mono text-[10px] text-green-400/80">
            {logs.map((log, i) => (
              <div key={i} className={`animate-in fade-in slide-in-from-bottom-1 ${log.includes('CRITICAL') ? 'text-destructive' : ''}`}>
                {log}
              </div>
            ))}
            {step !== 'success' && step !== 'spoof' && (
              <div className="animate-pulse">_</div>
            )}
          </div>
        </Card>

      </div>
    </div>
  );
}