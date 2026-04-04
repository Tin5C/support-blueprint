import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";

export default function ExpertReview() {
  return (
    <div className="p-6 space-y-5 max-w-[1400px] mx-auto animate-fade-in">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-lg font-semibold text-foreground tracking-tight">Expert Review</h1>
          <p className="text-[12px] text-muted-foreground mt-0.5">Premium — SavanoAI expert validation and sign-off</p>
        </div>
        <Badge className="bg-primary/15 text-primary border-primary/25 text-[10px] px-2 py-0.5">Premium</Badge>
      </div>

      <Card className="border-dashed border-2 border-primary/20 bg-primary/[0.02]">
        <CardContent className="py-16 text-center space-y-4">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Coming in Day 2</h3>
            <p className="text-[11px] text-muted-foreground mt-1 max-w-md mx-auto">
              A named SavanoAI expert validates the AI risk classification, reviews top findings, validates the architecture diagram, and signs off the procurement package as a third-party verified assessment.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
