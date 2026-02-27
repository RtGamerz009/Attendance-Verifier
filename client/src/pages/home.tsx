import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShieldCheck, UserPlus, Fingerprint, LayoutDashboard, ArrowRight } from "lucide-react";
import heroBg from "@/assets/images/hero-bg.png";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={heroBg} alt="Background" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background"></div>
      </div>

      <div className="z-10 text-center px-4 max-w-3xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-xs font-mono tracking-wider font-semibold">ENTERPRISE GRADE SECURITY</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          VeriFace <span className="text-primary">AI</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl font-light animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          Zero-trust smart attendance system. Eliminating proxy attendance with multi-layer facial recognition, deep liveness detection, and real-time anti-spoofing analytics.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl animate-in fade-in zoom-in-95 duration-700 delay-300">
          
          {/* Student Registration */}
          <Link href="/register" className="group relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-white/10 hover:border-primary/50 transition-all flex flex-col items-center text-center gap-4 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <UserPlus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Enrollment</h3>
                <p className="text-sm text-muted-foreground">Register new biometric data</p>
              </div>
          </Link>

          {/* Attendance Capture */}
          <Link href="/attendance" className="group relative p-6 rounded-2xl bg-primary/5 backdrop-blur-sm border border-primary/30 hover:border-primary transition-all flex flex-col items-center text-center gap-4 hover:shadow-[0_0_40px_rgba(6,182,212,0.25)] hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                <Fingerprint className="w-8 h-8" />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-1">Mark Attendance</h3>
                <p className="text-sm text-primary/80 font-medium">Verify Identity & Liveness</p>
              </div>
          </Link>

          {/* Admin Dashboard */}
          <Link href="/admin" className="group relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-white/10 hover:border-accent/50 transition-all flex flex-col items-center text-center gap-4 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Admin Portal</h3>
                <p className="text-sm text-muted-foreground">Security & Analytics Dashboard</p>
              </div>
          </Link>

        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-10 text-[10px] font-mono text-muted-foreground opacity-50 flex flex-col gap-1">
        <span>SYS.STATUS: ONLINE</span>
        <span>MODELS: LOADED (V3.2)</span>
        <span>SPOOF.DETECTION: ACTIVE</span>
      </div>
    </div>
  );
}