import Spline from '@splinetool/react-spline';

function HeroCover() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/qMOKV671Z1CM9yS7/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-neutral-950/40 to-neutral-950"></div>

      <div className="relative z-10 mx-auto flex h-full max-w-5xl items-center px-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-xs text-yellow-300">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-yellow-400"></span>
            Calming focus•hourglass flow
          </div>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-neutral-100 md:text-6xl">
            Think clearly. Act effectively.
          </h1>
          <p className="mt-3 max-w-xl text-neutral-300 md:text-lg">
            A modern task manager to capture ideas, schedule plans, and finish what matters — with a thoughtful, calming rhythm.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HeroCover;
