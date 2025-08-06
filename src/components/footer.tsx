export default function footer() {
  return (
    <>
      {/* Footer unique */}
      <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8 text-center gap-1">
          <p className="flex justify-center flex-col items-center text-sm text-muted-foreground ">
            <span>Portfolio en travaux, mais ça avance bien 🚀</span>
            <span className="text-primary font-medium gap-1">
              Merci pour ta patience !
            </span>
          </p>
        </div>
      </footer>
    </>
  );
}
