
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
        <div className="container mx-auto py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-6 lg:mb-8">Spacing Reference</h1>
            <p className="text-muted-foreground mb-8 md:mb-12 lg:mb-16 text-base sm:text-lg">A guide to the global spacing tokens used throughout the application.</p>
            <div className="space-y-6 lg:space-y-8">
                {spaces.map(space => (
                    <div key={space.name} className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
                        <div className="w-full sm:w-48 shrink-0 mb-4 sm:mb-0">
                            <p className="font-mono text-sm text-muted-foreground">{`--space-${space.name}`}</p>
                            <p className="font-mono text-xs text-muted-foreground/70">{space.value}</p>
                        </div>
                        <div className="flex items-center gap-4 md:gap-6">
                            <div className={`bg-primary h-4`} style={{ width: `var(--space-${space.name})` }}></div>
                            <span className="text-sm">{`w-${space.name}`}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpacingGuide;
