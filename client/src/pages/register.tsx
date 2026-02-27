import { useState, useEffect } from "react";
import { CameraFeed } from "@/components/camera-feed";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ChevronRight, User, Shield, Info } from "lucide-react";
import { useLocation } from "wouter";

export default function Register() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollmentComplete, setEnrollmentComplete] = useState(false);

  const handleCapture = (imageSrc: string) => {
    setIsEnrolling(true);
    // Simulate processing delay for enrollment
    setTimeout(() => {
      setIsEnrolling(false);
      setEnrollmentComplete(true);
      
      // Auto redirect after success
      setTimeout(() => {
        setLocation("/");
      }, 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Info */}
        <div className="space-y-6 hidden md:block">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Student Enrollment</h1>
            <p className="text-muted-foreground">Secure your identity in the VeriFace system to enable seamless attendance tracking.</p>
          </div>

          <div className="space-y-4 mt-8">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Basic Information</h3>
                <p className="text-xs text-muted-foreground mt-1">Enter your assigned student ID and full legal name.</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Biometric Capture</h3>
                <p className="text-xs text-muted-foreground mt-1">Look directly at the camera in a well-lit environment. Ensure no glare or occlusion.</p>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4 flex gap-3 mt-6">
              <Info className="w-5 h-5 text-primary shrink-0" />
              <p className="text-xs text-muted-foreground">Your biometric data is encrypted and stored using one-way hash functions. We do not store raw images of your face.</p>
            </div>
          </div>
        </div>

        {/* Right Side - Interactive Form */}
        <Card className="p-6 md:p-8 border-border bg-card/50 backdrop-blur shadow-xl relative overflow-hidden">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold border-current bg-background">1</div>
              <span className="text-sm font-semibold hidden sm:inline-block">Details</span>
            </div>
            <div className="flex-1 h-px bg-border mx-4">
              <div className={`h-full bg-primary transition-all duration-500 ${step === 2 ? 'w-full' : 'w-0'}`}></div>
            </div>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold border-current bg-background">2</div>
              <span className="text-sm font-semibold hidden sm:inline-block">Biometrics</span>
            </div>
          </div>

          <div className="relative z-10 min-h-[400px]">
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input 
                    id="studentId" 
                    placeholder="e.g. STU-2024-001" 
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-background/50"
                  />
                </div>
                <Button 
                  className="w-full mt-8" 
                  size="lg"
                  disabled={!studentId || !name}
                  onClick={() => setStep(2)}
                >
                  Continue to Biometrics
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {step === 2 && !enrollmentComplete && (
              <div className="flex flex-col items-center animate-in fade-in slide-in-from-right-8 duration-500">
                <CameraFeed 
                  mode="enroll" 
                  onCapture={handleCapture}
                  status={isEnrolling ? "scanning" : "idle"}
                  overlayText={isEnrolling ? "Extracting facial embeddings..." : "Position your face within the frame"}
                />
              </div>
            )}

            {enrollmentComplete && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
                <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-success" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Enrollment Successful</h3>
                <p className="text-muted-foreground mb-8">
                  {name} ({studentId}) has been securely registered.
                </p>
                <div className="w-full max-w-xs h-1 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary animate-[scan_3s_linear_infinite]" style={{ width: '100%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-4 font-mono">Redirecting to system...</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}