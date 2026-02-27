import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { Camera, RefreshCw, CheckCircle2, AlertTriangle, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CameraFeedProps {
  onCapture: (imageSrc: string) => void;
  mode?: "enroll" | "verify";
  status?: "idle" | "scanning" | "success" | "error";
  challengeText?: string;
  overlayText?: string;
}

export function CameraFeed({ 
  onCapture, 
  mode = "verify", 
  status = "idle",
  challengeText,
  overlayText
}: CameraFeedProps) {
  const webcamRef = useRef<Webcam>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc);
    }
  }, [webcamRef, onCapture]);

  const statusColors = {
    idle: "border-border",
    scanning: "border-primary shadow-[0_0_15px_rgba(6,182,212,0.2)]",
    success: "border-success shadow-[0_0_15px_rgba(34,197,94,0.2)]",
    error: "border-destructive shadow-[0_0_15px_rgba(239,68,68,0.2)]"
  };

  const StatusIcon = {
    idle: Camera,
    scanning: RefreshCw,
    success: CheckCircle2,
    error: ShieldAlert
  }[status];

  return (
    <div className="relative flex flex-col items-center w-full max-w-md mx-auto">
      {/* Camera Container */}
      <div className={`relative overflow-hidden rounded-xl border-2 bg-zinc-950 w-full aspect-[3/4] sm:aspect-square md:aspect-video transition-all duration-300 ${statusColors[status]}`}>
        
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode: "user" }}
          onUserMedia={() => setIsCameraReady(true)}
          className={`object-cover w-full h-full ${!isCameraReady ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
        />

        {!isCameraReady && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <RefreshCw className="w-8 h-8 animate-spin mb-4" />
            <span className="sr-only">Loading camera...</span>
          </div>
        )}

        {/* UI Overlays */}
        {isCameraReady && (
          <>
            <div className="corner-borders"></div>
            <div className="corner-borders-tr-bl"></div>
            
            {status === "scanning" && (
              <>
                <div className="scan-line"></div>
                <div className="face-mesh-overlay"></div>
              </>
            )}

            {/* Target Reticle */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className={`w-48 h-64 border border-dashed rounded-full transition-colors duration-300 ${
                status === 'success' ? 'border-success' : 
                status === 'error' ? 'border-destructive' : 
                status === 'scanning' ? 'border-primary' : 'border-white/20'
              }`}></div>
            </div>

            {/* Top Info Bar */}
            <div className="absolute top-0 inset-x-0 p-4 bg-gradient-to-b from-black/80 to-transparent flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-full ${
                  status === 'success' ? 'bg-success/20 text-success' : 
                  status === 'error' ? 'bg-destructive/20 text-destructive' : 
                  status === 'scanning' ? 'bg-primary/20 text-primary animate-pulse' : 'bg-white/10 text-white'
                }`}>
                  <StatusIcon className={`w-4 h-4 ${status === 'scanning' ? 'animate-spin' : ''}`} />
                </div>
                <span className="text-xs font-mono font-medium tracking-wider text-white drop-shadow-md">
                  {status.toUpperCase()}
                </span>
              </div>
              <div className="text-[10px] font-mono text-primary/80">
                SYS.V.2.4
              </div>
            </div>

            {/* Bottom Challenge Bar */}
            {(challengeText || overlayText) && (
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-center">
                {challengeText && (
                  <div className="inline-block px-4 py-2 bg-black/60 backdrop-blur-md rounded-lg border border-primary/30 mb-2">
                    <span className="text-sm font-semibold text-primary animate-pulse">{challengeText}</span>
                  </div>
                )}
                {overlayText && (
                  <p className="text-sm text-white/90 font-medium drop-shadow-lg">{overlayText}</p>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Manual Capture Button (primarily for testing/enrollment) */}
      {isCameraReady && mode === "enroll" && status !== "success" && (
        <Button 
          onClick={capture} 
          size="lg"
          className="mt-6 w-full max-w-xs rounded-full shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all"
        >
          <Camera className="w-5 h-5 mr-2" />
          Capture Face Data
        </Button>
      )}
    </div>
  );
}