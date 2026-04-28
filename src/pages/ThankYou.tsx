import { CheckCircle2, MessageCircle, Phone, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpg";

const WHATSAPP = "https://wa.me/919999999999?text=Hi%20CA%20Praveen%2C%20I%20just%20submitted%20my%20ITR%20request";

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col">
      <header className="container py-4">
        <Link to="/"><img src={logo} alt="Praveen J & Associates" className="h-12 object-contain" /></Link>
      </header>
      <main className="flex-1 container max-w-2xl flex items-center justify-center py-10">
        <Card className="w-full p-8 shadow-elevated text-center">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-12 h-12 text-success" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">Thank You! ✅</h1>
          <p className="text-muted-foreground mb-6">Aapka Request Receive Ho Gaya</p>

          <div className="text-left space-y-3 mb-6">
            {[
              { i: Phone, t: "Call within 30–60 mins", d: "Hamari team aapko jaldi call karegi" },
              { i: FileText, t: "Documents Guidance", d: "CA aapko exact list bhejega" },
              { i: Clock, t: "Filing Start", d: "Documents milte hi filing start" },
            ].map(s => (
              <div key={s.t} className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                <s.i className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold">{s.t}</p>
                  <p className="text-sm text-muted-foreground">{s.d}</p>
                </div>
              </div>
            ))}
          </div>

          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="h-14 px-8 w-full bg-success hover:bg-success/90 shadow-cta font-bold">
              <MessageCircle className="w-5 h-5 mr-2" /> 👉 WhatsApp Now
            </Button>
          </a>
          <Link to="/" className="inline-block mt-4 text-sm text-muted-foreground hover:text-primary">← Back to Home</Link>
        </Card>
      </main>
    </div>
  );
};

export default ThankYou;
