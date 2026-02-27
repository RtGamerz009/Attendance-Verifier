import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Users, AlertTriangle, ShieldCheck, Download, Filter, 
  Search, ArrowUpRight, Activity, TrendingDown
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const ATTEMPT_DATA = [
  { time: '08:00', legitimate: 120, spoof: 2 },
  { time: '08:30', legitimate: 250, spoof: 15 },
  { time: '09:00', legitimate: 400, spoof: 25 },
  { time: '09:30', legitimate: 80, spoof: 4 },
  { time: '10:00', legitimate: 45, spoof: 1 },
];

const RECENT_LOGS = [
  { id: 1, name: "Alice Smith", status: "Verified", time: "09:42 AM", confidence: "99.2%", type: "Face + Liveness" },
  { id: 2, name: "Bob Johnson", status: "Verified", time: "09:38 AM", confidence: "98.5%", type: "Face + Liveness" },
  { id: 3, name: "Unknown", status: "Spoof Blocked", time: "09:31 AM", confidence: "12.4%", type: "Screen Reflection" },
  { id: 4, name: "Charlie Davis", status: "Verified", time: "09:28 AM", confidence: "97.8%", type: "Face + Liveness" },
  { id: 5, name: "David Wilson", status: "Spoof Blocked", time: "09:15 AM", confidence: "34.1%", type: "Static Image" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Nav */}
      <header className="border-b border-border bg-card/30 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-primary" />
            <span className="font-display font-bold text-lg tracking-tight text-white">VeriFace<span className="text-primary text-xs ml-1">ADMIN</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/"><a className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">Home</a></Link>
            <Link href="/attendance"><a className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">Live View</a></Link>
            <div className="w-px h-4 bg-border"></div>
            <div className="flex items-center gap-2 text-sm text-white">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
              System Active
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-1">Security Dashboard</h1>
            <p className="text-sm text-muted-foreground">Real-time attendance & threat analytics overview.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-border hover:bg-secondary">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-5 border-border bg-card/50">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Attendance</p>
                <h3 className="text-3xl font-bold text-white">895</h3>
              </div>
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-success">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              <span>12% from yesterday</span>
            </div>
          </Card>
          
          <Card className="p-5 border-border bg-card/50">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Spoof Attempts</p>
                <h3 className="text-3xl font-bold text-destructive">47</h3>
              </div>
              <div className="p-2 rounded-lg bg-destructive/10 text-destructive">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-destructive">
              <TrendingDown className="w-3 h-3 mr-1" />
              <span>Blocked automatically</span>
            </div>
          </Card>

          <Card className="p-5 border-border bg-card/50">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Avg Confidence</p>
                <h3 className="text-3xl font-bold text-white">98.4%</h3>
              </div>
              <div className="p-2 rounded-lg bg-success/10 text-success">
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-muted-foreground">
              <span>System functioning optimally</span>
            </div>
          </Card>

          <Card className="p-5 border-border bg-primary/5 border-primary/20">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-primary mb-1">Risk Level</p>
                <h3 className="text-3xl font-bold text-white">LOW</h3>
              </div>
              <div className="p-2 rounded-lg bg-primary/20 text-primary">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-primary/80">
              <span>All systems secure</span>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart */}
          <Card className="p-6 border-border bg-card/50 col-span-1 lg:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-6">Verification Traffic & Threats</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ATTEMPT_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorLegit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(191, 91%, 52%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(191, 91%, 52%)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSpoof" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 32%, 17%)" vertical={false} />
                  <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'hsl(222.2, 84%, 7%)', borderColor: 'hsl(217, 32%, 17%)', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="legitimate" stroke="hsl(191, 91%, 52%)" fillOpacity={1} fill="url(#colorLegit)" strokeWidth={2} name="Verified" />
                  <Area type="monotone" dataKey="spoof" stroke="hsl(0, 84%, 60%)" fillOpacity={1} fill="url(#colorSpoof)" strokeWidth={2} name="Spoof Attempts" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Activity Log */}
          <Card className="p-0 border-border bg-card/50 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-border flex justify-between items-center bg-secondary/20">
              <h3 className="font-semibold text-white">Live Activity</h3>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {RECENT_LOGS.map((log) => (
                <div key={log.id} className="p-4 border-b border-border/50 hover:bg-secondary/20 transition-colors flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm text-white">{log.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                        log.status === 'Verified' ? 'bg-success/10 text-success border border-success/20' : 
                        'bg-destructive/10 text-destructive border border-destructive/20 animate-pulse'
                      }`}>
                        {log.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                      <span>{log.time}</span>
                      <span>•</span>
                      <span>Conf: {log.confidence}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{log.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}