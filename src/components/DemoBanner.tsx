import { Sparkles } from "lucide-react";

interface DemoBannerProps {
  label: string;
  description: string;
  onLoad: () => void;
  loaded?: boolean;
}

export function DemoBanner({ label, description, onLoad, loaded }: DemoBannerProps) {
  if (loaded) return null;
  return (
    <div className="flex items-center justify-between px-4 py-3 mb-6 bg-primary/5 border border-primary/20 rounded-lg">
      <div className="flex items-center gap-3">
        <Sparkles className="h-4 w-4 text-primary flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        </div>
      </div>
      <button
        onClick={onLoad}
        className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-primary/90 transition-colors whitespace-nowrap"
      >
        Load demo →
      </button>
    </div>
  );
}
