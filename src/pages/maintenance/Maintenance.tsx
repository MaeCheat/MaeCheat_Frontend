import logo from "../../assets/logo.png";
import Footer from "../../components/common/Footer";

const Maintenance = () => {
  return (
    <div className="min-h-dvh glass-page relative overflow-hidden flex flex-col items-center justify-center px-4">
      <div className="glass-orb-home-1" />
      <div className="glass-orb-home-2" />

      <div className="relative mb-8 text-center flex flex-col items-center">
        <div className="relative">
          <div className="absolute -left-11 md:-left-14 top-1/2 -translate-y-1/2 w-9 h-9 md:w-12 md:h-12 flex items-center justify-center">
            <div className="absolute inset-[-12px] rounded-full bg-accent/20 blur-2xl" />
            <img
              src={logo}
              alt="MaeCheat"
              className="relative w-9 h-9 md:w-12 md:h-12 brightness-150 drop-shadow-[0_0_12px_rgba(232,145,58,0.5)]"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-pixel">
            Mae<span className="text-accent">Cheat</span>
          </h1>
        </div>
      </div>

      <div className="relative w-full max-w-md text-center">
        <div className="glass-card rounded-2xl p-8 md:p-10">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3 font-pixel">
            점검 중입니다
          </h2>
          <p className="text-white/50 text-sm leading-relaxed">
            더 나은 서비스를 위해 점검을 진행하고 있습니다.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <Footer />
      </div>
    </div>
  );
};

export default Maintenance;
