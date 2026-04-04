import { Card, CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";

export default function SupportPreview() {
  return (
    <div className="p-6 space-y-5 max-w-[1400px] mx-auto animate-fade-in">
      <div>
        <h1 className="text-lg font-semibold text-foreground tracking-tight">Support Preview</h1>
        <p className="text-[12px] text-muted-foreground mt-0.5">A glimpse of what governed support looks like — full design in Support Studio</p>
      </div>

      <Card className="border-dashed border-2 border-primary/20 bg-primary/[0.02]">
        <CardContent className="py-16 text-center space-y-4">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
            <Eye className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Coming in Day 2</h3>
            <p className="text-[11px] text-muted-foreground mt-1 max-w-md mx-auto">
              Top 10 failure modes, automation boundaries, SLA recommendations, support tier classification, and client communication templates — the handoff moment to Support Studio.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
