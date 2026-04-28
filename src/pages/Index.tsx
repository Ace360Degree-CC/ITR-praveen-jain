import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Phone, MessageCircle, CheckCircle2, AlertTriangle, Clock, FileText, Shield, Star, Zap, X, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import logo from "@/assets/logo.jpg";
import praveen from "@/assets/praveen.png";

const WHATSAPP = "https://wa.me/919999999999?text=Hi%20CA%20Praveen%2C%20I%20need%20help%20filing%20my%20ITR";

const QuickForm = ({ variant = "hero", onSubmitted }: { variant?: "hero" | "footer" | "exit"; onSubmitted?: () => void }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("Old ITR");
  const [years, setYears] = useState("1");
  const [income, setIncome] = useState("Salary");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || mobile.trim().length < 10) {
      toast.error("Naam aur valid mobile number daalein");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSubmitted?.();
      navigate("/thank-you");
    }, 600);
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <Input
        placeholder="Aapka Naam *"
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={60}
        className="h-12 bg-white text-foreground"
      />
      <Input
        placeholder="Mobile Number *"
        value={mobile}
        onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
        inputMode="numeric"
        className="h-12 bg-white text-foreground"
      />
      {variant === "footer" && (
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={120}
          className="h-12 bg-white text-foreground"
        />
      )}
      {variant !== "exit" && (
        <Select value={service} onValueChange={setService}>
          <SelectTrigger className="h-12 bg-white text-foreground">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Old ITR">Old ITR ✅ (Recommended)</SelectItem>
            <SelectItem value="Loan ITR">Loan ITR</SelectItem>
            <SelectItem value="MHADA ITR">MHADA Lottery ITR</SelectItem>
          </SelectContent>
        </Select>
      )}
      {variant === "footer" && (
        <>
          <Select value={years} onValueChange={setYears}>
            <SelectTrigger className="h-12 bg-white text-foreground">
              <SelectValue placeholder="Years Pending" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Year Pending</SelectItem>
              <SelectItem value="2">2 Years Pending</SelectItem>
              <SelectItem value="3+">3+ Years Pending</SelectItem>
            </SelectContent>
          </Select>
          <Select value={income} onValueChange={setIncome}>
            <SelectTrigger className="h-12 bg-white text-foreground">
              <SelectValue placeholder="Income Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Salary">Salary</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
              <SelectItem value="Multiple">Multiple Sources</SelectItem>
            </SelectContent>
          </Select>
        </>
      )}
      <Button
        type="submit"
        disabled={loading}
        className="w-full h-12 text-base font-bold bg-gradient-cta hover:opacity-95 shadow-cta animate-pulse-ring"
      >
        {loading ? "Sending..." : variant === "exit" ? "👉 Save My ITR Now" : variant === "footer" ? "👉 Submit & Get Expert Help" : "👉 Get CA Callback"}
      </Button>
      <p className="text-xs text-center opacity-90">⚡ 30 mins mein response milega</p>
    </form>
  );
};

const Index = () => {
  const [exitOpen, setExitOpen] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !shown) {
        setExitOpen(true);
        setShown(true);
      }
    };
    document.addEventListener("mouseleave", onLeave);
    const t = setTimeout(() => {
      if (!shown) { setExitOpen(true); setShown(true); }
    }, 45000);
    return () => { document.removeEventListener("mouseleave", onLeave); clearTimeout(t); };
  }, [shown]);

  const scrollToForm = () => {
    document.getElementById("hero-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top urgency bar */}
      <div className="bg-gradient-urgent text-warning-foreground text-center text-xs sm:text-sm py-2 px-3 font-semibold">
        ⏳ Late Filing Penalty Avoid Karein — Aaj Hi File Karwayein!
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <img src={logo} alt="Praveen J & Associates Chartered Accountants Mumbai" className="h-10 sm:h-12 object-contain" />
          <a href="tel:+919999999999" className="hidden sm:inline-flex items-center gap-2 text-primary font-bold">
            <Phone className="w-4 h-4" /> +91 99999 99999
          </a>
          <Button onClick={scrollToForm} size="sm" className="bg-primary hover:bg-primary-dark sm:hidden">File Now</Button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="container relative py-8 lg:py-14 grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: Video / Founder */}
          <div className="animate-slide-up">
            <div className="relative rounded-2xl overflow-hidden shadow-elevated bg-black aspect-[4/5] sm:aspect-video lg:aspect-[4/5] max-w-md mx-auto">
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={praveen}
                className="w-full h-full object-cover"
              >
                <source src="" type="video/mp4" />
              </video>
              <img src={praveen} alt="CA Praveen Jain - Founder, Praveen J & Associates" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white font-bold">CA Praveen Jain</p>
                <p className="text-white/80 text-sm">Founder • 10+ Years Experience</p>
              </div>
              <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> LIVE
              </div>
            </div>
          </div>

          {/* Right: Content + Form */}
          <div className="space-y-5 animate-slide-up">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              ITR Miss Ho Gaya? <br />
              <span className="text-warning">Abhi Bhi File Ho Sakta Hai ✅</span>
            </h1>
            <p className="text-base sm:text-lg opacity-95">
              Old / Previous Year ITR filing ab easy hai.<br/>
              <span className="font-semibold">👉 CA Praveen Jain ke saath fast & accurate filing</span>
            </p>
            <ul className="space-y-2 text-base">
              {["Old ITR (1–3 years)", "Loan ke liye ITR", "MHADA Lottery ITR"].map(t => (
                <li key={t} className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-warning shrink-0" /> {t}</li>
              ))}
            </ul>

            {/* Inline Header Form */}
            <Card id="hero-form" className="p-5 bg-white/10 backdrop-blur border-white/20 text-primary-foreground">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2"><Zap className="w-5 h-5 text-warning" /> Start Your ITR Filing Now</h2>
              <QuickForm variant="hero" />
            </Card>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="flex items-center gap-1"><Star className="w-4 h-4 fill-warning text-warning" /> <strong>4.8</strong> Rating</div>
              <span className="opacity-50">|</span>
              <div>⭐ 300+ Clients</div>
              <span className="opacity-50">|</span>
              <div>📍 Mumbai Based CA</div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-14 bg-secondary">
        <div className="container max-w-4xl text-center">
          <AlertTriangle className="w-12 h-12 text-primary mx-auto mb-3" />
          <h2 className="text-3xl sm:text-4xl mb-3">Aapka ITR Abhi Tak File Nahi Hua? 😟</h2>
          <p className="text-muted-foreground mb-8">In sab tension se chhutkara paayein — bas ek call mein.</p>
          <div className="grid sm:grid-cols-2 gap-4 text-left">
            {[
              { t: "Deadline miss ho gaya?", d: "Belated / Updated return file karwa lo." },
              { t: "Loan urgently chahiye?", d: "Bank ke liye instant ITR ready." },
              { t: "MHADA reject ka risk?", d: "Income proof properly file karein." },
              { t: "Penalty & notice ka tension?", d: "Hum complete handle karenge." },
            ].map(x => (
              <Card key={x.t} className="p-5 shadow-card border-l-4 border-l-primary">
                <h3 className="font-bold mb-1">⚠️ {x.t}</h3>
                <p className="text-sm text-muted-foreground">{x.d}</p>
              </Card>
            ))}
          </div>
          <Button onClick={scrollToForm} className="mt-8 h-12 px-8 bg-primary hover:bg-primary-dark shadow-cta">👉 Relax — Hum Handle Kar Lenge</Button>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="py-14">
        <div className="container max-w-5xl text-center">
          <span className="inline-block bg-success/10 text-success font-semibold px-3 py-1 rounded-full text-sm mb-3">SOLUTION</span>
          <h2 className="text-3xl sm:text-4xl mb-3">Expert CA Support – Simple & Stress-Free</h2>
          <p className="text-muted-foreground mb-10">Aap bas details share karo, baaki hum dekh lenge.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { i: CheckCircle2, t: "Accurate Filing", d: "Zero error guarantee" },
              { i: Shield, t: "Penalty Handling", d: "Notice / late fee support" },
              { i: Zap, t: "Fast Processing", d: "Same-day filing possible" },
              { i: FileText, t: "Proper Documentation", d: "Loan & MHADA ready" },
            ].map(x => (
              <Card key={x.t} className="p-6 shadow-card hover:shadow-elevated transition-smooth hover:-translate-y-1">
                <x.i className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-1">{x.t}</h3>
                <p className="text-sm text-muted-foreground">{x.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-14 bg-gradient-soft">
        <div className="container max-w-8xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl mb-2">Hamari Services</h2>
            <p className="text-muted-foreground">Aapke har ITR need ka solution</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="p-6 shadow-elevated border-2 border-primary relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">🥇 MOST POPULAR</div>
              <div className="text-4xl mb-2">🥇</div>
              <h3 className="text-xl mb-3 text-primary">Old ITR Filing</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" /> Belated Return (1–2 years old)</li>
                
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" /> Penalty handling & guidance</li>
                <li className="flex gap-2"></li>
              </ul>
              <Button onClick={scrollToForm} className="w-full mt-5 bg-primary hover:bg-primary-dark">File Old ITR Now</Button>
            </Card>
            <Card className="p-6 shadow-card">
              <div className="text-4xl mb-2">🥈</div>
              <h3 className="text-xl mb-3">ITR for Loan</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" /> Home Loan ITR</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" /> Personal & Business Loan</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" /> Same-day support available</li>
              </ul>
              <Button onClick={scrollToForm} variant="outline" className="w-full mt-5 border-primary text-primary hover:bg-primary hover:text-primary-foreground">Get Loan ITR</Button>
            </Card>
            <Card className="p-6 shadow-card">
              <div className="text-4xl mb-2">🥉</div>
              <h3 className="text-xl mb-3">MHADA Lottery ITR</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" /> Income proof preparation</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" /> Eligibility documentation</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" /> Fast filing for deadline</li>
              </ul>
              <Button onClick={scrollToForm} variant="outline" className="w-full mt-5 border-primary text-primary hover:bg-primary hover:text-primary-foreground">File MHADA ITR</Button>
            </Card>
            <Card className="p-6 shadow-card">
              <div className="text-4xl mb-2">🥉</div>
              <h3 className="text-xl mb-3">ITR For VISA</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" /> Visa Income Proof Ready</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />Embassy-Compliant ITR</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" /> Quick Processing Support</li>
              </ul>
              <Button onClick={scrollToForm} variant="outline" className="w-full mt-5 border-primary text-primary hover:bg-primary hover:text-primary-foreground">Apply for Visa ITR</Button>
            </Card>
          </div>
        </div>
      </section>
            
      {/* PROCESS */}
      <section className="py-14">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl mb-2">Bas 3 Steps Mein Kaam Ho Jayega</h2>
          <p className="text-muted-foreground mb-10">Simple. Fast. Secure.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: "1", t: "Documents Share Karo", d: "WhatsApp ya email pe bhej do" },
              { n: "2", t: "CA Filing Karega", d: "Expert team accurately file karegi" },
              { n: "3", t: "Confirmation Mil Jayega", d: "ITR-V & acknowledgement aapke pas" },
            ].map(s => (
              <div key={s.n} className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-cta text-primary-foreground text-2xl font-extrabold flex items-center justify-center mx-auto mb-3 shadow-cta">{s.n}</div>
                <h3 className="font-bold">{s.t}</h3>
                <p className="text-sm text-muted-foreground mt-1">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCUMENTS */}
      <section className="py-14 bg-secondary">
        <div className="container max-w-5xl text-center">
          <FileText className="w-10 h-10 text-primary mx-auto mb-3" />
          <h2 className="text-3xl sm:text-4xl mb-3">Documents Required</h2>
          <p className="text-muted-foreground mb-8">Missing hai? Guide kar denge — koi tension nahi.</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {["PAN Card", "Aadhaar Card", "Bank Statement", "Income Details","Income Tax Portal Login Credentials"].map(d => (
              <Card key={d} className="p-5 shadow-card">
                <CheckCircle2 className="w-6 h-6 text-success mx-auto mb-2" />
                <p className="font-semibold text-sm">{d}</p>
              </Card>
            ))}
          </div>
          <Button onClick={scrollToForm} className="mt-8 h-12 px-8 bg-primary hover:bg-primary-dark shadow-cta">👉 Documents Guidance Chahiye</Button>
        </div>
      </section>

      {/* TRUST */}
      <section className="py-14">
        <div className="container max-w-5xl">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-1 mb-2">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 fill-warning text-warning" />)}
            </div>
            <h2 className="text-3xl sm:text-4xl mb-2">5 Rating • 1000+ Happy Clients</h2>
            <p className="text-muted-foreground">Real feedback from real clients</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { n: "Vaibhav Kumar", c: "Mumbai", t: "I had a very good experience with CA Praveen Jain. He handled my ITR filing smoothly and explained everything clearly." },
              { n: "Priya M.", c: "Mumbai", t: "I highly recommend Praveen and his team for any company registration or IT filing needs. From start to finish" },
              { n: "Prateek Agrawal", c: "Mumbai", t: "I would like to express my sincere appreciation to Praveen for their exceptional support in filing my ITR and addressing all my tax-related queries." },
            ].map(r => (
              <Card key={r.n} className="p-6 shadow-card">
                <div className="flex gap-1 mb-2">{[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-warning text-warning" />)}</div>
                <p className="text-sm mb-4 italic">"{r.t}"</p>
                <div>
                  <p className="font-bold">{r.n}</p>
                  <p className="text-xs text-muted-foreground">{r.c}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-14 bg-gradient-hero text-primary-foreground">
        <div className="container max-w-3xl text-center">
          <Clock className="w-12 h-12 mx-auto mb-3 animate-float" />
          <h2 className="text-3xl sm:text-5xl mb-4">Abhi File Karein – Late Mat <br/>Karein ⏳</h2>
          <p className="text-lg opacity-95 mb-6">Har din late = penalty zyada. Aaj hi action lein.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={scrollToForm} size="lg" className="h-14 px-8 text-base font-bold bg-white text-primary hover:bg-white/90 shadow-elevated">
              🔴 Start ITR Filing
            </Button>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="h-14 px-8 text-base font-bold bg-success hover:bg-success/90 w-full sm:w-auto">
                <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp Now
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14">
        <div className="container max-w-3xl">
          <h2 className="text-3xl sm:text-4xl text-center mb-8">FAQ — Aapke Sawaal</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {[
              { q: "Kya old ITR file ho sakta hai?", a: "Haan! Updated Return (ITR-U) ke through aap pichhle 3 saal ka ITR bhi file kar sakte hain. Belated return bhi possible hai." },
              { q: "Kitne saal tak ka ITR file kar sakte hain?", a: "Currently up to 3 previous assessment years ke liye Updated Return file kiya ja sakta hai with applicable additional tax." },
              { q: "Loan ke liye ITR mandatory hai kya?", a: "Haan, almost sabhi banks home loan, personal loan ya business loan ke liye 2-3 saal ka ITR maangte hain." },
              { q: "MHADA lottery ke liye kaunsa ITR chahiye?", a: "MHADA scheme ke according 1-3 saal ka ITR with proper income category proof zaroori hota hai. Hum complete guide karenge." },
              { q: "Penalty kitni lagti hai late filing par?", a: "Belated return par ₹1,000 – ₹5,000 tak late fee + interest. Updated return par additional 25%-50% tax. Hum minimize karne mein help karte hain." },
              { q: "Kitne din mein ITR file ho jata hai?", a: "Documents complete hone ke baad same day se 24 hours ke andar filing complete ho jaati hai." },
            ].map((f, i) => (
              <AccordionItem key={i} value={`f${i}`} className="border bg-card rounded-lg px-4 shadow-card">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* FOOTER FORM */}
      <section className="py-14 bg-gradient-hero text-primary-foreground">
        <div className="container max-w-2xl">
          <div className="text-center mb-6">
            <h2 className="text-3xl sm:text-4xl mb-2">Get Expert CA Help Now</h2>
            <p className="opacity-95">Detailed form fill karein — humara CA aapko personally call karega.</p>
          </div>
          <Card className="p-6 bg-white/10 backdrop-blur border-white/20 text-primary-foreground">
            <QuickForm variant="footer" />
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-10">
        <div className="container grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <img src={logo} alt="Praveen J & Associates" className="h-12 bg-white p-2 rounded mb-3" />
            <p className="opacity-80">Chartered Accountants serving Mumbai, Navi Mumbai, Thane & Pune. Trusted by 300+ clients.</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Contact</h4>
            <p className="opacity-80">📞 +91 99999 99999</p>
            <p className="opacity-80">📧 info@praveenjassociates.com</p>
            <p className="opacity-80">📍 Mumbai, Maharashtra</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Services</h4>
            <ul className="space-y-1 opacity-80">
              <li>Old / Belated ITR Filing</li>
              <li>Loan ITR (Home / Personal / Business)</li>
              <li>MHADA Lottery ITR</li>
              <li>Updated Return (ITR-U)</li>
            </ul>
          </div>
        </div>
        <div className="container mt-6 pt-6 border-t border-white/10 text-xs opacity-60 text-center">
          © {new Date().getFullYear()} Praveen J & Associates. All rights reserved.
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white border-t border-border p-2 grid grid-cols-2 gap-2 shadow-elevated">
        <Button onClick={scrollToForm} className="bg-primary hover:bg-primary-dark h-12 font-bold">📝 File ITR</Button>
        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
          <Button className="bg-success hover:bg-success/90 w-full h-12 font-bold"><MessageCircle className="w-4 h-4 mr-1" /> WhatsApp</Button>
        </a>
      </div>

      {/* Floating WhatsApp (desktop) */}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Chat"
        className="hidden lg:flex fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-success text-success-foreground items-center justify-center shadow-elevated animate-pulse-ring hover:scale-110 transition-smooth"
      >
        <MessageCircle className="w-7 h-7" />
      </a>

      {/* Exit popup */}
      <Dialog open={exitOpen} onOpenChange={setExitOpen}>
        <DialogContent className="max-w-md p-0 overflow-hidden">
          <div className="bg-gradient-hero text-primary-foreground p-6 text-center">
            <AlertTriangle className="w-10 h-10 mx-auto mb-2 text-warning" />
            <h3 className="text-2xl font-extrabold mb-1">Rukiye! ⚠️</h3>
            <p className="opacity-95">ITR File Kiye Bina Mat Jayein</p>
            <p className="text-sm mt-1 text-warning font-semibold">🔥 Penalty avoid karein</p>
          </div>
          <div className="p-6 bg-card">
            <QuickForm variant="exit" onSubmitted={() => setExitOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
