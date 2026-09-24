import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { SignInButton, SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";

export function Landing() {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  const handleStartLaboratory = () => {
    if (isSignedIn) {
      navigate("/overview");
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712] text-white">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="absolute inset-0">

        {/* Radial moon glow */}
        <div
          className="
            absolute
            right-[5%]
            top-1/2
            -translate-y-1/2
            w-[650px]
            h-[650px]
            rounded-full
            bg-cyan-500/[0.06]
            blur-[130px]
          "
        />

        {/* Subtle blue glow */}
        <div
          className="
            absolute
            left-[-150px]
            bottom-[-200px]
            w-[500px]
            h-[500px]
            rounded-full
            bg-blue-600/[0.05]
            blur-[120px]
          "
        />

        {/* Grid */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.045]
            bg-[linear-gradient(rgba(148,163,184,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.5)_1px,transparent_1px)]
            bg-[size:70px_70px]
          "
        />

        {/* Vignette */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_30%,#030712_90%)]
          "
        />

      </div>


      {/* =====================================================
          TOP SYSTEM BAR
      ===================================================== */}

      <div
        className="
          absolute
          top-0
          left-0
          right-0
          z-20

          flex
          items-center
          justify-between

          px-8
          md:px-12
          lg:px-16

          py-7

          border-b
          border-white/[0.06]
        "
      >

        {/* Logo */}
        <div className="flex items-center gap-3">

          <div
            className="
              w-2
              h-2
              rounded-full
              bg-cyan-400
              shadow-[0_0_12px_rgba(34,211,238,0.8)]
            "
          />

          <span
            className="
              text-sm
              font-semibold
              tracking-[0.3em]
              text-white
            "
          >
            SENTINEL
          </span>

        </div>


        {/* Mission information */}
        <div
          className="
            hidden
            md:flex
            items-center
            gap-8

            text-[10px]
            tracking-[0.22em]
            uppercase
            text-slate-500
          "
        >

          <span>MISSION 01</span>

          <span>CHANDRAYAAN-2</span>

          <span className="text-cyan-500">
            SYSTEM ONLINE
          </span>

        </div>

      </div>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <section
        className="
          relative
          z-10

          min-h-screen

          flex
          items-center

          px-8
          md:px-12
          lg:px-16
        "
      >

        {/* ===================================================
            LEFT CONTENT
        =================================================== */}

        <div
          className="
            relative
            z-20

            w-full
            lg:w-[52%]

            pt-20
          "
        >

          {/* Eyebrow */}

          <div
            className="
              flex
              items-center
              gap-4
              mb-8
            "
          >

            <div className="w-12 h-px bg-cyan-400" />

            <span
              className="
                text-xs
                tracking-[0.3em]
                uppercase
                text-cyan-400
              "
            >
              LUNAR IMAGE ANALYSIS
            </span>

          </div>


          {/* Main title */}

          <h1
            className="
              text-[clamp(4.5rem,9vw,9rem)]
              leading-[0.78]
              font-semibold
              tracking-[-0.06em]
              text-white
            "
          >
            SENTINEL
          </h1>


          {/* Subtitle */}

          <h2
            className="
              mt-8

              text-2xl
              md:text-3xl

              font-light

              tracking-tight

              text-slate-300
            "
          >
            Lunar Registration Laboratory
          </h2>


          {/* Description */}

          <p
            className="
              mt-6

              max-w-xl

              text-sm
              md:text-base

              leading-7

              text-slate-500
            "
          >
            A computational environment for multi-modal
            image correspondence, geometric verification,
            and precision registration of lunar surface imagery.
          </p>


          {/* =================================================
              CTA BUTTON (CLERK AUTH INTEGRATED)
          ================================================= */}

          <SignedOut>
            <SignInButton mode="modal" forceRedirectUrl="/overview">
              <button
                className="
                  group

                  mt-10

                  inline-flex
                  items-center
                  gap-4

                  border
                  border-cyan-400/40

                  bg-cyan-400

                  px-7
                  py-4

                  text-sm
                  font-semibold
                  tracking-[0.15em]

                  text-[#031018]

                  transition-all
                  duration-300

                  hover:bg-cyan-300
                  hover:border-cyan-300

                  hover:shadow-[0_0_40px_rgba(34,211,238,0.2)]
                "
              >
                START LABORATORY

                <ArrowUpRight
                  size={18}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                />
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <button
              onClick={handleStartLaboratory}
              className="
                group

                mt-10

                inline-flex
                items-center
                gap-4

                border
                border-cyan-400/40

                bg-cyan-400

                px-7
                py-4

                text-sm
                font-semibold
                tracking-[0.15em]

                text-[#031018]

                transition-all
                duration-300

                hover:bg-cyan-300
                hover:border-cyan-300

                hover:shadow-[0_0_40px_rgba(34,211,238,0.2)]
              "
            >
              ENTER LABORATORY

              <ArrowUpRight
                size={18}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              />
            </button>
          </SignedIn>


          {/* =================================================
              TECHNICAL STATS
          ================================================= */}

          <div
            className="
              mt-14

              flex
              flex-wrap

              gap-x-10
              gap-y-5

              text-[10px]
              tracking-[0.18em]
              uppercase
            "
          >

            <div>

              <p className="text-slate-600">
                PLATFORM
              </p>

              <p className="mt-1 text-slate-400">
                LUNAR IMAGING
              </p>

            </div>


            <div>

              <p className="text-slate-600">
                MODE
              </p>

              <p className="mt-1 text-slate-400">
                MULTI-MODAL
              </p>

            </div>


            <div>

              <p className="text-slate-600">
                PRECISION
              </p>

              <p className="mt-1 text-cyan-400">
                SUB-PIXEL
              </p>

            </div>

          </div>

        </div>


        {/* ===================================================
            MOON
        =================================================== */}

        <div
          className="
            absolute

            right-[-12%]
            top-1/2

            -translate-y-1/2

            w-[70vw]
            h-[90vh]

            pointer-events-none

            lg:pointer-events-auto
          "
        >

          {/* Moon image */}

          <div
            className="
              absolute
              inset-0

              flex
              items-center
              justify-center
            "
          >

            <div
              className="
                relative

                w-[min(65vw,760px)]
                aspect-square

                rounded-full

                overflow-hidden

                shadow-[-30px_0_100px_rgba(0,0,0,0.9)]
              "
            >

              <img
                src="/moon.jpg"
                alt="Lunar surface"
                className="
                  w-full
                  h-full

                  object-cover

                  scale-[1.08]

                  opacity-95

                  select-none

                  animate-[spin_120s_linear_infinite]
                "
              />


              {/* Dark atmospheric shading */}

              <div
                className="
                  absolute
                  inset-0

                  rounded-full

                  bg-[radial-gradient(circle_at_35%_30%,transparent_20%,rgba(0,0,0,0.05)_45%,rgba(0,0,0,0.75)_82%,rgba(0,0,0,0.95)_100%)]
                "
              />


              {/* Cyan rim */}

              <div
                className="
                  absolute
                  inset-0

                  rounded-full

                  shadow-[inset_-20px_-10px_60px_rgba(0,0,0,0.9),inset_20px_0_50px_rgba(34,211,238,0.08)]
                "
              />

            </div>

          </div>


          {/* Orbital line */}

          <div
            className="
              absolute

              top-1/2
              left-1/2

              -translate-x-1/2
              -translate-y-1/2

              w-[min(72vw,850px)]
              aspect-square

              rounded-full

              border
              border-cyan-400/[0.08]

              rotate-[-18deg]
            "
          />

        </div>

      </section>


      {/* =====================================================
          BOTTOM SYSTEM BAR
      ===================================================== */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          z-20

          flex
          items-center
          justify-between

          px-8
          md:px-12
          lg:px-16

          py-5

          border-t
          border-white/[0.06]
        "
      >

        <span
          className="
            text-[9px]
            tracking-[0.25em]
            uppercase
            text-slate-600
          "
        >
          SPACE APPLICATIONS • IMAGE REGISTRATION
        </span>


        <span
          className="
            hidden
            sm:block

            text-[9px]
            tracking-[0.25em]
            uppercase
            text-slate-600
          "
        >
          ISRO / LUNAR DATA
        </span>

      </div>

    </main>
  );
}