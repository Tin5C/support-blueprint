import { Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ExpertReview() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-1">
        <h1 className="text-2xl font-medium text-foreground">Expert Review</h1>
        <Badge variant="outline" className="text-xs">Premium</Badge>
      </div>
      <p className="text-sm text-muted-foreground mb-8">
        Premium — SavanoAI expert validation and sign-off
      </p>

      <div className="border border-dashed border-border rounded-xl p-16 flex flex-col
                      items-center justify-center text-center gap-4 max-w-2xl">
        <div className="w-14 h-14 rounded-xl bg-secondary flex items-center
                        justify-center mb-2">
          <Lock className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-base font-medium text-foreground">
          Resolve all P0 findings to unlock
        </h2>
        <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
          A named SavanoAI expert validates the AI risk classification,
          reviews top findings for accuracy, validates the auto-generated
          architecture diagram, and signs off the procurement package as a
          third-party verified assessment.
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Available in Premium tier · Coming in Day 2
        </p>
      </div>
    </div>
  );
}
