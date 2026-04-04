import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function ReadinessReport() {
  return (
    <div className="p-6 space-y-5 max-w-[1400px] mx-auto animate-fade-in">
      <div>
        <h1 className="text-lg font-semibold text-foreground tracking-tight">Readiness Report</h1>
        <p className="text-[12px] text-muted-foreground mt-0.5">9-agent evaluation results and remediation</p>
      </div>

      <Card className="border-dashed border-2 border-primary/20 bg-primary/[0.02]">
        <CardContent className="py-16 text-center space-y-4">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Coming in Day 2</h3>
            <p className="text-[11px] text-muted-foreground mt-1 max-w-md mx-auto">
              9-agent evaluation scores, weighted composite, gap register, and remediation tasks — all contextualised against the applicable regulatory frameworks and enterprise standards.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
