
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const SpacingGuide = () => {
    const spaces = [
        { name: 'xs', value: '4px' },
        { name: 'sm', value: '8px' },
        { name: 'sm-plus', value: '12px' },
        { name: 'md', value: '16px' },
        { name: 'lg', value: '24px' },
        { name: 'xl', value: '32px' },
        { name: '2xl', value: '48px' },
    ];

    return (
        <div className="container mx-auto py-xl">
            <h1 className="font-serif text-4xl font-bold mb-lg">Spacing Reference</h1>
            <p className="text-muted-foreground mb-xl">A guide to the global spacing tokens used throughout the application.</p>
            <div className="space-y-lg">
                {spaces.map(space => (
                    <div key={space.name} className="flex flex-col sm:flex-row sm:items-center sm:gap-md">
                        <div className="w-48 shrink-0 mb-sm sm:mb-0">
                            <p className="font-mono text-sm text-muted-foreground">{`--space-${space.name}`}</p>
                            <p className="font-mono text-xs text-muted-foreground/70">{space.value}</p>
                        </div>
                        <div className="flex items-center gap-md">
                            <div style={{ width: `var(--space-${space.name})` }} className={`bg-primary h-md`}></div>
                            <span className="text-sm">{`w-${space.name}`}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpacingGuide;
